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
      //let imgWidth = Cell.image.clientWidth / 8.5;
      //let imgHeight = Cell.image.clientHeight / 8.5;
      //Cell.ctx.drawImage( Cell.image, this.x, this.y, imgWidth, imgHeight );
    }
    else {
      Cell.ctx.fillStyle = "white";
      Cell.ctx.fillRect( this.x, this.y, this.size, this.size );
    }
  },

  create() {
    return Object.create( this );
  },

  toString() {
    console.log( `Position: (${this.x}, ${this.y}) | State: ${this.state}`);
  }
};