class Scoreboard {
  constructor(){
  this.x = 0
  this.y = 50
  this.totalScore = 0

}
draw(ctx) {
  ctx.fillText(`Score : ${this.totalScore}`,this.x,CANVAS_HEIGHT,200)
  ctx.font = "20px Arial"
  ctx.fillStyle = "yellow"
  

}
update() {
  this.totalScore+= 25
  document.querySelectorAll("scoreboard").innerHTML =`Score : ${this.totalScore}`
 }
}