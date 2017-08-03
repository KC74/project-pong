import { SVG_NS } from '../settings.js';

export default class Board {
    
    constructor(width, height) {
        this.width = width;
        this.height = height;
    }

    render(svg) {

        // create rect element
        let board = document.createElementNS(SVG_NS, 'rect');
        board.setAttributeNS(null, 'width', this.width);
        board.setAttributeNS(null, 'height', this.height);

        // create line element
        let boardDivider = document.createElementNS(SVG_NS, 'line');
        boardDivider.setAttributeNS(null, 'x1', (this.width / 2));
        boardDivider.setAttributeNS(null, 'y1', '0');
        boardDivider.setAttributeNS(null, 'x2', (this.width / 2));
        boardDivider.setAttributeNS(null, 'y2', this.height);
        boardDivider.setAttributeNS(null, 'stroke', '#FFF');
        boardDivider.setAttributeNS(null, 'stroke-width', '5');
        boardDivider.setAttributeNS(null, 'stroke-dasharray', '30, 10');
        boardDivider.setAttributeNS(null, 'stroke-dashoffset', '25');

        // 
        svg.appendChild(board);
        svg.appendChild(boardDivider);
        
    }
}