### Shaders
###### Teusday, February 13, 2018

#### Introduction
Ray Casting vs Meshes:
  - Ray casting you have a camera and some set of objects, rays are sent out from your camera for each pixel in the viewing plane. If you hit the shape some pixel value is calculated
  - Ray tracing will calculate shadows, reflections, and bounces
   
```js
scene([
  Repeat(
    SmoothUnion(
      Box(),
      Sphere( Noise( .75 ) ),
      .95
    ),
    Vec3( 4 )
  )
])

callbacks.push( time => camera.pos.z = time );
```

#### WebGL
  - WebGL uses the bottom left as its (0, 0)
  
Squigly line
```
void main () {
    float _out = 0.;
    // uvN returns a noramalized value between 0 & 1
    // uv returns a value between -1 & 1
    vec2 p = uv();
    p.x += sin( p.y + time );
    _out = .1 + abs( .1/p.x );
    
    gl_FragColor = vec4( _out );
}
```

Multipe Squigly Liens
```
void main () {
    float _out = 0.;
    // uvN returns a noramalized value between 0 & 1
    // uv returns a value between -1 & 1
    vec2 p = uv();
    for( float i = 0.; i < 8.; i++ ) {
        p.x += sin( p.x + time * i * 2. ) * bands.x;
        _out += abs( .0035 / p.x ) / bands.z;
    }

    
    gl_FragColor = vec4( _out );
}
```

[RISC Chip](https://vimeo.com/192920872 "RISC Chip")
