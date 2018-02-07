"use strict"

!function() {

  let grid = [];
  let currentColumn = [];
  
  const cellCount = 8;
  let generation = 0;

  // itterate 0 -> 255 convert to binary
  // store values into an array
  //const gameRules = [0, 1, 1, 0, 1, 0, 0, 1];
  const gameRules = [0, 0, 0, 1, 1, 1, 1, 0];

  const app = {
    canvas: null,
    ctx: null,
    audioCtx: null,

    init() {
      this.canvas = document.getElementsByTagName( "canvas" )[0];
      this.ctx = this.canvas.getContext( "2d" );
      this.draw = this.draw.bind( this );
      this.setCanvas()
      
      this.audioCtx = new AudioContext();

      // handle mouse events
//      this.canvas.onmousedown = doMouseDown;
//      this.canvas.onmousemove = doMouseMove;
//      this.canvas.onmouseup = doMouseUp;

      // window.onresize = this.fullScreenCanvas.bind( this );

      // document.onkeypress = checkKeystroke;

      // set the context for the Cell prototype
      Cell.ctx = this.ctx;
      // set the cell size
      Cell.size = this.width / cellCount;
      // set the audio context for the Cell prototype
      Cell.audioCtx = this.audioCtx;

      initGrid( cellCount );

      requestAnimationFrame( this.draw );
    },

    setCanvas() {
      this.canvas.width  = this.width = 600; // Math.ceil( window.innerWidth /2 );
      this.canvas.height = this.height  =  600; // Math.ceil( window.innerHeight / 2 );
    },

    // update your simulation here
    animate() {
      for( let y = 0; y < generation; y++ ) {
        grid[y+1] = grid[y];
        
        // this will technically be the column
        // when it is drawn
        let row = grid[y+1];
        
        for( let x = 1; x < cellCount - 1; x++ ) {
          if( y === 0 ) {
            grid[y+1][x].y = generation * Cell.size;

            let cState = row[x].state;
            let lState = row[x-1].state;
            let rState = row[x+1].state;

            grid[y][x].state = this.cellEvolve( lState, cState, rState );

          }
        }
      }
      
      if( generation < cellCount) {
        generation++;
      }
      else {
        generation = 1;
      }
    },

    draw() {
      requestAnimationFrame( this.draw );
      
      if( true ) { // will be replaced by the variable toggle
        this.animate();
        
        this.ctx.fillStyle = "white";
        this.ctx.fillRect( 0,0, this.canvas.width, this.canvas.height );

        for( let y = 0; y < generation; y++ ) {
          let row = grid[y];
          
          for( let x = 0; x < row.length; x++ ) {
            let cell = row[x];
            
            cell.state = Math.random() > .5 ? 1 : 0,
            cell.draw();
          }
        }
      }
    },
    
    cellEvolve( a, b, c ) {
      if( a === 1 && b === 1 && c === 1 ) return gameRules[0];
      if( a === 1 && b === 1 && c === 0 ) return gameRules[1];
      if( a === 1 && b === 0 && c === 1 ) return gameRules[2];
      if( a === 1 && b === 0 && c === 0 ) return gameRules[3];
      if( a === 0 && b === 1 && c === 1 ) return gameRules[4];
      if( a === 0 && b === 1 && c === 0 ) return gameRules[5];
      if( a === 0 && b === 0 && c === 1 ) return gameRules[6];
      if( a === 0 && b === 0 && c === 0 ) return gameRules[7];
      return false;
    },
  };

  function initGrid( cellCount ) {
    for( let i = 0; i < cellCount; i++ ) {
      grid[i] = []; 
      
      for( let j = 0; j < cellCount; j++ ) {
        let x =  j * Cell.size;
        let y = i * Cell.size;

        let cell = Cell.create( x, y );
        cell.draw();

        grid[i][j] = cell;
      }
    }
  };
  
  window.onload = app.init.bind( app );

}()