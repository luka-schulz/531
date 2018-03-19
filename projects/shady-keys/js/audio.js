const Audio = {
  ctx: new AudioContext(),
  scale: [ "C4", "C#4", "D4", "D#4", "E4", "F4", "F#4", "G4", "G#4", "A4", "A#4", "B4", "C5" ],
  
  create() {
    const audio = Object.create( this );
    
    return audio;
  },
  
  startNote( frequency, amp, attack, decay ) {
    const osc = this.ctx.createOscillator();
    osc.frequency.value = frequency;

    // use osc.type to change between square, sawtooth, triangle
    // use osc.frequncy.value to change the value from 440

    const gainNode = this.ctx.createGain();
    gainNode.gain.setValueAtTime( 0, this.ctx.currentTime );
    gainNode.gain.linearRampToValueAtTime( amp, this.ctx.currentTime + attack );
    gainNode.gain.linearRampToValueAtTime( 0, this.ctx.currentTime + attack + decay );

    osc.connect( gainNode );
    gainNode.connect( this.ctx.destination );

    osc.start();
  },
  
  endNote( frequency, amp, attack, decay ) {
  const osc = this.ctx.createOscillator();
  osc.frequency.value = frequency;

  // use osc.type to change between square, sawtooth, triangle
  // use osc.frequncy.value to change the value from 440

  const gainNode = this.ctx.createGain();
  gainNode.gain.setValueAtTime( 0, this.ctx.currentTime );
  gainNode.gain.linearRampToValueAtTime( amp, this.ctx.currentTime + attack );
  gainNode.gain.linearRampToValueAtTime( 0, this.ctx.currentTime + attack + decay );

  osc.connect( gainNode );
  gainNode.connect( this.ctx.destination );

  osc.start();
}
}
