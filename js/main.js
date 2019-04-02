const $startButton = document.getElementById("start-button")
const $mainPlayArea = document.getElementById("main-play-area")
const $player = document.getElementById("player")

let MAX_WIDTH = parseInt(window.getComputedStyle($mainPlayArea).getPropertyValue("width"))
let MAX_HEIGHT = parseInt(window.getComputedStyle($mainPlayArea).getPropertyValue("height"))




$startButton.addEventListener("click", (event) => {
  playGame()
})


function playGame() {
  $startButton.style.display = "none"
  window.addEventListener("keydown", moveShip)
  createAsteroid () 
  // moveAsteroid()
}
