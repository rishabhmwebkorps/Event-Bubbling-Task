// Select the necessary elements from the HTML
const randomNumberBox = document.getElementById('random-number');
const timerBox = document.getElementById('timer');
const coinsBox = document.getElementById('coins');
const circleContainer = document.querySelector('.circle-container');

let coins = 0;        // Number of coins earned
let randomNumber = 0; // The random number to find
let timeLeft = 30;    // Time left on the timer
let timerInterval;    // To hold the timer's interval

// Start the game when the page loads
initGame();

// Function to start or restart the game
function initGame() {
    randomNumber = getRandomNumber(); 
    randomNumberBox.textContent = randomNumber; 
    assignNumbersToCircles(); 
    startTimer();
}

// Function to generate a random number between 1 and 10
function getRandomNumber() {
    return Math.floor(Math.random() * 10) + 1;
}

// Function to assign numbers to the circles
function assignNumbersToCircles() {
    const circles = document.querySelectorAll('.circle');
    let numbers = [];

    // Fill the numbers array with random numbers
    for (let i = 0; i < circles.length; i++) {
        numbers.push(getRandomNumber());
    }

    // Replace a random circle's number with the random number to find
    const randomIndex = Math.floor(Math.random() * circles.length);
    numbers[randomIndex] = randomNumber;

    // Assign the numbers to the circles
    for (let i = 0; i < circles.length; i++) {
        circles[i].textContent = numbers[i];
    }
}

// Function to start the timer
function startTimer() {
    clearInterval(timerInterval); // Clear any existing timer
    timeLeft = 30;
    timerBox.textContent = `${timeLeft}s`;

    timerInterval = setInterval(() => {
        timeLeft--;
        timerBox.textContent = `${timeLeft}s`;

        if (timeLeft <= 0) {
            clearInterval(timerInterval);
            alert(`Time's up! You collected ${coins} coins.`);
            resetGame();
        }
    }, 1000);
}

// Function to reset the game
function resetGame() {
    clearInterval(timerInterval);
    coins = 0;
    coinsBox.textContent = `Coins: ${coins}`;
    initGame();
}

// Event listener for clicks on the circles using event bubbling
circleContainer.addEventListener('click', (event) => {
    if (event.target.classList.contains('circle')) {
        const clickedNumber = parseInt(event.target.textContent);

        if (clickedNumber === randomNumber) {
            coins++;
            coinsBox.textContent = `Coins: ${coins}`;
            initGame();
        } else {
            alert("Wrong number selected! The game will now reset.");
            resetGame();
        }
    }
});
