const canvas = document.getElementById("game");  //declaring canvas as a variable
const ctx = canvas.getContext("2d");  //delcaring my animation context as 2d
const scoreID = document.querySelector('#score');
const startButton = document.querySelector('#startBtn');
const startModel = document.querySelector('#startModel');
const scoreAfter = document.querySelector('#scoreAfter');
let myMusic
canvas.width = innerWidth;
canvas.height = innerHeight;
const x = canvas.width/2;      /// this sets the basic inner size of my canvas, making movement and placement of my class instances more accurate.
const y = canvas.height/2;
let enemies = []; // the array holding balls
//let enemies2 = [];// thre array holding bombs
let projectiles = [];
function reset(){
     enemies = []; // the array holding balls
     player = new Player (canvas.width / 2 , canvas.height / 2 , 30, 'red');
     projectiles = [];
     score = 0
     scoreID.innerHTML = score;
     scoreAfter.innerHTML = score;
}
class Player{
    constructor(x, y, radius, color){           //<----- here i create a class called player and give it some basic contructors.
        this.x = x,
        this.y = y,
        this.radius = radius,
        this.color = color
    }
    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI*2, false); // i used the arc function, in order to create a circle on the screen, not a square
        ctx.fillStyle = this.color;
        ctx.fill();
    }
    update() {
        this.draw()
        this.x = this.y + this.velocity.x
        this.y = this.x + this.velocity.y
    }
}
let player = new Player (canvas.width / 2 , canvas.height / 2 , 30, 'red');  //creates my new player :)
class Projectile{
    constructor(x, y, radius, color, velocity){
        this.x = x 
        this.y = y
        this.radius = radius
        this.color = color
        this.velocity = velocity                        /// here we introduce projectile and give him the salve type of outline as player, since hes a cirle.. but we add velocity for constant angle specific movement.
    }
    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI*2, false);     // exactly the same draw as player, we are creating another circle.
        ctx.fillStyle = this.color;
        ctx.fill();
        //ctx.closePath();
    }
    update() {
        this.draw();
        this.x = this.x + this.velocity.x
        this.y = this.y + this.velocity.y 
    }
}
class Enemy{
    constructor(x, y, radius, color, velocity){
        this.x = x
        this.y = y
        this.radius = radius
        this.color = color
        this.velocity = velocity
    }
    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI*2, false);
        ctx.fillStyle = this.color;
        ctx.fill();
        //ctx.closePath();
    }
    update() {
        this.draw()
        this.x = this.x + this.velocity.x 
        this.y = this.y + this.velocity.y 
    }
}


document.addEventListener("keydown", movementHandler);

function movementHandler(e) {
    console.log("movement", e.key);
  
    switch (e.key) {
      case "w":
        
        player.y - 20 >= 0 ? (player.y -= 10) : null;
        break;
      case "a":
   
        player.x - 20 >= 0 ? (player.x -= 10) : null;                   //here i basically re created the same movement system in shrek.. and applied it to Player.
        break;
      case "d":
      
        player.x + 20 <= canvas.width ? (player.x += 10) : null; 
        break;
      case "s":

        player.y + 20 <= canvas.height ? (player.y += 10) : null;
        break;
    }
  }
   const projectile = new Projectile(player.x, player.y, 30, 'blue', 
      {
        x: 1,
        y: 1
      })
  function spawnEnemies() {// this created a spawn enemy function, holding everything i need to spawn and shape my enemies(balls)
    setInterval(() => {
         const radius = Math.random() * (100 - 5) + 5//// this looks weird, but all it says is, Make my raidus randome between 10 and 200.
 
         let x//i had to declare y and x as let, so i could constantly spawn enemies in at different locations.... 
         let y
 
         if(Math.random() < 0.5) {
              x = Math.random() < 0.5 ? 0 - radius : canvas.width + radius//this sets my spawn location to be 50% of the radius of the screen... since i placed this on x its basically allowing spawns to come from both horiszontal sides.
              y = Math.random() * canvas.height
         }else{
             x = Math.random() * canvas.width
             y = Math.random() < 0.5 ? 0 - radius : canvas.height + radius//thid allows spawns to be 50% of the raidus of the canvas.height of the screen.. so the TOP and BOTTOM.
         }
        
         const color = 'Orange'
         
       const angle = Math.atan2(canvas.height / 2 - y, canvas.width  / 2 - x)
         
         
      const velocity = {
             x: Math.cos(angle) * 2 ,          //here is where i set my x and y velocity to be always centered, that way all of my projectiles move in a baracading mannor
             y: Math.sin(angle) * 2 
         }
           //console.log(velocity);
         enemies.push(new Enemy(x, y, radius, color, velocity));   // <---------here velocity is called, and new enemies are created with all of the data provided above, Then PUSHed to the end of enemies array
         console.log(enemies);          //<-------this allows me to keep track of enemies and collision, to make sure everything is always looping and working.
    }, 1000)
 }
let animateOff
let score = 0;
function animate(){//this is creating a function and scope for everything i want to animate.
 animateOff = requestAnimationFrame(animate)//I chose to use request animation frame, for the final stages of my project.. this loops and clears everything in its SCOPE. which allows everything to move.
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      enemies.forEach((enemy, index) =>{
        const distance =  Math.hypot(player.x - enemy.x, player.y - enemy.y)/// end game 
            if(distance - enemy.radius - player.radius < 1){
                //console.log('go')
                cancelAnimationFrame(animateOff)
                startModel.style.display = 'flex';
                scoreAfter.innerHTML = score;
            }
          enemy.update();// this calls enemys' update function

          projectiles.forEach((projectile, projectileIndex) =>{
            const distance =  Math.hypot(projectile.x - enemy.x, projectile.y - enemy.y)/// collision detection between bombs and Balls.
            if(distance - enemy.radius - projectile.radius < 1){
                    score += 10;
                    scoreID.innerHTML = score;
                    console.log(score);
                enemies.splice(index, 1)// removes the selected index out of the array
                projectiles.splice(projectileIndex, 1)// removes the selected index out of the array
            }
          })
      })
      player.draw();//draws player, over and over as you move
      projectiles.forEach((projectile, index) => {//draws bombs
          projectile.update()

          if(projectile.x + projectile.radius < 0 || projectile.x - projectile.radius > canvas.width || projectiles.y + projectile.radius < 0 || projectile.y - projectile.radius > canvas.height){
            setTimeout(() => {// removes the selected index out of the array
            projectiles.splice(index, 1)// removes the selected index out of the array
            }, 0)
        }
    })
  }                         //event was use to find the X, Y location of my mouse.. So i could then use those locations in for Math.atan2() formula.. to create trajectory for my Bombs
  window.addEventListener('click', (event) =>{//this adds a click event listen i call to project a bullet
      const angle = Math.atan2(event.clientY - player.y, event.clientX - player.x)//here, i made a const Angle, which equals the single angle we get from the output of Math.atan2
      console.log(angle);
      const velocity = {
          x:Math.cos(angle) * 6,//cos is always X
          y:Math.sin(angle) * 6//sin is always Y 
      }
      console.log(event.clientX);
      projectiles.push(new Projectile(player.x, player.y, 30, 'blue', velocity))
  }) 
  startButton.addEventListener('click', () => {
        reset();
        console.log('go');
        animate();       // animate loop called
        spawnEnemies(); 
        startModel.style.display = 'none';
  })


  