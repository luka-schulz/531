const axiom = "AB";

const rules = {
  A: "BA",
  B: "AB"
};

let output = axiom;
let numGenerations = 4;

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

window.onload = function() {
  document.getElementById("log").innerHTML = output;
}