import { SVG_NS, KEYS } from '../settings.js';

export default class Paddle {

    constructor(boardHeight, width, height, x, y, up, down) {
        this.boardHeight = boardHeight;
        this.width = width;
        this.height = height;
        this.x = x;
        this.y = y;
        this.speed = 10;
        this.score = 0;
        this.up = up;
        this.down = down;
        this.score = 0;

        document.addEventListener('keydown', event => {
            switch (event.key) {
                case up:
                    if (this.pause) {
                        return;
                    }
                    this.moveUp();
                    break;
                case down:
                    if (this.pause) {
                        return;
                    }
                    this.moveDown();
                    break;
                case KEYS.spaceBar:
                    this.pause = !this.pause;
                    break;
            }
        })
    }
    // 
    coordinates(x, y, width, height) {
        let leftX = x;
        let rightX = x + width;
        let topY = y;
        let bottomY = y + height;
        return [leftX, rightX, topY, bottomY];
    }

    // function to move paddle up
    moveUp() {
        // get the max number between the top of the board
        this.y = Math.max(this.y - this.speed, 0);
    }

    // function to move paddle down
    moveDown() {
        this.y = Math.min(this.y + this.speed, this.boardHeight - this.height);
    }

    render(svg) {

        // create line for paddle
        let paddle = document.createElementNS(SVG_NS, 'rect');
        paddle.setAttributeNS(null, 'width', this.width);
        paddle.setAttributeNS(null, 'height', this.height);
        paddle.setAttributeNS(null, 'x', this.x);
        paddle.setAttributeNS(null, 'y', this.y);
        paddle.setAttributeNS(null, 'fill', '#FFF');

        // append
        svg.appendChild(paddle);
    }
}