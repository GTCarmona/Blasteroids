class Asteroid {
  constructor(sprite) {
    this.radius = 20
    this.x = this.radius + Math.floor((CANVAS_WIDTH - 2 * this.radius + 1) * Math.random())
    this.y = -this.radius - 30
    this.vy = 1.8 // Velocity y

    let asteroid = new Image()
    asteroid.src = sprite
    this.asteroidImg = asteroid
  }
  draw(ctx) {
    ctx.save()
    if (DEBUG) {
      ctx.save()
      ctx.globalAlpha = 0.5
      ctx.fillStyle = "red"
      ctx.beginPath()
      ctx.arc(this.x, this.y, this.radius, 0, 2*Math.PI)
      ctx.fill()
      ctx.restore()
    }

    let imageSize = 2.5*this.radius
    ctx.drawImage(this.asteroidImg, this.x-imageSize/2, this.y-imageSize/2, imageSize, imageSize)
    ctx.restore()
  }
  update() {
    this.y += this.vy
   } 
}
