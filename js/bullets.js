class Bullets {
  constructor() {
    this.size = 10
    this.x = player.x
    this.y = player.y
    this.vy = 1 // Velocity y
  
  }
  draw(ctx) {
    ctx.fillStyle = "red"
    ctx.fillRect(this.x, this.y, this.size, this.size)
  }
  update() {
    this.y -= this.vy
  }
}