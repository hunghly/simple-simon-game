{
    "use strict";
    $(document).ready(() => {

        let simonSequence = [];
        let userSequence = [];
        let simonBoxEl = $('.simon-box');
        let playerTurn = false;
        let successSound = new Audio('./audio/twinkle.mp3');
        let simonSound = new Audio('./audio/bright-chime.mp3');
        let loseSound = new Audio('./audio/lose-sound.mp3');

        let randomlyGenerateColor = () => {
            let random0to3 = Math.floor(Math.random() * 4);
            switch (random0to3) {
                case 0:
                    return 'green';
                case 1:
                    return 'red';
                case 2:
                    return 'yellow';
                case 3:
                    return 'blue';
                default:
                    return false;
            }
        };

        function sleep(ms) {
            return new Promise(resolve => setTimeout(resolve, ms));
        }

        let playSequence = (sequence) => {
            sleep(2500).then(() => {
                for (let i = 0; i < sequence.length; i++) {
                    sleep(i * 2500).then(() => {
                        simonSound.play();
                        playColor(sequence[i]);
                    });
                }
            });
        };
        let playColor = (color) => {
            switch (color) {
                case 'green':
                    $('.green-box').fadeOut(100).fadeIn(1000);
                    break;
                case 'red':
                    $('.red-box').fadeOut(100).fadeIn(1000);
                    break;
                case 'yellow':
                    $('.yellow-box').fadeOut(100).fadeIn(1000);
                    break;
                case 'blue':
                    $('.blue-box').fadeOut(100).fadeIn(1000);
                    break;
                default:
                    break;
            }
        };
        let simonTurn = (sequence) => {
            if (!playerTurn) {
                simonSequence.push(randomlyGenerateColor());
                playSequence(sequence);
                userSequence = [];
                playerTurn = true;
            }
        };

        let startGame = () => {
            simonSequence = [];
            userSequence = [];
            simonTurn(simonSequence);
        };
        $(simonBoxEl).on('click', function () {
            if (playerTurn) {
                sleep(100).then(() => {
                    playColor($(this).attr('color-id'));
                    userSequence.push($(this).attr('color-id'));
                    if (userSequence.length === simonSequence.length) {
                        if (userSequence.toString() === simonSequence.toString()) {
                            playerTurn = false;
                            successSound.play();
                            simonTurn(simonSequence);
                        }
                    }
                    for (let i = 0; i < userSequence.length; i++) {
                        if (userSequence[i] !== simonSequence[i]) {
                            loseSound.play();
                            alert("You Lose.");
                            break;
                        }
                    }
                });
            }
        });
        $('.start-btn').click(() => {
            startGame();
        });
    })
}