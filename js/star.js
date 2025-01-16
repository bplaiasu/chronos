class Star {    
    constructor(game) {
        this.game = game;
        this.x = Math.random() * this.game.width;
        this.y = Math.random() * this.game.height;
        this.radius = Math.random() * 1.5;
        this.color = 'white';
        this.speedX = Math.random() * -2;
        // console.log(this.speedX);
        this.markForDeletion = false;
    }

    update() {
        this.x += this.speedX;
        // this.y += 0;
        if (this.x + this.radius < 0) this.markForDeletion = true;
    }
    
    draw(context) {
        // draw a pixel and color it
        context.beginPath();
        context.arc(this.x, this.y, this.radius, 0, Math.PI*2);
        context.fillStyle = this.color;
        context.fill();
        context.closePath();
    }
}
