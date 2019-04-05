class Background {
  constructor() {
    this.backgroundImg = new Image()
    this.backgroundImg.src = "images/background2.png"
    this.y = 0
    this.width = CANVAS_WIDTH
    this.height = CANVAS_HEIGHT
  
  }


  // draw background
  draw(ctx) {
    ctx.drawImage(this.backgroundImg, 0, this.y, this.width,this.height)   
    ctx.drawImage(this.backgroundImg, 0, this.y-this.height, this.width,this.height)   
  }
  
  update(){
    this.y += 0.7
    if(this.y > CANVAS_HEIGHT)
      this.y -= this.height
    }
  }
