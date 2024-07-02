//setup of arrey of questions and answers
const questions = [

    {
        question: "What is the term for a score of three under par on a single hole",
        answers: [
            { text: "Eagle", correct: false },
            { text: "Double Eagle", correct: false },
            { text: "Albatross", correct: true },
            { text: "Birdie", correct: false },
        ]
    },
    {
        question: "What do you call the grassy area surrounding the putting green?",
        answers: [
            { text: "Rough", correct: false },
            { text: "Fairway", correct: false },
            { text: "Fringe", correct: true },
            { text: "Hazard", correct: false },
        ]
    },
    {
        question: "In which country did the game of golf originate?",
        answers: [
            { text: "USA", correct: false },
            { text: "Scotland", correct: true },
            { text: "Ireland", correct: false },
            { text: "England", correct: false },
        ]
    },

    {
        question: " What is the standard number of holes on a golf course?",
        answers: [
            { text: "9", correct: false },
            { text: "18", correct: true },
            { text: "27", correct: false },
            { text: "36", correct: false },
        ]
    },
    {
        question: " Which major golf tournament is held at different courses each year?",
        answers: [
            { text: "The Masters", correct: false },
            { text: "The Open Championship", correct: false },
            { text: "U.S. Open", correct: true },
            { text: "PGA Championship", correct: false },
        ]
    },

];//question button
const questionElement = document.getElementById("question-text");
console.log(questionElement);
//answer buttons
const answerButtons = document.getElementById("answer-buttons");
console.log(answerButtons);
const nextButton = document.getElementById("check-answer-btn");
let currentQuestionIndex = 0;
let score = 0;

//* function to start the quiz*/
function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHtml = "Next";
    showQuestion();
}
//show questions from index file
function showQuestion() {
    resetState(); //reset the previous question
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question;
    //check options of current questions if its correct or not
    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);
        if (answer.correct) {
            button.dataset.correct = answer.correct;
        }
        //on click it will select answers
        button.addEventListener("click", selectAnswer);
    });
}
////////

function resetState() {
    nextButton.style.display = "none";
    while (answerButtons.firstChild) {
        answerButtons.removeChild(answerButtons.firstChild)
    }
}
/////
function selectAnswer(e) {
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if (isCorrect) {
        selectedBtn.classList.add("correct");
        score++;

    } else {
        selectedBtn.classList.add("incorrect");
    }
    Array.from(answerButtons.children).forEach(button => {
        if (button.dataset.correct === "true") {
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextButton.style.display = "block";
}

//function to show score
function showScore() {
    resetState();
    questionElement.innerHTML = `You scored ${score} out of${questions.length}!`;
    nextButton.innerHTML = "Play Again";
    nextButton.style.display = "block";
}
function handleNextButton() {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        showQuestion();
    } else {
        showScore();

    }
}
nextButton.addEventListener("click", () => {
    if (currentQuestionIndex < questions.length) {
        handleNextButton();
    } else {
        startQuiz();
    }
});

startQuiz();

