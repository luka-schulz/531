const Cell = {
  scale: Tonal.Scale.notes( "c4", "major" ).concat(["C5"]),
  
  create( x, y ) {
    const cell = Object.create( this );

    Object.assign( cell, {
      state: false,
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
      
      // only the first column of cells should
      // ever be played
      if( this.y === 0 ) {
        let i = this.x / this.size;
        let freq = Tonal.freq( this.scale[i] );
        this.playNote( freq, .5, .001, .5 ); // freq, 1, .001 .15 
      }
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
  
  playNote( frequency, amp, attack, decay ) {
    const osc = this.audioCtx.createOscillator();
    osc.frequency.value = frequency;
    osc.type = "square";

    const gainNode = this.audioCtx.createGain();
    
    gainNode.gain.setValueAtTime( 0, this.audioCtx.currentTime );
    
    gainNode.gain.linearRampToValueAtTime( amp, this.audioCtx.currentTime + attack );
    gainNode.gain.linearRampToValueAtTime( 0, this.audioCtx.currentTime + attack + decay );

    osc.connect( gainNode );
    gainNode.connect( this.audioCtx.destination );

    osc.start();
    osc.stop( this.audioCtx.currentTime + attack + decay );
  },

  toString() {
    console.log( `Position: ${this.x}, ${this.y} | State: ${this.state}`);
  }
};







//let imgWidth = Cell.image.clientWidth / 8.5;
//let imgHeight = Cell.image.clientHeight / 8.5;
//this.ctx.drawImage( Cell.image, this.x, this.y, imgWidth, imgHeight );