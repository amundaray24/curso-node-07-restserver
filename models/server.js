const express = require('express');

class Server {
  
  constructor() {
    this.app = express();
    this.port = process.env.PORT || 3000;

    //Middleware's
    this.middleware();
    //Routes
    this.routes();
  }

  middleware() {
    this.app.use(express.static('public'));
  }

  routes() {
    
    this.app.post('/api', (req,res) => {
      const response = {
        greeting : 'POST'
      }
      res.json(response);
    });

    this.app.put('/api', (req,res) => {
      const response = {
        greeting : 'PUT'
      }
      res.json(response);
    });

    this.app.patch('/api', (req,res) => {
      const response = {
        greeting : 'PATCH'
      }
      res.json(response);
    });

    this.app.get('/api', (req,res) => {
      const response = {
        greeting : 'GET'
      }
      res.json(response);
    });

    this.app.delete('/api', (req,res) => {
      const response = {
        greeting : 'DELETE'
      }
      res.json(response);
    });

  }

  start() {
    this.app.listen(this.port, () => {
      console.log(`Listening at http://localhost:${this.port}`);
    });
  }
}

module.exports = Server;