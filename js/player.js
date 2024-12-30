class Player {
    constructor(game) {
        this.game = game;
        this.spriteWidth = 120;     // initial width of the player
        this.spriteHeight = 190;    // initial height of the player
        this.width;
        this.height;
        this.x = 20;
        this.y = 100;
        this.speedX = 0;
        this.speedY = 0;
        this.maxSpeed = 3; // 5px per frame
        this.projectiles = [];
    }

    // changes player property over time
    update() {
        // don't let the player object to leave canvas borders
        if (this.game.keys.has('ArrowUp') && this.y >= 0) this.speedY = -this.maxSpeed;
        else if (this.game.keys.has('ArrowDown') && this.y + this.height <= this.game.height) this.speedY = this.maxSpeed;
        else if (this.game.keys.has('ArrowLeft') && this.x >= 0) this.speedX = -this.maxSpeed;
        else if (this.game.keys.has('ArrowRight') && this.x + this.width <= this.game.width) this.speedX = this.maxSpeed;
        else {
            this.speedX = 0;
            this.speedY = 0;
        }
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
        context.fillStyle = 'green';
        context.fillRect(this.x, this.y, this.width, this.height);
        
        this.projectiles.forEach(projectile => {
            projectile.draw(context);
        });
    }

    shootTop() {
        if (this.game.ammo > 0) {
            this.projectiles.push(new Projectile(this.game, this.x + 100, this.y + 30));
            this.game.ammo--;
        }
    }

    // player resize
    resize() {
        this.width = this.spriteWidth * this.game.ratio;
        this.height = this.spriteHeight * this.game.ratio;
    }
}