require('dotenv').config(); //instatiate environment variables

let CONFIG = {}; //Make this global to use all over the application

CONFIG.app = process.env.APP || 'development';
CONFIG.port = process.env.PORTNODE_DOCKER_PORT|| '3000';

module.exports = CONFIG;
