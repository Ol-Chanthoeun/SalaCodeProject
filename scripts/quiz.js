/**
 * 1. API CONFIGURATION
 */
const API_URL = "http://127.0.0.1:8000/api/quizzes/1";

/**
 * 2. ELEMENT SELECTORS
 */
const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

/**
 * 3. STATE VARIABLES
 */
let questions = [];
let currentQuestionIndex = 0;
let score = 0;

/**
 * 4. INITIALIZATION & FETCH DATA FROM LARAVEL
 */
async function startQuiz() {
  currentQuestionIndex = 0;
  score = 0;
  nextButton.innerHTML = "Next Question";

  questionElement.innerHTML = "កំពុងទាញយកសំណួរ..."; // Loading...

  try {
    const response = await fetch(API_URL, {
      headers: { Accept: "application/json" },
    });

    const quizData = await response.json();

    // Store questions fetched from Laravel database
    questions = quizData.questions || [];

    if (questions.length > 0) {
      showQuestion();
    } else {
      questionElement.innerHTML = "មិនទាន់មានសំណួរនៅក្នុងប្រព័ន្ធទេ។";
    }
  } catch (error) {
    console.error("Error fetching quiz:", error);
    questionElement.innerHTML =
      "មិនអាចភ្ជាប់ទៅកាន់ Server បានទេ។ សូមពិនិត្យមើល Laravel backend!";
  }
}

/**
 * 5. UI RENDERING
 */
function showQuestion() {
  resetState();

  let currentQuestion = questions[currentQuestionIndex];
  let questionNo = currentQuestionIndex + 1;

  // Set Question Text
  questionElement.innerHTML = `សំណួរទី ${questionNo}: ${currentQuestion.question_text}`;

  // Map option fields from API response (option_a, option_b, etc.)
  const options = [
    {
      text: `A. ${currentQuestion.option_a}`,
      correct: currentQuestion.correct_option === "A",
    },
    {
      text: `B. ${currentQuestion.option_b}`,
      correct: currentQuestion.correct_option === "B",
    },
    {
      text: `C. ${currentQuestion.option_c}`,
      correct: currentQuestion.correct_option === "C",
    },
    {
      text: `D. ${currentQuestion.option_d}`,
      correct: currentQuestion.correct_option === "D",
    },
  ];

  // Render option buttons
  options.forEach((answer) => {
    const button = document.createElement("button");
    button.innerHTML = answer.text;
    button.classList.add("btn");
    answerButtons.appendChild(button);

    if (answer.correct) {
      button.dataset.correct = "true";
    }

    button.addEventListener("click", selectAnswer);
  });
}

/**
 * 6. UI CLEANUP
 */
function resetState() {
  nextButton.style.display = "none";
  while (answerButtons.firstChild) {
    answerButtons.removeChild(answerButtons.firstChild);
  }
}

/**
 * 7. SELECTION LOGIC
 */
function selectAnswer(e) {
  const selectedBtn = e.target;
  const isCorrect = selectedBtn.dataset.correct === "true";

  if (isCorrect) {
    selectedBtn.classList.add("correct");
    score++;
  } else {
    selectedBtn.classList.add("incorrect");
  }

  // Highlight correct choice & disable buttons
  Array.from(answerButtons.children).forEach((button) => {
    if (button.dataset.correct === "true") {
      button.classList.add("correct");
    }
    button.disabled = true;
  });

  nextButton.style.display = "block";
}

/**
 * 8. SCORE DISPLAY
 */
function showScore() {
  resetState();
  questionElement.innerHTML = `អ្នកទទួលបានពិន្ទុ ${score} ក្នុងចំណោម ${questions.length}!`;
  nextButton.innerHTML = "លេងម្តងទៀត";
  nextButton.style.display = "block";
}

/**
 * 9. NAVIGATION LOGIC
 */
function handleNextButton() {
  currentQuestionIndex++;
  if (currentQuestionIndex < questions.length) {
    showQuestion();
  } else {
    showScore();
  }
}

// 10. EVENT LISTENERS
nextButton.addEventListener("click", () => {
  if (currentQuestionIndex < questions.length) {
    handleNextButton();
  } else {
    startQuiz();
  }
});

// Run quiz on load
startQuiz();
