let game = document.querySelector("#game"); // <canvas>
let movementDisplay = document.querySelector("#score");
let shrek;
let donkey;
let ctx = game.getContext("2d"); // this creates a 2 dimensional canvas

ctx.fillStyle = "white";
ctx.strokeStyle = "red";
ctx.lineWidth = 5;

// ====================== SETUP FOR CANVAS RENDERING ======================= //
game.setAttribute("height", getComputedStyle(game)["height"]);
game.setAttribute("width", getComputedStyle(game)["width"]);

// ====================== ENTITIES ======================= //
class Crawler {
  constructor(x, y, color, width, height,) {
    this.x = x;
    this.y = y;
    this.color = color;
    this.height = height;
    this.width = width;
    this.alive = true;
    

    this.render = function () {
      ctx.fillStyle = this.color; // change the color of the context (ctx)
      ctx.fillRect(this.x, this.y, this.width, this.height);
    };
  }
}

let rambo = new Crawler(100, 100, 'darkgreen', 25, 25);
console.log(rambo);
rambo.render();

// ====================== PAINT INTIAL SCREEN ======================= //

// EVENT LISTENERS
window.addEventListener("DOMContentLoaded", function (e) {
  donkey = new Crawler(10, 20, "red", 20, 20);
  shrek = new Crawler(100, 200, "#bada55", 40, 80);
  gravityMotion();

  const runGame = setInterval(gameLoop, 120);
});

function gravityMotion(){
    donkey.y + 10 <= game.height ? (donkey.y += 10) : null;
}

document.addEventListener("keydown", movementHandler);

// ====================== SETUP FOR CANVAS RENDERING ======================= //
// 2D rendering context for canvas element.
// It is used for drawing shapes, text, images, and other objects.

// ====================== HELPER FUNCTIONS ======================= //
// SANDBOX FOR TESTING PAINTING TECHNIQUES

//  GUI
function addNewShrek() {
  shrek.alive = false;
  setTimeout(function () {
    let x = Math.floor(Math.random() * game.width) - 40;
    let y = Math.floor(Math.random() * game.height) - 80;
    shrek = new Crawler(x, y, "#bada55", 40, 80);
  }, 1000);
  return true;
}

//  KEYBOARD INTERACTION LOGIC
function movementHandler(e) {
  console.log("movement", e.key);

  switch (e.key) {
    case "w":
      // move donkey up
      donkey.y - 10 >= 0 ? (donkey.y -= 10) : null;
      break;
    case "a":
      // move the donkey left
      donkey.x - 10 >= 0 ? (donkey.x -= 10) : null;
      break;
    case "d":
      // move donkey to the right
      donkey.x + 10 <= game.width ? (donkey.x += 10) : null; // ternary operator
      break;
    case "s":
      // move donkey down
      donkey.y + 10 <= game.height ? (donkey.y += 10) : null;
      break;
    case "ArrowUp":
      // move donkey up
      donkey.y - 10 >= 0 ? (donkey.y -= 10) : null;
      break;
    case "ArrowLeft":
      // move the donkey left
      donkey.x - 10 >= 0 ? (donkey.x -= 10) : null;
      break;
    case "ArrowRight":
      // move donkey to the right
      donkey.x + 10 <= game.width ? (donkey.x += 10) : null; // ternary operator
      break;
    case "ArrowDown":
      // move donkey down
      donkey.y + 10 <= game.height ? (donkey.y += 10) : null;
      break;

    /**
             * Ternary Operator
             *  donkey.y + 10 <= game.height ? donkey.y += 10 : null;
             * 
             if (donkey.y + 10 <= game.height) {
                return donkey.y += 10
             } else {
                return null
             }
             * 
             * */
  }
}

// ====================== GAME PROCESSES ======================= //
/**
 * @function gameLoop
 * @todo clear the canvas
 * @todo display the x and y coords of our donkey
 * @todo check if the shrek is alive. ( a ) render shrek ( b ) check for collision
 * @todo render the donkey
 */
function gameLoop() {
  // clear the canvas
  ctx.clearRect(0, 0, game.width, game.height);
  // @todo - add score
  // display the x and y coords of our donkey
  movementDisplay.textContent = `X:${donkey.x}\nY:${donkey.y}`;
  // check to see if shrek is alive
  if (shrek.alive) {
    //
    // render shrek
    shrek.render();
    // @todo - check collision (detchHit -> f)
    let hit = detectHit(donkey, shrek);
  }
  // render donkey
  donkey.render();
}

// ====================== COLLISION DETECTION ======================= //
/**
 * @function detectHit
 * @param {object<Crawler>} p1 - donkey.y + donkey.height
 * @param {object<Crawler>} p2 - shrek.y
 * @todo if the bottom of one below is above the other
 * @todo if the top of one is above the bottom of another
 * @todo if the right of one is right of the others left
 */
function detectHit(p1, p2) {
  // what do we know know to be true
  // what conditions must false for the hit to be true
  // Crawler ( x, y, width, height )
  // console.log(p1.y + p1.height > p2.y);
  // console.log(p1.y < p2.y + p2.height);
  // console.log(p1.x + p1.width > p2.x);
  // console.log(p1.x < p2.x + p2.width);

  let hitTest =
    p1.y + p1.height > p2.y &&
    p1.y < p2.y + p2.height &&
    p1.x + p1.width > p2.x &&
    p1.x < p2.x + p2.width; // {boolean} : if all are true -> hit

  if (hitTest) {
    return addNewShrek();
  } else {
    return false;
  }
}

// **********************************
// CODE STASH FOR OLD CODE
// **********************************