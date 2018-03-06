window.app = {
  meshes: [],

  init() {
    // Initialize lorenz values
    this.initLorenz();
    
    // Create the scene for the geometry to
    // be rendered in
    this.scene = new THREE.Scene()

    this.camera = new THREE.PerspectiveCamera(
      75,  // FOV 
      window.innerWidth / window.innerHeight, // aspect ratio
      .1,  // near plane
      1000 // far plane
    )

    this.createRenderer()
    this.createLights()
    this.createFog();
    this.setupAnalyzer();

    this.render()
  },

  createRenderer() {
    this.renderer = new THREE.WebGLRenderer()
    this.renderer.setSize( window.innerWidth, window.innerHeight )

    // take the THREE.js canvas element and append it to our page
    document.body.appendChild( this.renderer.domElement )

    this.render = this.render.bind( this )
  },

  createLights() {
    // ambient light fills in the shadows
    this.ambient = new THREE.AmbientLight( 0xffffff, 2. )
    this.scene.add( this.ambient )

    // point light to generate directional lighting
    this.pointLight = new THREE.PointLight( 0xffffff, 5. )
    this.pointLight.position.z = 50;
    this.pointLight.position.x = 50;
    this.scene.add( this.pointLight )
  },
  
  createFog() {
    this.scene.fog = new THREE.Fog(0x000000, 5, 200);
  },
  
  createGeometry( x, y, z ) {
    let results = new Uint8Array( this.analyser.frequencyBinCount );
    this.analyser.getByteFrequencyData( results );
    let counter = 0
    results.forEach( binVal => counter += binVal );
    
    let size = counter / 10000;
    
    
    const box = new THREE.BoxGeometry( size, size, size );
    
    let material;
    if( position.adamMode ) {
      material = new THREE.MeshPhongMaterial( {
        alphaMap: new THREE.TextureLoader().load( "textures/adamS-alpha.png" ),
        map: new THREE.TextureLoader().load( "textures/adamS.png" ),
      } );
      
      material.transparent = true
    }
    else {
      // color is created from the objects position
      let r = Math.floor( Math.abs(z) );
      let g = Math.floor( Math.abs(x) );
      let b = Math.floor( Math.abs(y) );
      
      material = new THREE.MeshPhongMaterial( {
        color: rgbToHex(r, g, b),
      } );
    }
    const cube = new THREE.Mesh( box, material );
    
    cube.position.x = x;
    cube.position.y = y;
    cube.position.z = z;

    this.scene.add( cube );
  },

  render() {
    this.camera.position.x = position.x;
    this.camera.position.y = position.y;
    this.camera.position.z = position.z;
    this.camera.lookAt(this.scene.position);
    
    window.requestAnimationFrame( this.render )
    
    this.lorenzify();
    
    this.createGeometry( this.x0, this.y0, this.z0 ); 

    this.renderer.render( this.scene, this.camera );
  },
  
  reset() {
    while( this.scene.children.length >  0){ 
      this.scene.remove( this.scene.children[0] ); 
    }
    
    this.createLights();
  },
  
  initLorenz() {
    this.i = 0;

    this.x0 = 0.1
    this.y0 = 0;
    this.z0 = 0;

    this.h = 0.01;
    this.a = 10.0;
    this.b = 28.0;
    this.c = 8.0 / 3.0;
  },
  
  lorenzify() {
    this.x1 = this.x0;
    this.y1 = this.y0;
    this.z1 = this.z0;

    this.x0 = this.x1 + this.h * this.a * (this.y1 - this.x1);
    this.y0 = this.y1 + this.h * (this.x1 * (this.b - this.z1) - this.y1);
    this.z0 = this.z1 + this.h * (this.x1 * this.y1 - this.c * this.z1);
  },
  
  setupAnalyzer() {
    this.audioCtx = new AudioContext();
    this.audioElement = document.querySelector( "audio" );
    this.audioElement.src = "./audio/round-two.mp3";

    this.musicSource = this.audioCtx.createMediaElementSource( this.audioElement );
    this.analyser = this.audioCtx.createAnalyser();
    // 1024 -> 512 bins
    this.analyser.fftSize = 1024;

    this.musicSource.connect( this.analyser );
    this.musicSource.connect( this.audioCtx.destination );
    
    this.audioElement.play();
  }
}

function componentToHex(c) {
  var hex = c.toString(16);
  return hex.length == 1 ? "0" + hex : hex;
}

function rgbToHex(r, g, b) {
  return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
}

window.onload = ()=> window.app.init()
// could also be: window.onload = app.bind( app )