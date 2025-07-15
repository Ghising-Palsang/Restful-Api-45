const http = require('http');
const app = require('./src/config/express.config')

// node server
const httpServer = http.createServer(app)  // express app to node server

const host = 'localhost'
const port = 9005 

httpServer.listen(port, host, (err)=>{
      if (!err) {
        console.log(`Server is running at http://${host}:${port}`);
    } else {
        console.error('Error starting server:', err);
    }
})