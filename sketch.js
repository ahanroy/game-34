const Engine = Matter.Engine;
const Render = Matter.Render;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;
const Body = Matter.Body;
const Composites = Matter.Composites;
const Composite = Matter.Composite;

let engine;
let world;
var rope,fruit,ground;
var fruit_con;
var fruit_con_2;
var fruit_con_3;
var rope3;

var bg_img;
var food;
var rabbit;

var button,button2,button3;
var bunny;
var blink,eat,sad;
var mute_btn;
var blower

var fr;
var star1,star2,starimg
var bk_song;
var cut_sound;
var sad_sound;
var eating_sound;
var emptystar,onestar,twostar
var starDisplay
function preload()
{
  bg_img = loadImage('colorful-background-designs-png-11552181907opmxfwzu2d.png');
  food = loadImage('5642.png_860-removebg-preview.png');
  rabbit = loadImage('118-1186539_human-silhouette-standing-png-black-man-silhouette-png-removebg-preview.png');

  starimg=loadImage('images__1_-removebg-preview.png')
  
  bk_song = loadSound('sound1.mp3');
  sad_sound = loadSound("sad.wav")
  cut_sound = loadSound('rope_cut.mp3');
  eating_sound = loadSound('eating_sound.mp3');
  air = loadSound('air.wav');

  blink = loadAnimation("118-1186539_human-silhouette-standing-png-black-man-silhouette-png-removebg-preview.png","1-17669_human-silhouette-walking-png-human-standing-silhouette-png-removebg-preview.png")
  eat = loadAnimation("unnamed.png","png-transparent-death-cadaver-body-bag-chalk-outline-dead-s-fictional-character-signage-human-body-thumbnail-removebg-preview.png");
  sad = loadAnimation("images_i-removebg-preview.png","images_j-removebg-preview.png");
  emptystar=loadAnimation("empty.png")
  onestar=loadAnimation("one_star.png")
  twostar=loadAnimation("stars.png")

  blink.playing = true;
  eat.playing = true;
  sad.playing = true;
  sad.looping= false;
  eat.looping = false; 
}

function setup() 
{
  createCanvas(600,700);
  frameRate(80);

  bk_song.play();
  bk_song.setVolume(0.5);

  engine = Engine.create();
  world = engine.world;

  //star sprite 
  star1=createSprite(320,50,20,20)
  star1.addImage(starimg)
  star1.scale=0.2

  star2=createSprite(50,370,20,20)
  star2.addImage(starimg)
  star2.scale=0.2
  
  // stardisplay
   starDisplay=createSprite(50,20,30,30)
   starDisplay.scale=0.2
   starDisplay.addAnimation('empty',emptystar)
   starDisplay.addAnimation('one',onestar)
   starDisplay.addAnimation('two',twostar)
   starDisplay.changeAnimation('empty')
   

  // blower
  blower=createImg('coronavirus-5058255_960_720.png')
  blower.position(260,370)
  blower.size(120,120)
  blower.mouseClicked(airBlow)

  //btn 1
  button = createImg('cut_btn.png');
  button.position(80,225);
  button.size(50,50);
  button.mouseClicked(drop);

   //btn 2
   button2 = createImg('cut_btn.png');
   button2.position(470,150);
   button2.size(50,50);
   button2.mouseClicked(drop2);

   button3 = createImg('cut_btn.png');
   button3.position(490,280);
   button3.size(50,50);
   button3.mouseClicked(drop3);
   rope = new Rope(7,{x:100,y:225});
   rope2 = new Rope(7,{x:500,y:150});
   rope3= new Rope(7,{x:520,y:280})

  mute_btn = createImg('mute.png');
  mute_btn.position(width-50,20);
  mute_btn.size(50,50);
  mute_btn.mouseClicked(mute);
  
  ground = new Ground(300,height,width,20);
  blink.frameDelay = 20;
  eat.frameDelay = 20;

  bunny = createSprite(200,height-80,100,100);
  bunny.scale = 0.3;

  bunny.addAnimation('blinking',blink);
  bunny.addAnimation('eating',eat);
  bunny.addAnimation('crying',sad);
  bunny.changeAnimation('blinking');

  
  fruit = Bodies.circle(300,300,20);
  Matter.Composite.add(rope.body,fruit);

  fruit_con = new Link(rope,fruit);
  fruit_con_2 = new Link(rope2,fruit);
  fruit_con_3=new Link(rope3,fruit)

  rectMode(CENTER);
  ellipseMode(RADIUS);
  textSize(50)
  
}

function draw() 
{
  background(51);
  image(bg_img,0,0,width,height);

  push();
  imageMode(CENTER);
  if(fruit!=null){
    image(food,fruit.position.x,fruit.position.y,70,70);
  }
  pop();

  rope.show();
  rope2.show();
  rope3.show()
  Engine.update(engine);
  ground.show();

  drawSprites();

  if(collide(fruit,bunny,80)==true)
  {
    World.remove(engine.world,fruit);
    fruit = null;
    bunny.changeAnimation('eating');
    eating_sound.play();
  }
  
  if(collide(fruit,star1,20)===true){
    star1.visible=false
    starDisplay.changeAnimation('one')
  }

  if(collide(fruit,star2,20)===true){
    star2.visible=false
    starDisplay.changeAnimation('two')

  }

  if(fruit!=null && fruit.position.y>=650)
  {
    bunny.changeAnimation('crying');
    bk_song.stop();
    sad_sound.play();
    fruit=null;
   }
  
}

function drop()
{
  cut_sound.play();
  rope.break();
  fruit_con.dettach();
  fruit_con = null; 
}

function drop2()
{
  cut_sound.play();
  rope2.break();
  fruit_con_2.dettach();
  fruit_con_2 = null;
}

function drop3()
{
  cut_sound.play();
  rope3.break();
  fruit_con_3.dettach();
  fruit_con_3 = null;
}

function collide(body,sprite,x)
{
  if(body!=null)
        {
         var d = dist(body.position.x,body.position.y,sprite.position.x,sprite.position.y);
          if(d<=x)
            {
               return true; 
            }
            else{
              return false;
            }
         }
}


function mute()
{
  if(bk_song.isPlaying())
     {
      bk_song.stop();
     }
     else{
      bk_song.play();
     }
}
function airBlow(){
  Body.applyForce(fruit,{x:0,y:0},{x:0,y:-0.03})
}

