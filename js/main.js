const canvas = document.querySelector('canvas')
const ctx = canvas.getContext('2d')

const CANVAS_WIDTH = canvas.width
const CANVAS_HEIGHT = canvas.height

let frame = 0

let player = new Player(CANVAS_WIDTH/2,CANVAS_HEIGHT,'red', ['w','a','s','d'])
let asteroidSprite = ['/images/Sprites/artPack/Aestroids/aestroid_brown.png', 'images/Sprites/artPack/Aestroids/aestroid_dark.png',"images/Sprites/artPack/Aestroids/aestroid_gay_2.png","images/Sprites/artPack/Aestroids/aestroid_gray.png",]
let randomAsteroid = Math.floor(Math.random() * asteroidSprite.length)

let asteroid = [new Asteroids(asteroidSprite[randomAsteroid])]

function animation() {
  updateEverything()
  drawEverything()
  window.requestAnimationFrame(animation) // The function animation will be triggered when the brower is ready to draw something again
}
animation()

function drawEverything() {
  // Clearing all the canvas
  ctx.clearRect(0,0,canvas.width, canvas.height)

  //create player
  player.draw(ctx)
  //create asteroids
  for (let i = 0; i < asteroid.length; i++) {
    asteroid[i].draw(ctx)
  }
}

//onde insereris novos asteroides vais passar uma random source


// The goal of this function is to update each element
function updateEverything() {
  frame++
  asteroid[0].update()
  asteroid.forEach( lol => {
    lol.update()
  })
  player.update()

}
function removeAsteroids() {
//remove the 1st item if below the canvas
  if (asteroid[0].y - asteroid[0].radius - 20 > CANVAS_HEIGHT)
    asteroid.shift()
}
