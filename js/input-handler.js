class InputHandler {
    constructor(game) {
        this.game = game;
        window.addEventListener('keydown', e => {
            if (e.key === 'ArrowUp' || e.key === 'ArrowDown' || e.key === 'ArrowLeft' || e.key === 'ArrowRight') this.game.keys.add(e.key);
            else if (e.key === ' ') this.game.player.shoot();
            else if (e.key === 'd') this.game.debug = !this.game.debug;
        })

        window.addEventListener('keyup', e => {
            if (this.game.keys.has(e.key)) this.game.keys.delete(e.key);
        })
    }
}