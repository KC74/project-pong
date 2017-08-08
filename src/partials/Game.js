// imports
import { SVG_NS, KEYS } from '../settings.js';
import Board from './Board.js';
import Paddle from './Paddle.js';
import Ball from './Ball.js';
import Score from './Score.js';
import $ from 'jquery';

export default class Game {

	// constructor(gameElement, width, height) {
	constructor(gameElement, width, height) {
		// PADDLE VARIABLES
		const PADDLE_WIDTH = 8;
		const PADDLE_HEIGHT = 56;

		// BALL VARIABLES
		const BALL_RADIUS = 8;
		const BOARD_GAP = 10;

		// GAME VARIABLES
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

		// player 1 score
		this.paddle1Score = new Score(
			this.paddle1,
			this.width / 2 - 70 + 10,
			30
		);

		// player 2 score
		this.paddle2Score = new Score(
			this.paddle2,
			this.width / 2 + 70 - 30,
			30
		);

		// PAUSE
		document.addEventListener('keydown', event => {
			switch (event.key) {
				case KEYS.spaceBar:
					this.pause = !this.pause;
					break;
			}
		});
		/* ------- SIZE SETTINGS ------- */

		// LISTEN SMALL CHANGE
		$('#ball-size-small').on('click', () => {
			// CHANGE SETTINGS
			this.setBallSize(3);
		});

		// LISTEN MEDIUM CHANGE
		$('#ball-size-medium').on('click', () => {
			// CHANGE SETTINGS
			this.setBallSize(6);
		});

		// LISTEN LARGE CHANGE
		$('#ball-size-large').on('click', () => {
			// CHANGE SETTINGS
			this.setBallSize(10);
		});

		// LISTEN RESET CHANGE
		$('#ball-size-reset').on('click', () => {
			// CHANGE SETTINGS
			this.setBallSize(BALL_RADIUS);
		});

		/* ------- SPEED SETTINGS ------- */
		// UNFINISHED
		// // LISTEN SLOW CHANGE
		// $('#ball-speed-slow').on('click', () => {
		// 	// CHANGE SETTINGS
		// 	this.setBallSpeed(5);
		// });

		// // LISTEN MEDIUM CHANGE
		// $('#ball-speed-medium').on('click', () => {
		// 	// CHANGE SETTINGS
		// 	this.setBallSpeed(7);
		// });

		// // LISTEN FAST CHANGE
		// $('#ball-speed-fast').on('click', () => {
		// 	// CHANGE SETTINGS
		// 	this.setBallSpeed(100);
		// });

		// // LISTEN RESET CHANGE
		// $('#ball-speed-reset').on('click', () => {
		// 	// CHANGE SETTINGS
		// 	this.setBallSpeed(10);
		// });

	}

	/* ------- FUNCTIONS ------- */

	/* ---- SETTINGS ----- */

	// BALL SIZE
	setBallSize(ballSize) {
		this.ball.setRadius(ballSize);
	}

	// BALL SPEED
	// setBallSpeed(speed) {

	// }

	// RENDER
	render() {
		const BALL_SIZE_SUBMIT = document.getElementById('ball-size-submit');
		const BALL_SIZE_INPUT = document.getElementById('ball-size-input');

		if (this.pause) {
			return;
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
		this.paddle1Score.render(svg);
		this.paddle2Score.render(svg);
	}

}