const canvas = document.querySelector('#canvas');
const ctx = canvas.getContext('2d');
canvas.width = 1000;
canvas.height = 800;

const key = [] /// holds all of our keys for our key functions

const player={
    x:0,
    y:0,
    width: 32,
    height: 44.5,
    frameX: 0,
    frameY:0,
    //gravity:y - 6,
    speed: 9,
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
    drawSprite(playerSrite, 0, 0, player.width, player.height, 200, 200, player.width, player.height);
    requestAnimationFrame(animateGame);
}
animateGame();






