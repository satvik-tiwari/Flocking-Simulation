const flock = [];
let alignSlider, cohesionSlider, seperationSlider;

//et qtree;
let numBoids = 700;

function setup() {
  // put setup code here
  createCanvas(700, 500);

  alignSlider = createSlider(0, 5, 1, 0, 1);
  cohesionSlider = createSlider(0, 5, 1, 0, 1);
  seperationSlider = createSlider(0, 5, 1, 0, 1);


  for(let i = 0; i < numBoids; i++)
    flock.push(new Boid());
}

function draw() {

  // put drawing code here
  background(51);
  //let boundary = new Rectangle(320, 180, 640, 360);
  let boundary = new Rectangle(350, 250, 700, 500);
  let qtree = new QuadTree(boundary, 20);

for(let boid of flock)
{
  let p = new Point(boid.getPosition().x, boid.getPosition().y, boid);
  // stroke(0, 255, 0);
  // strokeWeight(4);
  // point(p.x, p.y);
  qtree.insert(p);
}
//console.log(qtree);


  for(let boid of flock)
  {
    let range = new Rectangle(boid.getPosition().x, boid.getPosition().y, 70, 70);
    let others = qtree.query(range);
    boid.edges();
    boid.flock(others);
    //boid.flock(flock);
    boid.update();
    boid.show();
  }
  //noLoop();
}
