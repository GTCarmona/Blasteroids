const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

const DEBUG = true
const CANVAS_WIDTH = canvas.width;
const CANVAS_HEIGHT = canvas.height;
//variables
let page = "home" // possible values: "game", "home", "game-over"



let frame
let time
let player
let bullets
let scoreboard
let background
let asteroids

function resetGame() {
  frame = 0;
  time = 100
  player = new Player(CANVAS_WIDTH / 2, CANVAS_HEIGHT)
  bullets = [];
  scoreboard = new Scoreboard ()
  background = new Background()
  asteroids = []
}

let status = true
//asteroid.js
let asteroidSprite = [
  "/images/Sprites/artPack/Aestroids/aestroid_brown.png",
  "images/Sprites/artPack/Aestroids/aestroid_dark.png",
  "images/Sprites/artPack/Aestroids/aestroid_gay_2.png",
  "images/Sprites/artPack/Aestroids/aestroid_gray.png"
];

//functions

function animation() {
  if (page === "game") {
    updateEverything();
    drawEverything();
  }
  if (page === "game-over")
    drawGameOverPage()
  if (page === "home")
    drawHomePage()
  window.requestAnimationFrame(animation);
}
animation()





function drawEverything() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  background.draw(ctx);
  scoreboard.draw(ctx)

  player.draw(ctx);

  for (let i = 0; i < asteroids.length; i++) {
    asteroids[i].draw(ctx);
  }
  for (let i = 0; i < bullets.length; i++) {
    bullets[i].draw(ctx);
  }
}



function updateEverything() {
  frame++
  
  player.update();
  // asteroid draw
 
  if (frame % time === 0) {
    let randomAsteroid = Math.floor(Math.random() * asteroidSprite.length);
    asteroids.push(new Asteroid(asteroidSprite[randomAsteroid]));
  }
  asteroids.forEach(element => {
    element.update();
  });

  bullets.forEach(element => {
    element.update();
  });

  if (player.shoot) {
    if (player.frameBeforeShooting === 0) {
      bullets.push(new Bullet())
      player.frameBeforeShooting = 30

    }
  }
  for (let i = 0; i < asteroids.length; i++) {
    for (let z = 0; z < bullets.length; z++) {
      if (checkCollisionBullets(bullets[z], asteroids[i])) { // asteroid  -- bullet
       scoreboard.update()
       asteroids.splice(i,1)
       bullets.splice(z,1)
        console.log("ASTEROID HIT")
      }
    }
  }
  for (let i = 0; i < asteroids.length; i++) { // asteroid -- player
       if (checkCollisionPlayer(player, asteroids[i])) {
         console.log("Collision detected")
         gameOver()
       }
      } 
      
      IncreaseDifficulty200 ()
      IncreaseDifficulty400 ()
      background.update();
      removeBullets()
      removeAsteroids();

    }

function checkCollisionBullets(bullet, asteroid) {
  let distance = Math.sqrt((asteroid.x - bullet.x) ** 2 + (asteroid.y - bullet.y) ** 2)
  return (bullet.radius) + asteroid.radius > distance
}

function checkCollisionPlayer(player, asteroid) {
  let distance = Math.sqrt((asteroid.x - player.x) ** 2 + (asteroid.y - player.y) ** 2)
  return player.radius + asteroid.radius > distance
}





function removeBullets() {
  for (let i = 0; i < bullets.length; i++) {
    if (bullets[i].y < 0)
      bullets.shift();
  }
}


function removeAsteroids() {
  for (let i = 0; i < asteroids.length; i++) {
    if (asteroids[i].y - asteroids[i].radius - 20 > CANVAS_HEIGHT)
      asteroids.shift();
  }
}

function IncreaseDifficulty200 (){
  for (let i = 0; i < asteroids.length; i++) {
  if(scoreboard.totalScore >= 50){
    asteroids[i].vy = 3.5
    time = 60
    bullets.vy = -8
    background.y += 0.8
  }
}
}

function IncreaseDifficulty400 (){
  for (let i = 0; i < asteroids.length; i++) {
  if(scoreboard.totalScore >= 100){
    asteroids[i].vy = 4.2
    time = 20
    bullets.vy = -20
    background.y += 0.8
  }
}
}

function gameOver() {
  page = "game-over"
}



window.onkeydown = event => {
  if (event.keyCode === 13) { // Enter
    page = "game"
    resetGame()
  }
}



function drawGameOverPage() {
  ctx.save()
  
  // Black Background
  ctx.fillStyle = "black"
  ctx.fillRect(0,0,CANVAS_WIDTH,CANVAS_HEIGHT)
  
  // Text
  ctx.fillStyle = "white"
  ctx.font = "20px Arial"
  ctx.textAlign = "center"
  ctx.fillText("Game Over", CANVAS_WIDTH/ 2, 100)
  ctx.fillText("Press Enter to Re Start", CANVAS_WIDTH/ 2, 200)

  ctx.restore()
}


function drawHomePage() {
  ctx.save()
  
  // Black Background
  ctx.fillStyle = "black"
  ctx.fillRect(0,0,CANVAS_WIDTH,CANVAS_HEIGHT)
  
  // Text
  ctx.fillStyle = "white"
  ctx.font = "20px Arial"
  ctx.textAlign = "center"
  ctx.fillText("Home", CANVAS_WIDTH/ 2, 100)
  ctx.fillText("Press Enter to Start", CANVAS_WIDTH/ 2, 200)

  ctx.restore()
}