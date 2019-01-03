const Audio = {
  ctx: new AudioContext(),
  notes: {
    65:  { noteName: "C4", frequency: 261.6, keyName: "a", state: false },
    83:  { noteName: "D4", frequency: 293.7, keyName: "s", state: false },
    68:  { noteName: "E4", frequency: 329.6, keyName: "d", state: false },
    70:  { noteName: "F4", frequency: 349.2, keyName: "f", state: false },
    74:  { noteName: "G4", frequency: 493.9, keyName: "j", state: false },
    75:  { noteName: "A5", frequency: 523.3, keyName: "k", state: false },
    76:  { noteName: "B5", frequency: 587.3, keyName: "l", state: false },
    186: { noteName: "C5", frequency: 659.3, keyName: ";", state: false }
  },
  
  create() {
    const audio = Object.create( this )
    return audio;
  },
  
  checkNote( key, amp ) {
    if(  Audio.notes[key].state ) {
      Audio.notes[key].state = false;
      Audio.notes[key].sound.stop();
    }
    else {
      const osc = this.ctx.createOscillator();
      osc.frequency.value = Audio.notes[key].frequency;

      const gainNode = this.ctx.createGain();
      gainNode.gain.setValueAtTime( 0, this.ctx.currentTime );
      gainNode.gain.linearRampToValueAtTime( amp, this.ctx.currentTime );

      osc.connect( gainNode );
      gainNode.connect( this.ctx.destination );

      osc.start();

      Audio.notes[key].sound = osc;
      Audio.notes[key].state = true;
    }
  }
}