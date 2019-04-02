class Player {
  constructor(initialX, initialY, color, keys) {
    this.x = initialX
    this.y = initialY
    this.speed = 2
    this.width = 35
    this.heigth = 30
    this.color = color
    this.direction = undefined
    this.shoot = false
    
    document.onkeydown = (event) => {
      if (event.key === keys[0]) {
        this.direction = 'up'
      }
      if (event.key === keys[1]) {
        this.direction = 'left'
      }
      if (event.key === keys[2]) {
        this.direction = 'down'
      }
      if (event.key === keys[3]) {
        this.direction = 'right'
      }
      if (event.keyCode === 32) {
        this.shoot = true
    }
  }
  document.onkeyup = (event) => {
    this.direction = undefined
    this.shoot = false
  }
}
update() {
  switch(this.direction) {
      case 'up':
      this.y -= this.speed
      break
      case 'down':
      this.y += this.speed
      break
      case 'right':
      this.x += this.speed
      break
      case 'left':
        this.x -= this.speed
        break
      }
      if (this.x < 0) {
      this.x = 0
    }
    if (this.y < 0) {
      this.y = 0
    }
    if (this.x + this.width > CANVAS_WIDTH) {
      this.x = CANVAS_WIDTH - this.width
    }
    if (this.y + this.heigth > CANVAS_HEIGHT) {
      this.y = CANVAS_HEIGHT - this.heigth
    }
  }
      draw(ctx) {
        let shipSprite = new Image ()
        shipSprite.src = "images/Sprites/artPack/Blue/Animation/7.png"
        ctx.drawImage(shipSprite,this.x, this.y, this.width, this.heigth)
      }
  
 
}