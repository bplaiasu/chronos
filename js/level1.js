class Level1 extends Platform {
    constructor(game, x, y) {
        super(game);
        this.x = x;
        this.y = y;
        this.width = 0;
        this.height = 0;
        this.platforms = this.platformLevelCoordinates(this.game.level);
        // console.log(this.platforms)
    }

    update() {
        // this.x += this.speedX;
        for (let [platform, details] of Object.entries(this.platforms)) {
            this.x = details.x;
            this.y = details.y;
            this.width = details.width;
            this.height = details.height;

            if (this.x + this.width < 0) this.markForDeletion = true;

            break
        }
        // console.log(this.x, this.y, this.width, this.height)
    }

    draw(context, context1) {
        if (context1) {
            for (let [platform, details] of Object.entries(this.platforms)) {
                for (let row = 0; row < details.img.length; row++) {
                    const element = details.img[row][0];

                    // initially draw the image on hidden (backup) canvas
                    // doing this way I have access to platforms x and y coordinates, width and height dimensions
                    if (details.make_big) {
                        context1.drawImage(
                            // source image
                            element[0],
                            // sx, sy, sw, sh
                            element[1], element[2], element[3], element[4],
                            // dx, dy, dw, dh
                            element[5] * this.scale, element[6] * this.scale, element[7] * this.scale, element[8] * this.scale
                        )
                    } else {
                        context1.drawImage(
                            // source image
                            element[0],
                            // sx, sy, sw, sh
                            element[1], element[2], element[3], element[4],
                            // dx, dy, dw, dh
                            element[5], element[6], element[7], element[8]
                        )
                    }

                }

                // check for empty canvas
                this.blank = this.isCanvasBlank(document.getElementById('canvas2'));

                // if not empty copy data from hidden canvad to original canvas
                if (!this.blank) {
                    let imageData = null;
                    if (details.make_big) {
                        imageData = context1.getImageData(
                            0, 0,
                            this.platforms[platform].width * this.scale * this.scale,
                            this.platforms[platform].height * this.scale * this.scale
                        );
                    } else {
                        imageData = context1.getImageData(
                            0, 0,
                            this.platforms[platform].width * this.scale,
                            this.platforms[platform].height * this.scale
                        );
                    }
                    context.putImageData(imageData, this.platforms[platform].x, this.platforms[platform].y);

                    // clear hidden canvas
                    this.clearCanvas("canvas2")
                }
            }
        }
    }


    // check if canvas is empty
    // https://stackoverflow.com/questions/17386707/how-to-check-if-a-canvas-is-blank
    isCanvasBlank(canvas) {
        const context = canvas.getContext('2d');
        const pixelBuffer = new Uint32Array(
            context.getImageData(0, 0, canvas.width, canvas.height).data.buffer
        );

        return !pixelBuffer.some(color => color !== 0);
    }


    // function for clear the canvas 
    clearCanvas(canvas) {
        const cvs = document.getElementById(canvas);
        cvs.getContext('2d').clearRect(0, 0, cvs.width, cvs.height);
    }


    
    platformLevelCoordinates(lvl) {
        const platforms = level_platforms['level' + lvl];
        for (let [platform, details] of Object.entries(platforms)) {
            
            // collect the width & height of the platform based on the <map> value
            // also for each "tile" return differents argument that will be pass to draw method (img key)
            if ("map" in details) {
                platforms[platform]['width'] = this.platformInfo(platforms[platform]['map']).width;
                platforms[platform]['height'] = this.platformInfo(platforms[platform]['map']).height;
                platforms[platform]['img'] = this.platformInfo(platforms[platform]['map']).final_img;
            }

            // after sending the <map> value for platformInfo function
            // delete the <map> key from the final array
            delete platforms[platform]['map'];
        }

        return platforms;
    }
}