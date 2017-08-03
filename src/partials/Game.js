// imports
import { SVG_NS } from '../settings.js';
import Board from './Board.js';

export default class Game {
	

	constructor(gameElement, width, height) {
		this.width = width;
		this.height = height;
		this.gameElement = document.getElementById(gameElement);
		// Other code goes here...
		this.board = new Board(this.width, this.height);
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
	}

}