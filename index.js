const http = require("http");
const app = require("./src/config/express.config");
const { Server } = require("socket.io");
// node server
const httpServer = http.createServer(app); // express app to node server

const io = new Server(httpServer, {
  cors: "*",
});

io.on("connection", (socket) => {
  socket.on("newMessageSent", (data) => {
    socket.emit("selfUpdate", data);
    socket.broadcast.emit("newMessageReceived", data);
  });
});

const host = "localhost";
const port = 9099;

httpServer.listen(port, host, (err) => {
  if (!err) {
    console.log(`Server is running at http://${host}:${port}`);
  } else {
    console.error("Error starting server:", err);
  }
});
