"use strict"

!function() {

  let grid = [];
  let currentColumn = [];
  
  const cellCount = 8;
  let generation = 1;

  // itterate 0 -> 255 convert to binary
  // store values into an array
  const gameRules = [0, 1, 1, 0, 1, 0, 0, 1];

  const app = {
    canvas: null,
    ctx: null,

    init() {
      this.canvas = document.getElementsByTagName( "canvas" )[0];
      this.ctx = this.canvas.getContext( "2d" );
      this.draw = this.draw.bind( this );
      this.setCanvas();

      // handle mouse events
//      this.canvas.onmousedown = doMouseDown;
//      this.canvas.onmousemove = doMouseMove;
//      this.canvas.onmouseup = doMouseUp;

      // window.onresize = this.fullScreenCanvas.bind( this );

      document.onkeypress = checkKeystroke;

      // set the context for the Cell prototype
      Cell.ctx = this.ctx;
      // set the cell size
      Cell.size = this.width / cellCount;

      initGrid( cellCount );

      requestAnimationFrame( this.draw );
    },

    setCanvas() {
      this.canvas.width  = this.width = 800; // Math.ceil( window.innerWidth /2 );
      this.canvas.height = this.height  =  800; // Math.ceil( window.innerHeight / 2 );
    },

    // update your simulation here
    animate() {
      for( let y = 0; y < generation; y++ ) {
                        
        for( let x = 0; x < cellCount; x++ ) {
          
          let cState = grid[y][x].state;
          let lState = grid[y][x-1].state;
          let rState = grid[y][x+1].state;
          
          cState = this.cellEvolve( lState, cState, rState );
          
          grid[y+1][x] = cState;
        }
      }
    },

    draw() {
      // requestAnimationFrame( this.draw );

      if( true ) { // toggle
        
        // this.animate(); 
        this.ctx.fillStyle = "white";
        this.ctx.fillRect( 0,0, this.canvas.width, this.canvas.height );

        for( let y = 0; y < generation; y++ ) {
          
          let row = grid[y];
          
          for( let x = 0; x < row.length; x++ ) {
            
            let cell = row[x];
            
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

    getCellNeighbors( myArray, i, ) {  
      return neighbors;
    }
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

  function checkKeystroke( event ) {
    event = event || window.event; // IE

    if( event.keyCode === 32 || event.which === 32 ) {
      toggle = !toggle;
    }
    else if( event.keyCode === 99 || event.which === 99 ) {
      createGrid( cellCount );
      toggle = false;
    }
    else {
      console.log( "Press 'SPACE' to start" );
      console.log( "Press 'c' to clear" );
    }
  };

  function doMouseDown( e ) {
    dragging = true;

    let cellIndex = coordToIndex( e.pageX, e.pageY );
    let i = cellIndex[0];
    let j = cellIndex[1];

    currentGrid[j][i].state = true;
    currentGrid[j][i].draw();
  };

  function doMouseMove( e ) {
    // stop drawing if the mouse button is not down
    if( !dragging ) return;

    let cellIndex = coordToIndex( e.pageX, e.pageY );
    let i = cellIndex[0];
    let j = cellIndex[1];

    currentGrid[j][i].state = true;
    currentGrid[j][i].draw();
  };

  function doMouseUp( e ) {
    dragging = false;
  };

  window.onload = app.init.bind( app );

}()