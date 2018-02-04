"use strict"

!function() {
  
  const rules = {
    X: "F[+X][-X]FX",
    F: "FF"
  }
  
  const axiom = "X";
  const numGenerations = 7;
  const deg = 30;
  let length = 3;
  
  const app = {
    canvas: null,
    ctx: null,

    init() {
      this.canvas = document.getElementsByTagName( "canvas" )[0];
      this.ctx = this.canvas.getContext( "2d" );
      // why is this needed
      this.draw = this.drawSystem.bind( this );
      this.setCanvas();
      
      let myTurtle = Turtle.create( this.ctx, this.canvas.width / 2, this.canvas.height );
      
      const commands = this.generateCommands();
      
      this.draw( myTurtle, commands );
    },

    setCanvas() {
      this.canvas.width  = this.height = 800;
      this.canvas.height = this.width  = 800;
    },
    
    generateCommands() {
      let output = axiom;
      
      for( let i = 0; i < numGenerations; i++ ) {
        let newOutput = "";

        for( let char of output ) {
          if( char in rules ) {
            newOutput += rules[ char ];
          }
          else {
            newOutput += char;
          }
        }
        output = newOutput;
      };
      
      return output;
    },

    drawSystem( turtle, commands ) {
      for( let char of commands ) {
        if( char === "F" ) {
          turtle.move( length );
        }
        else if( char === "+" ) {
          turtle.rotate( deg );
        }
        else if( char === "-" ) {
          turtle.rotate( -1 * deg );
        }
        else if( char === "[" ) {
          // length = length * 1;
          turtle.push();
        }
        else if( char === "]" ) {
          // length = length / 1;
          turtle.pop();
        }
        else {
          continue;
        }
      }
    },
    
    // update your simulation here
    animate() {
    },

  };

  window.onload = app.init.bind( app );
}()