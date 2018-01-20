!function() {
  "use strict"
  
  let currentGrid = [];
  let nextGrid = [];
  
  let gridSize = 10;
  
  const app = {
    canvas: null,
    ctx: null,
    
    init() {
      this.canvas = document.getElementsByTagName( "canvas" )[0];
      this.ctx = this.canvas.getContext( "2d" );
      this.draw = this.draw.bind( this );
      this.fullScreenCanvas();
      
      window.onresize = this.fullScreenCanvas.bind( this );
      
      requestAnimationFrame( this.draw );
      
      for( let y = 0; y < gridSize; y++ ) {
        currentGrid[y] = []
        nextGrid[y] = [];
        for( let x = 0; x < gridSize; x++ ) {
          currentGrid[y][x] = Math.random() > .5 ? 1 : 0;
          nextGrid[y][x] = 0;
        }
      }
    },
    
    fullScreenCanvas() {
      this.canvas.width  = this.height = window.innerWidth;
      this.canvas.height = this.width  = window.innerHeight;
    },
    
    // update your simulation here
    animate() {
//      let swap = currentGrid;
//      currentGrid = nextGrid;
//      nextGrid = swap;
//      
//      for( let i = 0; i < gridSize; i++ ) {
//        let row = swap[i];
//        let yPos =  i * cellHeight;
//
//        for( let j = 0; j < gridSize; j++ ) {
//          let cell = row[j];
//
//          if( cell === 1 ) {
//            let xPos = j * cellWidth;
//
//            this.ctx.fillStyle = "#FAFAFA";
//            this.ctx.fillRect( xPos, yPos, cellWidth, cellHeight );
//          }
//        }
//      }
    },
    
    draw() {
      // requestAnimationFrame( this.draw );
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
      this.findNeighbors( currentGrid, 4, 5 )
    },
    
    findNeighbors( myArray, i, j ) {  
      var rowLimit = myArray[0].length - 1;
      var columnLimit = myArray.length - 1;

      // Math.max() is being used to find the lower bound
      // and ensure that the search does not go bellow the
      // lower limit of 0
      
      // Math.min() is being used to find the upper bound
      // and ensure that thh search does not exceed either
      // the row length or the column length
      for( let y = Math.max( 0, j-1 ); y <= Math.min( j+1, rowLimit ); y++ ) {
        for( let x = Math.max( 0, i-1 ); x <= Math.min( i+1, columnLimit ); x++ ) {
          // if x === i && y ====j this statment will return false
          // this ignores the cell which we are searching from (the centeral cell)
          if( x !== i || y !== j ) { 
            console.log(x + ", " + y + ": " + myArray[y][x]);
          }
        }
      }
    }
  }
  
  window.onload = app.init.bind( app );
  
}()