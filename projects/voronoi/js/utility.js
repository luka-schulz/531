function getDistance( x1, y1, x2, y2 ) {
  let a = x1 - x2;
  let b = y1 - y2;
  let c = Math.sqrt( a*a + b*b );
  
  return c;
}

function threePointCircle( A, B, C ) {
  let Ax = A[0];
  let Ay = A[1];
  let Bx = B[0];
  let By = B[1];
  let Cx = C[0];
  let Cy = C[1];

  let slope1 = (By - Ay) / (Bx - Ax);
  let slope2 = (Cy - By) / (Cx - Bx);

  let x = ( (slope1 * slope2) * (Ay - Cy) + (slope2) * (Ax + Bx) - (slope1) * (Bx + Cx) ) / ( 2 * (slope2 - slope1) );
  let y = (-1 / slope1) * ( x - ((Ax + Bx)/2) ) + ( (Ay + By) / 2 );

  let r = getDistance( Ax, Ay, x, y );

  return [x, y, r];
}