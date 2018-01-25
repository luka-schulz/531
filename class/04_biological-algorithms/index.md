### Turtles, Ants, Plats, and L-systems
###### Thursday, January 25, 2018

#### Examples
[Langton's ants](https://www.youtube.com/watch?v=w6XQQhCgq5c "Langton's ants") emulate how ants and termites might move and travel
  - Stigmergy: the movement of the agent is determined by some properties of the environment next to it, and these properties are in turn modified by that movement
  
#### L-systmes
Aristid Lindenmayer, was interested in capture plany growth back in the '50s

In formal language theory, a grammar, is a set of *production rules* for strings in a *formal language*
  - The rules describe how to form strongs from the language's alphabet
  
[*The Algorithmic Beauty of Plants*](http://algorithmicbotany.org/papers/abop/abop.pdf "The Algorithmic Beauty of Plants")

```js
const rules = {
  A: "AB",
  B: "ABA"
};

const axiom = "A";
let output = axiom;
let numGenerations = 5;

for( let i = 0; i<5; i++ ) {
  let newOutput = "";
  
  for( let char of ouput ) {
    newOutput += rules[ char ];
  }
  output = newOutput;
};
```
  
#### Turtle
Seymour Papart believed that if you let kids play around with programming they could teach themselves calculus
  - Languages like [Logo](https://en.wikipedia.org/wiki/Logo_(programming_language "Logo") helped to accomplish this to an extent
  - He released the book called [Mindstorms](http://worrydream.com/refs/Papert%20-%20Mindstorms%201st%20ed.pdf "Mindstorms")
  - This grew into [constructivism](https://en.wikipedia.org/wiki/Constructivism_(philosophy_of_education "constructivism")
  
  
  
#### in vs of
```js
test = { a: 0 }
'a' in test //true
'b' in test // false
```
`in` used in a for look loops through and returns all the keys within an object

`of` loops through all values (just like a regular for loop)

  
