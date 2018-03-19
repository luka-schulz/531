"use strict"

let audio = Audio.create();
let ctx;
let coefficiencs = {
  aX: 0,
  bX: 0,
  aY: 0,
  bY: 0
}

window.onload = function() {
  document.onkeypress = checkKeystroke;
  let canvas = document.getElementById( "canvas" );
  ctx = canvas.getContext( "2d" );
  
  canvas.width = 500;
  canvas.height = 500;
  
  
}