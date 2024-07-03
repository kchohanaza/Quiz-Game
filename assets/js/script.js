// Define array of questions and answers
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

    {
        question: "What is the unusual rule that golfers must follow when playing in Sweden during the summer?",
        answers: [
            { text: "Only allowed to play at night", correct: false },
            { text: "Can play 24 hours a day due to the Midnight Sun", correct: true },
            { text: "Must wear brightly colored clothing", correct: false },
            { text: "No golf carts allowed", correct: false },
        ]
    },

    {
        question: "Who holds the record for the most PGA Tour wins?",
        answers: [
            { text: "Tiger Woods", correct: false },
            { text: "Jack Nicklaus", correct: false },
            { text: "Sam Snead", correct: true },
            { text: "Arnold Palmer", correct: false },
        ]
    },

    {
        question: "What is the name of the cup awarded to the winner of the Masters Tournament?",
        answers:  [
            { text: "Claret Jug", correct: false },
            { text: "Wanamaker Trophy", correct: false },
            { text: "Green Jacket", correct: true },
            { text: "US Open Trophy", correct: false },
        ]
    },

    {
        question: "Which of the following is not a name of a golf club?",
        answers: [
            { text: "Driver", correct: false },
            { text: "Putter", correct: false },
            { text: "Wedge", correct: false },
            { text: "Flyer", correct: true },
        ]
    },

    {
        question: "What is the longest recorded drive in a professional golf competition?",
        answers: [
            { text: "411 meters", correct: false },
            { text: "430 meters", correct: false },
            { text: "471 meters", correct: true },
            { text: "457 meters", correct: false },
        ]
    },
];

//Connect elements from the DOM using their ids and class selector for start-button 
const questionElement = document.getElementById("question-text");
const answerContainer = document.getElementById("answer-select");
const startButton = document.querySelector(".start-quiz-btn");
const nextButton = document.getElementById("next-question-btn");
const checkAnswerButton = document.getElementById("check-answer-btn");
const scoreText = document.getElementById("score"); 
const revealText = document.getElementById("reveal"); 
const questionHeader = document.getElementById("question"); 
const questionSection = document.getElementById("question-section");
const landingPage = document.getElementById("landing-page");
const scoreLine = document.getElementById("score-text");
let shuffledQuestions = [];

// Define state variables
let currentQuestionIndex = 0;
let score = 0;

// Add event listener for start button to begin Quiz
startButton.addEventListener("click", startQuiz);

/**
 * startQuiz function starts the Quiz by resetting the currentQuestionIndex and score, 
 * hiding the landing page area and displaying the question area, 
 * updating the button text, and calling showQuestion function to display the firts question.
 */
function startQuiz() {

    currentQuestionIndex = 0;
    score = 0;

    // Shuffle questions before starting the quiz using sort
    shuffledQuestions = questions.sort(() => Math.random() - 0.5);

    // Prepare the "Next" button 
    nextButton.innerText = "Next"; // Ensure the text of next button is set to "Next"
    nextButton.style.display = "none"; // Ensure next button is hidden initially

    // Show the "Check Answer" button
    checkAnswerButton.style.display = "block"; // Ensures the "Check Answer" button is visible.

    // Hide the landing page area
    landingPage.style.display = 'none';

    // Show the question section with quizz questions
    questionSection.style.display = 'block';

    // Show the elements that were initially hidden
    questionHeader.style.display = 'block'; 
    questionElement.style.display = 'block'; 
    checkAnswerButton.style.display = 'block';
    scoreText.style.display = 'inline';
    revealText.style.display = 'block'
    answerContainer.style.display = 'block';

    // Sets core display to 0
    scoreText.innerText = score; 

    // Calls showQuestion function to display the first question.
    showQuestion();
}

/**
 * showQuestion function displays the current question and its answer options. 
 * Dynamically creates radio buttons for each answer and adds them to the answer container. 
 */
function showQuestion() {

    // Reset the previous question by calling resetState function
    resetState();

    // Get current question from "shuffledQuestions" array, then update the question element with the current question number and text.
    const currentQuestion = shuffledQuestions[currentQuestionIndex]; 
    const questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = `${questionNo}. ${currentQuestion.question}`;

    // Create and display answer options
    // Iterates through each answer in the current question's "answers" array.
        currentQuestion.answers.forEach((answer, index) => {
        const answerDiv = document.createElement("div");
        answerDiv.classList.add("form-check", "mb-2");
        answerDiv.innerHTML = `
        <input class="form-check-input custom-radio" type="radio" name="answer" id="answer${index}" value="${answer.correct}">
        <label class="form-check-label" for="answer${index}">
            ${answer.text}
        </label>
    `;
        answerContainer.appendChild(answerDiv);
    });
}

/**
 * This function resets the Quiz state before displaying a new question.
 */
function resetState() {

    // Hide the next button initially
    nextButton.style.display = "none"; 

    // Show and enable check answer button 
    checkAnswerButton.style.display = "block"; 
    checkAnswerButton.disabled = false; 

    // Clear previous answer ptions
    while (answerContainer.firstChild) { 
        answerContainer.removeChild(answerContainer.firstChild); 
    }

    // Clear previous feedback
    revealText.innerText = '';
}

/**
 * This function handles the answer selection, 
 * checks if the answer is correct, 
 * and provides feedback. 
 */
function selectAnswer() {

    // Check if an answer is selected:
    const selectedAnswer = document.querySelector('input[name="answer"]:checked');
    if (!selectedAnswer) {
        alert("Please select an answer.");
        return;
    }

    // Check if the selected answer is correct:
    const isCorrect = selectedAnswer.value === "true";
    if (isCorrect) {
        selectedAnswer.nextElementSibling.classList.add("correct");
        score++;
        revealText.innerText = "Correct!!!"; 
    } else {
        selectedAnswer.nextElementSibling.classList.add("incorrect");
        revealText.innerText = "Incorrect!";
    }

    // Show correct answer and disable all options
    // Convert answerContainer children to an array to use Array.from() method and use 'forEach' to iterate over elements
    Array.from(answerContainer.children).forEach(div => {
        // Select the first input element (radio button) within the div
        const input = div.querySelector("input");

        // Check if the input value indicates a correct answer
        if (input.value === "true") {
            input.nextElementSibling.classList.add("correct");
        }
        input.disabled = true;
    });

    // Update score text
    scoreText.innerText = score; // Display updated score

    checkAnswerButton.disabled = true; // Disable check answer button after an answer is selected
    nextButton.style.display = "block"; // Show next button after an answer is selected
}

// Event listener for check answer button to handle answer checking
checkAnswerButton.addEventListener("click", selectAnswer);


/** 
* This function displays the final score and change the Next button to Play again.
*/
function showScore() {
    resetState();

    // Added variable to hold the final message, which is different depending on the final score
    let finalMessage = ""; 
    let messageClass = "final-message"; 

    if (score < 5) { 
        finalMessage = `You scored ${score} out of ${questions.length}.<br>
        Have another turn and see if you can beat your score!`;
    } else if (score < 10) { 
        finalMessage = `You scored ${score} out of ${questions.length}.<br> 
        You are very good at golf, congratulations on your score!`;
    } else { 
        finalMessage = `You scored ${score} out of ${questions.length}.<br>
        Your knowledge in golf is amazing, perhaps you need to practice more golf on the course instead!`;
    }
    questionElement.innerHTML = `<p class="final-message-heading">End of Quiz</P><span class="final-message">${finalMessage}</span>`;

    nextButton.innerHTML = "Play Again";
    nextButton.style.display = "block";

    // Hide unnecessary elements on the final screen
    questionHeader.style.display = 'none'; 
    checkAnswerButton.style.display = 'none'; 
    scoreText.style.display = 'none'; 
    scoreLine.style.display = 'none';
    answerContainer.style.display = 'none';
}

/**
* This function is responsible for moving to the next question if available (showQuestion function),
* or showing the final score if the current question is the last one (showScore function).
*/ 
function handleNextButton() {
    currentQuestionIndex++;
    currentQuestionIndex >= questions.length? showScore() : showQuestion();
}

// Add event listener to the nextButton to start handleNextButton function
nextButton.addEventListener("click", () => {
    if (currentQuestionIndex < questions.length) {
        handleNextButton();
    } else {
        startQuiz();
    }
});


