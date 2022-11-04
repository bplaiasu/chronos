const canvas = document.querySelector('canvas')
const ctx = canvas.getContext('2d')
canvas.width = window.innerWidth
canvas.height = window.innerHeight


// define player
class Player {
    constructor() {
        // load the image
        const image = new Image()
        image.src = './img/spaceship.png'
        image.onload = () => {
            this.image = image

            // image scale
            const scale = 0.15

            // set the image size
            this.spaceship_width = image.width * scale
            this.spaceship_height = image.height * scale
            
            // start position
            this.position = {
                x: this.spaceship_width / 2,
                y: canvas.height / 2 - this.spaceship_height / 2
            }
        }
        
        // set the player object speed to 0
        this.velocity = {
            x: 0,
            y: 0
        }        
    }

    // how the player looks like
    draw() {
        ctx.drawImage(this.image, this.position.x, this.position.y, this.spaceship_width, this.spaceship_height)
    }

    // changes player property over time
    update() {
        if (this.image) {
            this.draw()
            this.position.x += this.velocity.x
            this.position.y += this.velocity.y
        }
    }
}


// defines projectiles
class Projectile {
    constructor(position, velocity) {
        this.position = position
        this.velocity = velocity
        this.length = 25
        this.height = 2
    }
    
    draw() {
        ctx.strokeStyle = 'yellow';
        ctx.lineWidth = this.height;
        
        // draw a line
        ctx.beginPath()
        ctx.moveTo(this.position.x, this.position.y);
        ctx.lineTo(this.position.x + this.length, this.position.y);
        ctx.stroke();
        ctx.closePath()
    }

    update() {
        this.draw()
        this.position.x += this.velocity.x
        this.position.y += this.velocity.y
    }
}


// define enemy
class Enemy {
    constructor( {x, y} ) {
        // start position
        this.position = { x, y }

        // load the image
        const image = new Image()
        // image.src = './img/fighter-jet.png'
        image.src = './img/jet-fighter.png'
        image.onload = () => {
            this.image = image
            
            // image scale
            const scale = 0.2
            
            // set the image size
            this.enemy_width = image.width * scale
            this.enemy_height = image.height * scale
        }
    }

    // where the enemies will be
    draw() {
        if (this.image) {
            ctx.drawImage(this.image, this.position.x, this.position.y, this.enemy_width, this.enemy_height)
        }
    }
}


// define a star
class Star {
    constructor({position, velocity, radius, color}) {
        this.position = position
        this.velocity = velocity
        this.radius = radius
        this.color = color        
    }

    draw() {
        // draw a pixel and color it
        ctx.beginPath()
        ctx.arc(this.position.x, this.position.y, this.radius, 0, Math.PI*2)
        ctx.fillStyle = this.color
        ctx.fill()
        ctx.closePath()
    }

    update() {
        this.draw()
        this.position.x += this.velocity.x
        this.position.y += this.velocity.y
    }
}


// create a new player
const player = new Player()

// create the projectiles
const projectiles = []

// create enemy
const enemies = [
    new Enemy({x: 1000, y: 100}),
    new Enemy({x: 700, y: 300})
]

// define the stars basckground
const stars = []

const keys = {
    ArrowLeft: {
        pressed: false
    },
    ArrowRight: {
        pressed: false
    },
    ArrowUp: {
        pressed: false
    },
    ArrowDown: {
        pressed: false
    },
    space: {
        pressed: false
    },
}


// variable for keep score
let score = 0

// make the player to move
function animate() {
    requestAnimationFrame(animate)
    ctx.fillStyle = 'black'
    ctx.fillRect(0, 0, canvas.width, canvas.height)
    
    // show the stars
    stars.forEach(star => {
        star.update()
    })

    // player movement
    player.update()

    // show enemy
    enemies.forEach((enemy, i) => {
        enemy.draw()

        // enemy colision detection
        projectiles.forEach((projectile, j) => {
            if (
                // check colision in front of the enemy object
                projectile.position.x + projectile.length >= enemy.position.x
                // check collision after the bottom margin of the enemy object
                && projectile.position.y + projectile.height <= enemy.position.y + enemy.enemy_height
                // check collision before the top margin of the enemy object
                && projectile.position.y + projectile.height >= enemy.position.y
            ) {
                // console.log('Hit! Hit! Enemy destroyed...')
                // console.log(projectile.position.x, projectile.position.y, enemy.position.y, enemy.enemy_width)
                projectiles.splice(j, 1)
                enemies.splice(i, 1)
                // projectile.velocity.x = 0
                score += 1
            } else {
                enemy.draw()
                // projectile.update()
            }
        })

        console.log('Score: ' + score)
    })

    // projectiles animation
    projectiles.forEach((projectile, index) => {
        // remove projectile queue
        if (projectile.position.x + projectile.length >= canvas.width) {
            projectiles.splice(index, 1)
        } else {
            projectile.update()
        }
    })

    // don't let the player object to leave the left & right borders
    if (keys.ArrowLeft.pressed && player.position.x >= 0) {
        player.velocity.x = -5
    } else if (keys.ArrowRight.pressed && player.position.x + player.spaceship_width <= canvas.width) {
        player.velocity.x = 5
    }
    else {
        player.velocity.x = 0
    }
    
    // don't let the player object to leave the top & bottom borders
    if (keys.ArrowUp.pressed && player.position.y >= 0) {
        player.velocity.y = -5
    } else if (keys.ArrowDown.pressed && player.position.y + player.spaceship_height <= canvas.height) {
        player.velocity.y = 5
    }
    else {
        player.velocity.y = 0
    }

    // background stars
    // for (let i=0; i<10; i++) {
        stars.push(
            new Star({
                position: {
                    x: Math.random() * canvas.width,
                    y: Math.random() * canvas.height
                },
                velocity: {
                    x: -1,
                    y: 0
                },
                radius: Math.random() * 1.5,
                color: 'white'
            })
        )
    // }
}
animate()


/*
define the keys
movement: ArrowLeft, ArrowRight, ArrowUp, ArrowDown
fire: spaceKey
*/
addEventListener('keydown', ({key}) => {
    switch(key) {
        case 'ArrowLeft':
            keys.ArrowLeft.pressed = true
            break
        case 'ArrowRight':
            keys.ArrowRight.pressed = true
            break
        case 'ArrowUp':
            keys.ArrowUp.pressed = true
            break
        case 'ArrowDown':
            keys.ArrowDown.pressed = true
            break
        case ' ':
            // keys.space.pressed = true
            projectiles.push(
                new Projectile(
                    {
                        x: player.position.x + player.spaceship_width,
                        y: player.position.y + player.spaceship_height / 2
                    }, 
                    {
                        x: 10,
                        y: 0
                    }
                )
            )
            // console.log(projectiles)
            break
    }
})

addEventListener('keyup', ({key}) => {
    switch(key) {
        case 'ArrowLeft':
            keys.ArrowLeft.pressed = false
            break
        case 'ArrowRight':
            keys.ArrowRight.pressed = false
            break
        case 'ArrowUp':
            keys.ArrowUp.pressed = false
            break
        case 'ArrowDown':
            keys.ArrowDown.pressed = false
            break
        case ' ':
            // keys.space.pressed = false
            break
    }
})
