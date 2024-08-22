let coins = 0;
let randomNumber;
let timerInterval;

function startGame() {
    const randomNumberBox = document.getElementById('targetNumber');
    randomNumberBox.innerHTML = `Click Number (${(randomNumber = Math.floor(Math.random() * 20) + 1)})`;
    circlesNumber();
    timerHeading();
}

function reset (){
    const randomNumberBox = document.getElementById('targetNumber');
    randomNumberBox.innerHTML = `Click Number (${(randomNumber = Math.floor(Math.random() * 20) + 1)})`;
    circlesNumber();
}

startGame();
function circlesNumber() {
    const circles = document.querySelectorAll('.circle');
    const randomCircle = Math.floor(Math.random() * circles.length);

    circles.forEach((circle, index) => {

        let number;
        if (index == randomCircle) {
            number = randomNumber;
        } else {
            number = Math.floor(Math.random() * 20) + 1;
        }
        circle.innerHTML = number;
    });
}

function timerHeading() {
    const timerSection = document.getElementById('timer');
    const modals = document.getElementById('modal');
    clearInterval(timerInterval);
    let timeLeft = 120;
    timerSection.innerHTML = timeLeft;

    timerInterval = setInterval(() => {
        timerSection.innerHTML = `Timer ${--timeLeft}`;
        if (timeLeft <= 0) {
            clearInterval(timerInterval);
            const card = document.createElement('div');
            card.className = 'cardDetails';
            card.innerHTML = `
                 <button onclick=onCancel()>Cancel</button>
                <p> <span>Time is over :${coins}</span ></p>`
            modals.appendChild(card);
            modals.style.display = 'block'
        }
        
    }, 1000);
}
function restartGame() {
    const coinsBox = document.getElementById('coins');
    clearInterval(timerInterval);
    coins = 0
    coinsBox.innerHTML = coins;
    startGame();
}
function onCancel() {
    document.getElementById('modal').style.display = 'none';
    restartGame()
}
document.querySelector('.numbersContainer').addEventListener('click', (e) => {
    const coinsBox = document.getElementById('coins');
    const modals = document.getElementById('modal');
    if (e.target.classList.contains('circle')) {
        const selectNumber = parseInt(e.target.innerHTML);

        if (selectNumber === randomNumber) {
            coinsBox.innerHTML = `Coins ${++coins}`;
            reset();
        } else {
            const card = document.createElement('div');
            card.className = 'cardDetails';
            card.innerHTML = `
                <button onclick=onCancel()>Restart</button>
                <p> <span>Game is over :${coins} coins</span ></p>`
            modals.appendChild(card);
            modals.style.display = 'block'
            
        }
    }
});





