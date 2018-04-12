### Computational Creativity & Genetic Algorithms
###### Teusday, April 10, 2018

#### Examples
[Harold Cohen](https://www.youtube.com/watch?v=MwHQx9BrHQc "Harold Cohen") - AARON

[David Cope](https://www.youtube.com/watch?v=yFImmDsNGdE "David Cope")
  - [Critique](https://academic.oup.com/dsh/article/23/1/109/931480 "Critique")
  
[Karl Sims](https://www.youtube.com/watch?v=JBgG_VSP7f8 "Evolved Virtual Creatures") - Evolved Virtual Creatures

#### Genetic Algorithms: Terminology

1. Organisms Contain cells
2. Cells conatins *chromosomes*
3. Chromosomes are divided into *genes, which are expressed as traits.
  - Possible values of traits are called *alleles*
4. Organimsms are either *hapoloid* (one set of chromosomes or *doploid*
5. During reporduction *crossover* between chromosome pairs occurs
6. Mutation can occur

#### Genetic Algorithms: Operators

1. Selection: process by which chromoses are selected for reprodution. As per teh laws of evolution, *fitter* chromosmes survived by reproducing more often
2. *Crossover:* swap genes between chrmoosme pairs
3. *Mutate:* randomly change genetic ifnormation (ypically as low as a possibilty of .001%)

#### Genetic Algorithms: Process

1. Create a population of *N* chromosmes, each with an *L*-legth array of genes
2. Calcualte the fitness of each chromosome in the population
3. Repeat until *N* new chromsomes have been generated:
  - Select a pair of chromosems using a weighted random distribution based on fitness function
  ii. Givena *crossover probabilty* carry out crossover between chromosmes
  - Given a *mutation probability* carry about amutatioantion on each gene in the chromosomes generated in step ii
  - store resulting chromosme pari in next ggeneration
4. Repeat

Good tool: [genetic.js](http://subprotocol.com/system/genetic-js.html "genetic.js")

[Artificial Nature](http://www.artificialnature.net/ "Artificail Nature")
