/*
 * The Cell object is an object generated each time
 * a person clicks on the canvas. The Cell object
 * contains it's (x, y) position as well as functionality
 * for growth.
 */
const Cell = {
  MAX_SIZE: 150,
  GROWTH_RATE: 2,
  
  /**
   * Creates a cell based on the x, y coordinates
   * passed to the function. The default cell is
   * defined by a white point with radius of 4. It
   * is automatically set to grow.
   * 
   * @param   {number} x mouse postion
   * @param   {number} y mouse position 
   * @returns {object} a Cell object
   */
  create( x, y ) {
    const cell = Object.create( this );
    
    Object.assign( cell, {
      weight: 1,
      color: "white",
      x: x,
      y: y,
      pointRadius: 4,
      cellSize: 4,
      growState: true,
    } );
    
    cell.drawPoint();
    
    return cell;
  },
  
  /**
   * Helper function for drawing the cells
   * center point. The point is based on where
   * the person clicked the mouse.
   */
  drawPoint() {
    this.ctx.fillStyle = this.color;
    this.ctx.beginPath();
    this.ctx.arc( this.x, this.y, this.pointRadius, 0, 2*Math.PI );
    this.ctx.fill();
    this.ctx.closePath();
  },
  
  /**
   * Helper function for increasing the radius
   * of the cell. It grows 8 units each frame.
   */
  growCell() {
    if( this.cellSize < this.MAX_SIZE) {
      this.cellSize += this.GROWTH_RATE;
    }
    this.ctx.strokeStyle = this.color;
    this.ctx.beginPath();
    this.ctx.arc( this.x, this.y, this.cellSize, 0, 2*Math.PI );
    this.ctx.stroke();
    this.ctx.closePath();
  },
  
  /**
   * When a Cell's grow funciton is called, its
   * cellSize is increased by GROWTH_SIZE. The growth
   * stops only when the cell has reached its MAX_SIZE.
   */
  grow() {
    this.drawPoint();
    this.growCell();
    
//    if( this.cellSize > this.MAXSIZE ) {
//      this.drawPoint(); // draw center point one lat time
//      this.growState = false;
//    }
//    else {
//      this.drawPoint(); // re-draw the center point each time
//      this.growCell();
//    }
  },
}