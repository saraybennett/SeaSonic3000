console.log("hi");

//global variables
const planktonAudio = new Audio("./audio/plankton.mp3");
const seaweed2Audio = new Audio("./audio/seaweed2.mp3");
const eelAudio = new Audio("./audio/eel.mp3");
const seaangelAudio = new Audio("./audio/seaangel.mp3");
const jellyAudio = new Audio("./audio/jelly.mp3");
const urchinAudio = new Audio("./audio/urchin.mp3");
const gearsnailAudio = new Audio("./audio/gearsnail.mp3");
const seaweedAudio = new Audio("./audio/seaweed.mp3");
const anglerAudio = new Audio("./audio/angler.mp3");

//if we want a background just affected by mouse positions / filters
const backgroundAudio = new Audio("./audio/background.mp3");

let users = {};
let socket; //make sure this is declared in the global scope!
let userName;
let userCursor; // Store this user's cursor image

//booleans to handle if creature has been pressed or not
let planktonIsPlaying = false;

// Array of available cursor images
const cursorImages = [
  "./images/plankton.png",
  "./images/jelly.png",
  "./images/angel.png",
  "./images/urchin.png",
  "./images/seaweed.png",
  "./images/eel.png",
  "./images/angler.png",
  "./images/gearsnail.png",
  "./images/seaweed2.png",
];

// Ask for user's name
userName = prompt("Please enter your name:", "Anonymous");
if (!userName) userName = "Anonymous";

// Assign random cursor image to this user
userCursor = cursorImages[Math.floor(Math.random() * cursorImages.length)];
console.log("My cursor image:", userCursor);

//Initialize and connect socket
socket = io();

//Listen for confirmation of connection
socket.on("connect", () => {
  console.log("Connected");
});

//Function to create/get cursor elements with unique images for each user
function getCursorElement(id, cursorImage) {
  var elementId = "cursor-" + id;
  var element = document.getElementById(elementId);
  if (element == null) {
    element = document.createElement("img");
    element.id = elementId;
    element.className = "cursor";
    element.src = cursorImage;
    document.body.appendChild(element);
  }
  return element;
}

// Listen for messages named 'userData' from the server
socket.on("userData", function (data) {
  users[data.id] = data;
  console.log("Received userData:", data);

  // Only draw cursor if position and cursor image data exists
  if (data.x !== undefined && data.y !== undefined && data.cursor) {
    var el = getCursorElement(data.id, data.cursor);
    el.style.left = data.x + "px";
    el.style.top = data.y + "px";
    console.log("Drew cursor for:", data.id, "at", data.x, data.y);
  }
});

//if creature is pressed, sound starts playing
//if creature is pressed again, sound STOPs playing

//PLANKTON 1
let plankton = document.getElementById("plankton");
plankton.addEventListener("click", (event) => {
  if (planktonIsPlaying) {
    planktonAudio.pause();
    planktonAudio.currentTime = 0; //reset to beginning
    planktonIsPlaying = false;
  } else {
    socket.emit("plankton", { name: userName });
    // planktonAudio.play();
    planktonIsPlaying = true;
    // Listen for message 'plankton' from the server if it has been pressed
    socket.on("plankton", function (data) {
      planktonAudio.play();
      console.log("plankton is being pressed by:" + data.name);
    });
  }
});

//listen for plankton pressed down
// plankton.addEventListener("mousedown", (event) => {
//   console.log("plankton is being clicked");
//   socket.emit("plankton", { name: userName });
//   // Listen for message 'plankton' from the server if it has been pressed
//   socket.on("plankton", function (data) {
//     planktonAudio.play();
//     console.log("plankton is being pressed by:" + data.name);
//   });
// });
//MAYBE CHANGE THIS FEATURE/ASPECTS OF IT OUTSIDE OF SOCKET******
// plankton.addEventListener("mouseup", (event) => {
//   console.log("plankton is no longer clicked");
//   socket.emit("plankton-not-pressed", { name: userName });
//   // Listen for message 'plankton' from the server if it is no longer being pressed
//   socket.on("plankton-not-pressed", function (data) {
//     // planktonAudio.pause();
//     // planktonAudio.currentTime = 0;
//   });
// });
//SEAWEED
let seaweed = document.getElementById("seaweed");
//listen for seaweed element being pressed
seaweed.addEventListener("mousedown", (event) => {
  console.log("seaweed was clicked");
  socket.emit("seaweed", { name: userName });
  //Listen from server if seaweed is being pressed
  socket.on("seaweed", function (data) {
    seaweedAudio.play();
    console.log("seaweed is being pressed by:" + data.name);
  });
});
seaweed.addEventListener("mouseup", (event) => {
  console.log("seaweed is no longer clicked");
  socket.emit("seaweed-not-pressed", { name: userName });
  // Listen from server if seaweed is no longer being pressed
  socket.on("seaweed-not-pressed", function (data) {
    // urchinAudio.pause();
    // urchinAudio.currentTime = 0;
  });
});
//ANGLER 3
let angler = document.getElementById("angler");

//Listen from server if angler is being pressed
socket.on("angler", function (data) {
  anglerAudio.play();
  console.log("angler is being pressed by:" + data.name);
});

// Listen from server if angler is no longer being pressed
// socket.on("angler-not-pressed", function (data) {
// anglerAudio.pause();
// anglerAudio.currentTime = 0;
// });

//listen for angler element being pressed
angler.addEventListener("mousedown", (event) => {
  console.log("angler was clicked");
  socket.emit("angler", { name: userName });
});

angler.addEventListener("mouseup", (event) => {
  console.log("angler is no longer clicked");
  socket.emit("angler-not-pressed", { name: userName });
});
//ANGEL 4
let angel = document.getElementById("angel");

//Listen from server if angel is being pressed
socket.on("angel", function (data) {
  seaangelAudio.play();
  console.log("angel is being pressed by:" + data.name);
});

// Listen from server if angel is no longer being pressed
socket.on("angel-not-pressed", function (data) {
  // seaangelAudio.pause();
  // seaangelAudio.currentTime = 0;
});

angel.addEventListener("mousedown", (event) => {
  console.log("angel was clicked");
  socket.emit("angel", { name: userName });
});

angel.addEventListener("mouseup", (event) => {
  console.log("angel is no longer clicked");
  socket.emit("angel-not-pressed", { name: userName });
});
//URCHIN 5
let urchin = document.getElementById("urchin");
//listen for urchin element being pressed
urchin.addEventListener("mousedown", (event) => {
  console.log("urchin was clicked");
  socket.emit("urchin", { name: userName });
  //Listen from server if urchin is being pressed
  socket.on("urchin", function (data) {
    seaweed2Audio.play();
    console.log("urchin is being pressed by:" + data.name);
  });
});
urchin.addEventListener("mouseup", (event) => {
  console.log("urchin is no longer clicked");
  socket.emit("urchin-not-pressed", { name: userName });
  // Listen from server if urchin is no longer being pressed
  socket.on("urchin-not-pressed", function (data) {
    // chordAudio.pause();
    // chordAudio.currentTime = 0;
  });
});
//EEL 6
let eel = document.getElementById("eel"); //listen for eel element being pressed
eel.addEventListener("mousedown", (event) => {
  console.log("eel was clicked");
  socket.emit("eel", { name: userName });
  //Listen from server if eel is being pressed
  socket.on("eel", function (data) {
    eelAudio.play();
    console.log("eel is being pressed by:" + data.name);
  });
});
eel.addEventListener("mouseup", (event) => {
  console.log("eel is no longer clicked");
  socket.emit("eel-not-pressed", { name: userName });
  // Listen from server if eel is no longer being pressed
  socket.on("eel-not-pressed", function (data) {
    // eelAudio.pause();
    // eelAudio.currentTime = 0;
  });
});
//GEARSNAIL 7
// let gearsnail = document.getElementById("gearsnail");
// gearsnail.addEventListener("mousedown", (event) => {
//   console.log("gearsnail was clicked");
//   socket.emit("gearsnail", { name: userName });
//   //Listen from server if gearsnail is being pressed
//   socket.on("gearsnail", function (data) {
//      gearsnailAudio.play();
//     console.log("gearsnail is being pressed by:" + data.name);
//   });});
// gearsnail.addEventListener("mouseup", (event) => {
//   console.log("gearsnail is no longer clicked");
//   socket.emit("gearsnail-not-pressed", { name: userName });
//   // Listen from server if gearsnail is no longer being pressed
//   socket.on("gearsnail-not-pressed", function (data) {
//   // gearsnailAudio.pause();
//   // gearsnailAudio.currentTime = 0;
// });
// });
//SEAWEED2 8
// let seaweed2 = document.getElementById("seaweed2");
// //listen for seaweed2 element being pressed
// seaweed2.addEventListener("mousedown", (event) => {
//   console.log("seaweed2 was clicked");
//   socket.emit("seaweed2", { name: userName });
//  //Listen from server if seaweed2 is being pressed
//   socket.on("seaweed2", function (data) {
//     seaweed2Audio.play();
//     console.log("seaweed2 is being pressed by:" + data.name);
//   });
// });
// seaweed2.addEventListener("mouseup", (event) => {
//   console.log("seaweed2 is no longer clicked");
//   socket.emit("seaweed2-not-pressed", { name: userName });
//   // Listen from server if seaweed2 is no longer being pressed
//   socket.on("seaweed2-not-pressed", function (data) {
//      // seaweed2Audio.pause();
//     // seaweed2Audio.currentTime = 0;
//   });
// });
//JELLY 9
let jelly = document.getElementById("jelly");
//listen for jelly element being pressed
jelly.addEventListener("mousedown", (event) => {
  console.log("jelly was clicked");
  socket.emit("jelly", { name: userName });
  //Listen from server if jelly is being pressed
  socket.on("jelly", function (data) {
    jellyAudio.play();
    console.log("jelly is being pressed by:" + data.name);
  });
});
jelly.addEventListener("mouseup", (event) => {
  console.log("jelly is no longer clicked");
  socket.emit("jelly-not-pressed", { name: userName });
  // Listen from server if jelly is no longer being pressed
  socket.on("jelly-not-pressed", function (data) {
    // jellyAudio.pause();
    // jellyAudio.currentTime = 0;
  });
});
//tracking the mouse move
//added window page offset for lower elements on the page
document.addEventListener("mousemove", function (event) {
  const x = event.clientX + window.pageXOffset; // Add scroll position
  const y = event.clientY + window.pageYOffset; // Add scroll position
  console.log("mouse x:" + x + " mouse y:" + y);
  socket.emit("userData", { name: userName, x: x, y: y, cursor: userCursor });
});

// soundFormats('wav', 'ogg','mp3');
// mySound = loadSound('plankton.mp3');
// }

// Create both filters
// lowpassFilter = new p5.LowPass();
// highpassFilter = new p5.HighPass();

// Connect audio chain: mySound -> lowpass -> highpass -> output
// mySound.connect(lowpassFilter);
// lowpassFilter.connect(highpassFilter);

// Make audio loop
// mySound.loop();

//currently not using p5js -- keeping in case weneed it in the future
//set up my canvas
// function setup() {
//   createCanvas(windowWidth, windowHeight);

//   // Ask for user's name
//   //   userName = prompt("Please enter your name:", "Anonymous");
//   //   if (!userName) userName = "Anonymous";

//   //Initialize and connect socket
//   //   socket = io();

//   //Listen for confirmation of connection
//   //   socket.on("connect", () => {
//   //     console.log("Connected");
//   //   });

//   // Listen for messages named 'userData' from the server
//   //   socket.on("userData", function (data) {
//   //     users[data.id] = data;
//   //     console.log(users);
//   //   });
// }

//draw function -- handle images on screen
// function draw() {
//
// }
//*
