// Define Array of Questions and Aswers
const questions = [
    {
        question: "XXX",
        answers: [
            { text: "XX", correct: false },
            { text: "XX", correct: false },
            { text: "XX", correct: false },
            { text: "XX", correct: true },
        ]
    },]

// Connect elements from the DOM using their ids and class selector for start-button 
const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-question-btn");
const startButton = document.querySelector(".start-quiz-btn"); 
const checkAnswerButton = document.getElementById("check-answer-btn");

// Define state variables
let currentQuestionIndex = 0;
let score = 0;

// Add event listener for start button to begin quiz
startButton.addEventListener("click", startQuiz);

/**
 * startQuiz function starts the Quiz by resetting the currentQuestionIndex and score, 
 * hidding the landing page area and displaying the question area, 
 * updating the button text, and calling showQuestion function.
 */
function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerText = "Next";
    nextButton.style.display = "none"; // Ensure next button is hidden initially
    checkAnswerButton.style.display = "block"; // Ensure check answer button is shown initially
    // Hide the landing page area
    document.getElementById("landing-page").style.display = 'none';
    // Show the question section
    document.getElementById("question-section").style.display = 'block';
    showQuestion();
}
s
function showQuestion() {
    //resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);
        if (answer.correct) {
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer);
    });
}


//function resetState() 


//function selectAnswer(e) 
 
// Add event listener for check answer button to handle answer checking
//checkAnswerButton.addEventListener("click", () => 

// Add event listener for next button to handle next question
//nextButton.addEventListener("click", () => 

//function handleNextButton() 

//function showScore() 

startQuiz();