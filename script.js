window.addEventListener('load', function() {
    // canvas setup
    const canvas = document.getElementById('canvas1');
    const ctx = canvas.getContext('2d');
    // canvas.width = window.innerWidth;
    // canvas.height = window.innerHeight;
    canvas.width = 1500;
    canvas.height = 700;

    class InputHandler {
        constructor(game) {
            this.game = game;
            window.addEventListener('keydown', e => {
                if (e.key === 'ArrowUp' || e.key === 'ArrowDown' || e.key === 'ArrowLeft' || e.key === 'ArrowRight') {
                    this.game.keys.add(e.key);
                    // console.log(e.key);
                } else if (e.key === ' ') {
                    this.game.player.shootTop();
                    // console.log(this.game.player);
                }
                // console.log(this.game.keys);
            })

            window.addEventListener('keyup', e => {
                if (this.game.keys.has(e.key)) {
                    this.game.keys.delete(e.key);
                }
                // console.log(this.game.keys);
            })
        }
    }


    class Projectile {
        constructor(game, x, y) {
            this.game = game;
            this.x = x;
            this.y = y;
            this.width = 10;
            this.height = 3;
            this.speed = 3;
            this.markForDeletion = false;
        }

        update() {
            this.x += this.speed;
            if (this.x > this.game.width * 0.8) this.markForDeletion = true;
        }

        draw(context) {
            context.fillStyle = 'yellow';
            context.fillRect(this.x, this.y, this.width, this.height);
        }
    }


    class Particle {

    }


    class Player {
        constructor(game) {
            this.game = game;
            this.width = 120;
            this.height = 190;
            this.x = 20;
            this.y = 100;
            this.speedX = 0;
            this.speedY = 0;
            this.maxSpeed = 2; // 2px per frame
            this.projectiles = [];
            this.lives = 3;
        }

        update() {
            if (this.game.keys.has('ArrowUp')) this.speedY = -this.maxSpeed;
            else if (this.game.keys.has('ArrowDown')) this.speedY = this.maxSpeed;
            else if (this.game.keys.has('ArrowLeft')) this.speedX = -this.maxSpeed;
            else if (this.game.keys.has('ArrowRight')) this.speedX = this.maxSpeed;
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

        draw(context) {
            context.fillStyle = 'black';
            context.fillRect(this.x, this.y, this.width, this.height);
            
            this.projectiles.forEach(projectile => {
                projectile.draw(context);
            });
        }

        shootTop() {
            if (this.game.ammo > 0) {
                this.projectiles.push(new Projectile(this.game, this.x + 80, this.y + 30));
                this.game.ammo--;
            }
        }
    }


    // define Enemy - as general class
    class Enemy {
        constructor(game) {
            this.game = game;
            this.x = this.game.width;
            this.speedX = Math.random() * -1.5 -0.5;
            this.markForDeletion = false;
        }

        update() {
            this.x += this.speedX;
            if (this.x + this.width < 0) this.markForDeletion = true;
        }

        draw(context) {
            context.fillStyle = 'red';
            context.fillRect(this.x, this.y, this.width, this.height);

            context.fillStyle = 'black';
            context.font = '20px Helvetica';
            context.fillText(this.lives, this.x, this.y);
        }
    }

    // first Enemy
    class Enemy1 extends Enemy {
        constructor(game) {
            super(game);
            this.width = 228 * 0.2;
            this.height = 169 * 0.2;
            this.y = Math.random() * (this.game.height * 0.9 - this.height);

            this.lives = 5;
            this.score = 10;
        }

        // draw(context) {
        //     // Enemy.draw(context);
        //     context.fillText(this.lives, this.x, this.y);
        // }
    }


    class Layer {
        
    }


    class Background {

    }


    class UI {
        constructor(game) {
            this.game = game;
            this.fontSize = 25;
            this.fontFamily = 'Helvetica';
            this.color = 'white';
        }

        draw(context) {
            context.save();
            context.fillStyle = this.color;

            // apply shadows
            context.shadowOffsetX = 2;
            context.shadowOffsetY = 2;
            context.shadowColor = 'black';

            context.font = this.fontSize + 'px ' + this.fontFamily;
            // score
            context.fillText('Score: ' + this.game.score, 20, 40)

            // show charging ammo
            for (let i = 0; i < this.game.ammo; i++) {
                context.fillRect(20 + 5 * i, 50, 3, 20);
            }

            // game over messages
            if (this.game.gameOver) {
                context.textAlign = 'center';
                let message1;
                let message2;

                if (this.game.score >= this.game.winningScore) {
                    message1 = 'You win!'
                    message2 = 'Well done!'
                } else {
                    message1 = 'You lose!'
                    message2 = 'Try again next time!'
                }

                context.font = '50px ' + this.fontFamily;
                context.fillText(message1, this.game.width * .5, this.game.height * .5 - 40);
                context.font = '25px ' + this.fontFamily;
                context.fillText(message2, this.game.width * .5, this.game.height * .5 + 40);
            }

            context.restore();
        }
    }


    class Game {
        constructor(width, height) {
            this.width = width;
            this.height = height;
            this.player = new Player(this);
            this.input = new InputHandler(this);
            this.ui = new UI(this);
            this.keys = new Set();
            this.gameOver = false;
            this.score = 0;
            this.winningScore = 30;
            
            // enemies
            this.enemies = [];
            this.enemyTimer = 0;
            this.enemyInterval = 1000;  // add enemy every 1sec

            // ammos
            this.ammo = 20;     // initial ammo
            this.maxAmmo = 50;  // maximum ammo after refresh and loading during the game
            this.ammoTimer = 0;
            this.ammoInterval = 1000;    // add ammo every interval
        }

        update(deltaTime) {
            this.player.update();
            if (this.ammoTimer > this.ammoInterval) {
                if (this.ammo < this.maxAmmo) this.ammo++;
                this.ammoTimer = 0;
            } else {
                this.ammoTimer += deltaTime;
            }

            this.enemies.forEach(enemy => {
                enemy.update();
                // check colision between player and enemy >>> if true, player loose 1 life
                if (this.checkCollision(this.player, enemy)) {
                    this.player.lives--;
                    enemy.markForDeletion = true;
                }

                this.player.projectiles.forEach(projectile => {
                    // if projectile touch the enemy >>> enemy loose 1 life
                    if (this.checkCollision(projectile, enemy)) {
                        // console.log('enemy hit...')
                        enemy.lives--;
                        projectile.markForDeletion = true;

                        // if enemy has no more lives then enemy dissapear and enemy score is added to the game score
                        if (enemy.lives <= 0) {
                            enemy.markForDeletion = true;
                            this.score += enemy.score;
                            if (this.score >= this.winningScore) this.gameOver = true;
                        }
                    }
                })
                
                // if no lives available the game finish
                if (this.player.lives <= 0) {
                    this.gameOver = true;
                }
            });
            this.enemies = this.enemies.filter(enemy => !enemy.markForDeletion);

            if (this.enemyTimer > this.enemyInterval && !this.gameOver) {
                this.addEnemy()
                this.enemyTimer = 0;
            } else {
                this.enemyTimer += deltaTime; 
            }
        }

        draw(context) {
            this.player.draw(context);
            this.ui.draw(context);

            this.enemies.forEach(enemy => {
                enemy.draw(context);
            });
        }

        addEnemy() {
            this.enemies.push(new Enemy1(this));
        }

        checkCollision(object1, object2) {
            return (
                object1.x + object1.width > object2.x &&
                object1.x < object2.x + object2.width &&
                object1.y + object1.height > object2.y &&
                object1.y < object2.y + object2.height
            );
        }
    }

    const game = new Game(canvas.width, canvas.height);
    let lastTime = 0;
    function animate(timeStamp) {
        const deltaTime = timeStamp - lastTime;
        lastTime = timeStamp;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        game.update(deltaTime);
        game.draw(ctx);
        requestAnimationFrame(animate);
    }
    animate(0);
})
