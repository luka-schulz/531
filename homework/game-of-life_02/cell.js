let Cell = {
  init(x, y) {
    this.x = x;
    this.y = y;
    this.state = false; //Math.random() > .5 ? true : false;
  },

  draw() { 
    if( this.state ) {
      Cell.ctx.fillStyle = "black";
      Cell.ctx.fillRect( this.x, this.y, this.size, this.size );
    }
    else {
      Cell.ctx.fillStyle = "white";
      Cell.ctx.fillRect( this.x, this.y, this.size, this.size );
    }
  },

  onClick() {

  },

  create() {
    return Object.create( this );
  },

  toString() {
    console.log( `Position: (${this.pos.x}, ${this.pos.y}) | Radius: {this.r}`);
  }
};