class Bullet {
  constructor() {
    this.radius = 5
    this.x = player.x
    this.y = player.y - player.radius
    this.vy = -12 // Velocity y
  
  }
  draw(ctx) {
    ctx.save()
    let bulletSprite = new Image()
    bulletSprite.src = "images/Sprites/artPack/Blue/bullet.png"
    
    let imageSize = 8*this.radius
    ctx.drawImage(bulletSprite, this.x-imageSize/2, this.y-imageSize/3, imageSize, imageSize)

    if (DEBUG) {
      ctx.save()
      ctx.globalAlpha = 0.5
      ctx.fillStyle = "red"
      ctx.beginPath()
      ctx.arc(this.x, this.y, this.radius, 0, 2*Math.PI)
      ctx.fill()
      ctx.restore()
    }
    ctx.restore()
  }
  update() {
    this.y += this.vy
    
  }

}