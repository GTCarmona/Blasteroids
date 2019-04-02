const $startButton = document.getElementById("start-button")
const $mainPlayArea = document.getElementById("main-play-area")
const $player = document.getElementById("player")





$startButton.addEventListener("click", (event) => {
  playGame()
})


function moveShip(event) {
  if (event.key === "ArrowUp") {
    event.preventDefault()
    moveUp()
  } else if (event.key === "ArrowDown") {
    event.preventDefault()
    moveDown()
  } else if (event.key === " ") {
    event.preventDefault()
    fireLaser()
  }
}


function moveUp() {
  let topPosition = window.getComputedStyle($player).getPropertyValue('top')
  if ($player.style.top === "0px") {
    return
  } else {
    let position = parseInt(topPosition)
    position -= 4
    $player.style.top = `${position}px`
  }
}


function moveDown() {
  let topPosition = window.getComputedStyle($player).getPropertyValue("top")
  if ($player.style.top === window.getComputedStyle($mainPlayArea).getPropertyValue("height")) {
    return
  } else {
    let position = parseInt(topPosition)
    position += 4
    $player.style.top = `${position}px`
  }
}


function fireLaser() {
  let laser = createLaserElement()
  $mainPlayArea.appendChild(laser)
  moveLaser(laser)
}


function createLaserElement() {
  let xPosition = parseInt(window.getComputedStyle($player).getPropertyValue('left'))
  let yPosition = parseInt(window.getComputedStyle($player).getPropertyValue('top'))
  let newLaser = document.createElement("img")
  newLaser.src = "images/Laser_Red_Thick_512.png"
  newLaser.classList.add("laser")
  newLaser.style.left = `${xPosition}px`
  newLaser.style.top = `${yPosition - 10}px`
  return newLaser
}


function moveLaser(laser) {
  let laserInterval = setInterval(() => {
    let xPosition = parseInt(laser.style.left)
    if (xPosition >= 600) {
      laser.remove()
    } else {
      laser.style.left = `${xPosition + 2}px`
    }
  }, 10)
}





function playGame() {
  $startButton.style.display = "none"
  window.addEventListener("keydown", moveShip)
  
}
