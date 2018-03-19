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
  
  var gradient = ctx.createLinearGradient(0, 0, 500, 0);
  gradient.addColorStop(0, "white");
  gradient.addColorStop(.5, "black");
  gradient.addColorStop(1, "white");

  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, 500, 500);
}