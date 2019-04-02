const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

const CANVAS_WIDTH = canvas.width;
const CANVAS_HEIGHT = canvas.height;
//variables
let frame = 0;

let player = new Player(CANVAS_WIDTH / 2, CANVAS_HEIGHT, "red", [
  "w",
  "a",
  "s",
  "d"
]);

let bullet = [new Bullets()];

let background = new Background();

//asteroid.js
let asteroidSprite = [
  "/images/Sprites/artPack/Aestroids/aestroid_brown.png",
  "images/Sprites/artPack/Aestroids/aestroid_dark.png",
  "images/Sprites/artPack/Aestroids/aestroid_gay_2.png",
  "images/Sprites/artPack/Aestroids/aestroid_gray.png"
];
let randomAsteroid = Math.floor(Math.random() * asteroidSprite.length);
let asteroid = [new Asteroids(asteroidSprite[randomAsteroid])];

//functions

function animation() {
  updateEverything();
  drawEverything();
  window.requestAnimationFrame(animation); 
}
animation();




function drawEverything() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  background.draw(ctx);
  //create player
  player.draw(ctx);
  //create asteroids
  for (let i = 0; i < asteroid.length; i++) {
    asteroid[i].draw(ctx);
  }
  if (player.shoot === true) {
    for (let i = 0; i < bullet.length; i++) {
      bullet[i].draw(ctx);
    }
  }
}



  function updateEverything() {
    frame++;
    player.update();
    // asteroid draw
    if (frame % 100 === 0) {
      let randomAsteroid = Math.floor(Math.random() * asteroidSprite.length);
      asteroid.push(new Asteroids(asteroidSprite[randomAsteroid]));
    }
    asteroid.forEach(element => {
      element.update();
    });
    

    // background.update();
    removeAsteroids();

    function removeAsteroids() {
      if (asteroid[0].y - asteroid[0].size - 20 > CANVAS_HEIGHT)
        asteroid.shift();
    }
  }

