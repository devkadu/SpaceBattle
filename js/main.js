const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d')



let laser =[];
let frames = 0;


const somGame = new Audio();
somGame.src='../img/bensound-epic.mp3'


//SCORE

 function score() {
  const points = Math.floor(frames / 5);
  ctx.fillStyle = "red";
  ctx.fillText(`SCORE: ${points}`, 250, 50);
  ctx.font = '30px Orbitron'
 }



//BACKGROUND
const img = new Image();
img.src ='../img/fundo1.jpg'


const background ={
    img: img,
    sx: 250,
    sy: 1900,
    dwidth: 700,
    dheight: 700,
    x: 0,
    y: -1200,
    width: 700,
    height: 1900,
    speed: 0.2,

    move: function() {
        this.y += this.speed;
        this.y %= canvas.height;
      },

    draw(){
        ctx.drawImage(this.img, 0, this.y);
    if (this.speed < 0) {
      ctx.drawImage(this.img, 0, this.y + this.img.height);
    } else {
      ctx.drawImage(this.img, 0, this.y - canvas.height);
    
        }
    }
}

//NAVE PLAYER1
const spaconave = new Image()
  spaconave.src = '../img/x-wing.png';

class Nave {
  constructor(source, x, y, w, h){
    this.posX = x;
    this.posY = y;
    this.width = w;
    this.height = h;
    this.speed = 6;

    const img = new Image()
    img.src = source;
    img.onload = () =>{
      this.img = img
    }
  }

  draw(){
    ctx.drawImage(spaconave, this.posX, this.posY, this.width, this.height);
  }



    top(){
      return this.posY;
    }
    bottom(){
      return this.posY + this.height;
    }
    left(){
      return this.posX;
    }
    right(){
      return this.posX + this.width;
    }

    moveUp() {
        if(this.posY > 0)
        this.posY -= 25;
      }
      moveDown() {
        if(this.posY < 500)
        this.posY += 25;
      }
      moveLeft() {
          if(this.posX > 12.9)
        this.posX -= 25;
      }
      moveRight() {
        if(this.posX < 618)
        this.posX += 25;
      }

      checkCollision(obstacle) {
        return !(
          this.top() > obstacle.bottom() ||
          this.bottom() < obstacle.top() ||
          this.left() > obstacle.right() ||
          this.right() < obstacle.left() 
        )
      }
      
      }

      const player = new Nave('../img/x-wing.png', 300, 450, 80, 96)

     

      


   //ACTIONS 

document.addEventListener('keydown', e => {
    switch (e.key) {
      case 'ArrowUp':
        player.moveUp();
    
        break;
      case 'ArrowDown':
        player.moveDown();
        break;
      case 'ArrowLeft':
        player.moveLeft();
        break;
      case 'ArrowRight':
        player.moveRight();
        break;
        case ' ':
          shoots.draw();
            break;
    }
     })
  
  //OBSTACLES

  const asteroid = new Image()
  asteroid.src = '../img/asteroid-icon.png';
 
  
  class Obstacle {
    constructor(source, x, w, h){
      this.posX = x;
      this.posY = 0;
      this.width = w;
      this.height = h;
      this.speed = 4;

      const tt = new Image()
      tt.src = source;
      tt.onload = () =>{
        this.tt = tt
      }
    }

    draw(){
      ctx.drawImage(asteroid, this.posX, this.posY, this.width, this.height)  
    }
    move(){
      this.posY += this.speed;
    }
    top(){
      return this.posY;
    }
    bottom(){
      return this.posY + this.height;
    }
    left(){
      return this.posX; 
    }
    right(){
      return this.posX + this.width;
    }
    
}


const obstacles = [];
       

   function createObstacle(){
     const minWidth = 50;
     const maxWidth = player.width * 3;
     const minHeight = minWidth;
     const maxHeight = maxWidth;
     
     const width = Math.floor(Math.random()* 100)
     const height = width;
     const posX = Math.floor(Math.random()* canvas.width);
     const obstacle = new Obstacle('../img/asteroid-icon.png', posX, width, height)
     obstacles.push(obstacle);
     }


     


function updateObstacles(){
  for (i = 0; i < obstacles.length; i += 1) {
    obstacles[i].move();
    obstacles[i].draw();
    if (obstacles[i] > 600){
      obstacles.shift();
    }
   if(player.checkCollision(obstacles[i])){
     console.log('collision')
     return true;
   }
  }
    
    if(frames % 90 === 0){
        createObstacle();
    }}

    //COLISÃO





//FUNCTIONS
function startGame(){
  update()
  somGame.play()
} 
 function render(){

}

function update(){
    frames +=1;
    clearCanvas()
    background.draw()
    background.move()
    player.draw();
    const crash = updateObstacles();
    if(!crash){
     animationId = requestAnimationFrame(update);
    } else {
      stopGame()
      gameOver()
      
    }
    score()

}

function clearCanvas(){
  ctx.clearRect(0, 0, canvas.width, canvas.heigt) 
}


startGame();



function stopGame() {
  somGame.pause()
  console.log('stop', 'animationId')
  cancelAnimationFrame(animationId);
  
 }

 function gameOver(){
   clearCanvas();
   ctx.fillStyle='black'
   ctx.fillRect(0, 0, canvas.width, canvas.height)
   ctx.fillStyle ='red'
   ctx.fillText('GAME OVER...', 230, 320, 700)

 }
