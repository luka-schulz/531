### Project 2: Piano-roni
###### Wedensday, May 2, 2018

#### Documentation
The goal of this project was to explore voronoi diagrams. Originally I was looking to generate the voronoi diagram from scratch using delunay tessellations, however due to time constraints, I was not able to figure out how to implement it via javascript. Instead, I ended up using the d3.js library to explore my voronoi audio visualizer. The library helped to quickly generate the diagram and it also made it easier to search the voronoi diagram for a cell's neighbors.

The premise of the project is to turn each voronoi cell into a note. Everytime a cell is bumped into it plays it’s note. The loudness of the note corelates to the length of the current side of the cell. As you move your mouse around the canvas it creates an ominous droll. The color of the cell relates to the last played note.

Dat.gui was used to let the user select their own key or a scale type. The key ranges from A4-G4 and the scale includes all possible scales from the Tonal library.

Adam’s head is added in for good measure. I would eventually like to add a “Just Dance” button that lets Adam wander around the voronoi dance floor with his wife Hye-Jin. I also would like to explore how the piece sounds if there was a decay to each note. Currently each note is sustained but I think it might sound better if the notes fade over time. I think this might make the piece more interactive. Currently it gets annoying if you aren't moving the mouse. If I do this, I think I will also have to make the colors fade.

Overall, the project was a good learning experience. Using d3.js was simple and I am curious to explore the other facets of the library. The project also gave me an appreciation for the math that goes into dealing with voronoi pattern's in 3D space which might also be intersting to explore from an audio perspective.