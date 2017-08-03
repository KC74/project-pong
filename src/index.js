import './styles/game.css'; // injecting styles from webpack
import Game from './partials/Game' 

// create a game instance
const game = new Game('game', 512, 256);

(function gameLoop() {
    game.render();
    requestAnimationFrame(gameLoop);
})();
