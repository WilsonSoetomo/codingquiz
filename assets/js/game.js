const question = document.querySelector("#question");
const choices = Array.from(document.querySelectorAll(".choice-text"));
const progressText = document.querySelector("#progressText");
const scoreText = document.querySelector("#score");
const progressBarFull = document.querySelector("#progressBarFull");

let currentQuestion = {};
let acceptingAnswers = true;
let score = 0;
let questionCounter = 0;
let availableQuestions = [];

let questions = [
  {
    question: "What is Wilsons favorite color?",
    choice1: "Yellow",
    choice2: "Green",
    choice3: "Orange",
    choice4: "Purple",
    answer: 3,
  },
  {
    question: "Is Wilson currently single?",
    choice1: "Yes",
    choice2: "No",
    choice3: "Its complicated",
    choice4: "Wilson is gay",
    answer: 1,
  },
  {
    question: "What does Wilson drive?",
    choice1: "Honda",
    choice2: "Mercedes",
    choice3: "Toyota",
    choice4: "Lamborghini",
    answer: 4,
  },
  {
    question: "How many languages can Wilson speak?",
    choice1: "1",
    choice2: "2",
    choice3: "3",
    choice4: "4",
    answer: 3,
  }
]

const SCORE_POINTS = 100
const MAX_QUESTIONS = 4

startGame = () => {
  questionCounter = 0;
  score = 0;
  availableQuestions = [...questions];
  getNewQuestion();
};

//when all questions have been answered, user will be directed to end.html
getNewQuestion = () => {
  if(availableQuestions.length === 0 || questionCounter > MAX_QUESTIONS) {
    localStorage.setItem("mostRecentScore", score);

    return window.location.assign("/end.html");
  }

  questionCounter++
  progressText.innerText = 'Question ${questionCounter} of ${MAX_QUESTIONS}'
  progressBarFull.style.width = "${(questionCounter/MAX_QUESTIONS) * 100}%"

  const questionsIndex = Math.floor(Math.random() * availableQuestions.length);
  currentQuestion = availableQuestions[questionsIndex];
  question.innerText = currentQuestion.question;

  choices.forEach((choice) => {
    const number = choice.dataset["number"];
    choice.innerText = currentQuestion["choice" + number];
  });

  availableQuestions.splice(questionsIndex, 1);

  acceptingAnswers = true;
};

choices.forEach((choice) => {
  choice.addEventListener("click", e => {
    if (!acceptingAnswers) return;

    acceptingAnswers = false;
    const selectedChoice = e.target;
    const selectedAnswer = selectedChoice.dataset["number"];

    let classToApply =
      selectedAnswer == currentQuestion.answer ? "correct" : "incorrect";

    if (classToApply === "correct") {
      incrementScore(SCORE_POINTS);
    }
    selectedChoice.parentElement.classList.add(classToApply);

    setTimeout(() => {
      selectedChoice.parentElement.classList.remove(classToApply);
      getNewQuestion();
    }, 1000);
  });
});

incrementScore = (num) => {
  score += num;
  scoreText.innerText = score;
};

startGame();
