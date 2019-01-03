function updateCoefficients( keyCode ) {
  switch( keyCode ) {
    case 65:      
      coefficients.f += .005;
      break;
    case 83:      
      coefficients.f -= .005;
      break;
    case 68:      
      coefficients.k += .001;
      break;
    case 70:      
      coefficients.k -= .001;
      break;
    case 74:
      if( coefficients.dA > 1.14 || coefficients.dB < 0.2  ) { // make sure chemical values are within bounds
        break;
      }
      
      coefficients.dA += .04;
      break;
    case 75:      
      coefficients.dA -= .05;
      break;
    case 76:      
      coefficients.dB += .05;
      break;
    case 186:
      if( coefficients.dB < 0.2 || coefficients.dA > 1.14 ) { // make sure chemical values are within bounds
        break;
      }

      coefficients.dB -= .05;
      break;
  };
  
  console.log( coefficients.dB);
}