//Instantiate variables and elements
var wrongPenalty = 10
var startTime = 600;
var timeLeft = startTime;
var questionOrder = [];
var currentQuestion;
var timeInterval;
//elements for start screen
var bodyElement = document.querySelector(".main")
var header = document.createElement("header")
var titleH1 = document.createElement("h1")
var descDiv = document.createElement("div")
descDiv.className = "description"
var descriptionP = document.createElement("p")
var buttonDiv = document.createElement("div")
buttonDiv.className = "button-container"
var startButton = document.createElement("button")
startButton.className = "button"
startButton.id = "start-button"
var scoreButton = document.createElement("button")
scoreButton.className = "button"
scoreButton.id = "score-button"
//elements for question screen
var questionH2 = document.createElement("h2");

var answersUl = document.createElement("ul");

var answer1 = document.createElement("li")
var answer1Button = document.createElement("button")
answer1Button.className = "answer-button"
answer1Button.id = "answer1"

var answer2 = document.createElement("li")
var answer2Button = document.createElement("button")
answer2Button.className = "answer-button"
answer2Button.id = "answer2"

var answer3 = document.createElement("li")
var answer3Button = document.createElement("button")
answer3Button.className = "answer-button"
answer3Button.id = "answer3"

var answer4 = document.createElement("li")
var answer4Button = document.createElement("button")
answer4Button.className = "answer-button"
answer4Button.id = "answer4"

var timer = document.createElement("h2")
var timerValue = document.createElement("span")
//Create all questions and answers as objects, then store them all in an array
var allQuestions = []
var question0 = {
    q: "A JavaScript array has what symbols around it's value?",
    a: ["Parentheses",
        "Square Brackets",
        'Quotation Marks',
        "Curly Brackets"],
    c: "Square Brackets"
}
var question1 = {
    q: "A JavaScript Object has what symbols around it's value?",
    a: ["Curly Brackets",
        "Angled Brackets",
        'An Ampersand on both sides',
        "It doesn't have any"],
    c: "Curly Brackets"
}
var question2 = {
    q: "Which of the following is 'truthy'?",
    a: ['""',
        "null",
        '"0"',
        "NaN"],
    c: '"0"'
}
var question3 = {
    q: "What does DOM stand for?",
    a: ["It's short for Domino's",
        "Document Object Model",
        'Distribution Ordinance Machine ',
        "Dominant Observant Machine"],
    c: "Document Object Model"
}
var question4 = {
    q: "What does .push() do to an array?",
    a: ["Adds an element to the beginning",
        "Removes an element from the end",
        "Adds an element to the end",
        "Pushes the array into an array that is in the ()"],
    c: "Adds an element to the end"
}
var question5 = {
    q: "How do you write a comment in JavaScript?",
    a: ["Add ?? before the comment",
        "Add $$ before the comment",
        "Add && before the comment",
        "Add // before the comment"],
    c: "Add // before the comment"
}
var question6 = {
    q: "How do you link your JavaScript script to the webpage?",
    a: ["You don't have to, it will execute as long as it's in the scripts folder",
        "Add a <link> tag in the head of the HTML",
        "Use a <script> tag, usually at the bottom of the body.",
        ""]
}
allQuestions.push(question0, question1, question2, question3, question4,question5)


//Show start screen
function startScreen() {
    clearScreen();
    //Append Items

    titleH1.textContent = "Javascript Quiz"
    bodyElement.appendChild(header)
    header.appendChild(titleH1)



    //using innerHTML instead of textContent lets me use the <br/> to break the line.
    descriptionP.innerHTML = "Welcome to my Javascript quiz!<br />You will have "+(startTime/10)+" seconds to answer the questions as they come onto screen! There are " + allQuestions.length + " questions. If you answer correctly, you move onto the next question. If answer the question wrong, you lose " + wrongPenalty + " seconds and move to the next question. Press the start button to begin, or the scores button to view the scores!"
    bodyElement.appendChild(descDiv)
    descDiv.appendChild(descriptionP)




    startButton.textContent = "Start"
    scoreButton.textContent = "Scores"

    bodyElement.appendChild(buttonDiv)
    buttonDiv.appendChild(startButton)
    buttonDiv.appendChild(scoreButton)
}
//start button
startButton.addEventListener("click", startGame)
//scores button
scoreButton.addEventListener("click", showScores)


//start game
function startGame() {
    currentQuestion = 0;
    timerValue.textContent = timeLeft
    //shuffle the question order
    for (var i = 0; i < allQuestions.length; i++) {
        questionOrder[i] = i
    }
    shuffleArray(questionOrder)
    console.log("Question order: "+questionOrder)
    startTimer()
    showQuestion()
}

//show Question
function showQuestion() {
    clearScreen()

    questionH2.textContent = allQuestions[questionOrder[currentQuestion]].q;
    answer1Button.textContent = allQuestions[questionOrder[currentQuestion]].a[0];
    answer2Button.textContent = allQuestions[questionOrder[currentQuestion]].a[1];
    answer3Button.textContent = allQuestions[questionOrder[currentQuestion]].a[2];
    answer4Button.textContent = allQuestions[questionOrder[currentQuestion]].a[3];

    //render page
    bodyElement.appendChild(timer)
    timer.textContent = "Time left: "
    timer.appendChild(timerValue)
    bodyElement.appendChild(questionH2)
    bodyElement.appendChild(answersUl)
    answersUl.appendChild(answer1)
    answersUl.appendChild(answer2)
    answersUl.appendChild(answer3)
    answersUl.appendChild(answer4)
    answer1.appendChild(answer1Button)
    answer2.appendChild(answer2Button)
    answer3.appendChild(answer3Button)
    answer4.appendChild(answer4Button)


}
//logic for each of the buttons
answer1Button.addEventListener("click", function () {
    if (answer1Button.textContent == allQuestions[questionOrder[currentQuestion]].c) {
        rightAnswer();
    } else {
        wrongAnswer();
    }
})
answer2Button.addEventListener("click", function () {
    if (answer2Button.textContent == allQuestions[questionOrder[currentQuestion]].c) {
        rightAnswer();
    } else {
        wrongAnswer();
    }
})
answer3Button.addEventListener("click", function () {
    if (answer3Button.textContent == allQuestions[questionOrder[currentQuestion]].c) {
        rightAnswer();
    } else {
        wrongAnswer();
    }
})
answer4Button.addEventListener("click", function () {
    if (answer4Button.textContent == allQuestions[questionOrder[currentQuestion]].c) {
        rightAnswer();
    } else {
        wrongAnswer();
    }
})

function rightAnswer() {
    console.log("correct")
    currentQuestion++
    if(currentQuestion < allQuestions.length){
    showQuestion()
    } else {
        gameOver()
    }
}

function wrongAnswer() {
    console.log("wrong")
    currentQuestion++
    timeLeft-=wrongPenalty;
    timerValue.textContent = timeLeft;
    if(currentQuestion < allQuestions.length){
        showQuestion()
        } else {
            gameOver()
        }
}


//timer functions. extra because it ticks once before timer starts
function startTimer() {
    tickTimer()
    timeInterval = setInterval(tickTimer, 100)
}
function tickTimer() {
    timerValue.textContent = timeLeft/10
    if (timeLeft <= 0) {
        clearInterval(timeInterval);
        timeInterval = null;
        gameOver();
    } else {
        timeLeft--;
    }
}

//end screen where you type initials
function gameOver() {
    clearScreen()
    console.log("Game Over")
}

//screen where scores show, main menu and restart buttons are at the bottom
function showScores() {

}


//function that clears all elements from the screen
function clearScreen() {
    bodyElement.replaceChildren()
}
//keydown event listener for debugging
document.addEventListener("keydown", function () {
    console.log("pressed a button")
})

//function that will shuffle an array
function shuffleArray(array) {
    for (var i = array.length - 1; i > 0; i--) {
        var rand = Math.floor(Math.random() * (i + 1));
        [array[i], array[rand]] = [array[rand], array[i]]
    }
}
startScreen()