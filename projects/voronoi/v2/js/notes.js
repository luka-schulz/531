let audioCtx = new (AudioContext || webkitAudioContext)();

function setupScaleObject( numSites ){
  let scale = {};
  
  let tonalScale = Tonal.Scale.notes( "c4", "major pentatonic");

  for( let i = 1; i < numSites; i++ ) {
    let noteObj = {};
    
    let noteIndex = (i - 1) % tonalScale.length; // subtract one to account for skipping the first site
    noteObj.noteName = tonalScale[noteIndex]
    
    noteObj.frequency = Tonal.freq( noteObj.noteName );
    
    noteObj.amplitude = 0;
    
    noteObj.oscilator = null;
  }
}




//const notes = {
//  1: { noteName: 'c4', frequency: 261.6, amplitude: 'a', color: "#ff003D", oscilator: null },
//  2: { noteName: 'd4', frequency: 293.7, keyName: 's' },
//  3: { noteName: 'e4', frequency: 329.6, keyName: 'd' },
//  4: { noteName: 'f4', frequency: 349.2, keyName: 'f' },
//  5: { noteName: 'g4', frequency: 392, keyName: 'g' },
//  6: { noteName: 'a4', frequency: 440, keyName: 'h' },
//  7: { noteName: 'b4', frequency: 493.9, keyName: 'j' },
//  8: { noteName: 'c5', frequency: 523.3, keyName: 'k' },
//  9: { noteName: 'd5', frequency: 587.3, keyName: 'l' },
//  10: { noteName: 'e5', frequency: 659.3, keyName: ';' },
//  12: { noteName: 'e5', frequency: 659.3, keyName: ';' },
//  13: { noteName: 'e5', frequency: 659.3, keyName: ';' },
//}
//
//const Notes = {
//  scale: Tonal.Scale.notes( "c4", "major pentatonic"),
//  
//  createScale() {
//    
//    scale.forEach( note )
//  }
//}