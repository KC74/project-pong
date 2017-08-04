// imports
import { SVG_NS, KEYS } from '../settings.js';
import Board from './Board.js';
import Paddle from './Paddle.js';
import Ball from './Ball.js';

export default class Game {


	constructor(gameElement, width, height) {
		this.width = width;
		this.height = height;
		this.gameElement = document.getElementById(gameElement);
		
		// Other code goes here...
		this.board = new Board(this.width, this.height);

		// paddles
		this.paddleWidth = 8;
		this.paddleHeight = 56;
		this.boardGap = 10;

		// paddle one (left)
		this.paddle1 = new Paddle(
			this.height,
			this.paddleWidth,
			this.paddleHeight,
			this.boardGap,
			((this.height - this.paddleHeight) / 2),
			KEYS.a,
			KEYS.z
		);

		// paddle one (right)
		this.paddle2 = new Paddle(
			this.height,
			this.paddleWidth,
			this.paddleHeight,
			this.width - this.boardGap - this.paddleWidth,
			((this.height - this.paddleHeight) / 2),
			KEYS.up,
			KEYS.down
		);

		// new ball
		this.ball = new Ball(
			8,
			this.width,
			this.height
		);

	}

	render() {
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
		this.ball.render(svg);
	}

}