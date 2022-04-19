//defining the constants from the html and linking them
const question = document.querySelector("#question");
const choices = Array.from(document.querySelectorAll(".choice-text"));
const progressText = document.querySelector("#progressText");
const scoreText = document.querySelector("#score");
const progressBarFull = document.querySelector("#progressBarFull");

//set initial values
let currentQuestion = {};
let acceptingAnswers = true;
let score = 0;
let questionCounter = 0;
let availableQuestions = [];

//questions list
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
    answer: 1,
  },
  {
    question: "How many languages can Wilson speak?",
    choice1: "1",
    choice2: "2",
    choice3: "3",
    choice4: "4",
    answer: 3,
  },
];
//placing maximum values on the variables to limit the if statements
const SCORE_POINTS = 100;
const MAX_QUESTIONS = 4;

startGame = () => {
  questionCounter = 0;
  score = 0;
  availableQuestions = [...questions];
  getNewQuestion();
};

//when all questions have been answered, user will be directed to end.html
getNewQuestion = () => {
  if (availableQuestions.length === 0 || questionCounter > MAX_QUESTIONS) {
    localStorage.setItem("mostRecentScore", score);

    return window.location.assign("end.html");
  }
  // //trying to create animations for the progress bar to move everytime a level is passed
  //   questionCounter++
  //   progressText.innerText = 'Question ${questionCounter} of ${MAX_QUESTIONS}'
  //   progressBarFull.style.width = "${(questionCounter/MAX_QUESTIONS) * 100}%"

  //Timer for the quiz
  const startingMinutes = 1;
  let time = startingMinutes * 60;

  const countDownEl = document.getElementById("countdown");

  setInterval(updateCountdown, 1000);

  function updateCountdown() {
    const minutes = Math.floor(time / 60);
    let seconds = time % 60;
    time--;

    countDownEl.innerHTML = "${minutes}: ${seconds}";
  }

  // window.onload = function () {
  //     var fiveMinutes = 60 * 5,
  //         display = document.querySelector('#time');
  //     startTimer(fiveMinutes, display);
  // };

  //setting the questions as an object and selecting each of them as an array
  const questionsIndex = Math.floor(Math.random() * availableQuestions.length);
  currentQuestion = availableQuestions[questionsIndex];
  question.innerText = currentQuestion.question;

  choices.forEach((choice) => {
    const number = choice.dataset["number"];
    choice.innerText = currentQuestion["choice" + number];
  });
  //removing a question from the object array so that remaining questions won't repeat
  availableQuestions.splice(questionsIndex, 1);

  acceptingAnswers = true;
};

//determining situations when the right or wrong answers are selected
choices.forEach((choice) => {
  choice.addEventListener("click", (e) => {
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
//effects of the score when the right answer is selected
incrementScore = (num) => {
  score += num;
  scoreText.innerText = score;
};

startGame();
