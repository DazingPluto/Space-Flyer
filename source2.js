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
    movePlayer();
    gravity();
}
animateGame();
window.addEventListener("keydown", function(e){
    keys[e.keyCode] = true;
    console.log(keys);
});
window.addEventListener("keyup", function(e){
    delete keys[e.keyCode];
});
function movePlayer (){
    if(keys[38] && player.y > 20){
        player.y -= player.speed;
    }
}
function gravity(){
    if(player.y < 750){
    player.y += 6;
    }
}
window.addEventListener('click', function(event){
    //console.log(event);
    //console.log('click works!');
    const projectile = new Projectile(
        event.clientY, event.clientX, 100, 'red', null);
        projectile.draw();
})





