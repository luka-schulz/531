const Cell = {
  create( x, y ) {
    const cell = Object.create( this );

    Object.assign( cell, {
      weight: 2,
      state: Math.random() > .5 ? 1 : 0,
      x: x,
      y: y,
    });

    return cell;
  },

  // to ensure horizontal scrolling
  // the x and y coordinates are swapped
  draw() { 
    if( this.state ) {
      this.ctx.fillStyle = "black";
      this.ctx.fillRect( this.y, this.x, this.size, this.size );
      //let imgWidth = Cell.image.clientWidth / 8.5;
      //let imgHeight = Cell.image.clientHeight / 8.5;
      //this.ctx.drawImage( Cell.image, this.x, this.y, imgWidth, imgHeight );
    }
    else {
      this.ctx.fillStyle = "white";
      this.ctx.fillRect( this.y, this.x, this.size, this.size );
    }
  },
  
  update() {
    this.state = !this.state;
    this.draw();
    return this.state;
  },

  toString() {
    console.log( `Position: ${this.i} | State: ${this.state}`);
  }
};