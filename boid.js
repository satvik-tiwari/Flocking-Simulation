class Boid{
  constructor()
  {
    this.position = createVector(random(width), random(height));
    this.velocity = p5.Vector.random2D();
    this.velocity.setMag(random(2, 4));
    this.acceleration = createVector();
    this.maxForce = 0.2;
    this.maxSpeed = 4;
  }

  getPosition()
  {
    return this.position;
  }

  edges()
  {
    if(this.position.x > width)
      this.position.x = 0;
    else if(this.position.x < 0)
      this.position.x = width;
    else if(this.position.y > height)
      this.position.y = 0;
    else if(this.position.y < 0)
      this.position.y = height;
  }


  doBirdyThingy(boids)
  {
    let steering = [];
    let steeringAlign = createVector();
    let steeringSeperation = createVector();
    let steeringCohesion = createVector();

    let perceptionRadius = 50;
    let total = 0;
    // for(let other of boids)
    // {
    for(let b of boids)
    {
      let other = b.userData;
      let d = dist(this.position.x, this.position.y, other.position.x, other.position.y);

      if(other != this && d < perceptionRadius)
      {
          steeringAlign.add(other.velocity);
          steeringCohesion.add(other.position);

          let diff = p5.Vector.sub(this.position, other.position);
          diff.div(d);
          steeringSeperation.add(diff);

          total++;
      }

    }
    if(total > 0)
    {
      steeringAlign.div(total);
      steeringAlign.setMag(this.maxSpeed);
      steeringAlign.sub(this.velocity);
      steeringAlign.limit(this.maxForce);

      steeringCohesion.div(total);
      steeringCohesion.sub(this.position);
      steeringCohesion.setMag(this.maxSpeed);
      steeringCohesion.sub(this.velocity);
      steeringCohesion.limit(this.maxForce);

      steeringSeperation.div(total);

      steeringSeperation.setMag(this.maxSpeed);
      steeringSeperation.sub(this.velocity);
      steeringSeperation.limit(this.maxForce);


    }
    steering.push(steeringAlign);
    steering.push(steeringCohesion);
    steering.push(steeringSeperation);
    return steering;
  }


  flock(boids)
  {

    // let alignment = this.align(boids);
    // let cohesion = this.cohesion(boids);
    // let seperation = this.seperation(boids);
    //
    // seperation.mult(seperationSlider.value());
    // cohesion.mult(cohesionSlider.value());
    // alignment.mult(alignSlider.value());
    //
    // this.acceleration.add(seperation);
    // this.acceleration.add(alignment);
    // this.acceleration.add(cohesion);
   let steering = this.doBirdyThingy(boids);
    steering[0] = steering[0].mult(alignSlider.value());
    steering[1] = steering[1].mult(cohesionSlider.value());
    steering[2] = steering[2].mult(seperationSlider.value());

    for(let steer of steering)
      this.acceleration.add(steer);
  }

  update()
  {
    this.position.add(this.velocity);
    this.velocity.add(this.acceleration);
    this.velocity.limit(this.maxSpeed);
    this.acceleration.mult(0);
  }

  show()
  {
    // strokeWeight(16);
    // stroke(255);
    // point(this.position.x, this.position.y);
    let theta = this.velocity.heading() + PI/2;
    fill(175);
    stroke(0);
    push();
    translate(this.position.x, this.position.y);

    rotate(theta);
    beginShape();
    let r = 3.0;
    vertex(0, -r*2);
    vertex(-r, r*2);
    vertex(r, r*2);
    endShape(CLOSE);
    pop();
  }
}
