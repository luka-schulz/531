// pass in canvas context, a starting x and a starting y position
const Turtle = { 
  
  // The turtle always starts pen up
  // heading north
  create( ctx, startX, startY ) {
    const turtle = Object.create( this );
    
    Object.assign( turtle, {
      ctx,
      weight: 1,
      color:"red",
      pos: new Vector( startX, startY ),
      dir: new Vector( 0, -1 ),
      pen: 1,
      posArray: [],
      dirArray: [],
    });

    turtle.ctx.moveTo( turtle.pos.x, turtle.pos.y );
    
    return turtle;
  },

  penUp() { this.pen = 0 },

  penDown() { this.pen = 1 },

  push() {
    this.posArray.push( this.pos.clone() )
    this.dirArray.push( this.dir.clone() )
  },

  pop() {
    this.pos = this.posArray.pop()
    this.dir = this.dirArray.pop()
    this.ctx.moveTo( this.pos.x, this.pos.y )
  },

  // THIS IS IN RADIANS!!!
  rotate( amount ) {
    let rad = (amount * Math.PI) / 180;
    this.dir.rotate( rad );
  },

  move( amount ) {
    if( this.pen ) this.ctx.beginPath();
    
    this.ctx.moveTo( this.pos.x, this.pos.y );
    this.pos.x += this.dir.x * amount;
    this.pos.y += this.dir.y * amount;
    
    if( this.pen ) {
      this.ctx.lineTo( this.pos.x, this.pos.y );
      this.ctx.lineWidth = this.weight;
      this.ctx.strokeStyle = this.color;
      this.ctx.stroke();
      this.ctx.closePath();
    }
    else{
      this.moveTo( this.pos.x, this.pos.y );
    }
  },
  
};