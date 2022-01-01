var canvas = document.getElementById('canvas');
var conctx = canvas.getContext('2d');

// Class For Snake Growthing
class SnakeGrow{
    constructor(x,y){
        this.x=  x;
        this.y = y;
    }
}

let grid = { // tile Size
    width : 14,
    height : 7
}

const snakeGrowth = [];
let tilelength = 0;
let Score = 0; //Score After eat onece time food

let tileSpace_x = 18; // Space between Two Tiles on Xaxis
let tileSpace_y = 9; // Space between Two Tiles on Yaxis

let snake_x = 10;// Snake On X position
let snake_y = 10;// Snake On Y position

let move_x = 0; // Snake move on Xaxis
let move_y = 0; // Snake move on Yaxis

let food_x = 6; // Food On X position
let food_y = 6; // Food On Y position

function PlayGame(){ // Play Game (loop)


    // Game Over After Snake Collides with Walls
    if(snake_x <= -1 || snake_y <=-1 || snake_x >= 17 || snake_y >= 17 ){
     alert(`Game Over !  score : ${Score}`) ;                                                                              
       location.reload()
    }

    screen(); //Black Screen
    Snake(); //Snake
    Food(); //Food
    ChangePosition(); //Change POsition
    FoodCollision_Check(); // Check Collision
    score(); //Score
    setTimeout(PlayGame , 1000 / 10 ) // Here 10 is Speed of Snake

}


function screen(){
    conctx.fillStyle = 'black';
    conctx.fillRect(0,0, canvas.width , canvas.height)
}

function  Snake(){

   conctx.fillStyle = '#129658';
   for (let i = 0; i < snakeGrowth.length; i++) {
       let Snake_tail = snakeGrowth[i];  //Snake Tail Increase
       conctx.fillRect(Snake_tail.x * tileSpace_x , Snake_tail.y * tileSpace_y ,   grid.width, grid.height)
   }
   
    snakeGrowth.push(new SnakeGrow( snake_x , snake_y) );
   
   if (snakeGrowth.length > tilelength ) {
       snakeGrowth.shift()+1; // It Will Increase One tile or Tail in the End
   }
   

    conctx.fillStyle = 'green';
    conctx.fillRect(snake_x * tileSpace_x , snake_y * tileSpace_y , grid.width, grid.height  )



}

function Food(){
    conctx.fillStyle = 'red';
    conctx.fillRect(food_x * tileSpace_x ,food_y * tileSpace_y , grid.width, grid.height)
}

function score(){
    conctx.fillStyle = 'white'
    conctx.font = '10px Arial'
    conctx.fillText(`Score : ${Score}` , canvas.width-50 , 10)
}


// Let's Move The Snake , Change the Position
function ChangePosition(){
    snake_x = snake_x + move_x;
    snake_y = snake_y + move_y;
}

function FoodCollision_Check(){ //Check Snake Collides with Food
      if(food_x ===  snake_x && food_y === snake_y){
          
            // Change The Apple Means Food Position On Y,Xaxis
            food_x = Math.floor(Math.random() *  tileSpace_x);
            food_y = Math.floor(Math.random() *  tileSpace_y);
            tilelength++; // Snake Tail Incerase After Eat Food
            Score++;
        }
}







// KeyBord key Function 
document.body.addEventListener('keyup' ,  (en)=>{
      // using Switch Statment You will Use IF Statment
    switch (en.keyCode) {

        case 38:
            if (move_y == 1)
                return
            move_y =  -1;
            move_x =  0; 
            break;
    
         // Move DOwn
        case 40:
            if (move_y == -1)
                return
            move_y =  1;
            move_x =  0; 
            break;
    
          //Move left
        case 37:
            if (move_x == 1)
                return
            move_y =  0;
            move_x =  -1; 
            break;
    
         //Move Right
        case 39:
            if (move_x == -1)
                return
            move_y =  0;
            move_x =  1; 
            break;
    
 
    }


})
PlayGame(); //Run 