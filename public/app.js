console.log("hi");

//global variables
const planktonAudio = new Audio("./audio/plankton.mp3");
const seaweed2Audio = new Audio("./audio/seaweed2.mp3");
const eelAudio = new Audio("./audio/eel.mp3");
const seaangelAudio = new Audio("./audio/seaangel.mp3");
const jellyAudio = new Audio("./audio/jelly.mp3");
const urchinAudio = new Audio("./audio/urchin.mp3"); //currently not hearing this, can add with the green seaweed if we want
const gearsnailAudio = new Audio("./audio/gearsnail.mp3");
const seaweedAudio = new Audio("./audio/seaweed.mp3");
const anglerAudio = new Audio("./audio/angler.mp3");

//if we want a background just affected by mouse positions / filters
const backgroundAudio = new Audio("./audio/background.mp3");

let users = {};
let socket; //make sure this is declared in the global scope!
let userName;
let userCursor; // Store this user's cursor image
let creatureText;

//booleans to handle if creature has been pressed or not
let planktonIsPlaying = false;
let seaweedIsPlaying = false;
let anglerIsPlaying = false;
let angelIsPlaying = false;
let urchinIsPlaying = false;
let eelIsPlaying = false;
let jellyIsPlaying = false;
let snailIsPlaying = false;

// Array of available cursor images
const cursorImages = [
  "./images/plankton.png",
  "./images/jellyfish.png",
  "./images/angel.png",
  "./images/urchin.png",
  "./images/seaweed.png",
  "./images/eel.png",
  "./images/angler.png",
  "./images/gearsnail.png",
  // "./images/seaweed2.png",
];

// Ask for user's name
// userName = prompt("Please enter your name:", "Anonymous");
// if (!userName) userName = "Anonymous";

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

//getting character info pop up! - work on this code so I can pass certain paramters and repeat the code as necessary
function showPopup(creatureText) {
  let popup = document.getElementById("center_popup");
  popup.style.visibility = "visible";

  let overlay = document.getElementById("overlay");
  overlay.style.visibility = "visible";

  //display results in popup window

  let resultDisplayOne = document.getElementById("popup_text");

  resultDisplayOne.innerHTML = creatureText;
  window.scrollTo({
    top: 0,
    left: 0,
    behavior: "smooth",
  });

  let continueButton = document.getElementById("continue_button");
  continueButton.addEventListener("click", function () {
    console.log("continue button clicked");
    popup.style.visibility = "hidden";
    overlay.style.visibility = "hidden";

    //is working - do I want it to stop when continue is pressed?
    planktonAudio.pause();

    //trying to get a new cursor when user clicks the "continue button" -- not working currently
    // function getCursorElement(id, cursorImage) {
    //   var elementId = "cursor-" + id;
    //   var element = document.getElementById(elementId);
    //   if (element == null) {
    //     element = document.createElement("img");
    //     element.id = elementId;
    //     element.className = "cursor";
    //     element.src = cursorImage;
    //     document.body.appendChild(element);
    //   }
    //   return element;
    // }
  });
}

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
    creatureText =
      "Plankton get their name from the Greek word planktos, meaning drifter, precisely because they have no choice but to go where the currents take them. As they evolved over the past 1000 years, they learned how to harness this power and take others with them along for the ride. We now use plankton and the ocean currents as transportation, never quite knowing where we’ll end up but content to go with the flow. ";
    showPopup(creatureText);
    // Listen for message 'plankton' from the server if it has been pressed
    socket.on("plankton", function (data) {
      planktonAudio.play();
      console.log("plankton is being pressed by:" + data.name);
    });
  }
});

//SEAWEED 1
let seaweed = document.getElementById("seaweed");
seaweed.addEventListener("click", (event) => {
  if (seaweedIsPlaying) {
    seaweedAudio.pause();
    seaweedAudio.currentTime = 0; //reset to beginning
    seaweedIsPlaying = false;
  } else {
    socket.emit("seaweed", { name: userName });
    seaweedIsPlaying = true;
    // Listen for message 'seaweed' from the server if it has been pressed
    socket.on("seaweed", function (data) {
      seaweedAudio.play();
      console.log("seaweed is being pressed by:" + data.name);
    });
  }
});

//ANGLER 3
let angler = document.getElementById("angler");

angler.addEventListener("click", (event) => {
  if (anglerIsPlaying) {
    anglerAudio.pause();
    anglerAudio.currentTime = 0; //reset to beginning
    anglerIsPlaying = false;
  } else {
    socket.emit("angler", { name: userName });
    anglerIsPlaying = true;
    // Listen for message 'seaweed' from the server if it has been pressed
    socket.on("angler", function (data) {
      anglerAudio.play();
      console.log("angler is being pressed by:" + data.name);
    });
  }
});

//ANGEL 4
let angel = document.getElementById("angel");

angel.addEventListener("click", (event) => {
  if (angelIsPlaying) {
    seaangelAudio.pause();
    seaangelAudio.currentTime = 0; //reset to beginning
    angelIsPlaying = false;
  } else {
    socket.emit("angel", { name: userName });
    angelIsPlaying = true;
    // Listen for message 'angel' from the server if it has been pressed
    socket.on("angel", function (data) {
      seaangelAudio.play();
      console.log("angel is being pressed by:" + data.name);
    });
  }
});

//URCHIN 5
let urchin = document.getElementById("urchin");
//listen for urchin element being pressed
urchin.addEventListener("click", (event) => {
  if (urchinIsPlaying) {
    seaweed2Audio.pause();
    seaweed2Audio.currentTime = 0; //reset to beginning
    urchinIsPlaying = false;
  } else {
    socket.emit("urchin", { name: userName });
    urchinIsPlaying = true;
    // Listen for message 'plankton' from the server if it has been pressed
    socket.on("urchin", function (data) {
      seaweed2Audio.play();
      console.log("urchin was pressed by:" + data.name);
    });
  }
});

//EEL 6
let eel = document.getElementById("eel"); //listen for eel element being pressed
eel.addEventListener("click", (event) => {
  if (eelIsPlaying) {
    eelAudio.pause();
    eelAudio.currentTime = 0; //reset to beginning
    eelIsPlaying = false;
  } else {
    socket.emit("eel", { name: userName });
    eelIsPlaying = true;
    // Listen for message 'eel' from the server if it has been pressed
    socket.on("eel", function (data) {
      eelAudio.play();
      console.log("eel was pressed by:" + data.name);
    });
  }
});

//GEARSNAIL 7
let gearsnail = document.getElementById("gearsnail");
gearsnail.addEventListener("mousedown", (event) => {
  if (snailIsPlaying) {
    gearsnailAudio.pause();
    gearsnailAudio.currentTime = 0; //reset to beginning
    snailIsPlaying = false;
  } else {
    socket.emit("gearsnail", { name: userName });
    snailIsPlaying = true;
    // Listen for message 'eel' from the server if it has been pressed
    socket.on("gearsnail", function (data) {
      gearsnailAudio.play();
      console.log("gearsnail was pressed by:" + data.name);
    });
  }
});

//add last seaweed if that's something that we want?? code below

//JELLY 9
let jelly = document.getElementById("jelly");
//listen for jelly element being pressed
jelly.addEventListener("click", (event) => {
  if (jellyIsPlaying) {
    jellyAudio.pause();
    jellyAudio.currentTime = 0; //reset to beginning
    jellyIsPlaying = false;
  } else {
    socket.emit("jelly", { name: userName });
    jellyIsPlaying = true;
    // Listen for message 'eel' from the server if it has been pressed
    socket.on("jelly", function (data) {
      jellyAudio.play();
      console.log("jelly was pressed by:" + data.name);
    });
  }
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

//more old code for ref
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
//*
