//Instantiate variables and elements
//multiplied time by ten to avoid weird decimal problems
var wrongPenalty = 100
var questionOrder = [];
var currentQuestion;
var timeInterval;
var lastAnswerCorrect;
var gotAllCorrect = true;
var allScores = [];
var initialsEntered;
var scoreToSubmit = { init: null, score: null }
var maxScores = 5
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
questionH2.className = "question"

var answersUl = document.createElement("ul");
answersUl.className = "answers-ul"

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
timer.className = "timer"
timer.id = "timer"
var timerValue = document.createElement("span")
timerValue.className = "timer"
timerValue.id = "timer-value"

var rightWrongDiv = document.createElement("div")
rightWrongDiv.className = "right-wrong"
var rightH4 = document.createElement("h4")
rightH4.id = "right"
rightH4.textContent = "Correct!"
var wrongH4 = document.createElement("h4")
wrongH4.id = "wrong"
wrongH4.textContent = "Wrong!"

//Game over screen elements
var gameOverDiv = document.createElement("div")
var gameOverH2 = document.createElement("h2")

var finalScoreValueDiv = document.createElement("div")
var scoreDisplayH3 = document.createElement("h3")
var scoreDisplaySpan = document.createElement("span")

var initialsEntryDiv = document.createElement("div")
var initialsInput = document.createElement("input")
var initialsSubmitButton = document.createElement("button")


//Create all questions and answers as objects, then store them all in an array
var allQuestions = []
var question0 = {
    q: "A JavaScript array has what symbols around it's value?",
    a: ["Parentheses",
        "Square Brackets", //second 1
        'Quotation Marks',
        "Curly Brackets"],
    c: "Square Brackets"
}
var question1 = {
    q: "A JavaScript Object has what symbols around it's value?",
    a: ["Curly Brackets", //first 1
        "Angled Brackets",
        'An Ampersand on both sides',
        "It doesn't have any"],
    c: "Curly Brackets"
}
var question2 = {
    q: "Which of the following is 'truthy'?",
    a: ['""',
        "null",
        '"0"', //third 1
        "NaN"],
    c: '"0"'
}
var question3 = {
    q: "What does DOM stand for?",
    a: ["It's short for Domino's",
        "Document Object Model", //second 2
        'Distribution Ordinance Machine ',
        "Dominant Ordering Mommy"],
    c: "Document Object Model"
}
var question4 = {
    q: "What does .push() do to an array?",
    a: ["Adds an element to the beginning",
        "Removes an element from the end",
        "Adds an element to the end", //third 2
        "Pushes the array into an array that is in the ()"],
    c: "Adds an element to the end"
}
var question5 = {
    q: "How do you write a comment in JavaScript?",
    a: ["Add ?? before the comment",
        "Add $$ before the comment",
        "Add && before the comment",
        "Add // before the comment"], //fourth 1
    c: "Add // before the comment"
}
var question6 = {
    q: "How do you link your JavaScript script to the webpage?",
    a: ["You don't have to, it will execute as long as it's in the scripts folder",
        "Add a <link> tag in the head of the HTML",
        "Use a <script> tag, usually at the bottom of the body.", //third 3
        "Use a <script> tag, usually in the head."],
    c: "Use a <script> tag, usually at the bottom of the body."
}
var question7 = {
    q: "How do you add an element to the beginning of an array?",
    a: ["Use .unshift()",//first 2
        "Use .push()",
        "Use .shift()",
        "Use .pop()"],
    c: "Use .unshift()"
}
var question8 = {
    q: "How do you create an HTML element via Javascript?",
    a: ["use document.makeElement()",
        "use document.makeClass()",
        "use document.appendChild()",
        "use document.createElement()"], //fourth 2
    c: "use document.createElement()"
}
var question9 = {
    q: "How do you add a class to an HTML element in Javascript?",
    a: ['Use yourElement.className = "your class name"',//first 3
        'Use yourElement.addClass("your class name")',
        'Use yourElement.insertClass("your class name")',
        "You can't, it must be done in the HTML."],
    c: 'Use yourElement.className = "your class name"'
}
var question10 = {
    q: "A Javascript object's properties are separated by what symbol?",
    a: ["A backslash (\\)",
        "A comma (,)", //second 3
        "A plus sign (+)",
        "An ampersand (&)"],
    c: "A comma (,)"
}
var question11 = {
    q: "How do you print something to the console in Javascript?",
    a: ["Console.WriteLine()",
        "system.print()",
        "println()",
        "console.log()"], //fourth 3
    c: "console.log()"

}
allQuestions.push(question0, question1, question2, question3, question4, question5, question6, question7, question8, question9, question10, question11)

//give 10 seconds per question
var startTime = allQuestions.length * 100;
var timeLeft;

//Show start screen
function startScreen() {
    clearScreen();
    //Append Items

    titleH1.textContent = "Javascript Quiz"
    bodyElement.appendChild(header)
    header.appendChild(titleH1)



    //using innerHTML instead of textContent lets me use the <br/> to break the line.
    descriptionP.innerHTML = "Welcome to my Javascript quiz!<br />You will have " + (startTime / 10) + " seconds to answer " + allQuestions.length + " questions. If you answer correctly, you move onto the next question. If answer the question wrong, you lose " + (wrongPenalty / 10) + " seconds and move to the next question. Press the start button to begin, or the scores button to view the scores!"
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
    timeLeft = startTime;
    currentQuestion = 0;
    timerValue.textContent = timeLeft
    //shuffle the question order
    for (var i = 0; i < allQuestions.length; i++) {
        questionOrder[i] = i
    }
    shuffleArray(questionOrder)
    console.log("Question order: " + questionOrder)
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

    //tell player if previous answer was right or wrong
    bodyElement.appendChild(rightWrongDiv)
    rightWrongDiv.replaceChildren();
    if (lastAnswerCorrect == true) {
        rightWrongDiv.appendChild(rightH4)
    } else if (lastAnswerCorrect == false) {
        rightWrongDiv.appendChild(wrongH4)
    }
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

//logic for getting it right or wrong
function rightAnswer() {
    console.log("correct")
    lastAnswerCorrect = true;
    currentQuestion++
    if (currentQuestion < allQuestions.length) {
        showQuestion()
    } else {
        gameOver()
    }
}

function wrongAnswer() {
    console.log("wrong")
    gotAllCorrect = false;
    lastAnswerCorrect = false;
    currentQuestion++
    timeLeft = timeLeft - wrongPenalty;
    timerValue.textContent = timeLeft / 10;
    if (currentQuestion < allQuestions.length) {
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
    timerValue.textContent = timeLeft / 10
    if (timeLeft <= 0) {
        stopTimer()
        gameOver();
    } else {
        timeLeft--;
    }
}
function stopTimer() {
    clearInterval(timeInterval);
    timeInterval = null;
}
//end screen where you type initials
function gameOver() {
    stopTimer()
    clearScreen()
    console.log("Score: " + timeLeft)
    console.log("Game Over")

    gameOverH2.textContent = "Quiz Over!"
    scoreDisplayH3.textContent = "Your finals score was: "
    scoreDisplaySpan.textContent = timeLeft / 10;
    initialsInput.setAttribute("placeholder", "Enter Initials")
    initialsInput.setAttribute("maxlength", 3)
    initialsSubmitButton.textContent = "Submit"

    bodyElement.appendChild(gameOverDiv)
    gameOverDiv.appendChild(gameOverH2)

    bodyElement.appendChild(finalScoreValueDiv)
    finalScoreValueDiv.appendChild(scoreDisplayH3)
    scoreDisplayH3.appendChild(scoreDisplaySpan)

    bodyElement.appendChild(initialsEntryDiv)
    initialsEntryDiv.appendChild(initialsInput)
    initialsEntryDiv.appendChild(initialsSubmitButton)
    //easter egg if u got them all right :) 
    if(gotAllCorrect){
        
    }
}
//event listener for the initials submit button
initialsSubmitButton.addEventListener("click", submitScores)
//submitting the scores
function submitScores() {
    initialsEntered = initialsInput.value
    if (!initialsEntered) {
        alert("Please enter a value.")
    } else {
        console.log("Submit scores " + initialsEntered)
        scoreToSubmit.init = initialsEntered;
        scoreToSubmit.score = timeLeft;
        console.log(scoreToSubmit)
        //get local scores if there are any
        if (localStorage.getItem("scores")) {
            allScores = localStorage.getItem("scores")
            allScores = JSON.parse(allScores)
        }
        console.log(scoreToSubmit)
        allScores.push(scoreToSubmit)
        console.log(allScores)
        if (allScores.length > maxScores) {
            removeSlowestScore()
        }
        sortScores()

        allScores = JSON.stringify(allScores)
        localStorage.setItem("scores", allScores)
    }
}
//  function to remove the slowest scores, so the save doesnt get cluttered with tons of scores
function removeSlowestScore() {
    while (allScores.length > maxScores) {
        var slowest = 10000;
        var slowestIndex;
        console.log("remove slowest")
        for (var i = 0; i < allScores.length; i++) {
            if (allScores[i].score < slowest) {
                slowest = allScores[i].score
                slowestIndex = i
            }
        }
        //delete the element at the slowest position
        allScores.splice(slowestIndex, 1)
        console.log(allScores)
    }
}
function sortScores() {
    allScores.splice()
}

//screen where scores show, main menu and restart buttons are at the bottom
function showScores() {
    //TODO: Sort scores
    clearScreen()
}


//function that clears all elements from the screen
function clearScreen() {
    bodyElement.replaceChildren()
}
//keydown event listener for debugging
document.addEventListener("keydown", function (event) {
    if(event.key == "/"){
        timeLeft = 0;
    }
})

//function that will shuffle an array
function shuffleArray(array) {
    for (var i = array.length - 1; i > 0; i--) {
        var rand = Math.floor(Math.random() * (i + 1));
        [array[i], array[rand]] = [array[rand], array[i]]
    }
}
startScreen()