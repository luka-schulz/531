!function() {
  "use strict"
  
  let currentGrid = [];
  let nextGrid = [];
  
  const gridSize = 50;
  
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
  ]
  
  const app = {
    canvas: null,
    ctx: null,
    
    init() {
      this.canvas = document.getElementsByTagName( "canvas" )[0];
      this.ctx = this.canvas.getContext( "2d" );
      this.draw = this.draw.bind( this );
      this.fullScreenCanvas();
      
      window.onresize = this.fullScreenCanvas.bind( this );
      
      for( let y = 0; y < gridSize; y++ ) {
        currentGrid[y] = []
        nextGrid[y] = [];
        for( let x = 0; x < gridSize; x++ ) {
          currentGrid[y][x] = this.randState();
          nextGrid[y][x] = 0;
        }
      };
      
      requestAnimationFrame( this.draw );
    },
    
    fullScreenCanvas() {
      this.canvas.width  = this.height = window.innerWidth;
      this.canvas.height = this.width  = window.innerHeight;
    },
    
    // update your simulation here
    animate() {
      let cellWidth = this.canvas.width / gridSize;
      let cellHeight = this.canvas.height / gridSize;
      
      let swap = currentGrid;
      
      for( let y = 0; y < gridSize; y++ ) {
        let row = currentGrid[y];
        let yPos =  y * cellHeight;

        for( let x = 0; x < gridSize; x++ ) {
          let cell = row[x];
          
          let numLiving = this.getCellNeighbors( currentGrid, x, y)
            .filter( cell => currentGrid[ cell[1] ][ cell[0] ] === 1 ) // only keep living cells
            .length;
          
          nextGrid[y][x] = this.cellEvolve( cell, numLiving );
        }
      }
      
      
      currentGrid = nextGrid;
      nextGrid = swap;
    },
    
    draw() {
      requestAnimationFrame( this.draw );
      this.animate();
      
      // draw to your canvas here
      this.ctx.fillStyle = "#FAFAFA";
      this.ctx.fillRect( 0,0, this.canvas.width, this.canvas.height );
      
      let cellWidth = this.canvas.width / gridSize;
      let cellHeight = this.canvas.height / gridSize;
      
      for( let y = 0; y < gridSize; y++ ) {
        let row = currentGrid[y];
        let yPos =  y * cellHeight;
        
        for( let x = 0; x < gridSize; x++ ) {
          let cell = row[x];
          
          if( cell === 1 ) {
            let xPos = x * cellWidth;
            
            this.ctx.fillStyle = "#121212";
            this.ctx.fillRect( xPos, yPos, cellWidth, cellHeight );
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
            neighbors.push([x, y])
          }
        }
      }
      
      return neighbors;
    },
    
    cellEvolve( state, neighbors ) {
//      let rule = GameRules.find( rule => rule[0] === neighbors );
//      
//      return rule[1];
      if( state === 0 && neighbors === 3) {
        return 1;
      }
      else if( state === 1 && (neighbors < 2  || neighbors > 3) ) {
        return 0;
      }
      else {
        return state;
      }
    },
    
    randState() {
      return Math.random() > .5 ? 1 : 0;
    }
  }
  
  window.onload = app.init.bind( app );
  
}()