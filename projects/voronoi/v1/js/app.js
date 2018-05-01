"use strict"

!function() {
  const app = {
    canvas: null,
    ctx: null,
    sites: [],
    delaunay: null,
    cells: [],

    init() {
      this.canvas = document.getElementById( "canvas" );
      this.ctx = this.canvas.getContext( "2d" );

      this.setCanvas();
      
      // scale canvas for retina
      let scale = window.devicePixelRatio;
      this.canvas.width *= scale;
      this.canvas.height *= scale;
      this.ctx.scale(scale, scale);
      
      Cell.ctx = this.ctx;
      
      //this.onClick = this.getMousePosition.bind( this );
      //this.canvas.onclick = this.onClick;
      
      this.draw = this.drawVoronoi.bind( this );
      this.generateSites();
      this.delaunay = Delaunator.from( this.sites );
      
      //requestAnimationFrame( this.draw );
      
      this.draw()
    },

    /**
     * Helper function to initiliaze the canvas to
     * the desired width and height.
     */
    setCanvas() {
      this.canvas.width  = this.height = 800;
      this.canvas.height = this.width  = 800;
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
    drawVoronoi() {
      //requestAnimationFrame( this.draw );
      
      this.ctx.fillStyle = "black";
      this.ctx.fillRect( 0, 0, this.canvas.width, this.canvas.height );
      
      let numSites = this.sites.length;
      
      for( let i = 0; i < numSites; i++ ){
        let x = this.sites[i][0];
        let y = this.sites[i][1];
        
        this.drawPoint( x, y );
      }
      
      this.connectSites( this.delaunay.triangles );
    },
    
    /**
     * Using poisson disc sampling, points are
     * scattared about the canvas. There is a
     * hard-coded 50px buffer to make sure that
     * the points don't get too close to the edge.
     */
    generateSites() {
      let sampler = poissonDiscSampler( 800, 800, 150 );

      let sample;

      while( (sample = sampler()) ) {
        let x = Math.floor( sample[0] );
        let y = Math.floor( sample[1] );

        if( x < 50 || x > 750  ) {
          continue;
        }
        else if( y < 50 || y > 750 ) {
          continue;
        }
        else {
          this.sites.push( [x, y] );
        }
      };
    },
    
    connectSites( triangles ) {
      for( let i = 0; i < triangles.length ; i += 3 ) {
        let p1 = this.sites[triangles[i]];
        let p2 = this.sites[triangles[i + 1]];
        let p3 = this.sites[triangles[i + 2]];
        
        console.log( p1, p2, p3 )
        
        this.triangulate( p1, p2, p3 );
        
        let center = threePointCircle( p1, p2, p3 );
        
        this.drawPoint( center[0], center[1], "red", center[2] )
      }
    },
    
    /**
     * Helper function that takes three points and
     * draws a triangle connecting the points.
     * 
     * @param {Array} p1 coordinate pair 1
     * @param {Array} p2 coordinate pair 2
     * @param {Array} p3 coordinate pair 3
     */
    triangulate( p1, p2, p3 ) {
      
      this.ctx.strokeStyle = "white";
      this.ctx.beginPath();
      this.ctx.moveTo( p1[0], p1[1] );
      this.ctx.lineTo( p2[0], p2[1] );
      this.ctx.lineTo( p3[0], p3[1] );
      this.ctx.lineTo( p1[0], p1[1] );
      
      this.ctx.stroke();
      this.ctx.closePath();
    },
    
    drawPoint( x, y, color = "white", r = 4 ) {
      if( r > 4 ) {
        this.ctx.strokeStyle = color;
        this.ctx.beginPath();
        this.ctx.arc( x, y, r, 0, 2*Math.PI );
        this.ctx.stroke();
        this.ctx.closePath();
      }
      else {
        this.ctx.fillStyle = color;
        this.ctx.beginPath();
        this.ctx.arc( x, y, r, 0, 2*Math.PI );
        this.ctx.fill();
        this.ctx.closePath();
      }
    },
  };

  window.onload = app.init.bind( app );
}()