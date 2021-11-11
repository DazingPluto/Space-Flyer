const canvas = document.querySelector('#canvas');
const ctx = canvas.getContext('2d');
canvas.width = 1000;
canvas.height = 800;

const keys = []; /// holds all of our keys for our key functions

const player={
    x:200,
    y:200,
    width: 32,
    height: 44.5,
    frameX: 0,
    frameY:0,
    gravity:- 6,
    speed: 20,
    moving: false,
}
const projectile ={
    x: 0,
    y: 0,
    width: 10,
    height: 50,
    frameX: 0,
    frameY: 0,
    speed: 100,
    moving: false
}
const projectileBullet = new Image ();
    projectileBullet.src="/Users/huntermcguire/Desktop/BulletIcon.png";
function drawBullet(img, sX, sY, sW, sH, dX, dY, dW, dH){
    ctx. drawImage(img, sY, sX, sW, sH, dX, dY, dW, dH);
}
const playerSrite = new Image ();
    playerSrite.src="/Users/huntermcguire/Desktop/silverbat.png";
const background = new Image ();
    background.src="/Users/huntermcguire/Desktop/360_F_264279006_WDXxV3OHjAOoHqH7iiLDrg23p0947g7U.jpeg";
function drawSprite(img, sX, sY, sW, sH, dX, dY, dW, dH){
    ctx. drawImage(img, sY, sX, sW, sH, dX, dY, dW, dH);
}
function animateGame(){
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(background, 0, 0, canvas.width, canvas.height);
    drawSprite(playerSrite, 0, 0, player.width, player.height, player.x, player.y, player.width, player.height);
    requestAnimationFrame(animateGame);
    drawBullet(projectileBullet, 0, 0, projectile.width, projectile.height, projectile.x, projectile.y, player.width, player.height);
    movePlayer();
    gravity();
}
animateGame();
window.addEventListener("keydown", function(e){
    keys[e.keyCode] = true;
    console.log(keys);
    if(e.keyCode === 32){
        shootBullet();
    }
});
window.addEventListener("keyup", function(e){
    delete keys[e.keyCode];
});
function movePlayer (){
    if(keys[38] && player.y > 20){
        player.y -= player.speed;
        console.log('Moving Works!');
    }
}
function gravity(){
    if(player.y < 750){
    player.y += 6;
    }
}
window.addEventListener('click', function(e){
    console.log('click works');
    console.log(e);
    
})
function shootBullet(){
        drawBullet.dX += projectile.speed;
        console.log('space works!');
    

}






