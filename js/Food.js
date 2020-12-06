class Food {
    constructor(x,y,width  , height ){
        var foodStock =fCount;
        var foodCount;
        var lastFed;
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.image = loadImage("sprites/Milk.png");
        this.image.scale = 0.02;
       
    }
  bedRoom(){
      this.background(bed);
  }
  
  garden(){
    this.background(garden);
  }

  washRoom(){
    this.background(wash);
  }
    display(){
    var x = 80;
    var y = 100;
    imageMode(CENTER);
  //  image(this.image,this.x,this.y,this.width,this.height);
   
    if(this.foodStock!=0){
        for(var i = 0;i<fCount;i++){
            if(i%10==0){
                x = 80;
                y = y+50
            }
            image(this.image,x,y,this.width,this.height);
            x = x+30;
        }
    }
}
getFoodStock(){
    var foodStockref = database.ref("Food");

    foodStockref.on("value",function(data){ fCount = data.val();})
   // console.log("bottleCount"+fCount);
}

updatefoodStock(count)
{
    console.log("updatefoodStock " + count );
    database.ref('/').update({
        Food:count
    }) 


    }
}