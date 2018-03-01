### Intorduction to Computational Asthetics
###### Thursday, March 1, 2018

#### Browserify
Inspired by NodeJS, it helps to modularize JS code

Importing and exporting frome Node.js:
```js
// module is a key object, it cannot be named anything else
module.exports = function() {
  console.log( "a function" );
}

const demoModule = require( "./module.js" );

demoModule() // logs "a function"
```

#### Bash
pwd : present working directory

alis yourName=path/to/command

-a shows all the hidden unix files

.bash_profile will run anytime a Bash session is run

#### Post processing

Post processing renders to a texture then applies a shader to edit it
