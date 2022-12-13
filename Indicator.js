class Indicator {
  constructor(x, y, r, state, pos) {
    this.x = x;
    this.y = y;
    this.r = r;
    this.state = state;
    this.pos = pos;
  }
  
  display() {
    if (this.state) {
      fill(0, 255, 0);
    } else {
      fill(220);
    }
    circle(this.x, this.y, this.r);
  }
  
  toggle() {
    this.state = !this.state;
  }
  
  update() {
    // not functioning as desired
    if (currentPos == (this.pos)) {
      this.state = true;
    } else if (currentPos < (this.pos)) {
      this.state = false;
    }
  }
}