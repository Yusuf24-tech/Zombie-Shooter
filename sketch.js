var bgImg,shooter,shooting,zombies,heart1Img,heart2Img,heart3Img,bullet,bullets=55;
var zombieGroup,bulletGroup;
var gameState="fight";
var life=3;
var score=0;
var restart;
var explosion,lose,win;

function preload(){
bgImg=loadImage("Assets/bg.jpeg")
shooter=loadImage("Assets/shooter_2.png")
shooting=loadImage("Assets/shooter_3.png")
zombies= loadImage("Assets/zombie.png")
heart1Img=loadImage("Assets/heart_1.png")
heart2Img=loadImage("Assets/heart_2.png")
heart3Img=loadImage("Assets/heart_3.png")
explosion=loadSound("Assets/explosion.mp3")
lose=loadSound('Assets/lose.mp3');
win=loadSound("Assets/win.mp3")
}

function setup() {
  createCanvas(windowWidth,windowHeight);
bg= createSprite(windowWidth/2-20,windowHeight/2-20,10,10) 
bg.addImage("bg",bgImg)
bg.scale=1.1;

player= createSprite(windowWidth/2-300,windowHeight/2,50,20)
player.addImage("shooter",shooter)
player.scale=0.4;
player.debug=true;
player.setCollider("rectangle",0,0,300,300)

heart1=createSprite(displayWidth/2+400,displayHeight/2-300,10,10)
heart1.addImage("heart1",heart1Img)
heart1.scale=0.3
heart1.visible=true;

heart2=createSprite(displayWidth/2+430,displayHeight/2-300,10,10)
heart2.addImage("heart2",heart2Img)
heart2.scale=0.3
heart2.visible=false;

heart3=createSprite(displayWidth/2+460,displayHeight/2-300,10,10)
heart3.addImage("heart3",heart3Img)
heart3.scale=0.3
heart3.visible=false;
 
restart=createButton("Replay");
restart.position(displayWidth/2-50,displayHeight/2-50);
restart.style('background-color', color(17, 255, 0));
restart.style('font-size', '30px');
restart.style('border-radius','50%');
restart.style('border-width','10px');
restart.style('border-color','blue');
restart.style('border-style','outset double outset double');
restart.style('font-family', 'Architects Daughter');
restart.style('padding','16px');
restart.style('box-shadow','0 12px 16px 0 rgba(0,0,0,0.2)','0 17px 20px 0 rgba(0,0,0,0.19)');

zombieGroup= new Group();
bulletGroup= new Group();

}

function draw() {
  background(255,255,255);
  if(gameState==="fight"){
   
    restart.hide();
    
  drawSprites();
  fill("yellow")
  textSize(20)
  text("Score :"+score,displayWidth/2+450,displayHeight/2-250);
if(keyDown(UP_ARROW)) {
player.y=player.y-2;
}
if(keyDown(DOWN_ARROW)) {
  player.y=player.y+2;
  }
  if(keyWentDown("space")){
player.addImage("shooter",shooting)
  }
  else if(keyWentUp("space")){
player.addImage("shooter",shooter)
bullet=createSprite(windowWidth/2-250,player.y,20,10)
bullet.velocityX=20;
bulletGroup.add(bullet);
player.depth=bullet.depth
player.depth=player.depth+2
bullets=bullets-1;

  }
if(zombieGroup.isTouching(player)){
for(var i=0 ;i< zombieGroup.length;i++){
if(zombieGroup[i].isTouching(player)){
  zombieGroup[i].destroy();
  life=life-1;


}
}
}
console.log(life)
  if(zombieGroup.isTouching(bulletGroup)){
    for(var i=0; i< zombieGroup.length; i++){
    if(zombieGroup[i].isTouching(bulletGroup)){
zombieGroup[i].destroy();
bulletGroup.destroyEach();
score=score+2;
explosion.play();
    }
    }
  }
    
if(life==3){
  heart3.visible=true;
  heart2.visible=false;
  heart1.visible=false;
}
if(life==2){
  heart3.visible=false;
  heart2.visible=true;
  heart1.visible=false;
}
if(life==1){
  heart3.visible=false;
  heart2.visible=false;
  heart1.visible=true;
  
}
  spawnEnemies();
  if(bullets===0){
  gameState="bullet"

  
  }
  if(life===0){
    gameState="lost"
    }
    if(score=== 100){
      gameState="won"
    }
}
else if(gameState=== "bullet"){
  background(0);
  textSize(80);
  fill("yellow");
  text("You Ran Out OF Bullets",displayWidth/2-400,displayHeight/2-100 );
  zombieGroup.destroyEach();
  player.visible=false;
  bulletGroup.destroyEach();
  restart.mousePressed(()=>{
    gameState="fight";
    score=0;
    heart3.visible=true;
    heart2.visible=true;
    heart1.visible=true;
    player.visible=true;
    
  })

  
}
if(gameState==="lost"){
  background(0);
  textSize(100)
  fill("red")
  text("You Lost",displayWidth/2-150,displayHeight/2-100)
  lose.play();
  zombieGroup.destroyEach();
  player.visible=false;
  restart.show();
 restart.mousePressed(()=>{
   gameState="fight";
   score=0;
   heart3.visible=true;
   heart2.visible=true;
   heart1.visible=true;
   player.visible=true;
   
   
 })


}
if(gameState==="won"){
  background(0);
  textSize(75)
  fill("red")
  text("You Won",displayWidth/2-140,displayHeight/2-100)
  win.play();
  text("Final Score: "+ score,displayWidth/2-200,displayHeight/2-20)
  zombieGroup.destroyEach();
  player.visible=false;
  restart.hide();


}


}

function spawnEnemies(){
  if(frameCount % 100 === 0){
zombie= createSprite(windowWidth,windowHeight/2,50,20)
zombie.velocityX=-2;
zombie.y= Math. round(random(200,windowHeight-200))
zombie.addImage("zombie",zombies)
zombie.scale=0.15;
zombie.lifetime=displayWidth/-2;
zombie.debug=true;
zombie.setCollider("rectangle",0,0,400,600)
zombieGroup.add(zombie);
  }
}


