window.addEventListener('load', function() {
    // canvas setup
    const canvas = document.getElementById('canvas1');
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = 640;

    // create backing canvas
    var backup_canvas = document.getElementById('canvas2');
    var backup_ctx = backup_canvas.getContext('2d');
    backup_canvas.width = canvas.width;
    backup_canvas.height = canvas.height;
    // console.log(backup_canvas)

    
    class Game {
        constructor(width, height) {
            this.width = width;
            this.height = height;
            this.player = new Player(this);
            this.input = new InputHandler(this);
            this.ui = new UI(this);
            this.keys = new Set();
            this.gameOver = false;
            this.lives = 3;     // initial lives
            this.score = 0;     // initial game score
            this.winningScore = 7000;
            this.debug = true;
            this.debugColor = 'white';
            
            // enemies
            this.enemies = [];
            this.enemy01Timer = 0;
            this.enemy02Timer = 0;

            // enemies intervals (in seconds)
            this.enemy01Interval = 1500;
            this.enemy02Interval = 4000;

            // ammos
            this.ammo = 20;     // initial ammo
            this.maxAmmo = 50;  // maximum ammo after refresh and loading during the game
            this.ammoTimer = 0;
            this.ammoInterval = 1000;    // add ammo every interval

            // types of ammo: gun, missile, 
            this.ammo_type = 'gun'

            // define the stars background
            this.stars = []

            // dinamyc resize of the objects
            this.baseHeight = 720;
            this.ratio = this.height / this.baseHeight;
            
            this.resize(this.width, this.height, this.baseHeight);
            window.addEventListener('resize', e => {
                this.resize(e.currentTarget.innerWidth, e.currentTarget.innerHeight, this.baseHeight);
            })

            // explosions
            this.explosions = [];

            // adding level
            this.level = 1; 
            this.levelMap = new Level1(this);
        }

        resize(width, height, baseHeight) {
            canvas.width = width;
            canvas.height = height;
            this.width = canvas.width;
            this.height = canvas.height;
            this.baseHeight = baseHeight;
            this.ratio = this.height / this.baseHeight;
            this.player.resize();
            
            this.enemies.forEach(enemy => {
                enemy.resize();
            })
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
                // // check colision between player and enemy >>> if true, player loose 1 life
                // if (this.checkCollision(this.player, enemy)) {
                //     this.lives--;
                //     enemy.markForDeletion = true;
                //     this.playerExplosion(enemy);
                    
                //     // if player collide with enemy remove all enemies
                //     this.enemies = [];
                // }

                this.player.projectiles.forEach(projectile => {
                    // if projectile touch the enemy >>> enemy loose 1 life
                    if (this.checkCollision(projectile, enemy)) {
                        enemy.lives--;
                        projectile.markForDeletion = true;

                        // if enemy has no more lives >>> enemy dissapear and enemy score is added to the game score
                        if (enemy.lives <= 0) {
                            enemy.markForDeletion = true;
                            this.enemyExplosion(enemy);
                            this.score += enemy.score;
                            if (this.score >= this.winningScore) this.gameOver = true;
                        }
                    }
                })

                // check colision between player and environment
                // if (this.checkCollision(this.player, ))
                
                // if no lives available the game finish
                if (this.lives <= 0) {
                    this.gameOver = true;
                }
            });
            this.enemies = this.enemies.filter(enemy => !enemy.markForDeletion);

            if (!this.gameOver) {
                if (this.enemy01Timer > this.enemy01Interval) {
                    this.addAircraft01();
                    this.enemy01Timer = 0;
                } else this.enemy01Timer += deltaTime;
                
                if (this.enemy02Timer > this.enemy02Interval) {
                    this.addAircraft02();
                    this.enemy02Timer = 0;
                } else this.enemy02Timer += deltaTime;
            }
            
            
            // show background stars
            this.stars.forEach(star => {
                star.update();                
            })
            this.stars = this.stars.filter(star => !star.markForDeletion);
            this.addStars();

            // explosions
            this.explosions.forEach(explosion => explosion.update(deltaTime));
            this.explosions = this.explosions.filter(explosion => !explosion.markForDeletion);

            // this.levelMap.update();
        }

        draw(context, context1) {
            // levels
            this.levelMap.draw(context, context1);
            
            // stars
            this.stars.forEach(star => {
                star.draw(context);
            });

            // UI
            this.ui.draw(context);

            // player
            this.player.draw(context);

            // enemies
            this.enemies.forEach(enemy => {
                enemy.draw(context);
            });
            
            // explosions
            this.explosions.forEach(explosion => {
                explosion.draw(context);
            })
        }

        // add enemies
        addAircraft01() { this.enemies.push(new Aircraft_01(this)); }
        addAircraft02() { this.enemies.push(new Aircraft_02(this)); }

        // add explosions
        enemyExplosion(enemy) {
            const randomize = Math.random();
            if (randomize < 1) this.explosions.push(new EnemyExplosion(this, enemy.x + enemy.width * 0.5, enemy.y + enemy.height * 0.5));
        }
        playerExplosion(enemy) {
            const randomize = Math.random();
            if (randomize < 1) this.explosions.push(new PlayerExplosion(this, enemy.x + enemy.width * 0.5, enemy.y + enemy.height * 0.5));
        }

        // check collision between different object (eg: player vs enemy / projectile vs enemy)
        checkCollision(object1, object2) {
            return (
                object1.x + object1.width > object2.x &&
                object1.x < object2.x + object2.width &&
                object1.y + object1.height > object2.y &&
                object1.y < object2.y + object2.height
            );
        }

        // add stars
        addStars() {
            this.stars.push(new Star(this));
        }
    }

    const game = new Game(canvas.width, canvas.height);
    let lastTime = 0;
    
    function animate(timeStamp) {
        const deltaTime = timeStamp - lastTime;
        lastTime = timeStamp;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        game.update(deltaTime);
        game.draw(ctx, backup_ctx);
        requestAnimationFrame(animate);
    }
    animate(0);
})