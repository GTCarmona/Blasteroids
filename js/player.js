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
  newLaser.src = "images/Sprites/artPack/Blue/bullet.png"
  newLaser.classList.add("laser")
  newLaser.style.left = `${xPosition}px`
  newLaser.style.top = `${yPosition }px`
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
