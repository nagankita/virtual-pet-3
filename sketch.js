//Create variables here
var food;
var gameState="hungry"

var bedroomImg, gardenImg, washroomImg;
function preload()
{
	//load images here
  dogHappy=loadImage("images/dogImg1.png")
  dogSad=loadImage(" images/dogImg.png")
  bedroomImg=loadImage("virtual pet images/Bed Room.png")
  gardenImg=loadImage("virtual pet images/Garden.png")
  washroomImg=loadImage("virtual pet images/Wash Room.png")
}

function setup() {
	createCanvas(800, 700);
  database= firebase.database()
  database.ref('food').on("value",readPosition)

  milk1=new Food();
  milk1.getfeedTime()
  dog=createSprite(700,400,50,50)
  dog.addImage(dogSad)
  dog.scale=0.2

  database.ref('gameState').on("value",(data)=>{
    gameState=data.val()
  })



}


function draw() {  
background(0)
  //add styles here
textSize(20)
//text("food remaining:" +food,300,200)
//text("press up arrow key, to feed the dog",100,50)

text("FEDTIME:"+ milk1.feedtime,200,50)
milk1.buttons()
milk1.milkImg()

currentTime=20
if(currentTime == (milk1.feedtime+1)){
milk1.updateState("playing")
milk1.garden()
}
else if(currentTime ==(milk1.feedtime+2)){
  milk1.updateState("sleeping")
  milk1.bedRoom()
}
else if(currentTime==(milk1.feedtime+3)){
milk1.updateState("bathing")
milk1.washRoom()
}
else{
  milk1.updateState("hungry")
}



if(gameState !== "hungry"){
milk1.button1.hide()
milk1.button2.hide()
dog.remove()
}
else {
  milk1.button1.show()
  milk1.button2.show()

  dog.addImage(dogSad)
  dog.scale=0.2

}

if(food===0){
  dog.addImage(dogHappy)
  dog.scale=0.2
}
drawSprites();
}
function readPosition(data){
  food=data.val()

}

function writeStock(data){
database.ref('/').update({
  food:data,
  feedtime:hour ()
})
}
