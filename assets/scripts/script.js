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
gameOverH2.id = "game-over"

var finalScoreValueDiv = document.createElement("div")
finalScoreValueDiv.className = "score-display"
var scoreDisplayH3 = document.createElement("h3")
var scoreDisplaySpan = document.createElement("span")

var initialsEntryDiv = document.createElement("div")
initialsEntryDiv.className = "initials-entry"
var initialsInput = document.createElement("input")
var initialsSubmitButton = document.createElement("button")

var flabbergasted = document.createElement("img")
flabbergasted.setAttribute("src", "./assets/images/flabbergasted.jpg")
flabbergasted.id = "cat"

//Score Screen elements
var scoresHeaderDiv = document.createElement("div")
var scoresHeaderH2 = document.createElement("h2")
scoresHeaderDiv.className = "score-header"

var scoresUl = document.createElement("ul")
var scoresLi1 = document.createElement("li")
var scoresLi2 = document.createElement("li")
var scoresLi3 = document.createElement("li")
var scoresLi4 = document.createElement("li")
var scoresLi5 = document.createElement("li")

scoresUl.className = "score-list"
scoresLi1.id = ("score-1")
scoresLi2.id = ("score-2")
scoresLi3.id = ("score-3")
scoresLi4.id = ("score-4")
scoresLi5.id = ("score-5")

var scoresMenuButton = document.createElement("button")
scoresMenuButton.id = "menu-button"
scoresMenuButton.className = "button"

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
    descriptionP.innerHTML = "Welcome to my Javascript quiz!<br />You will have " + (startTime / 10) + " seconds to answer " + allQuestions.length + " questions. If you answer correctly, you move onto the next question. If answer the question wrong, you lose " + (wrongPenalty / 10) + " seconds and move to the next question. Only scores greater than 0 will be added to the scoreboard. Press the start button to begin, or the scores button to view the scores!"
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
    lastAnswerCorrect = null
    gotAllCorrect = true
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
    lastAnswerCorrect = true;
    currentQuestion++
    if (currentQuestion < allQuestions.length) {
        showQuestion()
    } else {
        gameOver()
    }
}

function wrongAnswer() {
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
    //set time left to 0 if it is a goes below from answering wrong
    if (timeLeft < 0) { timeLeft = 0 };
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
    if (gotAllCorrect) {
        bodyElement.appendChild(flabbergasted)
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
        //only splice scores if there are other scores to compare, otherwise just add it to all scores
        if (scoreToSubmit.score > 0) {
            spliceScore()
            if (allScores.length > maxScores) {
                removeSlowestScore()
            }
            localStorage.setItem("scores", JSON.stringify(allScores))

        }
        showScores()
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
//puts the score in the right spot, in order
function spliceScore() {
    var currentLength = allScores.length
    var posToSplice = maxScores + 1; //if the score isnt greater than any, it will be put at the end
    for (var i = 0; i < currentLength; i++) {
        if (scoreToSubmit.score >= allScores[i].score) {
            posToSplice = i;
            i = currentLength;
        }
    }
    console.log("put score in position " + posToSplice)
    allScores.splice(posToSplice, 0, scoreToSubmit)
}

//screen where scores show, main menu and restart buttons are at the bottom
function showScores() {
    clearScreen()
    //get scores
    allScores = JSON.parse(localStorage.getItem("scores"))
    scoresHeaderH2.textContent = "Scores"
    //only display scores if there are any
    switch (allScores.length) {

        case 5: scoresLi5.innerHTML = ("5th: " + allScores[4].init + ", Score: <span>" + (allScores[4].score / 10) + "</span>");
        case 4: scoresLi4.innerHTML = ("4th: " + allScores[3].init + ", Score: <span>" + (allScores[3].score / 10) + "</span>")
        case 3: scoresLi3.innerHTML = ("3rd: " + allScores[2].init + ", Score: <span>" + (allScores[2].score / 10) + "</span>")
        case 2: scoresLi2.innerHTML = ("2nd: " + allScores[1].init + ", Score: <span>" + (allScores[1].score / 10) + "</span>")
        case 1: scoresLi1.innerHTML = ("1st: " + allScores[0].init + ", Score: <span>" + (allScores[0].score / 10) + "</span>")
            break;
        default: scoresLi1.textContent = "No scores yet"
    }
    bodyElement.appendChild(scoresHeaderDiv)
    scoresHeaderDiv.appendChild(scoresHeaderH2)

    bodyElement.appendChild(scoresUl)
    scoresUl.appendChild(scoresLi1)
    scoresUl.appendChild(scoresLi2)
    scoresUl.appendChild(scoresLi3)
    scoresUl.appendChild(scoresLi4)
    scoresUl.appendChild(scoresLi5)

    scoresMenuButton.textContent = "Main Menu"
    bodyElement.appendChild(scoresMenuButton)
}
//event listener for score main menu button
scoresMenuButton.addEventListener("click", function () {
    startScreen()
})


//function that clears all elements from the screen
function clearScreen() {
    bodyElement.replaceChildren()
}
//keydown event listener for debugging
// document.addEventListener("keydown", function (event) {
//     if (event.key == "/") {
//         gotAllCorrect = false;
//         timeLeft = 0;
//     }
// })

//function that will shuffle an array
function shuffleArray(array) {
    for (var i = array.length - 1; i > 0; i--) {
        var rand = Math.floor(Math.random() * (i + 1));
        [array[i], array[rand]] = [array[rand], array[i]]
    }
}
//establish local storage score if empty
if (!localStorage.getItem("scores")) {
    localStorage.setItem("scores", JSON.stringify([]))
}
startScreen()