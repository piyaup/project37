var database;
var dog;
var happyDog;
var fCount;
var foodS
var dogStanding;
var bed;
var garden;
var wash;
var lastFed;
var gState;
var lastFedref

function preload(){
  dogStanding = loadImage("sprites/Dog.png");
  dogHappy = loadImage("sprites/happydog.png");
  bed = loadImage("sprites/bedRoom.png");
  garden = loadImage("sprites/garden.png");
  wash = loadImage("sprites/washRoom.png");
  }

function setup(){
  
  database = firebase.database();
 // console.log(database);
  createCanvas(500,500);
  dog = createSprite(250,300,150,150);
  dog.addImage(dogStanding);
  dog.scale = 0.3;
  foodObj = new Food(20,20,50,50);
  //foodObj.scale = 0.00003;
  //foodStock =  database.ref('foodStock').once("value");
  // foodStock= database.ref('Food');

  // foodStock.on("value", readStock);
  foodObj.getFoodStock();
  
  feed = createButton("Feed the Dog")
  feed.position(250,50);
  feed.mousePressed(feedDog);

  addFood = createButton("Add Food");
  addFood.position(400,50);
  addFood.mousePressed(giveFood);

 }

function draw(){
      background("green");
     // background(bed);
      foodObj.display();
drawSprites();

fill("black");
textSize(24);
text("Food remaning :"+fCount,160,120);
getFeedTime();
getGameState();
if(lastFed>=12){
  text("Last Feed: "+lastFed%12+"PM",50,20);
}else if(lastFed==0){
  text("Last Fed: 12 AM",50,20 );
}else{
  text("Last Fed: "+lastFed+"AM",50,20);
}

//console.log("gamestate " + gState);

    if(gState != "hungry")
    {
      feed.hide();
      addFood.hide();
     // dog.remove();
    } else
    {
      //console.log("inside else gamestate " + gState);
      feed.show();
      addFood.show();
      dog.addImage(dogStanding);
    }

    currentTime = hour();

   // console.log("currentTime " + currentTime + "lastFedref" + lastFed)
    if(currentTime  == (lastFed +1  ) )
    {
       console.log("1 ");
       update("Playing")
       //foodObj.garden();
       background(garden)
    } else if(currentTime  == (lastFed+2) )
    {
      console.log("2 "); 
      update("Sleeping")
      //foodObj.bedRoom();
      background(bed)
    } else if(currentTime  > (lastFed+2)  && currentTime <= (lastFed +4 ) )
    {
      console.log("3 ");
       update("Bathing");
       foodObj.washRoom();
    } else{
      console.log("4 ");
      update("hungry")
      foodObj.display();
     
    }
       
}

function writeStock(x){
  if(x<=0){
    x = 0
  }
  else{
    x = x-1;
  }
  database.ref('/').update({
    Food : x
  })
}


function feedDog (){
  dog.addImage(dogHappy);
  foodObj.getFoodStock();
  foodObj.updatefoodStock(fCount-1);
  console.log("deefDog " + fCount);
  database.ref('/').update({
    feedTime: hour()
  })
  getFeedTime();


}

function giveFood(){
  fCount++;
  console.log("addFood " + fCount);
foodObj.updatefoodStock(fCount);
console.log("addFood " + fCount);
dog.addImage(dogStanding);
}

function getFeedTime(){
  lastFedref = database.ref("feedTime");

  lastFedref.on("value",function(data){ lastFed = data.val();})
}

function update(state)
{
  database.ref('/').update({
    gameState:state
  })
  
}

function getGameState()
{
  var gStateDB = database.ref("gameState");

  gStateDB.on("value",function(data){ gState = data.val();})
}