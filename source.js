var canvas = document.getElementById("game");
var ctx = canvas.getContext("2d");
canvas.width = innerWidth;
canvas.height = innerHeight;
const x = canvas.width/2;
const y = canvas.height/2;
const enemies = [];
const enemies2 = [];

class Player{
    constructor(x, y, radius, color){
        this.x = x,
        this.y = y,
        this.radius = radius,
        this.color = color
    }
    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI*2, false);
        ctx.fillStyle = this.color;
        ctx.fill();
    }
    update() {
        this.draw()
        this.x = this.y + this.velocity.x
        this.y = this.x + this.velocity.y
    }
}
let player = new Player (canvas.width / 2 , canvas.height / 2 , 30, 'red');
class Projectile{
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
        
        player.y - 10 >= 0 ? (player.y -= 10) : null;
        break;
      case "a":
   
        player.x - 10 >= 0 ? (player.x -= 10) : null;
        break;
      case "d":
      
        player.x + 10 <= canvas.width ? (player.x += 10) : null; 
        break;
      case "s":

        player.y + 10 <= canvas.height ? (player.y += 10) : null;
        break;
    }
  }
   const projectile = new Projectile(player.x, player.y, 30, 'blue', 
      {
        x: 1,
        y: 1
      })
  const projectiles = []
  function spawnEnemies() {
    setInterval(() => {
         const radius = Math.random() * (200 - 10) + 10
 
         let x
         let y
 
         if(Math.random() < 0.5) {
              x = Math.random() < 0.5 ? 0 - radius : canvas.width + radius
              y = Math.random() * canvas.height
             //let y = Math.random() < 0.5 ? 0 - radius : canvas.height + radius
         }else{
             x = Math.random() * canvas.width
             y = Math.random() < 0.5 ? 0 - radius : canvas.height + radius
         }
        
         const color = 'Orange'
         
       const angle = Math.atan2(canvas.height / 2 - y, canvas.width  / 2 - x)
         
         
      const velocity = {
             x: Math.cos(angle),
             y: Math.sin(angle)
         }
           //console.log(velocity);
         enemies.push(new Enemy(x, y, radius, color, velocity));
         console.log(enemies);
    }, 2000)
 }
function animate(){
      requestAnimationFrame(animate)
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      enemies.forEach((enemy, index) =>{
          enemy.update();

          projectiles.forEach((projectile, projectileIndex) =>{
            const distance =  Math.hypot(projectile.x - enemy.x, projectile.y - enemy.y)
            if(distance - enemy.radius - projectile.radius < 1){
                console.log('remove from screen')
                enemies.splice(index, 1)
                projectiles.splice(projectileIndex, 1)
            }
          })
      })
      player.draw();
      projectiles.forEach(projectile => {
          projectile.update()
        })
  }
  window.addEventListener('click', (event) =>{
      const angle = Math.atan2(event.clientY - player.y, event.clientX - player.x)
      console.log(angle);
      const velocity = {
          x:Math.cos(angle),
          y:Math.sin(angle) 
      }
      console.log(event.clientX);
      projectiles.push(new Projectile(player.x, player.y, 30, 'blue', velocity))
  })
  animate();
  spawnEnemies();


  