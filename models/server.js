const express = require('express');
var cors = require('cors');

const { createConnection } = require('../database/coffee.config.db');

class Server {
  
  constructor() {
    this.app = express();
    this.app.disable('x-powered-by');
    this.port = process.env.PORT || 3000;

    //Routes declarations
    this.authRoute = {
      path: '/auth/v1/auth',
      route: require('../routes/auth.route')
    };

    this.usersRoute = {
      path: '/users/v1/users',
      route: require('../routes/users.route')
    };


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
    this.app.use(this.authRoute.path ,this.authRoute.route);
    this.app.use(this.usersRoute.path ,this.usersRoute.route);
  }

  start() {
    this.app.listen(this.port, () => {
      console.log(`INFO - Listening at http://localhost:${this.port}`);
    });
  }
}

module.exports = Server;