import { SVG_NS } from '../settings.js';

export default class Score {
    constructor(player, x, y) {
        this.player = player;
        this.x = x;
        this.y = y;
    }

    render(svg) {
        let score = document.createElementNS(SVG_NS, 'text');
        score.setAttributeNS(null, 'x', this.x);
        score.setAttributeNS(null, 'y', this.y);
        score.setAttributeNS(null, 'fill', '#FFF');
        score.setAttributeNS(null, 'font-size', '30');
        score.setAttributeNS(null, 'font-family', 'Silkscreen Web');
        score.innerHTML = this.player.score;

        svg.appendChild(score);
    }
}