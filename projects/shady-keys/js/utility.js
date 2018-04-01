function checkKeystroke( event ) {
  let freq;
  event = event || window.event; // IE

  switch( event.keyCode ) {
    case 97:
      freq = Tonal.freq( Audio.scale[0] );
      console.log( Audio.scale[0] );
      coefficients.f += .005;
//      coefficiencs.aX++;
      break;
//    case 119:
//      freq = Tonal.freq( Audio.scale[1] );
//      console.log( Audio.scale[1] );
      break;
    case 115:
      freq = Tonal.freq( Audio.scale[2] );
      console.log( Audio.scale[2] );
      coefficients.f -= .005; 
//      coefficiencs.aX--;
      break;
//    case 101:
//      freq = Tonal.freq( Audio.scale[3] );
//      console.log( Audio.scale[3] );
//      break;
    case 100:
      freq = Tonal.freq( Audio.scale[4] );
      console.log( Audio.scale[4] );
      coefficients.k += .001;
//      coefficiencs.bX++;
      break;
    case 102:
      freq = Tonal.freq( Audio.scale[5] );
      console.log( Audio.scale[5] );
      coefficients.k -= .001;
//      coefficiencs.bX--;
      break;
//    case 116:
//      freq = Tonal.freq( Audio.scale[6] );
//      console.log( Audio.scale[6] );
//      break;
    case 106:
      freq = Tonal.freq( Audio.scale[7] );
      console.log( Audio.scale[7] );
      coefficients.dA += .04;
//      coefficiencs.aY++;
      break;
//    case 105:
//      freq = Tonal.freq( Audio.scale[8] );
//      console.log( Audio.scale[8] );
//      break;
    case 107:
      freq = Tonal.freq( Audio.scale[9] );
      console.log( Audio.scale[9] );
      coefficients.dA -= .05;
//      coefficiencs.aY--;
      break;
//    case 111:
//      freq = Tonal.freq( Audio.scale[10] );
//      console.log( Audio.scale[10] );
//      break;
    case 108:
      freq = Tonal.freq( Audio.scale[11] );
      console.log( Audio.scale[11] );
      coefficients.dB += .05;
//      coefficiencs.bY++;
      break;
    case 59:
      freq = Tonal.freq( Audio.scale[12] );
      console.log( Audio.scale[12] );
      coefficients.dB -= .05;
//      coefficiencs.bY--;
      break;
    default:
      freq = 0;
      console.log( "Man go press some other keys" );
  }
  
  Audio.startNote( freq, 1, .001, .15);
};