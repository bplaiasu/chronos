class Player {
    constructor(game) {
        this.game = game;
        this.image = document.getElementById("player");
        this.scale = 0.2;
        this.spriteWidth = this.image.width * this.scale;       // initial width of the player
        this.spriteHeight = this.image.height * this.scale;     // initial height of the player
        this.width;
        this.height;
        this.x = 20;        // initial X position of the player
        this.y = (this.game.height - this.spriteHeight) / 2;    // initial Y position of the player
        this.speedX = 0;
        this.speedY = 0;
        this.maxSpeed = 5;      // movement pixel per frame
        this.projectiles = [];
    }

    // changes player property over time
    update() {
        // don't let the player object to leave canvas borders
        if (this.game.keys.has('ArrowUp') && this.y >= 0) this.speedY = -this.maxSpeed;
        else if (this.game.keys.has('ArrowDown') && this.y + this.height <= this.game.height) this.speedY = this.maxSpeed;
        else this.speedY = 0;

        if (this.game.keys.has('ArrowLeft') && this.x >= 0) this.speedX = -this.maxSpeed;
        else if (this.game.keys.has('ArrowRight') && this.x + this.width <= this.game.width) this.speedX = this.maxSpeed;
        else this.speedX = 0;

        this.x += this.speedX;
        this.y += this.speedY;

        // handle projectiles
        this.projectiles.forEach(projectile => {
            projectile.update();
        });
        this.projectiles = this.projectiles.filter(projectile => !projectile.markForDeletion);
    }

    // how the player looks like
    draw(context) {
        context.strokeStyle = this.game.debugColor;
        if (this.game.debug) context.strokeRect(this.x, this.y, this.width, this.height);
        context.drawImage(this.image, this.x, this.y, this.width, this.height);
        
        this.projectiles.forEach(projectile => {
            projectile.draw(context);
        });
    }

    // show projectiles on screen
    shoot() {
        if (this.game.ammo > 0) {
            // this.projectiles.push(new Projectile(this.game, this.x + 145, this.y + 40));
            this.projectiles.push(new Projectile(this.game, this.x + this.width - 10, this.y + this.height/2 - 2));
            this.game.ammo--;
        }
    }

    // player resizing (resolution dependency)
    resize() {
        this.width = this.spriteWidth * this.game.ratio;
        this.height = this.spriteHeight * this.game.ratio;
    }
}