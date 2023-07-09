const Common = require('../helpers/common');
const fs = require('fs');
const path = require('path');

module.exports = class LogController {

    /**
     * Handle process log
     * 
     * @param {*} req
     * @param {*} res
     */
    static processLog = async (req, res) => {
        try {
            if (!req.file) return Common.errorResult(res, 'MISSING_JSON_FILE');

            let filePath = path.join(req.file.path);

            let data = fs.readFileSync(filePath, { encoding: 'utf-8' });
            if (!data) return Common.errorResult(res, 'INVALID_JSON_FILE');

            let jsonDatas = JSON.parse(data);
            let books = [];
            for (let jsonData of jsonDatas) {
                let book = {
                    category: "", totalPage: "", title: "", readPage: "", rate: ""
                }
                let splitDatas = jsonData.split(' ');
                splitDatas = this.#getTotalPageAndCategory(book, splitDatas);
                splitDatas = this.#getReadPageAndTitle(book, splitDatas);
                book.rate = splitDatas.length > 0 ? splitDatas[splitDatas.length - 1] : "";
                book.lowerCaseTitle = book.title.toLowerCase();
                book.readingRate = book.readPage / book.totalPage;
                if (!isNaN(book.totalPage) && !isNaN(book.readPage) && !isNaN(book.rate)) {
                    book.totalPage = parseInt(book.totalPage);
                    book.readPage = parseInt(book.readPage);
                    book.rate = parseFloat(book.rate.replace(",", "."));
                    if(book.readPage < book.totalPage)
                        books.push(book);
                }
            }

            const maxReadingRateBook = books.reduce(function (prev, current) {
                return (prev.readingRate > current.readingRate) ? prev : current
            })

            let count = 0, sumRate = 0;
            for (let book of books) {
                if (book.lowerCaseTitle == maxReadingRateBook.lowerCaseTitle && book.totalPage == maxReadingRateBook.totalPage) {
                    count++;
                    sumRate += book.rate;
                }
            }

            return res.json({"title": maxReadingRateBook.title, "reading_rate": maxReadingRateBook.readingRate, "average_rate": sumRate / count });

        } catch (err) {
            console.log(err);
            return Common.errorResult(res, 'UNKNOWN_ERROR');
        }
    }

    static #getTotalPageAndCategory(bookInfo, splitDatas) {
        for (let i = 0; i < splitDatas.length; i++) {
            let splitData = splitDatas[i].toLowerCase();
            if (splitData.includes('page')) {
                if (/\d/.test(splitDatas[i])) {
                    bookInfo.totalPage = splitData.replace('pages', '').replace('page', '');
                    for (let j = 0; j < i; j++)
                        bookInfo.category += splitDatas[j] + " ";
                }
                else if (/\d/.test(splitDatas[i - 1])) {
                    bookInfo.totalPage = splitDatas[i - 1];
                    for (let j = 0; j < i - 1; j++)
                        bookInfo.category += splitDatas[j] + " ";
                }
                bookInfo.category = bookInfo.category.slice(0, -1);
                splitDatas = splitDatas.slice(i + 1);
                break;
            }
        }
        return splitDatas;
    }

    static #getReadPageAndTitle(bookInfo, splitDatas) {
        for (let i = splitDatas.length - 1; i >= 0; i--) {
            let splitData = splitDatas[i].toLowerCase();
            if (splitData.includes('page')) {
                if (/\d/.test(splitDatas[i])) {
                    bookInfo.readPage = splitData.replace('pages', '').replace('page', '');
                    for (let j = 0; j < i; j++)
                        bookInfo.title += splitDatas[j] + " ";
                }
                else if (/\d/.test(splitDatas[i - 1])) {
                    bookInfo.readPage = splitDatas[i - 1];
                    for (let j = 0; j < i - 1; j++)
                        bookInfo.title += splitDatas[j] + " ";
                }
                bookInfo.title = bookInfo.title.slice(0, -1);
                splitDatas = splitDatas.slice(i + 1);
                break;
            }
        }
        return splitDatas;
    }
}