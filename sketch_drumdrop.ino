#include <SPI.h>
#include <MFRC522.h>

#define SS_PIN 10
#define RST_PIN 9
 
MFRC522 rfid(SS_PIN, RST_PIN); // Set up RFID class

// Create array to store the NUID
byte readCard[4];
// Used for smoothing potentiometer read
int lastPotRead = 127;
// Used for controlling LED mode indicators
int modeCount = 0;
int modeState = 0;
int lastModeState = 0;

void setup() {
  Serial.begin(9600);

  // Initialize SPI
  SPI.begin();
  // Initialize MFRC522 
  rfid.PCD_Init();

  // play and pause buttons
  pinMode(2, INPUT);
  pinMode(3, INPUT);
}

void loop() {
  int valueToSend = (.25*lastPotRead) + (.75*analogRead(A0)/4);
  lastPotRead = analogRead(A0)/4;
  Serial.print(valueToSend);
  Serial.print(",");
  if (digitalRead(2) == HIGH) {
    valueToSend = 1;
    modeState = 1;
  } else {
    valueToSend = 0;
    modeState = 0;
  }
  Serial.print(valueToSend);
  Serial.print(",");
  if (digitalRead(3) == HIGH) {
    valueToSend = 1;
  } else {
    valueToSend = 0;
  }
  Serial.print(valueToSend); 
  Serial.print(","); 

  /* "convenience" function from the MFRC522 library that checks to see if a "new" idle card
  is presented, then passes bool to ReadCardSerial */
  rfid.PICC_IsNewCardPresent();

  if ( ! rfid.PICC_ReadCardSerial()) {
    for (byte i = 0; i < 4; i++) {
      readCard[i] = rfid.uid.uidByte[i];
    }
  }

  /* this is a knowingly silly workaround for RFID detection
  the ReadCardSerial function is set up to pull in the 4 byte NUID
  across all the tags I use, the second byte is different, so I
  print that to serial to tell them apart in the p5 sketch */
  Serial.println(readCard[1]);
  
  if (modeState != lastModeState && modeState == 1) {
    modeCount++;
  }

  if (modeCount > 2) {
    modeCount = 0;
  }

  if (modeCount == 0) {
    digitalWrite(6, HIGH);
    digitalWrite(7, LOW);
    digitalWrite(8, LOW);
  } else if (modeCount == 1) {
    digitalWrite(6, LOW);
    digitalWrite(7, HIGH);
    digitalWrite(8, LOW);
  } else if (modeCount == 2) {
    digitalWrite(6, LOW);
    digitalWrite(7, LOW);
    digitalWrite(8, HIGH);
  }

  // possible to rezero RFID data sent by using mode handling logic?
  // will investigate!
  lastModeState = modeState;

  delay (10);
}
