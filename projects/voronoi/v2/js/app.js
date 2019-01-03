"use strict"

window.onload = function() {
  let toggle = false;
  let mouseMoved = false;
  
  let button = document.getElementById( "voronoiStart" );
  button.onclick = function() {
    button.classList.toggle("hide");
    document.getElementById( "introScreen" ).classList.toggle("hide");
    toggle = false;
  }
  
  let canvas = d3.select( "canvas" )
    .on( "touchmove mousemove", moved )
    .node();
  let ctx = canvas.getContext( "2d" );
  let scale = window.devicePixelRatio;
  
  let width = canvas.width = 800;
  let height = canvas.height = 800;
  
  canvas.width *= scale;
  canvas.height *= scale;
  ctx.scale( scale, scale );
  
  let sites = [];
  generateSites();
  
  let notes = setupScaleObject( sites.length );
  
  let voronoi = d3.voronoi()
    .extent([[-1, -1], [width + 1, height + 1]]);
  
  while( toggle ) {
    redraw();
  }
  
  redraw();
  
  // GUI SETUP
  let guiControls = function() {
    this.key = "C4";
    this.scaleName = "aeolian";
  }

  let scaleControls = new guiControls();

  let gui = new dat.GUI();
  
  gui.add( scaleControls, "key", ["A4", "B4", "C4", "D4", "E4", "F4", "G4"] ).name("Key").onChange( function() {
    for( let note in notes ) {
      notes[note].oscilator.gainNode.disconnect();
    }
    notes = setupScaleObject( sites.length, scaleControls.key, scaleControls.scaleName );
    console.log( scaleControls.key )
  });
  gui.add( scaleControls, "scaleName", Tonal.scale.names() ).name("Scale").onChange( function() {
    for( let note in notes ) {
      notes[note].oscilator.gainNode.disconnect();
    }
    notes = setupScaleObject( sites.length, scaleControls.key, scaleControls.scaleName );
    console.log( notes )
  });
  
  /**
   * Callback funciton fired when the mouse moves.
   * 
   * @param {[[Type]]} event [[Description]]
   */
  function moved( event ) {
    mouseMoved = true;
    
    let mouse = d3.mouse(this);
    sites[0] = mouse;
    
    //console.log( voronoi( sites ).find( mouse[0], mouse[1] ) )
    
    redraw();
  }
  
  function redraw() {
    let diagram = voronoi( sites );
    let polygons = diagram.polygons();
    
    let currCell = diagram.cells[0];
    let currCellNeighbors = [];
    
    // itterate through the active cells boarder edge (halfedges)
    // each halfedge corelates to an edge of the cell
    for( let i = 0; i < currCell.halfedges.length; i++ ) {
      let edgeIdx = currCell.halfedges[i];
      let edge = diagram.edges[edgeIdx];
      let neighborSite = edge.left;
      
      let distance = getDistance( edge[0][0], edge[0][1], edge[1][0], edge[1][1] );
      
      // if the neighbors site is the same as the current cells site
      // that means the left site is either outside the diagram
      // or it means that the left nieghbor is also the current cell
      // therefore the neighboring cell is on the right
      if( neighborSite === currCell.site || !neighborSite ) {
        neighborSite = edge.right;
      }
      
      if( neighborSite ) {
        currCellNeighbors.push( neighborSite.index );
        if( mouseMoved) notes[neighborSite.index].oscilator.changeAmplitude( distance );
      }
    }
    
    // draw the first cell
    // i.e. the cell being interacted with
    ctx.fillStyle = "rgba(0, 0, 0, .2)";
    ctx.fillRect(0, 0, width, height);
    ctx.fill();
    ctx.beginPath();
    drawCell( polygons[0] );
    ctx.fillStyle = "#000000";
    ctx.fill();
    
    // draw the neighboring cells
    ctx.beginPath();
    let color;
    for( let i = 0, n = currCellNeighbors.length; i < n; ++i ) {
      let neigborIndex = currCellNeighbors[i];
      
      let noteName = notes[neigborIndex].noteName.slice(0, 1);
      color = COLOR[noteName];
      
      drawNeighbor( polygons[neigborIndex], color );
    };
    
    // draw the cell edges
    ctx.beginPath();
    for( let i = 0, n = polygons.length; i < n; ++i ) {
      drawCell( polygons[i] ) };
    ctx.strokeStyle = "#fff";
    ctx.stroke();

    // draw sites
    ctx.beginPath();
    for(let i = 1, n = sites.length; i < n; ++i) {
      drawSite(sites[i]) };
    ctx.fillStyle = "#fff";
    ctx.fill();
  }
  
  /**
   * Helper function for drawing voronoi sites.
   *  
   * @param {Array} site (x,y) coordinate array
   */
  function drawSite( site ) {
    ctx.moveTo( site[0] + 3, site[1] );
    ctx.arc( site[0], site[1], 3, 0, 2 * Math.PI, false );
  }
  
  /**
   * Helper function for drawing the edges for the
   * delunay triangulation.
   *  
   * @param {Array} site (x,y) coordinate array
   */
  function drawEdge( edge ) {
    ctx.moveTo( edge.source[0], edge.source[1] );
    ctx.lineTo( edge.target[0], edge.target[1] );
  }
  
  /**
   * Helper function for drawing the edges of each
   * voronoi cell.
   * 
   * @param   {Array} cell An array of coordinate pairs
   * @returns {boolean}  Cell status
   */
  function drawCell( cell ) {
    if( !cell ) return false;
    
    ctx.moveTo( cell[0][0], cell[0][1] );
    
    for( var j = 1, m = cell.length; j < m; ++j ) {
      ctx.lineTo(cell[j][0], cell[j][1]);
    }
    
    ctx.closePath();
    
    return true;
  }
  
  /**
   * Helper function for drawing the edges of each
   * voronoi cell.
   * 
   * @param   {Array} cell An array of coordinate pairs
   * @returns {boolean}  Cell status
   */
  function drawNeighbor( cell, color ) {
    if( !cell ) return false;

    ctx.fillStyle = color;
    
    ctx.moveTo( cell[0][0], cell[0][1] );

    for( var j = 1, m = cell.length; j < m; ++j ) {
      ctx.lineTo(cell[j][0], cell[j][1]);
    }

    ctx.closePath();
    
    ctx.fill();

    return true;
  }
  
  /**
     * Using poisson disc sampling, points are
     * scattared about the canvas. There is a
     * hard-coded 50px buffer to make sure that
     * the points don't get too close to the edge.
     */
  function generateSites() {
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
        sites.push( [x, y] );
      }
    }
  }
  
  function getDistance( x1, y1, x2, y2 ) {
    let a = x1 - x2;
    let b = y1 - y2;
    let c = Math.sqrt( a*a + b*b );

    return c;
  }
}