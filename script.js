// total score object which takes computer score and player score.
const totalScore = {
    computerScore: 0,
    playerScore: 0
}

function getComputerChoice() {
    const arr = ['Rock', 'Paper', 'Scissors'];
    const ran = arr[Math.floor(Math.random() * arr.length)];
    return ran;
}

// ** getResult compares playerChoice & computerChoice and returns the score accordingly **
function getResult(playerChoice, computerChoice) {
    // return the result of score based on if you won, drew, or lost
    let score;
    // All situations where human draws, set `score` to 0
    if (playerChoice === computerChoice) {
        score = 0;
        return score;
    }
    // All situations where human wins, set `score` to 1
    // make sure to use else ifs here
    if (playerChoice === "Rock" && computerChoice === "Scissors") {
        score = 1;
    } else if (playerChoice === "Scissors" && computerChoice === "Paper") {
        score = 1;
    } else if (playerChoice === "Paper" && computerChoice === "Rock") {
        score = 1;
    } else {
        score = -1;
    }
    return score;
}

// ** showResult updates the DOM to `You Win!` or `You Lose!` or `It's a Draw!` based on the score. Also shows Player Choice vs. Computer Choice**
function showResult(score, playerChoice, computerChoice) {
    // Hint: on a score of -1
    // You should do result.innerText = 'You Lose!'
    // Don't forget to grab the div with the 'result' id!
    if (score === -1) {
        document.getElementById("result").innerText = "Oops You Lose!!";
        playSound("wrong");
    } else if (score === 0) {
        document.getElementById("result").innerText = "Game Tied!!";
        playSound("red");
    } else {
        document.getElementById("result").innerText = "Congrats You won!!";
        playSound("success");
    }
    document.getElementById('hands').innerText = `👦🏻${playerChoice} vs 🤖${computerChoice}`
    document.getElementById('hands').style = "margin-bottom : 20px";

    document.getElementById("player-score").innerText = "Your Score : " + totalScore['playerScore'];
    document.getElementById("player-score").style = "margin-bottom : 20px;"
}

// ** Calculate who won and show it on the screen **
function onClickRPS(playerChoice) {
    const comp = getComputerChoice();
    const score = getResult(playerChoice, comp);

    totalScore['playerScore'] += score;
    showResult(score, playerChoice, comp);
    addColor(score);
}

// adds the color according to the result of the player
// green is wins , red if loses and yellow for draw
function addColor(score) {
    if (score == 0) {
        document.getElementById("result").style = "color : yellow; margin-bottom : 20px";
    }else if(score == 1){
        document.getElementById("result").style = "color : #01ff01; margin-bottom : 20px";
    }else{
        document.getElementById("result").style = "color : red; margin-bottom : 20px";
    }
}
// ** Make the RPS buttons actively listen for a click and do something once a click is detected **
function playGame() {
    // use querySelector to select all RPS Buttons
    let RPSButtons = document.querySelectorAll('.rpsButton');
    // * Adds an on click event listener to each RPS button and every time you click it, it calls the onClickRPS function with the RPS button that was last clicked *
    // 1. loop through the buttons using a forEach loop
    // 2. Add a 'click' event listener to each button
    // 3. Call the onClickRPS function every time someone clicks
    // 4. Make sure to pass the currently selected rps button as an argument
    RPSButtons.forEach(rpsButton => {
        rpsButton.onclick = () => onClickRPS(rpsButton.value);
    });

    // Added a click listener to the end game button that runs the endGame() function on click
    document.getElementById('endGameButton').onclick = () => endGame();
}

// ** endGame function clears all the text on the DOM **
function endGame() {
    playSound("blue");
    totalScore['playerScore'] = 0;
    totalScore['computerScore'] = 0;
    document.getElementById("result").innerText = "";
    document.getElementById("player-score").innerText = "";
    document.getElementById("hands").innerText = "";
}
// function for playing the audio for each color
function playSound(audioName) {
    let audio = new Audio("Audio/" + audioName + ".mp3");
    audio.play();
}
playGame()