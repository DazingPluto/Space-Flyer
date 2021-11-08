const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');
let spaceship =
{
    color: "black",
    width: 8,
    height: 22,
    position:
    {
        x: 0,
        y: 0
    },
    angle: 0,
    engineOn: false,
    rotatingLeft: false,
    rotatingRight: false
}

canvas.width = innerWidth;
canvas.height = innerHeight;

console.log('hello user');

class Spaceship {
    constructor (x , y , color , angle , engineOn , rotatingLeft , rotatingRight) {
        this.x
        this.y
        this.radius = radius;
        this.color = color;
        this.angle= 0;
        this.engineOn= false;
        this.rotatingLeft= false;
        this.rotatingRight= false;
    }
    
 drawSpaceship()
{
    context.save();
    context.beginPath();
    context.translate(spaceship.width , spaceship.height);
    context.rotate(spaceship.angle);
    context.rect(spaceship.width * -0.5, spaceship.height * -0.5, spaceship.width, spaceship.height);
    context.fillStyle = spaceship.color;
    context.fill();
    context.closePath();

    // Draw the flame if engine is on
    if(spaceship.engineOn)
    {
        context.beginPath();
        context.moveTo(spaceship.width * -0.5, spaceship.height * 0.5);
        context.lineTo(spaceship.width * 0.5, spaceship.height * 0.5);
        context.lineTo(0, spaceship.height * 0.5 + Math.random() * 5);
        context.lineTo(spaceship.width * -0.5, spaceship.height * 0.5);
        context.closePath();
        context.fillStyle = "orange";
        context.fill();
    }
    context.restore();
}
}




