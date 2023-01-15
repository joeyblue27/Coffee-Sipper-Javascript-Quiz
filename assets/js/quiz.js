// Elements from the DOM
var qsaEl = document.getElementById('qsa');
var selectEl = document.getElementById('selections');
var countEl = document.getElementById('countdown');
var goBtn = document.getElementById('go');
var scoresBtn = document.getElementById('scorebtn');
var initialEl = document.getElementById('initials');
var scoresEl = document.getElementById('scorelist');
// Question Index
var qsaIndex = 0;
// Countdown Timer
var countDown = qsa.length + 118;
var clock

//button selections

selectEl.onclick = selectBtn;

scoresBtn.onclick = topScores;

goBtn.onclick = quizScreen;

initialEl.onkeyup = saveScore;


function askQuestions() {
  // starts the first question
  var questShow = qsa[qsaIndex];

  // shows the question 
  var currentEl = document.getElementById('questions');
  currentEl.textContent = questShow.question;

  // removes the previous question
  selectEl.innerHTML = '';

  // loops through all choices
  for (var i = 0; i < questShow.selection.length; i++) {
    // shows a button for each choice
    var select = questShow.selection[i];
    var selectBtn = document.createElement('button');
    selectBtn.setAttribute('class', 'selections');
    selectBtn.setAttribute('value', select,);

    selectBtn.textContent = i + 1 + '. ' + select;

    // attaches it to the page
    selectEl.appendChild(selectBtn);
  }
}

askQuestions()

function quizScreen() {
  // timer countdown
  clock = setInterval(countingDown, 1000);

  // shows the starting time
  clock.textContent = countDown;

  // hides the start screen
  var quizScreenEl = document.getElementById('mainscreen');
  quizScreenEl.setAttribute('class', 'hidden');

  // unhides the questions 
  qsaEl.removeAttribute('class');


}


function selectBtn(event) {
  var clickEl = event.target;

    // statement to check if answer is right or wrong
  if (clickEl.value !== qsa[qsaIndex].answer) {
    // reduces timer by 5 seconds
    countDown -= 5;

    if (countDown < 0) {
      countDown = 0;
    }

    countEl.textContent = countDown;

    scoresEl.textContent = 'That is Incorrect!'

    return;

  } else {

    scoresEl.textContent = 'That is Correct!';
  }


  qsaIndex++;

  // checks if questions ran through all
  if (countDown <= 0 || qsaIndex === qsa.length) {

    finalScreen();

  } else {

    askQuestions();
  }
}

function finalScreen() {
  // hides the questions 
  qsaEl.setAttribute('class', 'hidden');

  // timer stop
  clearInterval(clock);

  // show the final screen
  var finalshow = document.getElementById('finalscreen');
  finalshow.removeAttribute('class');

  // shows the top score
  var scoreview = document.getElementById('showscore');
  scoreview.textContent = countDown;

}

function countingDown() {
  // time substract
  countDown--;
  countEl.textContent = countDown;

  // check if user ran out of time
  if (countDown <= 0) {
    finalScreen();
  }
}

// shows score on the next screen
function topScores() {

  var nameinit = initialEl.value.trim();


  if (nameinit !== '') {
    // gets the score from the localstorage
    var topScore =
      JSON.parse(window.localStorage.getItem('topscores')) || [];


    var putScore = {
      score: countDown,
      initials: nameinit,
    };

    // puts the score from the localstorage
    topScore.push(putScore);
    window.localStorage.setItem('topscores', JSON.stringify(topScore));

    // places it in the file
    window.location.href = 'scoreview.html';
  }
}

//  adds a new line for each score
function saveScore(event) {
  if (event.key === 'Ent') {
    topScores();
  }
}








