const express = require('express');
const router = express.Router();

const { upload } = require('../middleware/uploadMiddleware');

const LogController = require('../controllers/log.controller');

router.get('/', function (req, res, next) {
    res.json({
        status: 'success',
        message: 'Process LOG API',
        data: { version_number: 'v1.0.0' }
    });
});

router.get('/api/book', upload.single('file'), LogController.processLog);

module.exports = router;  