const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

const DEBUG = false
const CANVAS_WIDTH = canvas.width;
const CANVAS_HEIGHT = canvas.height;
//variables
let page = "home"

let blastSound = new Audio()
blastSound.src = "audio/Weapons/Lasers/sfx_wpn_laser8.wav"

let explosionAsteroid = new Audio()
explosionAsteroid.src = "audio/Explosions/Shortest/sfx_exp_shortest_hard8.wav"


let milestoneAudio1 = new Audio()
milestoneAudio1.loop = false
milestoneAudio1.src = "MP3/eagleeye.mp3"

let milestoneAudio2 = new Audio()
milestoneAudio2.loop = false
milestoneAudio2.src = "MP3/impressive.mp3"

let milestoneAudio3 = new Audio()
milestoneAudio3.loop = false
milestoneAudio3.src = "MP3/unreal.mp3"

let milestoneAudio4 = new Audio()
milestoneAudio4.loop = false
milestoneAudio4.src = "MP3/rocketscientist.mp3"


let milestoneAudio5 = new Audio()
milestoneAudio5.loop = false
milestoneAudio5.src = "MP3/unstoppable.mp3"

let milestoneAudio6 = new Audio()
milestoneAudio6.loop = false
milestoneAudio6.src = "MP3/godlike.mp3"

let gameOverVoice = document.getElementById("game-over")
let backgroundMusic = document.getElementById("background-music")
let frame
let time
let player
let bullets
let scoreboard
let background
let asteroids

function resetGame() {
  backgroundMusic.play()
  frame = 0;
  time = 60
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
  if (page === "home")
    drawHomePage()

  if (page === "game") {
    updateEverything();
    drawEverything();

  }
  if (page === "game-over")
    drawGameOverPage()

  window.requestAnimationFrame(animation);
}
animation()

function drawEverything() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  background.draw(ctx);


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
       explosionAsteroid.play()
       bullets.splice(z,1)
        console.log("ASTEROID HIT")
      }
    }
  }
  for (let i = 0; i < asteroids.length; i++) { // asteroid -- player
       if (checkCollisionPlayer(player, asteroids[i])) {
        
         gameOver()
       }
      } 
      
      IncreaseDifficulty200 ()
      IncreaseDifficulty400 ()
      IncreaseDifficulty600 ()
      IncreaseDifficulty800 ()
      IncreaseDifficulty1000()
      playMileStone ()
      
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


function playMileStone () {
  for (let i = 0; i < asteroids.length; i++) {
    if (scoreboard.totalScore === 200) 
      milestoneAudio1.play()
  }
for (let i = 0; i < asteroids.length; i++) {
    if (scoreboard.totalScore === 400) 
    milestoneAudio2.play()
}
for (let i = 0; i < asteroids.length; i++) {
    if (scoreboard.totalScore === 600) 
    milestoneAudio3.play()
}
for (let i = 0; i < asteroids.length; i++) {
    if (scoreboard.totalScore === 800) 
    milestoneAudio4.play()
}
for (let i = 0; i < asteroids.length; i++) {
    if (scoreboard.totalScore === 1100) 
    milestoneAudio5.play()
    
}
for (let i = 0; i < asteroids.length; i++) {
  if (scoreboard.totalScore === 1500) 
  milestoneAudio6.play()
}
}

function IncreaseDifficulty200() {
  for (let i = 0; i < asteroids.length; i++) {
    if (scoreboard.totalScore >= 200) {
      asteroids[i].vy = 4
      time = 40
      background.y += 0.2
  
    }
  }
}

function IncreaseDifficulty400() {
  for (let i = 0; i < asteroids.length; i++) {
    if (scoreboard.totalScore >= 400) {
      asteroids[i].vy = 4.5
      time = 30
      background.y += 0.2
      
    }
  }
}

function IncreaseDifficulty600() {
  for (let i = 0; i < asteroids.length; i++) {
    if (scoreboard.totalScore >= 600) {
      asteroids[i].vy = 4.5
      time = 18
      background.y += 0.2
      
    }
  }
}

function IncreaseDifficulty800() {
  for (let i = 0; i < asteroids.length; i++) {
    if (scoreboard.totalScore >= 800) {
      asteroids[i].vy = 5.0
      time = 18
      background.y += 0.2
      
    }
  }
}

function IncreaseDifficulty1000() {
  for (let i = 0; i < asteroids.length; i++) {
    if (scoreboard.totalScore >= 1100) {
      asteroids[i].vy = 5.5
      time = 15
      background.y += 0.1
      bullets.vy =-16
    }
  }
}
function IncreaseDifficulty1000() {
  for (let i = 0; i < asteroids.length; i++) {
    if (scoreboard.totalScore >= 1500) {
      asteroids[i].vy = 6
      time = 10
      background.y += 0.1
      
    }
  }
}
function gameOver() {
  page = "game-over"
  backgroundMusic.pause()
  gameOverVoice.play()
  saveScore(scoreboard.totalScore)
  renderHighScores()
  scoreboard.totalScore = 0
}

window.onkeydown = event => {
  if (event.keyCode === 13) { // Enter
    page = "game"
    resetGame()
    
  }
}
 
function drawGameOverPage() {
  ctx.save()
 
  ctx.fillStyle = "black"
  ctx.fillRect(0,0,CANVAS_WIDTH,CANVAS_HEIGHT)
  //Text
  ctx.fillStyle = "red"
  ctx.font = "80px modithorsonexpandital"
  ctx.textAlign = "center"
  ctx.fillText("Game Over", CANVAS_WIDTH/ 2, 200)
  ctx.font = "30px modithorsonexpandital"
  ctx.fillText("Press Enter to Re-Start", CANVAS_WIDTH/ 2, 400)

  ctx.restore()
}


function drawHomePage() {
  ctx.save()
  
  // Black Background
  ctx.fillStyle = "black"
  ctx.fillRect(0,0,CANVAS_WIDTH,CANVAS_HEIGHT)
  
  // Text
  ctx.fillStyle = "white"
  ctx.font = "50px modithorsongrad"
  ctx.textAlign = "center"
  ctx.fillText("Instructions:",CANVAS_WIDTH/ 2, 100)
  ctx.fillText("Move with arrowkeys", CANVAS_WIDTH/ 2, 200)
  ctx.fillText("Press Space to blast", CANVAS_WIDTH/ 2, 250)
  ctx.fillText("Press Enter to Start", CANVAS_WIDTH/ 2, 400)

  ctx.restore()
}


function getHighScores() {
  let highScores = JSON.parse(localStorage.getItem('highScores'))
  if (!highScores) {
    highScores = []
  }
  return highScores
}
function saveScore(newScore) {
  let highScores = getHighScores()
  highScores.push({
    name: prompt('Enter your name', 'AAA'),
    score: newScore
  })
  highScores.sort((a,b) => {
    return b.score - a.score
  })
  localStorage.setItem('highScores', JSON.stringify(highScores))
}
function renderHighScores() {
  let highScores = getHighScores()
  document.getElementById('high-score-1-score').innerText = highScores[0].score
  document.getElementById('high-score-1-name').innerText = highScores[0].name
  document.getElementById('high-score-2-score').innerText = highScores[1].score
  document.getElementById('high-score-2-name').innerText = highScores[1].name
  document.getElementById('high-score-3-score').innerText = highScores[2].score
  document.getElementById('high-score-3-name').innerText = highScores[2].name
  document.getElementById('high-score-3-score').innerText = highScores[3].score
  document.getElementById('high-score-3-name').innerText = highScores[3].name
  document.getElementById('high-score-3-score').innerText = highScores[4].score
  document.getElementById('high-score-3-name').innerText = highScores[4].name
  document.getElementById('high-score-3-score').innerText = highScores[5].score
  document.getElementById('high-score-3-name').innerText = highScores[5].name
}
renderHighScores()


