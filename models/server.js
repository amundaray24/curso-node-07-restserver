const express = require('express');
var cors = require('cors');

const { createConnection } = require('../database/coffee.config.db');

class Server {
  
  constructor() {
    this.app = express();
    this.app.disable('x-powered-by');
    this.port = process.env.PORT || 3000;

    //Routes declarations
    this.paths = [
      {
        path: '/auth/v1/auth',
        route: '../routes/auth.route'
      },
      {
        path: '/users/v1/users',
        route: '../routes/users.route'
      },
      {
        path: '/categories/v1/categories',
        route: '../routes/categories.route'
      }
    ]


    //Database Connection
    this.databaseConnect();
    
    //Middleware's
    this.middleware();
    //Routes
    this.routes();
  }

  databaseConnect () {
    createConnection();
  }

  middleware() {
    //Cors
    this.app.use(cors());
    //Json Parser
    this.app.use(express.json());
    //Public directory
    this.app.use(express.static('public'));
  }

  routes() {
    this.paths.forEach((routeItem) => {
      this.app.use(routeItem.path ,require(routeItem.route));
    });
  }

  start() {
    this.app.listen(this.port, () => {
      console.log(`INFO - Listening at http://localhost:${this.port}`);
    });
  }
}

module.exports = Server;