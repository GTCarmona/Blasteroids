class Player {
  constructor(initialX, initialY, keys) {
    this.x = initialX
    this.y = initialY
    this.speed = 4
    this.radius = 30
    this.direction = undefined
    this.shoot = false
    this.frameBeforeShooting = 3 // We need to wait 5 frames to shoot
    this.isUpPressed = false
    this.isLeftPressed = false
    this.isDownPressed = false
    this.isRightPressed = false



    document.onkeydown = (event) => {
      event.preventDefault();

      if (event.keyCode === 38) {
        this.isUpPressed = true
      }
      if (event.keyCode === 37) {
        this.isLeftPressed = true
      }
      if (event.keyCode === 40) {
        this.isDownPressed = true
      }
      if (event.keyCode === 39) {
        this.isRightPressed = true
      }
      if (event.keyCode === 32) {
        blastSound.play()
        this.shoot = true
      }
    }
    document.onkeyup = (event) => {
      event.preventDefault();

      if (event.keyCode === 38) {
        
        this.isUpPressed = false
      }
      if (event.keyCode === 37) {
        this.isLeftPressed = false
      }
      if (event.keyCode === 40) {
        this.isDownPressed = false
      }
      if (event.keyCode === 39) {
        this.isRightPressed = false
      }
      if (event.keyCode === 32) {
        this.shoot = false
      }
    }
  }
  update() {
    if (this.frameBeforeShooting > 0) {
      this.frameBeforeShooting--
    }

    if (this.isUpPressed) {
      this.y -= this.speed
    }
    if (this.isDownPressed) {
      this.y += this.speed
    }
    if (this.isLeftPressed) {
      this.x -= this.speed
    }
    if (this.isRightPressed) {
      this.x += this.speed
    }


    if (this.x < 0) {
      this.x = 0
    }
    if (this.y < 0) {
      this.y = 0
    }
    if (this.x + this.radius > CANVAS_WIDTH) {
      this.x = CANVAS_WIDTH - this.radius
    }
    if (this.y + this.radius > CANVAS_HEIGHT) {
      this.y = CANVAS_HEIGHT - this.radius
    }
  }
  draw(ctx) {
    if (DEBUG) {
      ctx.save()
      ctx.globalAlpha = 0.5
      ctx.fillStyle = "red"
      ctx.beginPath()
      ctx.arc(this.x, this.y, this.radius, 0, 2*Math.PI)
      ctx.fill()
      ctx.restore()
    }
    let shipSprite = new Image()
    shipSprite.src = "images/Sprites/artPack/Blue/Animation/7.png"
    let imageSize = 2.7*this.radius
    ctx.drawImage(shipSprite, this.x-imageSize/2, this.y-imageSize/2, imageSize, imageSize)
  }
 

}