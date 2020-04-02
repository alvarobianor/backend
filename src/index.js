const express = require('express');
const routes = require('./routes');

const cors = require('cors');
class App {
  constructor() {
    this.server = express();

    this.server.use(cors());
    this.middlewares();
    this.routes();
    this.server.listen(3333);
  }
  routes() {
    this.server.use(routes);
  }

  middlewares() {
    this.server.use(express.json());
  }
}

module.exports = new App().server;
