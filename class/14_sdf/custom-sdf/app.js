const glslify = require('glslify')
const toy     = require('gl-toy')

const shaderText = glslify(
  `precision mediump float;

  vec2 doModel( vec3 point );
  float intersectSDF( float distA, float distB );
  uniform vec2  uScreenSize;
  uniform float uTime;

  #pragma glslify: raytrace = require('glsl-raytrace', map=doModel, steps=500)
  #pragma glslify: camera   = require('glsl-camera-ray')
  #pragma glslify: square   = require('glsl-square-frame')
  #pragma glslify: getNormal= require('glsl-sdf-normal', map=doModel)
  #pragma glslify: noise = require('glsl-noise/simplex/4d')

  // count is the amount to repeat
  vec3 opRep( vec3 point, vec3 count ) {
    vec3 q = mod( point, count ) - 0.5 * count;
    return q;
  }

  // t is a vector containg the outer and inner radiuses
  float sdTorus( vec3 p, vec2 t ) {
    vec2 q = vec2(length(p.xz)-t.x,p.y);
    return length(q)-t.y;
  }

  vec3 opTwist( vec3 p, float amount ){
      float c = cos( amount*p.y );
      float s = sin( amount*p.y );
      mat2  m = mat2( c,-s,s,c) ;
      vec3  q = vec3(m*p.xz,p.y);
      return q;
  }

  vec2 doModel( vec3 point ) {
    //float sphereRadius = 1.0;
    //float dist = length( repeated ) - sphereRadius;
    vec3 repeated = opRep( point, vec3( 1.25 ));

    float sphere = length( repeated ) - .5;

    vec3 twisted = opTwist( repeated, 5. );
    float torus = sdTorus( twisted, vec2( .5, .25 ) );

    float shape = max( sphere, torus );

    float boundingSphere = length( point ) - 2.;

    return vec2( max( shape, boundingSphere ), 0. );

  }


  
  float intersectSDF( float distA, float distB ) {
    return max( distA, distB );
  }

  vec3 lighting( vec3 normal ) {
    vec3 lightDir   = normalize(vec3(-1, 1, 0));
    vec3 lightColor = vec3(1., 0., 0.);
    vec3 diffuseAmt = lightColor * max(0.0, dot( lightDir, normal ));

    vec3 ambientAmt = vec3(0.01);

    return diffuseAmt + ambientAmt;
  }

  void main() {
    vec3 cameraPos = vec3( 0., 0., 10. );
    vec3 cameraDir = vec3( 0., 0., 0. );

    vec3 ray = camera( cameraPos, cameraDir, square( uScreenSize ), 2.0 );
    vec2 t   = raytrace( cameraPos, ray );  

    vec3 color = vec3(0.);
    if( t.x > -.5 ) {
      vec3 pos = cameraPos + t.x * ray;
      vec3 normal = getNormal( pos );
      color = normal;
      //lighting( normal );
    }

    gl_FragColor = vec4( color, 1. );
  }`
)

window.onload = function() {
  const start = Date.now()

  toy( shaderText, ( gl, shader ) => {
    shader.uniforms.uScreenSize = [ gl.drawingBufferWidth, gl.drawingBufferHeight ]
    shader.uniforms.uTime = ( Date.now() - start ) / 1000
  })
}