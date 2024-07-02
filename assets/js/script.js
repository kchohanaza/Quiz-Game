//option questions ans answers
const questions =[
    
    {
     question: "What is the term for a score of three under par on a single hole",
     answers:[
         {text:"Eagle", correct: false},
         {text: "Double Eagle", correct: false},
         {text: "Albatross", correct: true},
         {text: "Birdie", correct: false},
     ]
    },
    {
     question: "What do you call the grassy area surrounding the putting green?",
     answers:[
         {text:"Rough", correct: false},
         {text: "Fairway", correct: false},
         {text: "Fringe", correct: true},
         {text: "Hazard", correct: false},
     ]
    },
    {
     question: "In which country did the game of golf originate?",
     answers:[
         {text:"USA", correct: false},
         {text: "Scotland", correct: true},
         {text: "Ireland", correct: false},
         {text: "England", correct: false},
     ]
    },

    { 
        question: " What is the standard number of holes on a golf course?",
        answers:[
            {text:"9", correct: false},
            {text: "18", correct: true},
            {text: "27", correct: false},
            {text: "36", correct: false},
        ]
       },
       { 
        question: " Which major golf tournament is held at different courses each year?",
        answers:[
            {text:"The Masters", correct: false},
            {text: "The Open Championship", correct: false},
            {text: "U.S. Open", correct: true},
            {text: "PGA Championship", correct: false},
        ]
       },

 ];
 //Connect elements from the DOM using their ids and class selector for start-button 
 //question button
 const questionElement = document.getElementById("question-text");
 console.log(questionElement);
 //answer buttons
 const answerContainer = document.getElementById("answer-select");
 console.log(answerContainer);
 const startButton = document.querySelector(".start-quiz-btn");
 const nextButton = document.getElementById("next-question-btn");
 const checkAnswerButton = document.getElementById("check-answer-btn");


// Define state variables
 let currentQuestionIndex = 0;
 let score = 0;

// Add event listener for start button to begin quiz
startButton.addEventListener("click", startQuiz);
 
/**
 * startQuiz function starts the Quiz by resetting the currentQuestionIndex and score, 
 * hiding the landing page area and displaying the question area, 
 * updating the button text, and calling showQuestion function.
 */
 function startQuiz(){
     currentQuestionIndex = 0;
     score= 0;
     nextButton.innerText = "Next"; // Ensure the text of next button is set to "Next"
     nextButton.style.display = "none"; // Ensure next button is hidden initially
     checkAnswerButton.style.display = "block"; // Ensure check answer button is shown initially
     // Hide the landing page area
     document.getElementById("landing-page").style.display = 'none';
     // Show the question section
     document.getElementById("question-section").style.display = 'block';
     showQuestion(); // Show the first question
 }

/**
 * showQuestion function displays the current question and its answer options. 
 * Dynamically creates radio buttons for each answer and adds them to the answer container. 
 */
    function showQuestion(){
    resetState(); //reset the previous question
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex +1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question;
// Create and Display Answer Options
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
////////
    
function resetState(){
    nextButton.style.display = "none";
    while(answerButtons.firstChild){
        answerButtons.removeChild(answerButtons.firstChild)
    }
}
/////
function selectAnswer(e){
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if(isCorrect){
        selectedBtn.classList.add("correct");
        score++;

    }else{
        selectedBtn.classList.add("incorrect");
    }
    Array.from(answerButtons.children).forEach(button => {
        if(button.dataset.correct === "true"){
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextButton.style.display = "block";
}

//function to show score
function showScore(){
    resetState();
    questionElement.innerHTML = `You scored ${score} out of${questions.length}!`;
    nextButton.innerHTML = "Play Again";
    nextButton.style.display = "block";
}
function handleNextButton(){
    currentQuestionIndex++;
    if(currentQuestionIndex < questions.length){
        showQuestion();
    }else{showScore();

    }
}
nextButton.addEventListener("click", () => {
    if(currentQuestionIndex < questions.length){
        handleNextButton();
    }else{
        startQuiz();
    }
});

startQuiz();

