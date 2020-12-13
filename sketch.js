var monkey, monkeyRunning;
var jungleImage, jungle;
var invisibleGround;
var bananas, bananaImage, bananasGroup;
var stone, stoneImage, stoneGroup;
var gameOver, gameOverImg;
var restart, restartImg;
var changeMonkey;

var PLAY = 1;
var END = 0;
var gameState = PLAY;

var score = 0;
var monkeyTouched = 1;

function preload(){
  monkeyRunning = loadAnimation("Monkey_01.png","Monkey_02.png","Monkey_03.png","Monkey_04.png","Monkey_05.png","Monkey_06.png","Monkey_07.png","Monkey_08.png","Monkey_09.png","Monkey_10.png");
  jungleImage = loadImage("jungle.jpg");
  bananasImage = loadImage("banana.png");
  stoneImage = loadImage("stone.png");
  gameOverImg = loadImage("gameOver-1.png");
  restartImg = loadImage("restart.png");
  changeMonkey = loadImage("Monkey_01.png");
}

function setup(){
  createCanvas(500,400);
  
  jungle = createSprite(275,200,1000,100);
  jungle.scale = 1;
  jungle.velocityX = -3;
  jungle.addImage(jungleImage);
  
  monkey = createSprite(60,340,50,50);
  monkey.addAnimation("running", monkeyRunning);
  monkey.addAnimation("change", changeMonkey);
  monkey.scale = 0.15;
  
  invisibleGround = createSprite(250,380,500,10)
  invisibleGround.visible = false;
  
  gameOver = createSprite(250,200,50,10);
  gameOver.addImage(gameOverImg);
  gameOver.visible = false;
  
  restart = createSprite(250,250,30,30);
  restart.scale = 0.2;
  restart.addImage(restartImg);
  restart.visible = false;
  
  bananasGroup = new Group();
  stoneGroup = new Group();
  
}

function draw(){
  background(230);
  
if(gameState === PLAY){ 
  if(jungle.x<0){
    jungle.x = jungle.width/2;
  }
   if(keyDown("space") && monkey.y >= 100){
    monkey.velocityY = -10;
  }
  if(monkey.isTouching(bananasGroup)){
    score = score+2;
    bananasGroup.destroyEach();
  }
  if(monkey.isTouching(stoneGroup)&&monkeyTouched === 1){
    monkey.scale = 0.1;
    monkeyTouched = 2;
    stoneGroup.destroyEach();
  }
  if(monkey.isTouching(stoneGroup)&&monkeyTouched === 2){
    gameState = END;
  }
  monkey.velocityY = monkey.velocityY + 0.8;
  monkey.collide(invisibleGround); 
  
  spawnBananas();
  spawnStones();
}  
  if(gameState === END){
    monkey.collide(invisibleGround);
    monkey.changeAnimation("change", changeMonkey);
    bananasGroup.destroyEach();
    stoneGroup.destroyEach();
    jungle.velocityX = 0;
    gameOver.visible = true;
    restart.visible = true;
    
    if(mousePressedOver(restart)){
      reset();
    }
  }
  drawSprites();
  
  fill("black");
  text("Score : "+score,430,30);
}
function spawnBananas(){
  if(frameCount%100 === 0){
  var bananas = createSprite(350,210,25,25);
   bananas.y = Math.round(random(150,300));
   bananas.scale = 0.05;
   bananas.addImage(bananasImage);
   bananas.velocityX = -3;
    
   bananas.lifetime = 120;
   bananasGroup.add(bananas);
  }
}
function spawnStones(){
  if(frameCount%150 === 0){
  var stone = createSprite(400,360,20,20);
  stone.scale = 0.1;
  stone.velocityX = -3;
  stone.addImage(stoneImage); 
    
  stone.lifetime = 130;
  stoneGroup.add(stone);
  }
}
function reset(){
  gameState = PLAY;
  score = 0;
  gameOver.visible = false;
  restart.visible = false;
  monkey.changeAnimation("running", monkeyRunning);
  jungle.velocityX = -3;
  monkey.scale = 0.15; 
}