class Asteroids {
  constructor(sprite) {
    this.size = 30
    this.x = this.size+Math.floor((CANVAS_WIDTH-2*this.size+1)*Math.random())
    this.y = -this.size -30
    this.vy = 1.7 // Velocity y
    
    let asteroid = new Image()
    asteroid.src = sprite
    this.asteroidImg = asteroid
  }
  draw(ctx) {
    ctx.fillStyle = "yellow"
    ctx.drawImage(this.asteroidImg, this.x,this.y, 40, 40)
 
  }
  update() {
    this.y += this.vy
  }
}