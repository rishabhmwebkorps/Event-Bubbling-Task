

const circleContainer = document.querySelector('.numbersContainer');

let coins = 0;        
let randomNumber;    
let timeLeft = 60;    
let timerInterval;   



function startGame() {
    const randomNumberBox = document.getElementById('targetNumber');
    randomNumberBox.textContent = (randomNumber = Math.floor(Math.random() * 20) + 1);
    circlesNumber();
    timerHeading();
}
startGame();

function circlesNumber() {
    const circles = document.querySelectorAll('.circle');
    const randomCircle = Math.floor(Math.random() * circles.length);
    console.log(circles.length,"Circle length")

    circles.forEach((circle, index) => {
        let number;
        if (index == randomCircle) {
            number = randomNumber;
        } else {
            number = Math.floor(Math.random() * 10) + 1;
        }
        circle.textContent = number;
    });
}
console.log(number);
console.log(timerInterval,'timerIntervel');


function timerHeading() {
    const timerSection = document.getElementById('timer');
    clearInterval(timerInterval); 
    timePending = 60;
    timerSection.textContent = timeLeft;

    timerInterval = setInterval(() => {
        timerSection.textContent = --timePending;

        if (timePending <= 0) {
            clearInterval(timerInterval);
            alert(`Time is over ${coins}`);
            restartGame();
        }
    }, 1000);
}

function restartGame() {
    const coinsBox = document.getElementById('coins');
    clearInterval(timerInterval);
    coins = 0;
    coinsBox.textContent = coins;
    startGame();
}

circleContainer.addEventListener('click', (e) => {
    const coinsBox = document.getElementById('coins');
    if (e.target.classList.contains('circle')) {
        const selectNumber = parseInt(e.target.textContent);

        if (selectNumber === randomNumber) {
            coinsBox.textContent = ++coins;
            startGame();
        } else {
            alert("Your Game is over.");
            restartGame();
        }
    }
});


