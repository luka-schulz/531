function checkKeystroke( event ) {
  let freq;
  event = event || window.event; // IE

  switch( event.keyCode ) {
    case 97:
      freq = Tonal.freq( Audio.scale[0] );
      console.log( Audio.scale[0] );
      break;
    case 119:
      freq = Tonal.freq( Audio.scale[1] );
      console.log( Audio.scale[1] );
      break;
    case 115:
      freq = Tonal.freq( Audio.scale[2] );
      console.log( Audio.scale[2] );
      break;
    case 101:
      freq = Tonal.freq( Audio.scale[3] );
      console.log( Audio.scale[3] );
      break;
    case 100:
      freq = Tonal.freq( Audio.scale[4] );
      console.log( Audio.scale[4] );
      break;
    case 102:
      freq = Tonal.freq( Audio.scale[5] );
      console.log( Audio.scale[5] );
      break;
    case 116:
      freq = Tonal.freq( Audio.scale[6] );
      console.log( Audio.scale[6] );
      break;
    case 106:
      freq = Tonal.freq( Audio.scale[7] );
      console.log( Audio.scale[7] );
      break;
    case 105:
      freq = Tonal.freq( Audio.scale[8] );
      console.log( Audio.scale[8] );
      break;
    case 107:
      freq = Tonal.freq( Audio.scale[9] );
      console.log( Audio.scale[9] );
      break;
    case 111:
      freq = Tonal.freq( Audio.scale[10] );
      console.log( Audio.scale[10] );
      break;
    case 108:
      freq = Tonal.freq( Audio.scale[11] );
      console.log( Audio.scale[11] );
      break;
    case 59:
      freq = Tonal.freq( Audio.scale[12] );
      console.log( Audio.scale[12] );
      break;
    default:
      freq = 0;
      console.log( "Man go press some other keys" );
  }
  
  audio.startNote( freq, 1, .001, .15);
};