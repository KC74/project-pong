// imports
import { SVG_NS, KEYS } from '../settings.js';
import Board from './Board.js';
import Paddle from './Paddle.js';
import Ball from './Ball.js';

export default class Game {

	constructor(gameElement, width, height) {
		// CONSTANTS
		const PADDLE_WIDTH = 8;
		const PADDLE_HEIGHT = 56;
		const BALL_RADIUS = 8;
		const BOARD_GAP = 10;

		this.width = width;
		this.height = height;
		this.gameElement = document.getElementById(gameElement);

		// Other code goes here...
		this.board = new Board(this.width, this.height);


		// paddle one (left)
		this.paddle1 = new Paddle(
			this.height,
			PADDLE_WIDTH,
			PADDLE_HEIGHT,
			BOARD_GAP,
			((this.height - PADDLE_HEIGHT) / 2),
			KEYS.a,
			KEYS.z
		);

		// paddle one (right)
		this.paddle2 = new Paddle(
			this.height,
			PADDLE_WIDTH,
			PADDLE_HEIGHT,
			this.width - BOARD_GAP - PADDLE_WIDTH,
			((this.height - PADDLE_HEIGHT) / 2),
			KEYS.up,
			KEYS.down
		);

		// new ball
		this.ball = new Ball(
			BALL_RADIUS,
			this.width,
			this.height
		);

		// PAUSE
		document.addEventListener('keydown', event => {
			switch (event.key) {
				case KEYS.spaceBar:
					this.pause = !this.pause;
					break;
			}
		});
	}

	render() {
		if (this.pause) {
			return ;
		}
		// More code goes here...
		this.gameElement.innerHTML = '';
		let svg = document.createElementNS(SVG_NS, 'svg');

		svg.setAttributeNS(null, 'width', this.width);
		svg.setAttributeNS(null, 'height', this.height);
		svg.setAttributeNS(null, 'version', '1.1');
		svg.setAttributeNS(null, 'viewBox', `0 0 ${this.width} ${this.height}`);

			
		this.gameElement.appendChild(svg);
		this.board.render(svg);
		this.paddle1.render(svg);
		this.paddle2.render(svg);
		this.ball.render(svg, this.paddle1, this.paddle2);
	}

}