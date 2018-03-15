// With my custom implementation of Conway's game of life
// I wanted to allow the user to be able to draw initial
// states from which the simulation would run.
//
// While playing with the rules I found that increasing
// the overpopulation limit to 5 created a maze like structure
// that rapidly grew then reached homeostatis. Connecting this
// with a drawing feature creates interesting growth patterns


!function() {
  "use strict"
  
  let currentGrid = [];
  let nextGrid = [];
  
  const cellCount = 40;
  
  let toggle = false;
  let dragging = false;
  
  // [numNeighbors, state]
  const GameRules = [
    [0, 0],
    [1, 0], // die from underpopulation
    [2, 1], // live
    [3, 1], // live (reporduce)
    [4, 0], // die from overpopulation
    [5, 0],
    [6, 0],
    [7, 0],
    [8, 0]
  ];
  
  const app = {
    canvas: null,
    ctx: null,
    
    init() {
      this.canvas = document.getElementsByTagName( "canvas" )[0];
      this.ctx = this.canvas.getContext( "2d" );
      this.draw = this.draw.bind( this );
      this.setCanvas();
      
      // handle mouse events
      this.canvas.onmousedown = doMouseDown;
      this.canvas.onmousemove = doMouseMove;
      this.canvas.onmouseup = doMouseUp;
      
      // window.onresize = this.fullScreenCanvas.bind( this );
      
      document.onkeypress = checkKeystroke;
      
      // set the context for the Cell prototype
      Cell.ctx = this.ctx;
      // set the cell size
      Cell.size = this.canvas.width / cellCount;
      Cell.image = document.getElementById( "image" );
      
      createGrid( cellCount );
      
      requestAnimationFrame( this.draw );
    },
    
    setCanvas() {
      this.canvas.width  = this.height = 800;
      this.canvas.height = this.width  = 800;
    },
    
    // update your simulation here
    animate() {
      let cellWidth = this.canvas.width / cellCount;
      let cellHeight = this.canvas.height / cellCount;
      
      let swap = currentGrid;
      
      for( let y = 0; y < cellCount; y++ ) {
        let row = currentGrid[y];
        let yPos =  y * cellHeight;

        for( let x = 0; x < cellCount; x++ ) {
          let currentCell = row[x];
          
          let numLiving = this.getCellNeighbors( currentGrid, x, y)
            .filter( cell => currentGrid[ cell[1] ][ cell[0] ].state === true ) // only keep living cells
            .length;
          
          currentCell.state = this.cellEvolve( currentCell, numLiving );
          
          nextGrid[y][x] = currentCell;
        }
      }
      
      currentGrid = nextGrid;
      nextGrid = swap;
    },
    
    draw() {
      requestAnimationFrame( this.draw );

      if( toggle ) {
        this.animate(); 
        this.ctx.fillStyle = "white";
        this.ctx.fillRect( 0,0, this.canvas.width, this.canvas.height );

        for( let y = 0; y < cellCount; y++ ) {
          let row = currentGrid[y];
          
          for( let x = 0; x < cellCount; x++ ) {
            let cell = row[x];

            if( cell.state ) { cell.draw(); };
          }
        }
      }
    },
    
    getCellNeighbors( myArray, i, j ) {  
      let rowLimit = myArray[0].length - 1;
      let columnLimit = myArray.length - 1;
      let neighbors = [];

      // Math.max() is being used to find the lower bound
      // and ensure that the search does not go bellow the
      // lower limit of 0
      
      // Math.min() is being used to find the upper bound
      // and ensure that the search does not exceed either
      // the row length or the column length
      for( let y = Math.max( 0, j-1 ); y <= Math.min( j+1, rowLimit ); y++ ) {
        for( let x = Math.max( 0, i-1 ); x <= Math.min( i+1, columnLimit ); x++ ) {
          // if x === i && y ====j this statement will return false
          // this ignores the cell which we are searching from (i.e. the central cell)
          if( x !== i || y !== j ) { 
            neighbors.push([x, y]); // store index value of the neighbor
          }
        }
      }
      
      return neighbors;
    },
    
    cellEvolve( currentCell, neighbors ) {
//      let rule = GameRules.find( rule => rule[0] === neighbors );
//      
//      return rule[1];
      if( currentCell.state === false && neighbors === 3) {
        return true;
      }
      else if( currentCell.state === true && (neighbors < 2  || neighbors > 5) ) {
        return false;
      }
      else {
        return currentCell.state;
      }
    },
    
    randState() {
      return Math.random() > .5 ? 1 : 0;
    }
  };
  
  function createGrid( cellCount ) {
    for( let y = 0; y < cellCount; y++ ) {
      currentGrid[y] = []
      nextGrid[y] = [];

      for( let x = 0; x < cellCount; x++ ) {
        let xPos = x * Cell.size;
        let yPos = y * Cell.size;

        let cell = Cell.create();
        cell.init( xPos, yPos );
        cell.draw();

        currentGrid[y][x] = cell;
        nextGrid[y][x] = 0;
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
  
  // take canvas coordinates and translate
  // them into their resulting cell indices
  function coordToIndex( x, y ) {
    let i = Math.floor( x / Cell.size );
    let j = Math.floor( y / Cell.size );
    return [i, j];
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