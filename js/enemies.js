const asteroidsImgs = ["images/Sprites/artPack/Blue/communication_ship_animation/1.png"]
function createAsteroid () {
  let newAsteroid = document.createElement("img")
  let asteroidSpriteImg = asteroidsImgs[Math.floor(Math.random) * asteroidsImgs.length]
  newAsteroid.src = asteroidSpriteImg
  newAsteroid.classList.add("asteroid")
  newAsteroid.style.left = MAX_WIDTH
  newAsteroid.style.top = MAX_HEIGHT
  $mainPlayArea.appendChild(newAsteroid)
  return newAsteroid
}

// function moveAsteroid(asteroid){
//   let moveAsteroidInterval = setInterval(() => {
//     let xPosition = parseInt(window.getComputedStyle(asteroid).getPropertyValue("left"))
//     if(xPosition <= 0){
//       asteroid.remove()
//   } else {
//     asteroid.style.left = `${xPosition - 4}`
//   }
// },30)
// }