let i=0;
let x0,y0,z0,x1,y1,z1;
let h = 0.01;
let a = 10.0;
let b = 28.0;
let c = 8.0 / 3.0;

x0 = 0.1;
y0 = 0;
z0 = 0;

window.app = {
  init() {
    this.scene = new THREE.Scene()

    this.camera = new THREE.PerspectiveCamera(
      75,  // FOV 
      window.innerWidth / window.innerHeight, // aspect ratio
      .1,  // near plane
      1000 // far plane
    )

    this.createRenderer()
    this.createLights()
    //this.scene.fog = new THREE.Fog(0x000000, 5, 80);

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
    this.ambient = new THREE.AmbientLight( 0xffffff, 2. )
    this.scene.add( this.ambient )

    this.pointLight = new THREE.PointLight( 0xffffff )
    this.pointLight.position.z = 50;
    this.scene.add( this.pointLight )
  },
  
  createGeometry( x, y, z ) {
    let r = Math.floor( Math.abs(z) );
    let g = Math.floor( Math.abs(x) );
    let b = Math.floor( Math.abs(y) );
    
    const box = new THREE.BoxGeometry( 1, 1, 1 );
    const material = new THREE.MeshPhongMaterial( {
      color: rgbToHex(r, g, b)
    } );
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
    
    x1 = x0 + h * a * (y0 - x0);
    y1 = y0 + h * (x0 * (b - z0) - y0);
    z1 = z0 + h * (x0 * y0 - c * z0);
    x0 = x1;
    y0 = y1;
    z0 = z1;
    
    this.createGeometry( x0, y0, z0 ); 

    this.renderer.render( this.scene, this.camera )  
  },
  
  reset() {
    for (var i = this.scene.children.length - 1; i >= 0; i--) {
      this.scene.remove( this.scene.children[i] );
    }
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