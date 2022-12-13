class SequencerButton {
  constructor(x, y, r, state, soundID, pos, played) {
    this.x = x;
    this.y = y;
    this.r = r;
    this.state = state;
    this.soundID = soundID;
    this.pos = pos;
    this.played = played;
  }

  display() {
    push();
    if (this.state) {
      fill(255, 255);
    } else {
      fill(0, 255);
    }
    circle(this.x, this.y, this.r);
    pop();
  }

  contains(x, y) {
    let d = dist(x, y, this.x, this.y);
    // streamlined boolean return
    return d < this.r / 2;
  }

  toggle() {
    this.state = !this.state;
  }

  play() {
    if (this.state) {
      if (currentPos == (this.pos) && this.played == false) {
        this.soundID.play();
        this.played = true;
      } else if (currentPos > this.pos) {
        // modified for millis
        this.played = false;
      }
    }
  }
}
