// removes the scores from the local storage
function clearList() {
  window.localStorage.removeItem('topscores');
  window.location.reload();
} document.getElementById('remove').onclick = clearList;

function finalScores() {
  // gets scores from local storage
  var scorelist = JSON.parse(window.localStorage.getItem('topscores')) || [];

  // sorts the top scores
  scorelist.sort

  for (var i = 0; i < scorelist.length; i += 1) {
    // creates a line for each score
    var scoreshow = document.createElement('li');
    scoreshow.textContent = scorelist[i].initials + ' - ' + scorelist[i].score;

    // shows the scores
    var putscores = document.getElementById('topscores');
    putscores.appendChild(scoreshow);
  }
}

finalScores();
