FROM node:14.15.1

WORKDIR /log-api

COPY package.json .

RUN npm install
CMD [ "npm", "run", "start" ]