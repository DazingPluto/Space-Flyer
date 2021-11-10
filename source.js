document.addEventListener('DOMContentLoaded', () =>{
    const spaceship =  document.querySelector('.spaceship');
    const gameDisplay = document.querySelector('.container');
    const ground = document.querySelector('ground');
    const projectile = document.querySelector('.projectile');

    let spaceshipLeft = 220;
    let spaceshipBottom = 100;
    let gravity = 6;
    let thrust = 10;
    let projectileBottom = spaceshipBottom;
    let projectileLeft = spaceshipLeft;


function startGame() {
    spaceship.style.bottom = spaceshipBottom + 'px';
    spaceship.style.left = spaceshipLeft + 'px';
    if(spaceshipBottom > 10) spaceshipBottom -= gravity;
    projectile.style.bottom = projectileBottom + 'px';
    projectile.style.left =  projectileLeft + 'px';
    }
 let timerID = setInterval(startGame, 20);

 function control(e) {
     if(e.keyCode === 32){
         jump()
     }
 }


function jump(){
   if(spaceshipBottom < 750) spaceshipBottom += 130;
    spaceship.style.bottom = spaceshipBottom + 'px';
    console.log(spaceshipBottom);
}
addEventListener('keyup', control);

function generateMeteor() {
    let meteorLeft = 2000;
    let randomeHeight = Math.random() * 800;
    let meteorBottom = randomeHeight;
    const meteor = document.createElement('div');
    meteor.classList.add('meteor');
    gameDisplay.appendChild(meteor);
    meteor.style.bottom = meteorBottom + 'px';
    meteor.style.left = meteorLeft + 'px';

    function moveMeteor(){
        meteorLeft -= 2;
        meteor.style.left = meteorLeft + 'px';
        
        if(meteorLeft === 0){
            clearInterval(timerID);
            gameDisplay.removeChild(meteor);
        }
    }
    let timerID =  setInterval(moveMeteor, 20)
    setTimeout(generateMeteor, 5000);

}
generateMeteor();





//document.addEventListener('click', function(){
    //console.log('hello world');
})