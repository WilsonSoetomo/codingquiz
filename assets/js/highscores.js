//trying to save the scores into a strin and then retrieving them as objects.

const highScoresList = document.querySelector('#highScoresList')
const highScores = JSON.parse(localStorage.getItem('highScores')) || []
highScores.innerHTML =
highScores.map(score => {
    return '<li class="high-score">${score.name} - ${score.score}</li>'
}).join('')