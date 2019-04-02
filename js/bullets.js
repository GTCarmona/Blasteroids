class Bullets {
  constructor(initialX,initialY){
  this.x = initialX
  this.y = initialY
  this.size = 10
  }

  draw(ctx) {
    ctx.fillSyle = "yellow"
    ctx.fillRect(this.x, this.y, this.side, this.side)
  }
}
