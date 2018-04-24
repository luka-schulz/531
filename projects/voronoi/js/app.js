"use strict"

!function() {
  const app = {
    canvas: null,
    ctx: null,
    cells: [],

    init() {
      this.canvas = document.getElementById( "canvas" );
      this.ctx = this.canvas.getContext( "2d" );
      Cell.ctx = this.ctx;

      this.setCanvas();
      
      // scale canvas for retina
      let scale = window.devicePixelRatio;
      this.canvas.width *= scale;
      this.canvas.height *= scale;
      this.ctx.scale(scale, scale);
      
      this.onClick = this.getMousePosition.bind( this );
      this.canvas.onclick = this.onClick;
      
      this.draw = this.drawCells.bind( this );
      
      requestAnimationFrame( this.draw );
    },

    setCanvas() {
      this.canvas.width  = this.height = 800;
      this.canvas.height = this.width  = 800;
    },
    
    spawnCell( x, y ) {
      const myCell = Cell.create( x, y );
      this.cells.push( myCell );
    },
    
    getMousePosition( e ) {
      e = e || window.event;

      let pageX = e.pageX;
      let pageY = e.pageY;

      // IE 8
      if( pageX === undefined ) {
        pageX = e.clientX + document.body.scrollLeft + document.documentElement.scrollLeft;
        pageY = e.clientY + document.body.scrollTop + document.documentElement.scrollTop;
      }
      
      this.spawnCell( pageX, pageY )
    },
    
    /**
     * Draw loop that iterates through the cells. Cells
     * grow over time. Each cell checks every other cell
     * for intersections.
     */
    drawCells() {
      requestAnimationFrame( this.draw );
      
      this.ctx.fillStyle = "black";
      this.ctx.fillRect( 0,0, this.canvas.width, this.canvas.height );
      
      this.cells.forEach( currCell => {
        let currRadius = currCell.cellSize;
        let currX = currCell.x;
        let currY = currCell.y;
        
        if( this.cells.length > 1) {
          this.getIntersections( currX, currY, currRadius );
        }
        
        currCell.grow()
      } );
    },
    
    /**
     * Helper function that iterates through all
     * the cells and calculates the distance to
     * the current cells (x, y, r) values. 
     * 
     * @param {number} x The x-value of the current cell
     * @param {number} y The y-value of the current cell
     * @param {number} r The radius of the current cell
     */
    getIntersections( x, y, r ) {
      this.cells.forEach( curCell => {
        let checkRadius = curCell.cellSize;
        let checkX = curCell.x;
        let checkY = curCell.y;
        
        let radiiSum = r + checkRadius;
        let distance = getDistance( x, y, checkX, checkY )
        console.log( radiiSum > distance );
        curCell.grow()
      } );
    }
  };

  window.onload = app.init.bind( app );
}()