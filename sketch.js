const serial = new p5.WebSerial();
let portButton;

let inPot = 0;
let inButton2 = 0;
let inButton3 = 0;
let inRfid = 0;

let aRfid = 125;
let bRfid = 130;
let cRfid = 131;
let dRfid = 223;
let eRfid = 6;

let mode = 0;
let lastButton2 = 0;
let lastButton3 = 0;

let lastRfid = 0;
let currentRfid = [0, 0, 0];
let lastRfidModes = [0, 0, 0];

let buttons = [];
let instruments = [];
let matinstruments = [];
let oneohinstruments = [];
let jaredinstruments = [];
let bitkinstruments = [];

let indicators = [];
let memory = [];

let insPlace = [0, 1];

let reverb;
let distortion;
let dryWet = 0;

let places = 16;
let currentPos = 0;

let timer = 0;
let interval = 250;

let pauseState = true;

let vizW;

function setup() {
  createCanvas(400, 400);
  allSerial();
  
  fft = new p5.FFT(0.8, 64);
  vizW = width / 64;
  
  assignInstruments();
  
  distortion = new p5.Distortion(0.1, 'none');
  for (let i = 0; i < instruments.length; i++) {
    distortion.process(instruments[i]);
  }

  /* loop for indicator creation
  for (let i = 0; i < places; i++) {
    let cx = width / (2 * places) + (width / places) * i;
    let cy = height / 3 - (height / places)
    let cr = width / 40;
    let cstate = false;
    let cpos = i + 1;
    let Light = new Indicator(cx, cy, cr, cstate, cpos);
    indicators.push(Light);
  }
  */

  // loop for buttons
  for (let i = 0; i < places; i++) {
    for (let k = 0; k < instruments.length; k++) {
      let x = width / (2 * places) + (width / places) * i;
      let y = height / 3 + (height / places) * k;
      let r = .9 * (width / places);
      let state = false;
      let soundID = instruments[k];
      let pos = i + 1;
      let played = false;
      let Button = new SequencerButton(x, y, r, state, soundID, pos, played);
      buttons.push(Button);
    }
  }
  
  playButton = createButton('play/pause');
  playButton.mousePressed(playPause);
  
  tempoUpButton = createButton('increase tempo');
  tempoUpButton.mousePressed(upTempo);
  
  tempoDownButton = createButton('decrease tempo');
  tempoDownButton.mousePressed(downTempo);
  
  rezeroButton = createButton('rezero');
  rezeroButton.mousePressed(resetter);
  
  logButton = createButton('log');
  logButton.mousePressed(logMemory);
  
  loadButton = createButton('load');
  loadButton.mousePressed(loadMemory);
  
  clearButton = createButton('clear');
  clearButton.mousePressed(clearBoard);
  
  // instrumentButton = createButton('swapInstruments');
  // instrumentButton.mousePressed(swapInstruments);
  
}

function playPause() {
  pauseState = !pauseState;
}

function resetter() {
  currentPos = 0;
}

function upTempo() {
  if (interval > 100) {
    interval = interval - 50;
  } else {
    interval = 500;
  }
}


function downTempo() {
  if (interval < 350) {
    interval = interval + 50;
  } else {
    interval = 100;
  }
}

function logMemory() {
  memory = [];
  
  for (let b of buttons) {
    if (b.state == true) {
      memory.push(1);
    } else {
      memory.push(0);
    }
  }
}

function loadMemory() {}
  for (let b = 0; b < buttons.length; b++) {
    if (memory[b] == 1) {
      buttons[b].state = true;
    } else if (memory[b] == 0) {
      buttons[b].state = false;
    }
}

function loadPreset() {
  switch (currentRfid[0]) {
    case aRfid:
      loadPreHelper(preset1);
      break;
    case bRfid:
      loadPreHelper(preset2);
      break;
    case cRfid:
      loadPreHelper(preset3);
      break;
    case dRfid:
      loadPreHelper(preset4);
      break;
    case eRfid:
      loadPreHelper(preset5);
      break;
  }
}

function loadPreHelper(arrayToLoad) {
  for (let b = 0; b < buttons.length; b++) {
      if (arrayToLoad[b] == 1) {
        buttons[b].state = true;
      } else if (arrayToLoad[b] == 0) {
        buttons[b].state = false;
      }
  }
}

function swapInstruments() {
  switch (currentRfid[1]) {
    case aRfid:
      swapInsHelper(aRfid, instruments);
      break;
    case bRfid:
      swapInsHelper(bRfid, bitkinstruments);
      break;
    case cRfid:
      swapInsHelper(cRfid, jaredinstruments);
      break;
    case dRfid:
      swapInsHelper(dRfid, oneohinstruments);
      break;
    case eRfid:
      swapInsHelper(eRfid, matinstruments);
      break;
  }
}

function swapInsHelper(setRfid, insArray) {
    for (let b = 0; b < buttons.length; b++) {
      buttons[b].soundID = insArray[b % 5];
    }   
}

function setExtra() {
  switch (currentRfid[2]) {
    case aRfid:
      dryWet = 0;
      clearBoard();
      break;
    case bRfid:
      loadMemory();
      break;
    case cRfid:
      logMemory();
      break;
    case dRfid:
      dryWet = 0.5;
      break;
    case eRfid:
      logger();
      loadPreHelper(setting);
      break;
  }
}

function logger() {
  setting = [];
  let subset = [];
  for (i = 0; i < 20; i++) {
    subset.push(random(insPlace));
  }
  for (k = 0; k < 80; k++) {
    setting.push(subset[k % 20]);
  }
  // console.log(setting);
}

function clearBoard() {
  for (let b = 0; b < buttons.length; b++) {
    buttons[b].state = false;
  }
}

function draw() {
  background(255);
  
  distortion.drywet(dryWet);
  interval = map(inPot, 255, 1, 60, 300);
  
  if (millis() - timer > interval && pauseState == false) {
    currentPos++;
    timer = millis();
  }
  
  for (let i of indicators) {
    i.update();
    i.display();
  }

  for (let b of buttons) {
    b.display();
    b.play();
  }
  
  if (currentPos > places) {
    currentPos = 1;
  }
  
  // this is ugly as sin, but it kind of works
  // mode switch
  if (inButton2 != lastButton2) {
    if (inButton2 == 1) {
      mode++;
      lastButton2 = 1;
    } else if (inButton2 == 0) {
      lastButton2 = 0;
    }
  }
  
  // play and pause control
  if (inButton3 != lastButton3) {
    if (inButton3 == 1) {
      playPause();
      lastButton3 = 1;
    } else if (inButton3 == 0) {
      lastButton3 = 0;
    }
  }
  
  // cycle through modes 0, 1, 2
  if (mode > 2) {
    mode = 0;
  }
  
  // handle modes
  if (inRfid != lastRfid) {
    switch (mode) {
      case 0:
        // lastRfid = currentRfidPre;
        lastRfid = currentRfid[0];
        // currentRfidPre = inRfid;
        currentRfid[0] = inRfid;
        loadPreset();
        break;
      case 1:
        lastRfid = currentRfid[1];
        currentRfid[1] = inRfid;
        swapInstruments();
        break;
      case 2:
        lastRfid = currentRfid[2];
        currentRfid[2] = inRfid;
        setExtra();
        break;
    }    
  }
}

function mousePressed() {
  for (let i = 0; i < buttons.length; i++) {
    if (buttons[i].contains(mouseX, mouseY)) {
      buttons[i].toggle();
    }
  }
}

function serialEvent() {
  // this is called when data is recieved, data will then live in fromSerial	
  var stringFromSerial = serial.readLine();
  if (stringFromSerial) {                       
    var trimmedString = trim(stringFromSerial);  
    var myArray = split(trimmedString, ",")      
    inPot = Number(myArray[0]);             
    inButton2 = Number(myArray[1]); 			
    inButton3 = Number(myArray[2]);
    inRfid = Number(myArray[3]);
  }
}