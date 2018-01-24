let Cell = {
  init(x, y) {
    this.x = 0;
    this.y = 0;
    this.state = false;
  },

  draw() {
    Particle.ctx.fillStyle = colors.WHITE;
    Particle.ctx.beginPath();
    Particle.ctx.arc(this.x, this.y, this.r, 0, 2*Math.PI);
    Particle.ctx.fill();
  },

  move() {

  },

  create() {
    return Object.create( this );
  },

  toString() {
    console.log( `Position: (${this.pos.x}, ${this.pos.y}) | Radius: {this.r}`);
  }
};