let correct = 0;
let wrong = 0;
let streak = 0;
let currentAnswer = null;
let difficulty = 'easy';

function setDifficulty(level) {
  difficulty = level;
  document.querySelectorAll('.difficulty button').forEach(b => b.classList.remove('active'));
  document.getElementById('btn-' + level).classList.add('active');
  nextQuestion();
}

function getRange() {
  if (difficulty === 'easy') return { min: 1, max: 10 };
  if (difficulty === 'medium') return { min: 10, max: 100 };
  return { min: 100, max: 1000 };
}

function nextQuestion() {
  const range = getRange();
  const ops = difficulty === 'easy' ? ['+', '-'] : ['+', '-', '×', '÷'];
  const op = ops[Math.floor(Math.random() * ops.length)];

  let a, b;

  if (op === '×') {
    a = Math.floor(Math.random() * (range.max - range.min + 1)) + range.min;
    b = Math.floor(Math.random() * (range.max - range.min + 1)) + range.min;
  } else if (op === '÷') {
    if (difficulty === 'hard') {
      b = Math.floor(Math.random() * 90) + 10;
    } else {
      b = Math.floor(Math.random() * 9) + 2;
    }
    a = b * (Math.floor(Math.random() * (range.max - range.min + 1)) + range.min);
  } else {
    a = Math.floor(Math.random() * (range.max - range.min + 1)) + range.min;
    b = Math.floor(Math.random() * (range.max - range.min + 1)) + range.min;
  }

  if (op === '-' && b > a) [a, b] = [b, a];

  if (op === '+') currentAnswer = a + b;
  if (op === '-') currentAnswer = a - b;
  if (op === '×') currentAnswer = a * b;
  if (op === '÷') currentAnswer = a / b;

  document.getElementById('question').textContent = `${a} ${op} ${b} = ?`;
  document.getElementById('answer').value = '';
  document.getElementById('feedback').textContent = '';
  document.getElementById('feedback').className = '';
  document.getElementById('answer').focus();
}

function checkAnswer() {
  const input = document.getElementById('answer').value;
  if (input === '') return;

  const userAnswer = parseFloat(input);
  const feedback = document.getElementById('feedback');

  if (userAnswer === currentAnswer) {
    correct++;
    streak++;
    feedback.textContent = '✅ Correct!';
    feedback.className = 'correct';
  } else {
    wrong++;
    streak = 0;
    feedback.textContent = `❌ Wrong! Answer was ${currentAnswer}`;
    feedback.className = 'wrong';
  }

  document.getElementById('correct').textContent = correct;
  document.getElementById('wrong').textContent = wrong;
  document.getElementById('streak').textContent = streak;

  setTimeout(nextQuestion, 1200);
}

function resetScore() {
  correct = 0; wrong = 0; streak = 0;
  document.getElementById('correct').textContent = 0;
  document.getElementById('wrong').textContent = 0;
  document.getElementById('streak').textContent = 0;
  nextQuestion();
}

document.addEventListener('keydown', e => {
  if (e.key === 'Enter') checkAnswer();
});

nextQuestion();