function checkKeystroke( event ) {
  event.preventDefault();
  let freq;
  event = event || window.event; // IE
  
  let key = event.keyCode;
  
  switch( key ) {
    case 65:      
      console.log( Audio.notes[key].frequency );
      coefficients.f += .005;
      Audio.checkNote( key, 1 );
      break;
    case 83:      
      console.log( Audio.notes[key].frequency );
      coefficients.f -= .005;
      Audio.checkNote( key, 1 );
      break;
    case 68:      
      console.log( Audio.notes[key].frequency );
      coefficients.k += .001;
      Audio.checkNote( key, 1 );
      break;
    case 70:      
      console.log( Audio.notes[key].frequency );
      coefficients.k -= .001;
      Audio.checkNote( key, 1 );
      break;
    case 74:      
      console.log( Audio.notes[key].frequency );
      coefficients.dA += .04;
      Audio.checkNote( key, 1 );
      break;
    case 75:      
      console.log( Audio.notes[key].frequency );
      coefficients.dA -= .05;
      Audio.checkNote( key, 1 );
      break;
    case 76:      
      console.log( Audio.notes[key].frequency );
      coefficients.dB += .05;
      Audio.checkNote( key, 1 );
      break;
    case 186:      
      console.log( Audio.notes[key].frequency );
      coefficients.dB -= .05;
      Audio.checkNote( key, 1 );
      break;
    default:
      console.log( "Man go press some other keys" );
  }
};