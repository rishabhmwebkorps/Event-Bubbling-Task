let randomNumber;
let coins = 0;
let wrongClicks = 0; // Counter for wrong clicks
let timerInterval;

function startGame() {
    const randomNumberBox = document.getElementById('targetNumber');
    randomNumberBox.innerHTML = `${(randomNumber = Math.floor(Math.random() * 30) + 1)}`;
    circlesNumber();
    timerHeading();
}

function reset() {
    const randomNumberBox = document.getElementById('targetNumber');
    randomNumberBox.innerHTML = `${(randomNumber = Math.floor(Math.random() * 30) + 1)}`;
    circlesNumber();
}

function circlesNumber() {
    const circles = document.querySelectorAll('.circle');
    const randomCircle = Math.floor(Math.random() * circles.length);

    circles.forEach((circle, index) => {
        let number;
        if (index == randomCircle) {
            number = randomNumber;
        } else {
            number = Math.floor(Math.random() * 30) + 1;
        }
        circle.innerHTML = number;
    });
}

function timerHeading() {
    const timerSection = document.getElementById('timer');

    clearInterval(timerInterval); 
    let timeLeft = 120;
    timerSection.innerHTML = `Timer Start ${timeLeft}`;
    // let timeLeftt = parseInt(timerSection.innerHTML.split('-')[1].trim()); 

    timerInterval = setInterval(() => {
        timerSection.innerHTML = `Timer - ${timeLeft--}`;
        if (timeLeft <= 0) {
            clearInterval(timerInterval);
            showModal(`Time is over: ${coins} Coins!`);
        }
    }, 1000);
}

function restartGame() {
    const coinsBox = document.getElementById('coins');
    clearInterval(timerInterval); 
    coins = 0;
    wrongClicks = 0; 
    coinsBox.innerHTML = `${coins} Coins`;
    startGame();
}

function onCancel() {
    document.getElementById('modal').style.display = 'none';
    restartGame();
    startTimerAgain()
}

function onCancels() {
    document.getElementById('modal').style.display = 'none';
    reset();
    startTimerAgain();
}

function showModal(message) {
    clearInterval(timerInterval); 
    const modals = document.getElementById('modal');
    modals.innerHTML = `
        <div class="carDe">
              <a onclick="onCancel()"><img src="./images/close.svg" class="close"></a>
                <img src='./images/ghost.svg' class='puzzle'>
            <p>${message}</p>
            <button onclick="onCancel()" class='resta'>Restart</button>
        </div>`;
    modals.style.display = 'block';
}

function startTimerAgain() {
    const timerSection = document.getElementById('timer');
    let timeLeft = parseInt(timerSection.innerHTML.split('-')[1].trim()); 
    timerInterval = setInterval(() => {
        timerSection.innerHTML = `Timer - ${timeLeft--}`;
        if (timeLeft <= 0) {
            clearInterval(timerInterval);
            showModal(`Time is over: ${coins} Coins!`);
        }
    }, 1000);
}

document.querySelector('.numbersContainer').addEventListener('click', (e) => {
    const coinsBox = document.getElementById('coins');
    const modals = document.getElementById('modal');
    if (e.target.classList.contains('circle')) {
        const selectNumber = Number(e.target.innerHTML);

        if (selectNumber === randomNumber) {
            coinsBox.innerHTML = `Coins ${++coins}`;
            reset();
        } else {
           
            wrongClicks++;
            if (wrongClicks >= 3) {
           
                showModal(`Game is over you have collected ${coins} coins.`);
                restartGame();
            } else {
                clearInterval(timerInterval);
                modals.innerHTML = `
                    <div class="cardDetails">
                 <a onclick="onCancels()"><img src="./images/close.svg" class="close"></a>
                 <img src='./images/puzzle.svg' class='puzzle'>
                        <p> You have only ${3 - wrongClicks} Chances left !</p>
                   <button onclick="onCancels()" class='resta'>Please Try Again !</button>
                    </div>`;
                modals.style.display = 'block';
            }
        }
    }
});

startGame();
