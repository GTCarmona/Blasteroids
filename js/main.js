const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

const DEBUG = false
const CANVAS_WIDTH = canvas.width;
const CANVAS_HEIGHT = canvas.height;
//variables
let page = "home"



let reachedScore200 = false
let reachedScore400 = false
let reachedScore600 = false
let reachedScore800 = false
let reachedScore1100 = false
let reachedScore1500 = false
let reachedScore1800 = false
let reachedScore2000 = false
let reachedScore2500 = false

let blastSound = new Audio()
blastSound.src = "audio/Weapons/Lasers/sfx_wpn_laser8.wav"



let explosionAsteroid = new Audio()
explosionAsteroid.src = "audio/Explosions/Shortest/sfx_exp_shortest_hard8.wav"

let bgm = new Audio()
bgm.src = "2019-01-02_-_8_Bit_Menu_-_David_Renda_-_FesliyanStudios.com.mp3"

let deathAudio = new Audio()
deathAudio.src = "audio/Explosions/Double/sfx_exp_double1.wav"

let milestoneAudio1 = new Audio()
milestoneAudio1.src = "MP3/topgun.mp3"
let milestoneAudio2 = new Audio()
milestoneAudio2.src = "MP3/impressive.mp3"
let milestoneAudio3 = new Audio()
milestoneAudio3.src = "MP3/unreal.mp3"
let milestoneAudio4 = new Audio()
milestoneAudio4.src = "MP3/rocketscientist.mp3"
let milestoneAudio5 = new Audio()
milestoneAudio5.src = "MP3/unstoppable.mp3"
let milestoneAudio6 = new Audio()
milestoneAudio6.src = "MP3/godlike.mp3"
let milestoneAudioX = new Audio()
milestoneAudioX.src = "MP3/maniac.mp3"
let milestoneAudio7 = new Audio()
milestoneAudio7.src = "MP3/dominating.mp3"
let milestoneAudio8 = new Audio()
milestoneAudio8.src = "MP3/blazeofglory.mp3"




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
  bgm.play()
  frame = 0;
  time = 60
  player = new Player(CANVAS_WIDTH / 2, CANVAS_HEIGHT)
  bullets = [];
  
  scoreboard = new Scoreboard ()
  background = new Background()
  asteroids = []
}

//asteroid.js
let asteroidSprite = [
  "images/Sprites/artPack/Aestroids/aestroid_brown.png",
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
    renderHighScores()

  }
  // test
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
// Bullets draw
  bullets.forEach(element => {
    element.update();
  });

  if (player.shoot) {
    if (player.frameBeforeShooting === 0) {
      bullets.push(new Bullet())
      player.frameBeforeShooting = 30

    }
  }

   // CHECKING COLLISION IN BULLETS
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
      IncreaseDifficulty1500()
      IncreaseDifficulty2000()
      IncreaseDifficulty2500()
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


function playMileStone() {
  if (scoreboard.totalScore === 200 && !reachedScore200) {
    reachedScore200 = true
    milestoneAudio1.play()
    setTimeout(() => {
      milestoneAudio1.pause()
    }, 2000);
  }
  if (scoreboard.totalScore === 400 && !reachedScore400) {
    reachedScore400 = true
    milestoneAudio2.play()
    setTimeout(() => {
      milestoneAudio2.pause()
    }, 2500);
  }
  if (scoreboard.totalScore === 600 && !reachedScore600) {
    reachedScore600 = true
    milestoneAudio3.play()
    setTimeout(() => {
      milestoneAudio3.pause()
    }, 2000);
  }
  if (scoreboard.totalScore === 800 && !reachedScore800) {
    reachedScore800 = true
    milestoneAudio4.play()
    setTimeout(() => {
      milestoneAudio4.pause()
    }, 2000);
  }
  if (scoreboard.totalScore === 1100 && !reachedScore1100) {
    reachedScore1100 = true
    milestoneAudio5.play()
    setTimeout(() => {
      milestoneAudio5.pause()
    }, 3000);
  }
  if (scoreboard.totalScore === 1500 && !reachedScore1500) {
    reachedScore1500 = true
    milestoneAudio6.play()
    setTimeout(() => {
      milestoneAudio6.pause()
    }, 2500);
  }
    if (scoreboard.totalScore === 1800 && !reachedScore1800) {
      reachedScore1800 = true
      milestoneAudioX.play()
      setTimeout(() => {
        milestoneAudioX.pause()
      }, 2500);
  }
  if (scoreboard.totalScore === 2000 && !reachedScore2000) {
    reachedScore2000 = true
    milestoneAudio7.play()
    setTimeout(() => {
      milestoneAudio7.pause()
    }, 3000);
  }
  if (scoreboard.totalScore === 2500 && !reachedScore2500) {
    reachedScore2500 = true
    milestoneAudio8.play()
    setTimeout(() => {
      milestoneAudio8.pause()
    }, 3000);
  }
}

function IncreaseDifficulty200() {
  for (let i = 0; i < asteroids.length; i++) {
    if (scoreboard.totalScore >= 200) {
      asteroids[i].vy = 4.6
      time = 40
      background.y += 0.2
  
    }
  }
}


function IncreaseDifficulty400() {
  for (let i = 0; i < asteroids.length; i++) {
    if (scoreboard.totalScore >= 400) {
      asteroids[i].vy = 5
      time = 30
      background.y += 0.2
      
    }
  }
}

function IncreaseDifficulty600() {
  for (let i = 0; i < asteroids.length; i++) {
    if (scoreboard.totalScore >= 600) {
      asteroids[i].vy = 6
      time = 18
      background.y += 0.2
      player.speed = 5
      
    }
  }
}

function IncreaseDifficulty800() {
  for (let i = 0; i < asteroids.length; i++) {
    if (scoreboard.totalScore >= 800) {
      asteroids[i].vy = 6.5
      time = 15
      background.y += 0.2
      
    }
  }
}

function IncreaseDifficulty1000() {
  for (let i = 0; i < asteroids.length; i++) {
    if (scoreboard.totalScore >= 1100) {
      asteroids[i].vy = 6.5
      time = 10
      background.y += 0.3
      bullets.vy =-19
      player.speed = 6
    }
  }
}
function IncreaseDifficulty1500() {
  for (let i = 0; i < asteroids.length; i++) {
    if (scoreboard.totalScore >= 1500) {
      asteroids[i].vy = 7
      time = 10
      background.y += 0.4
      
    }
  }
}
function IncreaseDifficulty2000() {
  for (let i = 0; i < asteroids.length; i++) {
    if (scoreboard.totalScore >= 2000) {
      asteroids[i].vy = 7.5
      time = 8
      background.y += 0.2
      player.speed = 7
      
    }
  }
}
function IncreaseDifficulty2500() {
  for (let i = 0; i < asteroids.length; i++) {
    if (scoreboard.totalScore >= 2500) {
      asteroids[i].vy = 7.7
      time = 6
      
      player.speed = 7
      
    }
  }
}

window.onkeydown = event => {
  event.preventDefault();

  if (event.keyCode === 13) { // Enter
    console.log("ENTER PRESSED")

    page = "game"
    resetGame()
    document.getElementById("scoreboard").innerHTML ="Score: 00"
    console.log("page status", page)
  }
}
function gameOver() {
  page = "game-over"
  bgm.pause()
  deathAudio.play()
  gameOverVoice.play()
  setTimeout(() => {
  saveScore(scoreboard.totalScore)
  renderHighScores()
  }, 1000)
 
}

 
function drawGameOverPage() {
  ctx.save()
 
  ctx.fillStyle = "black"
  ctx.fillRect(0,0,CANVAS_WIDTH,CANVAS_HEIGHT)
  //Text
  ctx.fillStyle = "red"
  ctx.font = "110px modithorsongrad"
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

//GET HIGHSCORES
function getHighScores() {
  let highScores = JSON.parse(localStorage.getItem('highScores'))
  if (!highScores) {
    highScores = []
  }
  highScores.push({score:0, name: ""})
  highScores.push({score:0, name: ""})
  highScores.push({score:0, name: ""})
  highScores.push({score:0, name: ""})
  highScores.push({score:0, name: ""})
  return highScores
}

function saveScore(newScore) {
  let highScores = getHighScores()
  highScores.push({
    name: prompt('Enter your name', "AAA"),
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
  document.getElementById('high-score-4-score').innerText = highScores[3].score
  document.getElementById('high-score-4-name').innerText = highScores[3].name
  document.getElementById('high-score-5-score').innerText = highScores[4].score
  document.getElementById('high-score-5-name').innerText = highScores[4].name
  
  }
renderHighScores()