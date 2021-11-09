document.addEventListener('DOMContentLoaded', () =>{
    const spaceship =  document.querySelector('.spaceship');
    const gameDisplay = document.querySelector('.container');
    const ground = document.querySelector('ground');
    const projectile = document.querySelector('.projectile');

    let spaceshipLeft = 220;
    let spaceshipBottom = 100;
    let gravity = 2;
    let thrust = 10;
    let projectileBottom = 220;
    let projectileLeft = 100;


function startGame() {
    spaceship.style.bottom = spaceshipBottom + 'px';
    spaceship.style.left = spaceshipLeft + 'px';
    spaceshipBottom -= gravity;
    projectile.style.bottom = projectileBottom + 'px';
    projectile.style.left =  projectileLeft + 'px';
    }
 let timerID = setInterval(startGame, 20);


function jump(){
    spaceshipBottom += 50;
    spaceship.style.bottom = spaceshipBottom + 'px';
}
addEventListener('keyup', jump);

})



//document.addEventListener('click', function(){
    //console.log('hello world');
//})