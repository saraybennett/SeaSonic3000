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

// Ask for user's name -- I don't really think we need this anymore
// userName = prompt("Please enter your name:", "Anonymous");
// if (!userName) userName = "Anonymous";

// Assign random cursor image to this user
userCursor = cursorImages[Math.floor(Math.random() * cursorImages.length)];
// console.log("My cursor image:", userCursor);

//Initialize and connect socket
socket = io();

//Listen for confirmation of connection
socket.on("connect", () => {
  console.log("Connected");
  //trigger currently playing sounds
});

let updatingElement = false;
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
  } else if (updatingElement) {
    element.src = cursorImage;
    // console.log(cursorImage);
    updatingElement = false;
  }

  return element;
}

// Listen for messages named 'userData' from the server
socket.on("userData", function (data) {
  users[data.id] = data;
  // console.log("Received userData:", data);

  // Only draw cursor if position and cursor image data exists
  if (data.x !== undefined && data.y !== undefined && data.cursor) {
    var el = getCursorElement(data.id, data.cursor);
    el.style.left = data.x + "px";
    el.style.top = data.y + "px";
    // console.log("Drew cursor for:", data.id, "at", data.x, data.y);
  }
});

//PLANKTON 1
let plankton = document.getElementById("plankton");

plankton.addEventListener("click", (event) => {
  socket.emit("plankton", { name: userName });
  creatureText =
    "Plankton get their name from the Greek word planktos, meaning drifter, precisely because they have no choice but to go where the currents take them. As they evolved over the past 1000 years, they learned how to harness this power and take others with them along for the ride. We now use plankton and the ocean currents as transportation, never quite knowing where we’ll end up but content to go with the flow. ";
  showPopup(creatureText);
});

socket.on("plankton", function (data) {
  if (planktonIsPlaying) {
    planktonAudio.pause();
    planktonAudio.currentTime = 0; //reset to beginning
    planktonIsPlaying = false;
    //add something here to show plankton is playing - either change css or point to a new html src
  } else {
    //revert image back to normal to indicate nothing is playing
    planktonIsPlaying = true;
    planktonAudio.play();
  }
});

//SEAWEED 1
let seaweed = document.getElementById("seaweed");

seaweed.addEventListener("click", (event) => {
  socket.emit("seaweed", { name: userName });
  creatureText =
    "Seaweed has been around since long before the dinosaurs, adapting expertly to its environment. In the early 2000s, its ability to remove CO2 from the atmosphere made it essential in the fight against climate change. Some concoction of chemicals released into the ocean mixed with the seaweed’s biology and allowed it to develop the ability to also filter out toxic plastics. The unique vein-like structures in this specific species made it especially good at this. ";
  showPopup(creatureText);
});

socket.on("seaweed", function (data) {
  if (seaweedIsPlaying) {
    seaweedAudio.pause();
    seaweedAudio.currentTime = 0; //reset to beginning
    seaweedIsPlaying = false;
  } else {
    seaweedIsPlaying = true;
    seaweedAudio.play();
  }
});

//ANGLER 3
let angler = document.getElementById("angler");

angler.addEventListener("click", (event) => {
  socket.emit("angler", { name: userName });
  creatureText =
    "With our advancements in technology, we were able to explore the depths of the ocean, enabling us to discover new information about anglerfish. We closely observed the relationship between anglerfish and their bacterial symbionts, which give them their ability to glow. This research led us to developing our own artificial bacterial symbionts that now allow us to have light without needing power.";
  showPopup(creatureText);
});

socket.on("angler", function (data) {
  if (anglerIsPlaying) {
    anglerAudio.pause();
    anglerAudio.currentTime = 0; //reset to beginning
    anglerIsPlaying = false;
  } else {
    anglerIsPlaying = true;
    anglerAudio.play();
  }
});

//ANGEL 4 - AUDIO NOT PLAYING IDK WHY :( works with other audio so maybe issue with file itself for some reason?
let angel = document.getElementById("angel");

angel.addEventListener("click", (event) => {
  socket.emit("angel", { name: userName });
  creatureText =
    "Sea angels protect themselves by absorbing a noxious molecule that keeps other creatures from eating them. With the help of active sonar technology, sea angels furthered these capabilities and now serve as the main peace guardians of our society. We’re currently enlisting their help in protecting our underwater energy centers from the eels.  ";
  showPopup(creatureText);
});

socket.on("angel", function (data) {
  if (angelIsPlaying) {
    seaangelAudio.pause();
    seaangelAudio.currentTime = 0; //reset to beginning
    angelIsPlaying = false;
  } else {
    socket.emit("angel", { name: userName });
    angelIsPlaying = true;
    seaangelAudio.play();
  }
});

//URCHIN 5
let urchin = document.getElementById("urchin");

urchin.addEventListener("click", (event) => {
  socket.emit("urchin", { name: userName });
  creatureText = "ENTER TEXT HERE!! ";
  showPopup(creatureText);
});

socket.on("urchin", function (data) {
  if (urchinIsPlaying) {
    seaweed2Audio.pause();
    seaweed2Audio.currentTime = 0; //reset to beginning
    urchinIsPlaying = false;
  } else {
    urchinIsPlaying = true;

    seaweed2Audio.play();
  }
});

//EEL 6
let eel = document.getElementById("eel");

eel.addEventListener("click", (event) => {
  socket.emit("eel", { name: userName });
  creatureText =
    "One thousand years ago, electric eels averaged six feet and the most powerful could generate 860 volts of electricity. Nowadays, eels can be longer than fifteen feet and generate enough power to run a small house. We learned how to harness this power and now rely on them as one of our main sources of renewable electricity. But some eels resent how dependent we’ve become on them and so utilize their enhanced electric capabilities to attack our underwater energy centers.  ";
  showPopup(creatureText);
});

socket.on("eel", function (data) {
  if (eelIsPlaying) {
    eelAudio.pause();
    eelAudio.currentTime = 0; //reset to beginning
    eelIsPlaying = false;
  } else {
    eelIsPlaying = true;
    eelAudio.play();
  }
});

//GEARSNAIL 7
let gearsnail = document.getElementById("gearsnail");
gearsnail.addEventListener("click", (event) => {
  socket.emit("gearsnail", { name: userName });
  creatureText = "ENTER TEXT HERE ";
  showPopup(creatureText);
});

socket.on("gearsnail", function (data) {
  if (snailIsPlaying) {
    gearsnailAudio.pause();
    gearsnailAudio.currentTime = 0; //reset to beginning
    snailIsPlaying = false;
  } else {
    snailIsPlaying = true;

    gearsnailAudio.play();
  }
});

//add last seaweed if that's something that we want?? code below

//JELLY 9
let jelly = document.getElementById("jelly");
jelly.addEventListener("click", (event) => {
  socket.emit("jelly", { name: userName });
  creatureText = "ENTER TEXT HERE ";
  showPopup(creatureText);
});

socket.on("jelly", function (data) {
  if (jellyIsPlaying) {
    jellyAudio.pause();
    jellyAudio.currentTime = 0; //reset to beginning
    jellyIsPlaying = false;
  } else {
    jellyIsPlaying = true;

    jellyAudio.play();
  }
});

//tracking the mouse move
//added window page offset for lower elements on the page
document.addEventListener("mousemove", function (event) {
  const x = event.clientX + window.pageXOffset; // Add scroll position
  const y = event.clientY + window.pageYOffset; // Add scroll position
  // console.log("mouse x:" + x + " mouse y:" + y);
  socket.emit("userData", { name: userName, x: x, y: y, cursor: userCursor });
});

//getting character info pop up!
function showPopup(creatureText) {
  let popup = document.getElementById("center_popup");
  popup.style.visibility = "visible";

  let overlay = document.getElementById("overlay");
  overlay.style.visibility = "visible";

  //display results in popup window

  let displayCreatureInfo = document.getElementById("popup_text");

  displayCreatureInfo.innerHTML = creatureText;
  window.scrollTo({
    top: 0,
    left: 0,
    behavior: "smooth",
  });

  let continueButton = document.getElementById("continue_button");
  continueButton.addEventListener("click", function (event) {
    // console.log("continue button clicked");
    popup.style.visibility = "hidden";
    overlay.style.visibility = "hidden";
    updatingElement = true;
    userCursor = cursorImages[Math.floor(Math.random() * cursorImages.length)];

    const x = event.clientX + window.pageXOffset; // Add scroll position
    const y = event.clientY + window.pageYOffset; // Add scroll position
    // console.log("mouse x:" + x + " mouse y:" + y);
    socket.emit("userData", { name: userName, x: x, y: y, cursor: userCursor });
  });
}

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

//to do if time:
//keep track of which sounds are already playing and then share that with the server and then with the new users who join the site
