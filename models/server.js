const express = require('express');
var cors = require('cors')

class Server {
  
  constructor() {
    this.app = express();
    this.port = process.env.PORT || 3000;

    //Routes declarations
    this.usersRoute = {
      path: '/users/v0/users',
      route: require('../routes/users.route')
    };

    //Middleware's
    this.middleware();
    //Routes
    this.routes();
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
    this.app.use(this.usersRoute.path ,this.usersRoute.route);
  }

  start() {
    this.app.listen(this.port, () => {
      console.log(`Listening at http://localhost:${this.port}`);
    });
  }
}

module.exports = Server;