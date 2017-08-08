import './styles/game.css'; // injecting styles from webpack
import './styles/settings.css';
import Game from './partials/Game';
import $ from 'jquery';

// create a game instance
const game = new Game('game', 512, 256);
const start = () => { game.render() };

// WINDOW ONLOAD
window.onload = () => {
    const ballElement = document.getElementById('ball-title');
    let ballListContainer = document.getElementById('ball-list-container');
    let ballSettingsChange = document.getElementById('ball-settings-change');
    const SIZE = document.getElementById('ball-size-btn');
    const SPEED = document.getElementById('ball-speed-btn');


    // WHEN THE BALL TITLE IS CLICKED
    ballElement.onclick = function () {
        // TOGGLE BALL LIST CONTAINER
        ballListContainer.classList.toggle('hidden');
        // BALL SIZE CHANGE
        SIZE.onclick = () => {
            // TOGGLE FORM
            $('#ball-size-wrapper').toggleClass('hidden');
            // HIDE OTHER FORMS
            $('#ball-size').siblings().children('div').addClass('hidden');
        }
        // BALL SPEED CHANGE
        // SPEED.onclick = () => {
        //     // TOGGLE FORM
        //     $('#ball-speed-wrapper').toggleClass('hidden');
        //     // HIDE OTHER FORMS
        //     $('#ball-speed').siblings().children('div').addClass('hidden');
        // }
    }
};

// IFFY
(function gameLoop() {
    start();
    requestAnimationFrame(gameLoop);
})();


