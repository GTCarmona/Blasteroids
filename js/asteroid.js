class Asteroid {
  constructor(sprite) {
    this.radius = 35
    this.x = this.radius + Math.floor((CANVAS_WIDTH - 2 * this.radius + 1) * Math.random())
    this.y = -this.radius - 30
    this.vy = 3.0 // Velocity y
    this.angle = 0
    this.scale = 1
    
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
    ctx.save()
    let imageSize = 2.5*this.radius
    ctx.drawImage(this.asteroidImg, this.x-imageSize/2, this.y-imageSize/2, imageSize, imageSize)
    ctx.translate(100,100)
    ctx.rotate(this.angle)
    ctx.scale(this.scale, this.scale)
    ctx.restore()
  }
  update() {
    this.y += this.vy
    this.angle += 0.02
    this.scale *= 0.99
   } 
}
