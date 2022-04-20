const username = document.querySelector("#username");
const saveScoreBtn = document.querySelector("#saveScoreBtn");
const finalScore = document.querySelector("#finalScore");
const mostRecentScore = document.querySelector("#mostRecentScore");

const highScores = JSON.parse(localStorage.getItem("highscores")) || [];

const MAX_HIGH_SCORES = 5;

finalScore.innerText = mostRecentScore;

username.addEventListener("keyup", () => {
  saveScoreBtn.disabled = !username.Value;
});

saveHighScore = (e) => {
  e.preventDefault();
console.log("SAVING HIGHSCORE")
  const score = {
    score: mostRecentScore,
    name: username.value,
  };

  highScores.push(score);

  highScores.sort((a, b) => {
    return b.score;
  });

  highScores.splice(5);

  localStorage.setItem("highScores", JSON.stringify(highScores));
  window.location.assign("/");
};
