### Project 2: Piano-roni
###### Wedensday, May 2, 2018

#### Documentation
The goal of this project was to explore voronoi diagrams. Originally I was looking to generate the voronoi diagram from scratch using delunay tesselations, however due to time constraints, I was not able to figure out how to implement it via javascript. Instead, I ended up using the d3.js library to explore my voronoi audio visualizer.

The premise of the project is to turn each voronoi cell into a note. Everytime a cell is bumped into it plays it's note. The loudness of the note corelates to the length of the current side of the cell. As you move your mouse around the canvas it creates an ominous, droll. The color of the cell relates to the last played note.

Adam's head is added in for good measure. I would eventually like to add a "Just Dance" button that lets Adam wander around the voronoi dance floor with his wife Hye-Jin.
