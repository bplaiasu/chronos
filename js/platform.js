class Platform {
    constructor() {
        this.image = document.getElementById("tiles");
        this.font = document.getElementById("font-tile");
        this.spriteWidth = 32;
        this.spriteHeight = 32;
        this.markForDeletion = false;

        this.scale = 1.5;
        this.fontScale = this.scale * 4;

        /*
            Below extract each "tile" (32x32 pixels or 8x8 pixels from the <tiles> folder)
            
            LEGEND:
            // environment pbjects
            1 - topLeftCorner           2 - topMiddle           3 - topRightCorner              4 - leftSide
            5 - middle                  6 - rightSide           7 - bottomLeftCorner            8 - bottomMiddle
            9 - bottomRightCorner       0 - zero                11 - topLine1                   12 - bottomLine
            13 - topLine2               14 - middle1            15 - middle2                    
            16 - radar top left         17 - radar top right    18 - radar bottom left          19 - radar bottom right
            20 - another left corner    21 - another middle     22 - another right corner
            
            // letters
            100 - letter C      101 - letter H      102 - letter R      103 - letter O      104 - letter N
            105 - letter S      106 - letter G      107 - letter D      108 - letter L      109 - letter U
            110 - letter K
        */

        // borders
        this.topLeftCorner = { x: 0, y: 0, width: 32, height: 32 }
        this.topMiddle = { x: 32, y: 0, width: 32, height: 32 }
        this.topRightCorner = { x: 128, y: 0, width: 32, height: 32 }
        this.leftSide = { x: 64, y: 32, width: 32, height: 32 }
        this.middle = { x: 128, y: 128, width: 32, height: 32 }
        this.middle1 = { x: 64, y: 0, width: 32, height: 32 }
        this.middle2 = { x: 96, y: 0, width: 32, height: 32 }
        this.rightSide = { x: 96, y: 32, width: 32, height: 32 }
        this.bottomLeftCorner = { x: 128, y: 32, width: 32, height: 32 }
        this.bottomMiddle = { x: 160, y: 32, width: 32, height: 32 }
        this.bottomRightCorner = { x: 192, y: 32, width: 32, height: 32 }

        // different objects
        this.radarTopLeft = { x: 224, y: 64, width: 31, height: 32 }
        this.radarTopRight = { x: 256, y: 65, width: 31, height: 32 }
        this.radarBottomLeft = { x: 224, y: 96, width: 31, height: 32 }
        this.radarBottomRight = { x: 256, y: 96, width: 31, height: 32 }
        this.bottomLine = { x: 448, y: 0, width: 32, height: 10 }
        this.topLine1 = { x: 320, y: 0, width: 32, height: 32 }
        this.topLine2 = { x: 352, y: 0, width: 32, height: 32 }
        this.leftCorner = { x: 0, y: 64, width: 32, height: 31 }
        this.middle3 = { x: 32, y: 64, width: 32, height: 31 }
        this.rightCorner = { x: 64, y: 64, width: 32, height: 31 }
        this.meteor = { x: 224, y: 128, width: 32, height: 32 }

        // font letters
        this.letterC = { x: 48, y: 16, width: 8, height: 8 }
        this.letterH = { x: 88, y: 16, width: 8, height: 8 }
        this.letterR = { x: 56, y: 24, width: 8, height: 8 }
        this.letterO = { x: 32, y: 24, width: 8, height: 8 }
        this.letterN = { x: 24, y: 24, width: 8, height: 8 }
        this.letterS = { x: 64, y: 24, width: 8, height: 8 }
        this.letterG = { x: 80, y: 16, width: 8, height: 8 }
        this.letterD = { x: 56, y: 16, width: 8, height: 8 }
        this.letterL = { x: 8, y: 24, width: 8, height: 8 }
        this.letterU = { x: 80, y: 24, width: 8, height: 8 }
        this.letterK = { x: 0, y: 24, width: 8, height: 8 }

        // default value
        this.zero = { x: 416, y: 0, width: 32, height: 32 }

        this.level = null;      // variable for drawing the level map (platforms, objects, ...)
        this.platform = null;   // this is used for getting the x,y coordinates and width & height of the platform
    }

    // function to convert
    tilemapConvertingToMetricSystem(tile_number) {
        this.tile_number = tile_number;

        switch (this.tile_number) {
            // images
            case 1: this.tile_info = this.topLeftCorner; break;
            case 2: this.tile_info = this.topMiddle; break;
            case 3: this.tile_info = this.topRightCorner; break;
            case 4: this.tile_info = this.leftSide; break;
            case 5: this.tile_info = this.middle; break;
            case 6: this.tile_info = this.rightSide; break;
            case 7: this.tile_info = this.bottomLeftCorner; break;
            case 8: this.tile_info = this.bottomMiddle; break;
            case 9: this.tile_info = this.bottomRightCorner; break;
            case 11: this.tile_info = this.topLine1; break;
            case 12: this.tile_info = this.bottomLine; break;
            case 13: this.tile_info = this.topLine2; break;
            case 14: this.tile_info = this.middle1; break;
            case 15: this.tile_info = this.middle2; break;
            case 16: this.tile_info = this.radarTopLeft; break;
            case 17: this.tile_info = this.radarTopRight; break;
            case 18: this.tile_info = this.radarBottomLeft; break;
            case 19: this.tile_info = this.radarBottomRight; break;
            case 20: this.tile_info = this.leftCorner; break;
            case 21: this.tile_info = this.middle3; break;
            case 22: this.tile_info = this.rightCorner; break;
            case 23: this.tile_info = this.meteor; break;

            // letters
            case 100: this.tile_info = this.letterC; this.isLetter = true; break;
            case 101: this.tile_info = this.letterH; this.isLetter = true; break;
            case 102: this.tile_info = this.letterR; this.isLetter = true; break;
            case 103: this.tile_info = this.letterO; this.isLetter = true; break;
            case 104: this.tile_info = this.letterN; this.isLetter = true; break;
            case 105: this.tile_info = this.letterS; this.isLetter = true; break;
            case 106: this.tile_info = this.letterG; this.isLetter = true; break;
            case 107: this.tile_info = this.letterD; this.isLetter = true; break;
            case 108: this.tile_info = this.letterL; this.isLetter = true; break;
            case 109: this.tile_info = this.letterU; this.isLetter = true; break;
            case 110: this.tile_info = this.letterK; this.isLetter = true; break;

            // default value in case of wrong number entered in the platform mapping array
            default: this.tile_info = this.zero;
        }

        return this.tile_info
    }


    platformInfo(platform) {
        /** 
         * based on platform map return some 
         * usefull information about the platform 
         * */
        this.platform = platform;
        this.final_img = [];
        this.height = 0;

        for (let row = 0; row < this.platform.length; row++) {
            this.width = 0;

            for (let col = 0; col < this.platform[row].length; col++) {
                this.tile = this.platform[row][col];
                this.current_tile = []
                this.isLetter = false;
                this.imgTile = this.tilemapConvertingToMetricSystem(this.tile);

                if (this.imgTile != null) {
                    if (this.imgTile == this.bottomLine) {
                        this.current_tile.push([
                            this.image,
                            // source x & y coordinates
                            this.imgTile.x, this.imgTile.y,
                            // source width and height
                            this.imgTile.width, this.imgTile.height,
                            // destination x&y coordinates based on map array
                            col * this.imgTile.width * this.scale, row * (this.imgTile.height + 22) * this.scale,
                            // destination width and height
                            this.imgTile.width * this.scale, this.imgTile.height * this.scale
                        ])
                    } else {
                        if (this.isLetter) {
                            this.current_tile.push([
                                this.font,
                                this.imgTile.x, this.imgTile.y,
                                this.imgTile.width, this.imgTile.height,
                                col * this.imgTile.width * this.fontScale, row * this.imgTile.height * this.fontScale + 2,
                                this.imgTile.width * this.fontScale + 2, this.imgTile.height * this.fontScale
                            ])
                        } else {
                            this.current_tile.push([
                                this.image,
                                this.imgTile.x, this.imgTile.y,
                                this.imgTile.width, this.imgTile.height,
                                col * this.imgTile.width * this.scale, row * this.imgTile.height * this.scale,
                                this.imgTile.width * this.scale, this.imgTile.height * this.scale
                            ])
                        }
                    }
                }

                this.width += this.imgTile.width;
                this.final_img.push(this.current_tile)
            }

            this.height += this.imgTile.height;
        }

        return {
            'width': this.width,
            'height': this.height,
            'final_img': this.final_img
        }
    }
}


class Level1 extends Platform {
    constructor() {
        super();
        this.platforms = this.platformLevelCoordinates()
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


    
    platformLevelCoordinates() {
        const platforms = level_platforms;
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


