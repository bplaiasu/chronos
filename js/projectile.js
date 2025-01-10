class Projectile {
    constructor(game, x, y) {
        this.game = game;
        this.x = x;
        this.y = y;

        this.ammoType = {
            gun: {
                distance: 0.7,
                ammo: 50,
                width: 13,
                height: 3,
                speed: 10,
                color: 'yellow'
            },
            missile: {
                distance: 1,
                ammo: 3,
                width: 20,
                height: 6,
                speed: 30,
                color: 'red'
            }
        }

        // this.projectileWidth = 13;
        // this.projectileHeight = 3;
        this.width = this.ammoType[this.game.ammo_type].width * this.game.ratio;
        this.height = this.ammoType[this.game.ammo_type].height * this.game.ratio;
        // this.speed = 15;     // represent twice the Player speed
        this.markForDeletion = false;
    }

    // chages properties over time
    update() {
        this.x += this.ammoType[this.game.ammo_type].speed;
        
        // different types of ammo have long / short distances
        if (this.x > this.game.width * this.ammoType[this.game.ammo_type].distance) this.markForDeletion = true;
    }

    // how the projectile looks like
    draw(context) {
        context.fillStyle = this.ammoType[this.game.ammo_type].color;
        context.fillRect(this.x, this.y, this.width, this.height);
    }
}