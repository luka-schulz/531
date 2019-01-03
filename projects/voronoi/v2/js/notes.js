let audioCtx = new (AudioContext || webkitAudioContext)();

function setupScaleObject( numSites, key = "c4", scaleName = "aeolian" ){
  let scale = {};
  
  let tonalScale = Tonal.Scale.notes( key, scaleName);

  for( let i = 1; i < numSites; i++ ) {
    let noteObj = {};
    
    let noteIndex = (i - 1) % tonalScale.length; // subtract one to account for skipping the first site
    noteObj.noteName = tonalScale[noteIndex]
    
    noteObj.frequency = Tonal.freq( noteObj.noteName );
    
    noteObj.oscilator = new Sound( noteObj.frequency );
    
    scale[i] = noteObj;
  }
  
  return scale;
}

function Sound( frequency ) {
  this.osc = audioCtx.createOscillator(); // Create oscillator node
  this.gainNode = audioCtx.createGain(); // Create gain node to adjust the volume
  this.osc.type = "triangle";

  /* Set default configuration for sound */
  if( typeof frequency !== 'undefined' ) {
    /* Set frequency. If it's not set, the default is used (440Hz) */
    this.osc.frequency.value = frequency;
  }

  this.osc.connect( this.gainNode ); //connect the gain node to the osciallator
  /* Start playing the sound. You won't hear it yet as the oscillator node needs to be piped to output (AKA your speakers). */
  this.osc.start( 0 );
  
  this.gainNode.gain.value = 0;
  
  this.gainNode.connect( audioCtx.destination );
};

Sound.prototype.changeAmplitude = function( amp ) {
  this.gainNode.gain.value = amp / 500;
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