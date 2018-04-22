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
      
      this.spawnCell( pageX, pageY );
    },
    
    
    drawCells() {
      requestAnimationFrame( this.draw );
      
      //this.ctx.fillStyle = "black";
      //this.ctx.fillRect( 0,0, this.canvas.width, this.canvas.height );
      
      this.cells.forEach( function( currCell, index ){
        if( currCell.growState === true ) currCell.grow();
      }, this);
    }

  };

  window.onload = app.init.bind( app );
}()