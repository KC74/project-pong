import { SVG_NS } from '../settings.js';

// Ball.js
export default class Ball {
  constructor(radius, boardWidth, boardHeight) {
    this.radius = radius;
    this.boardWidth = boardWidth;
    this.boardHeight = boardHeight;
    this.direction = 1;
    this.ping = new Audio('public/sounds/pong-01.wav');
    this.reset();
  }

  /* ------- METHODS ------- */

  // RESET FUNCTION
  reset() {
    this.x = this.boardWidth / 2;
    this.y = this.boardHeight / 2;

    this.vy = 0;

    // make sure ball does not bounce horizontally
    while (this.vy === 0) {
      this.vy = Math.floor(Math.random() * 10 - 5); // random whole number between -5 and 5
    }
    this.vx = this.direction * (6 - Math.abs(this.vy));
  }

  // WALL COLLISION
  wallCollision(player1, player2) {
    const hitLeft = this.x - this.radius <= 0;
    const hitRight = this.x + this.radius >= this.boardWidth;
    const hitTop = this.y - this.radius <= 0;
    const hitBottom = this.y + this.radius >= this.boardHeight;

    if (hitLeft || hitRight) {
      // detect score
      // was right wall touched? increment player 1 score
      if (hitRight) {
        this.goal(player1);
        this.vx = -this.vx;
      } else {
        // else the left wall touched? increment player 2 score
          this.goal(player2)
          this.vx = this.vx;
        }
    } else if (hitTop || hitBottom) {
      // flip vy
      this.vy = -this.vy;
    }
  }

  // PADDLE COLLISION
  paddleCollision(player1, player2) {

    // check right side
    if (this.vx > 0) { // direction greater than 0 = moving towards right

      // detect player 2 paddle collision
      let paddle = player2.coordinates(player2.x, player2.y, player2.width, player2.height);
      let [leftX, rightX, topY, bottomY] = paddle; // de-structure from array returned by paddle coordinates

      if (
        // if right edge of ball is >= left edge of paddle
        (this.x + this.radius >= leftX)
        // && ball y axis is >= paddle top y axis
        && (this.y >= topY)
        // && ball y is <= paddle bottom y axis
        && (this.y <= bottomY)
      ) {
        // flip the vx
        this.vx = -this.vx;
        this.ping.play();
      }
    } else { // check left side

      // detect player 1 paddle collision
      let paddle = player1.coordinates(player1.x, player1.y, player1.width, player1.height);
      let [leftX, rightX, topY, bottomY] = paddle;

      if (
        // if left edge of ball is >= right edge of paddle
        (this.x - this.radius <= rightX)
        // && ball y axis is >= paddle top y axis
        && (this.y >= topY)
        // && ball y is <= paddle bottom y axis
        && (this.y <= bottomY)
      ) {
        // flip the vx
        this.vx = -this.vx;
        this.ping.play();
      }
    }
  }

  // GOAL FUNCTION
  goal(player) {
    // increment winning player score
    player.score++;
    this.reset();
  }

  // RENDER FUNCTIONS
  render(svg, player1, player2) {
    // move method
    this.x += this.vx;
    this.y += this.vy;

    // ball creation
    let ball = document.createElementNS(SVG_NS, 'circle');
    ball.setAttributeNS(null, 'cx', this.x);
    ball.setAttributeNS(null, 'cy', this.y);
    ball.setAttributeNS(null, 'r', this.radius);
    ball.setAttributeNS(null, 'fill', '#FFF');

    this.paddleCollision(player1, player2);
    this.wallCollision(player1, player2);

    svg.appendChild(ball);
  }
}