//Initialize the express 'app' object
let express = require("express");
let app = express();

app.use("/", express.static("public"));

//Initialize HTTP server
let http = require("http");
let server = http.createServer(app);
//local port
// let port = process.env.PORT || 3000;
// server.listen(port, () => {
//   console.log("App listening at port: " + port);
// });

//Initialize socket.io
let io = require("socket.io");
io = new io.Server(server);
let users = {};

//Listen for a client to connect and disconnect
io.on("connection", (socket) => {
  console.log("We have a new client: " + socket.id);

  socket.on("userData", function (data) {
    // Add socket id to user data
    data.id = socket.id;

    // Store user data
    users[socket.id] = data;

    console.log(data);

    // Broadcast updated user data to all clients
    io.sockets.emit("userData", data);
  });

  //PLANKTON
  //listen for plankton click
  socket.on("plankton", function (data) {
    console.log("plankton was pressed by " + data.name);

    //send this info to everyone
    io.emit("plankton", data);
  });

  //SEAWEED
  //listen for seaweed click
  socket.on("seaweed", function (data) {
    console.log("seaweed was pressed by " + data.name);
    io.emit("seaweed", data);
  });

  //ANGLER
  //listen for angler mousedown
  socket.on("angler", function (data) {
    console.log("angler was pressed by " + data.name);
    io.emit("angler", data);
  });

  //JELLY
  //listen for jelly mousedown
  socket.on("jelly", function (data) {
    console.log("jelly was pressed by " + data.name);
    io.emit("jelly", data);
  });

  //URCHIN
  //listen for urchin mousedown
  socket.on("urchin", function (data) {
    console.log("urchin is being pressed by " + data.name);
    io.emit("urchin", data);
  });

  //EEL
  //listen for eel mousedown
  socket.on("eel", function (data) {
    console.log("eel is being pressed by " + data.name);
    io.emit("eel", data);
  });

  //ANGEL
  //listen for angel mousedown
  socket.on("angel", function (data) {
    console.log("angel is being pressed by " + data.name);
    io.emit("angel", data);
  });

  //SEAWEED2
  //listen for seaweed2 mousedown
  socket.on("seaweed2", function (data) {
    console.log("seaweed2 is being pressed by " + data.name);
    io.emit("seaweed2", data);
  });

  //listen for seaweed2 mouseup
  socket.on("seaweed2-not-pressed", function (data) {
    console.log("seaweed2 is not being pressed by " + data.name);
    io.emit("seaweed2-not-pressed", data);
  });

  //GEAR
  //listen for gearsnail mousedown
  socket.on("gearsnail", function (data) {
    console.log("gearsnail is being pressed by " + data.name);
    io.emit("gearsnail", data);
  });

  //listen for client disconnect
  socket.on("disconnect", function () {
    console.log("Client has disconnected: " + socket.id);
  });
});

//'port' variable allows for deployment
let port = process.env.PORT || 3000;
server.listen(port, () => {
  console.log("App listening at port: " + port);
});

//listen for ghost location - old code, here for ref
//   socket.on("ghost", (data) => {
//     console.log("Received 'ghost' with the following data:");
//     console.log(data);

//     //Send data to ALL clients, including this one
//     io.emit("ghost", data);
//   });

// socket.on("plankton", function (data) {
//   console.log("plankton is being pressed by " + data.name);

//   //send this info to everyone
//   io.emit("plankton", data);
// });

//listen for plankton mouseup
// socket.on("plankton-not-pressed", function (data) {
//   console.log("plankton is not being pressed by " + data.name);

//   //send this info to everyone
//   io.emit("plankton-not-pressed", data);
// });

//draw cursor - not working rn
// socket.on("draw_cursor", (data) => {
//   io.emit("draw_cursor", { line: data.line, id: socket.id });
// });
