"use strict"

!function() {
  
  const rules = {
    F: "FF-F+F-F-FfF",
  }
  
  const axiom = "F-F-F-F";
  const numGenerations = 3;
  const deg = 90;
  let length = 20;
  
  const app = {
    canvas: null,
    ctx: null,

    init() {
      this.canvas = document.getElementsByTagName( "canvas" )[0];
      this.ctx = this.canvas.getContext( "2d" );
      // why is this needed
      this.draw = this.drawSystem.bind( this );
      this.setCanvas();
      
      // not sure how to center drawing :()
      let myTurtle = Turtle.create( this.ctx, this.canvas.width / 2 - (75), this.canvas.height / 2 - (175) );
      
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
          turtle.changeColor( "blue" );
        }
        else if( char === "f" ) {
          turtle.penUp();
          turtle.move( length );
          turtle.penDown();
        }
        else if( char === "+" ) {
          turtle.changeColor( "blue" );
          turtle.rotate( deg );
        }
        else if( char === "-" ) {
          turtle.changeColor( "white" );
          turtle.rotate( -1 * deg );
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