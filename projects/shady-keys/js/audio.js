const Audio = {
  ctx: new AudioContext(),
  scale: [ "C2", "C#2", "D2", "D#2", "E2", "F2", "F#2", "G2", "G#2", "A2", "A#2", "B2", "C3" ],
  
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
