const asteroidsImgs = ["images/Sprites/artPack/Aestroids/aestroid_brown.png","images/Sprites/artPack/Aestroids/aestroid_dark.png","images/Sprites/artPack/Aestroids/aestroid_gray.png"]

function createAsteroid () {
  let newAsteroid = document.createElement("img")
  let asteroidSpriteImg = asteroidsImgs[Math.floor(Math.random) * asteroidsImgs.length]
  newAsteroid.src = asteroidSpriteImg
  newAsteroid.classList.add("asteroid")
  newAsteroid.style.left = MAX_WIDTH
  newAsteroid.style.top = MAX_HEIGHT
  $mainPlayArea.appendChild(newAsteroid)
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