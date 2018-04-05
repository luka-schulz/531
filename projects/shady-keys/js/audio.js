// Create audio (context) container
let audioCtx = new (AudioContext || webkitAudioContext)();
// the flag is initially used to show the instructions
// once flag is set to 1 the instuctions can no longer be accessed
let flag = 0;

const notes = {
  65:  { noteName: "C4", frequency: 261.6, keyName: "a", state: false },
  83:  { noteName: "D4", frequency: 293.7, keyName: "s", state: false },
  68:  { noteName: "E4", frequency: 329.6, keyName: "d", state: false },
  70:  { noteName: "F4", frequency: 349.2, keyName: "f", state: false },
  74:  { noteName: "G4", frequency: 392.0, keyName: "j", state: false },
  75:  { noteName: "A4", frequency: 440.0, keyName: "k", state: false },
  76:  { noteName: "B4", frequency: 493.9, keyName: "l", state: false },
  186: { noteName: "C5", frequency: 523.3, keyName: ";", state: false }
};

function initSound() {
  /* Iterate through the notes object to attach a Sound to each note */
  for(key in notes) {
    notes[key].sound = new Sound( notes[key].frequency );
  }
}

function Sound( frequency ) {
  this.osc = audioCtx.createOscillator(); // Create oscillator node
  this.gainNode = audioCtx.createGain(); // Create gain node to adjust the volume
  this.pressed = false; // flag to indicate if sound is playing

  /* Set default configuration for sound */
  if( typeof frequency !== 'undefined' ) {
    /* Set frequency. If it's not set, the default is used (440Hz) */
    this.osc.frequency.value = frequency;
  }

  this.osc.connect( this.gainNode ); //connect the gain node to the osciallator
  /* Start playing the sound. You won't hear it yet as the oscillator node needs to be piped to output (AKA your speakers). */
  this.osc.start( 0 );
};

Sound.prototype.play = function() {
  if( !this.pressed ) {
    this.pressed = true;
    /* To avoid clicking set the volume to zero, then ramp the value to 1/8 */
    this.gainNode.gain.setValueAtTime( 0, audioCtx.currentTime );
    this.gainNode.gain.linearRampToValueAtTime( 1/8, audioCtx.currentTime + .01 ); // increase or decrease the .01 value to ease the sound in more or less
    this.gainNode.connect( audioCtx.destination );
  }
};

Sound.prototype.stop = function() {
  this.pressed = false;
  this.gainNode.gain.linearRampToValueAtTime( 0, audioCtx.currentTime + .05 );
  this.gainNode.disconnect;
};

let playNote = function( event ) {
  event = event || window.event; // IE
  event.preventDefault();

  let keyCode = event.keyCode;
  
  console.log( keyCode)
  /* Reset the simulation */
  if( keyCode === 13 && flag === 0  ) {
    let hideElements = document.getElementsByClassName("remove");
    for( let i = 0; i < hideElements.length; i ++ ) {
      hideElements[i].classList.toggle("hide");
    }
    
    reset();
    flag = 1;
  }
  
  /* Reset the simulation */
  if( keyCode === 32 && flag === 1 ) {
    reset();
  }
  
  if(typeof notes[keyCode] !== 'undefined') {
    updateCoefficients( keyCode ); // update the reaction diffusion coeffient associated with the specific note s
    notes[keyCode].sound.play();
  }
};

let endNote = function(event) {
  event = event || window.event; // IE
  event.preventDefault();

  let keyCode = event.keyCode;

  if(typeof notes[keyCode] !== 'undefined') {
    // Kill connection to output
    notes[keyCode].sound.stop();
  }
};

initSound();
document.onkeydown = playNote;
document.onkeyup = endNote;