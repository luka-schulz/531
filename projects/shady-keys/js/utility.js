function checkKeystroke( event ) {
  let freq;
  event = event || window.event; // IE

  switch( event.keyCode ) {
    case 97:
      freq = Tonal.freq( Audio.scale[0] );
      console.log( Audio.scale[0] );
      coefficiencs.aX++;
      break;
//    case 119:
//      freq = Tonal.freq( Audio.scale[1] );
//      console.log( Audio.scale[1] );
      break;
    case 115:
      freq = Tonal.freq( Audio.scale[2] );
      console.log( Audio.scale[2] );
      coefficiencs.aX--;
      break;
//    case 101:
//      freq = Tonal.freq( Audio.scale[3] );
//      console.log( Audio.scale[3] );
//      break;
    case 100:
      freq = Tonal.freq( Audio.scale[4] );
      console.log( Audio.scale[4] );
      coefficiencs.bX++;
      break;
    case 102:
      freq = Tonal.freq( Audio.scale[5] );
      console.log( Audio.scale[5] );
      coefficiencs.bX--;
      break;
//    case 116:
//      freq = Tonal.freq( Audio.scale[6] );
//      console.log( Audio.scale[6] );
//      break;
    case 106:
      freq = Tonal.freq( Audio.scale[7] );
      console.log( Audio.scale[7] );
      coefficiencs.aY++;
      break;
//    case 105:
//      freq = Tonal.freq( Audio.scale[8] );
//      console.log( Audio.scale[8] );
//      break;
    case 107:
      freq = Tonal.freq( Audio.scale[9] );
      console.log( Audio.scale[9] );
      coefficiencs.aY--;
      break;
//    case 111:
//      freq = Tonal.freq( Audio.scale[10] );
//      console.log( Audio.scale[10] );
//      break;
    case 108:
      freq = Tonal.freq( Audio.scale[11] );
      console.log( Audio.scale[11] );
      coefficiencs.bY++;
      break;
    case 59:
      freq = Tonal.freq( Audio.scale[12] );
      console.log( Audio.scale[12] );
      coefficiencs.bY--;
      break;
    default:
      freq = 0;
      console.log( "Man go press some other keys" );
  }
  
  var gradient = ctx.createLinearGradient(0 - coefficiencs.aX,0,500 + coefficiencs.aX,0);
  gradient.addColorStop(0, "white");
  gradient.addColorStop(.5, "black");
  gradient.addColorStop(1, "white");

  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, 500, 500);
  
  audio.startNote( freq, 1, .001, .15);
  console.log( coefficiencs )
};