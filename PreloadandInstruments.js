function preload() {
  hihat = loadSound("CH.WAV");
  snare = loadSound("SD2550.WAV");
  bass = loadSound("BD7575.WAV");
  clap = loadSound("CP.WAV");
  ping = loadSound("CB.WAV");

  oneohhihat = loadSound("MA101 CHH2.wav");
  oneohsnare = loadSound("MA101 SNR1.wav");
  oneohbass = loadSound("MA101 KICK.wav");
  oneohtom = loadSound("MA101 TOM.wav");
  oneohsting = loadSound("MA101 PERC3.wav");
  
  mathihat = loadSound("hihat.wav");
  matsnare = loadSound("snare.wav");
  matkick  = loadSound("kick.wav");
  matsnaps = loadSound("snaps.wav");
  matclick = loadSound("click.wav");
  
  jaredhihat = loadSound("JJMarker Cap 1.wav");
  jaredsnare = loadSound("JJMarker Snare 2.wav");
  jaredbass = loadSound("JJCrayon Kick 1.wav");
  jaredperc = loadSound("JJBinder Perc 1.wav");
  jaredclick = loadSound("JJPen Perc 2.wav");
  
  bitkhihat = loadSound("BitkitsOpenHH10.wav");
  bitksnare = loadSound("BitkitsSnare09.wav")
  bitkbass = loadSound("BitkitsKick07 1.wav")
  bitknoise = loadSound("BitkitsNoise08.wav");
  bitkarp = loadSound("BitkitsArp02.wav");
}

function assignInstruments() {
  instruments[0] = hihat;
  instruments[1] = snare;
  instruments[2] = bass;
  instruments[3] = clap;
  instruments[4] = ping;
  
  matinstruments[0] = mathihat;
  matinstruments[1] = matsnare;
  matinstruments[2] = matkick;
  matinstruments[3] = matsnaps;
  matinstruments[4] = matclick;
  
  oneohinstruments[0] = oneohhihat;
  oneohinstruments[1] = oneohsnare;
  oneohinstruments[2] = oneohbass;
  oneohinstruments[3] = oneohtom;
  oneohinstruments[4] = oneohsting;
  
  jaredinstruments[0] = jaredhihat;
  jaredinstruments[1] = jaredsnare;
  jaredinstruments[2] = jaredbass;
  jaredinstruments[3] = jaredperc;
  jaredinstruments[4] = jaredclick;
  
  bitkinstruments[0] = bitkhihat;
  bitkinstruments[1] = bitksnare;
  bitkinstruments[2] = bitkbass;
  bitkinstruments[3] = bitknoise;
  bitkinstruments[4] = bitkarp;
}