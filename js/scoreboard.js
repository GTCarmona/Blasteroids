class Scoreboard {
  constructor(){
  this.x = 0
  this.y = 50
  this.totalScore = 0

}

update() {
  this.totalScore+= 25
  document.getElementById("scoreboard").innerHTML =`Score : ${this.totalScore}`
  if (page === "game-over") {
  
  }
 }
}