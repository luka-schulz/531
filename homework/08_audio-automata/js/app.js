"use strict"

!function() {

  let grid = [];
  let currentColumn = [];
  
  const cellCount = 15;
  let generation = 0;

  // itterate 0 -> 255 convert to binary
  // store values into an array
  //const gameRules = [0, 1, 1, 0, 1, 0, 0, 1];
  const gameRules = [0, 0, 0, 1, 1, 1, 1, 0];

  const app = {
    canvas: null,
    ctx: null,
    audioCtx: null,
    count: 0,

    /* Init gets the canvas and creates both a drawing
     * and audio context. The Cell prototype is passed
     * both the audio and drawing context.
     *
     * A cell size is also assigned based on the cellCount
    */
    init() {
      this.canvas = document.getElementsByTagName( "canvas" )[0];
      this.ctx = this.canvas.getContext( "2d" );
      this.draw = this.draw.bind( this );
      this.setCanvas()
      
      this.audioCtx = new AudioContext();

      
      // handle mouse events
      // this.canvas.onmousedown = doMouseDown;
      // this.canvas.onmousemove = doMouseMove;
      // this.canvas.onmouseup = doMouseUp;
      // window.onresize = this.fullScreenCanvas.bind( this );
      // document.onkeypress = checkKeystroke;


      Cell.ctx = this.ctx;
      Cell.size = this.width / cellCount;
      Cell.audioCtx = this.audioCtx;

      // initialize the grid
      initGrid( cellCount );

      requestAnimationFrame( this.draw );
    },

    setCanvas() {
      this.canvas.width  = this.width = 600; // Math.ceil( window.innerWidth /2 );
      this.canvas.height = this.height  =  600; // Math.ceil( window.innerHeight / 2 );
    },

    /* Animate should push each column to the right. The
     * first column is being transformed based on a given
     * cellular automata rule.
    */
    animate() {
      //debugger;
      for( let y = generation; y => 0; y-- ) {
        // this will technically be the column
        // when it is drawn
        let row = grid[y];
        
        for( let x = 1; x < cellCount - 1; x++ ) {
          if( generation > 0 ) {
            grid[y][x].state = grid[y-1][x].state;
          }
          console.log('here')
          if( y === 0 && generation > 0 ) {
            // check the next column when evoloving the
            // first column
            let lState = grid[y+1][x-1].state;
            let cState = grid[y+1][x].state;
            let rState = grid[y+1][x+1].state;

            grid[y][x].state = this.cellEvolve( lState, cState, rState );
            console.log(grid[y][x].state)
          }
        }
      }
      
      // never let the generation get larger than
      // the size of the grid
      if( generation < cellCount) {
        generation++;
      }
      else {
        generation = 1;
      }
    },

    /* Draw loops through each column and updates the cell
     * based on it's current state.
    */
    draw() {
      requestAnimationFrame( this.draw );
      
      if( this.count++ % 20 === 0 ) { // will be replaced by the variable toggle
        this.animate();
        
        // this.ctx.fillStyle = "white";
        // this.ctx.fillRect( 0,0, this.canvas.width, this.canvas.height );

        for( let y = 0; y < generation; y++ ) {
          let row = grid[y];
          
          for( let x = 0; x < row.length; x++ ) {
            let cell = row[x];
            
            cell.draw();
          }
        }
      }
    },
    
    /* Evolution is based on the provided rule set. */
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

  /* initGrid takes a cellCount and creates a 2D Array of that
   * size. The first column is provideda random state. All other
   * cells start off as false (off).
  */
  function initGrid( cellCount ) {
    for( let i = 0; i < cellCount; i++ ) {
      grid[i] = []; 
      
      for( let j = 0; j < cellCount; j++ ) {
        let x =  j * Cell.size;
        let y = i * Cell.size;

        let cell = Cell.create( x, y );
        
        if( i === 0 && j === 7 ) {
          cell.state = 1;
        }
          
        cell.draw();

        grid[i][j] = cell;
      }
    }
  };
  
  window.onload = app.init.bind( app );

}()