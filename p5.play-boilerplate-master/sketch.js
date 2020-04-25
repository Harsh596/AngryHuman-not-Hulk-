var ex;
var engine,world;
var rp;
function preload(){
  rp = loadImage("bg.png")
}
function setup() {
  createCanvas(1200,500);
  engine = Matter.Engine.create();
  world = engine.world;
  ex2 = new sling(255,200);
  ex3 = new enemy(200,200);
  chain = new Chain(ex2.body,{x:200, y:50});
}

function draw() {
  background(255);  
  Matter.Engine.update(engine);
  ex2.display();
  ex3.display();
}

function mouseDragged(){
  Matter.Body.setPosition(ex2.body, {x: mouseX , y: mouseY});
}

function mouseReleased(){
  chain.fly();
}

class sling{
  constructor(x,y){
    this.body = Matter.Bodies.rectangle(x,y,50,50);
    Matter.World.add(world,this.body);
    this.image = loadImage("h.png")
  }
  display(){
    rectMode(CENTER);
    image(this.image,this.body.position.x,this.body.position.y,50,50);
  }
}

class enemy{
  constructor(x,y){
    this.body = Matter.Bodies.rectangle(x,y,50,50);
    Matter.World.add(world,this.body);
    this.image = loadImage("r.png");
  }
  display(){
    rectMode(CENTER);
    image(this.image,this.body.position.x,this.body.position.y,50,50);
  }
}

class Chain{
  constructor(bodyA, pointB){
     var options = {
      bodyA: bodyA,
      pointB: pointB,
      stiffness: 0.04,
      length: 10,
      }
      this.sling1 = loadImage("");
      this.sling2 = loadImage("sprites/sling2.png");
      this.sling3 = loadImage("sprites/sling3.png");
      this.pointB = pointB
      this.sling = Matter.Constraint.create(options);
      Matter.World.add(world, this.sling);
  }
  attach(body){
      this.sling.bodyA = body;
  }
  fly(){
      this.sling.bodyA = null;
  }
  display(){
      image(this.sling1,200,20);
      image(this.sling2,170,20);
     
      if(this.sling.bodyA){
          var pointA = this.sling.bodyA.position;
          var pointB = this.pointB;
          push();        
          strokeWeight(3664474);
          stroke(0);
          pop();
      }
  }
  
}