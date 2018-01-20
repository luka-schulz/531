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
      
      for( let i = 0; i < gridSize; i++ ) {
        currentGrid[i] = []
        nextGrid[i] = [];
        for( let j = 0; j < gridSize; j++ ) {
          currentGrid[i][j] = Math.random() > .5 ? 1 : 0;
          nextGrid[i][j] = 0;
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
      //requestAnimationFrame( this.draw );
      this.animate();
      
      // draw to your canvas here
      this.ctx.fillStyle = "#121212";
      this.ctx.fillRect( 0,0, this.canvas.width, this.canvas.height );
      
      let cellWidth = this.canvas.width / gridSize;
      let cellHeight = this.canvas.height / gridSize;
      
      for( let i = 0; i < gridSize; i++ ) {
        let row = currentGrid[i];
        let yPos =  i * cellHeight;
        
        for( let j = 0; j < gridSize; j++ ) {
          let cell = row[j];
          
          if( cell === 1 ) {
            let xPos = j * cellWidth;
            
            this.ctx.fillStyle = "#FAFAFA";
            this.ctx.fillRect( xPos, yPos, cellWidth, cellHeight );
          }
        }
      }
      debugger
      
//      this.findingNeighbors(currentGrid, 4, 5)
      
    },
    
    findingNeighbors(myArray, i, j) {
      let cellWidth = this.canvas.width / gridSize;
      let cellHeight = this.canvas.height / gridSize;
      this.ctx.fillStyle = "#ff003d";
      this.ctx.fillRect( i * cellWidth, j * cellWidth, cellWidth, cellHeight );
      
      var rowLimit = myArray.length-1;
      var columnLimit = myArray[0].length-1;

      for(var x = Math.max(0, i-1); x <= Math.min(i+1, rowLimit); x++) {
        for(var y = Math.max(0, j-1); y <= Math.min(j+1, columnLimit); y++) {
          if(x !== i || y !== j) {
            console.log(x + ", " + y + ": " + myArray[x][y]);
            this.ctx.fillStyle = "rgba(255, 213, 0, 0.56)";
            this.ctx.fillRect( x * cellWidth, y * cellWidth, cellWidth, cellHeight );
          }
        }
      }
    }
  }
  
  window.onload = app.init.bind( app );
  
}()