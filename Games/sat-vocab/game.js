const playerNameInput = document.getElementById('playerName');
const playerGreeting = document.getElementById('playerGreeting');
const startBtn = document.getElementById('startBtn');
const wordDisplay = document.getElementById('wordDisplay');
const meaningDisplay = document.getElementById('meaningDisplay');
const exampleDisplay = document.getElementById('exampleDisplay');
const hintDisplay = document.getElementById('hintDisplay');
const optionsGrid = document.getElementById('optionsGrid');
const scoreDisplay = document.getElementById('scoreDisplay');
const correctCountEl = document.getElementById('correctCount');
const wrongCountEl = document.getElementById('wrongCount');
const mistakeCountEl = document.getElementById('mistakeCount');
const streakCountEl = document.getElementById('streakCount');
const comboText = document.getElementById('comboText');
const statusText = document.getElementById('statusText');
const modeLabel = document.getElementById('modeLabel');
const nextWordBtn = document.getElementById('nextWordBtn');
const timerDisplay = document.getElementById('timerDisplay');
const levelDisplay = document.getElementById('levelDisplay');
const leaderboardList = document.getElementById('leaderboardList');
const reviewBtn = document.getElementById('reviewBtn');
const clearMistakesBtn = document.getElementById('clearMistakesBtn');
const levelButtons = Array.from(document.querySelectorAll('.level-btn'));
const modeButtons = Array.from(document.querySelectorAll('.mode-btn'));

const levelTimes = {
  Easy: 15,
  Medium: 12,
  Hard: 10
};

const words = [
  { word: 'abandon', meaning: 'give up or leave behind', example: 'She had to abandon the idea when she ran out of time.', hint: 'Think of leaving something behind.', level: 'Easy' },
  { word: 'abolish', meaning: 'officially end something', example: 'The school decided to abolish the old dress code.', hint: 'End a rule or law.', level: 'Easy' },
  { word: 'abrupt', meaning: 'sudden and unexpected', example: 'The car made an abrupt stop.', hint: 'Something happens quickly without warning.', level: 'Easy' },
  { word: 'abstract', meaning: 'not concrete; based on ideas', example: 'She struggled with the abstract painting.', hint: 'Not about physical things.', level: 'Easy' },
  { word: 'abundant', meaning: 'very plentiful', example: 'The garden was abundant with flowers.', hint: 'More than enough.', level: 'Easy' },
  { word: 'accelerate', meaning: 'speed up', example: 'The runner managed to accelerate in the final lap.', hint: 'Go faster.', level: 'Easy' },
  { word: 'accessible', meaning: 'easy to reach or use', example: 'The website is accessible from any phone.', hint: 'Easy to get into.', level: 'Easy' },
  { word: 'accommodate', meaning: 'provide or adjust to', example: 'The hotel can accommodate a large group.', hint: 'Make room for or help.', level: 'Easy' },
  { word: 'accomplish', meaning: 'complete successfully', example: 'She hopes to accomplish all her summer goals.', hint: 'Finish something well.', level: 'Easy' },
  { word: 'accumulate', meaning: 'gather over time', example: 'Dust will accumulate if a room is not cleaned.', hint: 'Collect gradually.', level: 'Easy' },
  { word: 'accurate', meaning: 'exact and correct', example: 'The scientist recorded accurate data.', hint: 'Right and precise.', level: 'Easy' },
  { word: 'acknowledge', meaning: 'admit or recognize', example: 'He had to acknowledge his mistake.', hint: 'Say you know or accept it.', level: 'Easy' },
  { word: 'acquire', meaning: 'gain or obtain', example: 'She hopes to acquire new skills this year.', hint: 'Get or learn something.', level: 'Easy' },
  { word: 'adapt', meaning: 'change to fit', example: 'Animals adapt to their environment.', hint: 'Adjust to a new situation.', level: 'Easy' },
  { word: 'adequate', meaning: 'enough for the need', example: 'The supplies were adequate for the trip.', hint: 'Sufficient or acceptable.', level: 'Easy' },
  { word: 'adjacent', meaning: 'next to', example: 'The library is adjacent to the school gym.', hint: 'Beside something.', level: 'Easy' },
  { word: 'adjust', meaning: 'change slightly', example: 'She had to adjust the chair to fit.', hint: 'Make a small change.', level: 'Easy' },
  { word: 'administer', meaning: 'manage or run', example: 'She will administer the new program.', hint: 'Take charge of.', level: 'Easy' },
  { word: 'advocate', meaning: 'support publicly', example: 'He advocates for animal protection.', hint: 'Speak up in favor of.', level: 'Easy' },
  { word: 'affirm', meaning: 'state strongly', example: 'The coach affirmed her confidence in the team.', hint: 'Say it is true.', level: 'Easy' },
  { word: 'aggressive', meaning: 'forceful or attacking', example: 'The player used an aggressive strategy.', hint: 'Bold and pushy.', level: 'Easy' },
  { word: 'alleviate', meaning: 'relieve or ease', example: 'The medicine may alleviate the pain.', hint: 'Make less severe.', level: 'Easy' },
  { word: 'allocate', meaning: 'assign or distribute', example: 'The teacher will allocate time for each activity.', hint: 'Give out a share.', level: 'Easy' },
  { word: 'alter', meaning: 'change', example: 'She decided to alter her jacket to fit better.', hint: 'Make different.', level: 'Easy' },
  { word: 'ambiguous', meaning: 'unclear; more than one meaning', example: 'His answer was ambiguous and hard to understand.', hint: 'Not clearly defined.', level: 'Easy' },
  { word: 'amplify', meaning: 'make stronger or louder', example: 'The speaker will amplify the sound.', hint: 'Increase intensity.', level: 'Easy' },
  { word: 'analyze', meaning: 'examine carefully', example: 'She will analyze the data from the experiment.', hint: 'Look closely at details.', level: 'Easy' },
  { word: 'anticipate', meaning: 'expect beforehand', example: 'They anticipate a busy season ahead.', hint: 'Look forward to.', level: 'Easy' },
  { word: 'apparent', meaning: 'clearly visible or obvious', example: 'It was apparent that the project was finished.', hint: 'Easy to see.', level: 'Easy' },
  { word: 'appeal', meaning: 'attract interest or make a request', example: 'The story will appeal to young readers.', hint: 'Ask or attract.', level: 'Easy' },
  { word: 'arbitrary', meaning: 'based on random choice', example: 'He made an arbitrary decision.', hint: 'Not based on reason.', level: 'Easy' },
  { word: 'articulate', meaning: 'speak clearly', example: 'She can articulate her ideas well.', hint: 'Express clearly.', level: 'Easy' },
  { word: 'assess', meaning: 'evaluate or judge', example: 'The teacher will assess the homework.', hint: 'Decide how good it is.', level: 'Easy' },
  { word: 'assign', meaning: 'give a task', example: 'The coach will assign players to teams.', hint: 'Give someone work.', level: 'Easy' },
  { word: 'assist', meaning: 'help', example: 'She will assist her classmate with the project.', hint: 'Give support.', level: 'Easy' },
  { word: 'assume', meaning: 'suppose without proof', example: 'Don’t assume the answer without checking.', hint: 'Take it to be true.', level: 'Easy' },
  { word: 'assure', meaning: 'make certain', example: 'I assure you everything will be fine.', hint: 'Tell someone confidently.', level: 'Easy' },
  { word: 'attribute', meaning: 'explain as caused by', example: 'She attributes her success to hard work.', hint: 'Say where it comes from.', level: 'Easy' },
  { word: 'authorize', meaning: 'give permission', example: 'The manager authorized the purchase.', hint: 'Allow officially.', level: 'Easy' },
  { word: 'beneficial', meaning: 'helpful', example: 'Regular exercise is beneficial to health.', hint: 'Good for you.', level: 'Easy' },
  { word: 'bias', meaning: 'unfair preference', example: 'The article showed bias toward one side.', hint: 'Favoring one option unfairly.', level: 'Easy' },
  { word: 'capacity', meaning: 'ability or amount possible', example: 'The theater has a seating capacity of 300.', hint: 'How much it can hold.', level: 'Easy' },
  { word: 'clarify', meaning: 'make clear', example: 'Please clarify your instructions.', hint: 'Make easier to understand.', level: 'Easy' },
  { word: 'coherent', meaning: 'logical and clear', example: 'Her explanation was coherent and easy to follow.', hint: 'Makes sense.', level: 'Easy' },
  { word: 'coincide', meaning: 'happen at the same time', example: 'The meeting coincided with lunch.', hint: 'Take place together.', level: 'Medium' },
  { word: 'collapse', meaning: 'fall apart or fail suddenly', example: 'The bridge began to collapse after the storm.', hint: 'Break down quickly.', level: 'Medium' },
  { word: 'commit', meaning: 'promise or do', example: 'He decided to commit to the team.', hint: 'Agree to do it.', level: 'Medium' },
  { word: 'compatible', meaning: 'able to work together', example: 'The software is compatible with your phone.', hint: 'Works well together.', level: 'Medium' },
  { word: 'compensate', meaning: 'make up for', example: 'The company will compensate him for lost time.', hint: 'Pay back or balance.', level: 'Medium' },
  { word: 'compile', meaning: 'gather together', example: 'The report will compile all the research findings.', hint: 'Collect into one place.', level: 'Medium' },
  { word: 'complex', meaning: 'complicated', example: 'The puzzle was complex and challenging.', hint: 'Made of many parts.', level: 'Medium' },
  { word: 'comply', meaning: 'follow rules', example: 'You must comply with the school policy.', hint: 'Do what is asked.', level: 'Medium' },
  { word: 'compose', meaning: 'create by putting together', example: 'She will compose a new song.', hint: 'Put pieces together.', level: 'Medium' },
  { word: 'compound', meaning: 'made of parts or combine', example: 'Interest can compound over time.', hint: 'Joined together.', level: 'Medium' },
  { word: 'comprehend', meaning: 'understand fully', example: 'It took time for him to comprehend the lesson.', hint: 'Grasp the meaning.', level: 'Medium' },
  { word: 'conceal', meaning: 'hide', example: 'He tried to conceal the surprise from her.', hint: 'Keep from being seen.', level: 'Medium' },
  { word: 'concentrate', meaning: 'focus attention', example: 'She needed to concentrate on her homework.', hint: 'Pay close attention.', level: 'Medium' },
  { word: 'concept', meaning: 'idea', example: 'The teacher explained the new concept clearly.', hint: 'A general idea.', level: 'Medium' },
  { word: 'conclude', meaning: 'finish or infer', example: 'We can conclude the story is about friendship.', hint: 'Bring to an end or decide.', level: 'Medium' },
  { word: 'condemn', meaning: 'say something is wrong', example: 'The council condemned the unfair law.', hint: 'Strongly disapprove.', level: 'Medium' },
  { word: 'conduct', meaning: 'carry out or behave', example: 'She will conduct the experiment carefully.', hint: 'Do or handle.', level: 'Medium' },
  { word: 'confirm', meaning: 'show true', example: 'We need to confirm the meeting time.', hint: 'Make certain.', level: 'Medium' },
  { word: 'conflict', meaning: 'clash or disagreement', example: 'There was conflict between the teams.', hint: 'A fight in ideas or actions.', level: 'Medium' },
  { word: 'conform', meaning: 'follow rules', example: 'He had to conform to the dress code.', hint: 'Fit in with others.', level: 'Medium' },
  { word: 'confront', meaning: 'face boldly', example: 'She decided to confront the problem.', hint: 'Deal with directly.', level: 'Medium' },
  { word: 'confuse', meaning: 'make unclear', example: 'The instructions can confuse many students.', hint: 'Cause uncertainty.', level: 'Medium' },
  { word: 'conserve', meaning: 'save or protect', example: 'We should conserve water during summer.', hint: 'Use carefully.', level: 'Medium' },
  { word: 'consider', meaning: 'think about', example: 'Consider your options before deciding.', hint: 'Give thought to.', level: 'Medium' },
  { word: 'consistent', meaning: 'always the same', example: 'Her work is consistent and reliable.', hint: 'Not changing.', level: 'Medium' },
  { word: 'constitute', meaning: 'form or make up', example: 'These parts constitute the whole machine.', hint: 'Create by combining.', level: 'Medium' },
  { word: 'constrain', meaning: 'limit or restrict', example: 'The fence constrains the animals to the yard.', hint: 'Hold back.', level: 'Medium' },
  { word: 'construct', meaning: 'build', example: 'They construct a bridge over the river.', hint: 'Make by putting parts together.', level: 'Medium' },
  { word: 'consult', meaning: 'ask for advice', example: 'He will consult a doctor about the illness.', hint: 'Talk to someone for help.', level: 'Medium' },
  { word: 'consume', meaning: 'use or eat', example: 'We consume too much sugar in some foods.', hint: 'Use up or eat.', level: 'Medium' },
  { word: 'contain', meaning: 'hold inside', example: 'The box contains several toys.', hint: 'Keep something inside.', level: 'Medium' },
  { word: 'contradict', meaning: 'say the opposite', example: 'His story will contradict the earlier version.', hint: 'Show it is not true.', level: 'Medium' },
  { word: 'contribute', meaning: 'give or add', example: 'Each member contributes ideas to the group.', hint: 'Help by adding something.', level: 'Medium' },
  { word: 'controversial', meaning: 'causing disagreement', example: 'The new rule was controversial at school.', hint: 'Creates debate or arguments.', level: 'Medium' },
  { word: 'convey', meaning: 'communicate', example: 'The artist conveys emotion through color.', hint: 'Send a message.', level: 'Medium' },
  { word: 'convince', meaning: 'persuade', example: 'She tried to convince him to join.', hint: 'Make someone believe or do.', level: 'Medium' },
  { word: 'cooperate', meaning: 'work together', example: 'Teams must cooperate to finish the challenge.', hint: 'Help one another.', level: 'Medium' },
  { word: 'coordinate', meaning: 'organize parts to work together', example: 'She will coordinate the event schedule.', hint: 'Make things work in order.', level: 'Medium' },
  { word: 'correlate', meaning: 'show a relationship', example: 'The study will correlate diet and health.', hint: 'Link two things together.', level: 'Medium' },
  { word: 'correspond', meaning: 'match or communicate', example: 'Her notes correspond with the book.', hint: 'Agree or write to someone.', level: 'Medium' },
  { word: 'crucial', meaning: 'very important', example: 'It is crucial to stay safe.', hint: 'Extremely necessary.', level: 'Hard' },
  { word: 'create', meaning: 'make', example: 'They create a new game for the class.', hint: 'Bring something into existence.', level: 'Hard' },
  { word: 'criteria', meaning: 'standards for judgment', example: 'The teacher explained the criteria for the essay.', hint: 'Rules used to judge.', level: 'Hard' },
  { word: 'derive', meaning: 'obtain from', example: 'The word derives from Latin.', hint: 'Come from a source.', level: 'Hard' },
  { word: 'diminish', meaning: 'make smaller', example: 'A bad review may diminish sales.', hint: 'Reduce in size or amount.', level: 'Hard' },
  { word: 'display', meaning: 'show clearly', example: 'The museum will display the paintings.', hint: 'Put where people can see.', level: 'Hard' },
  { word: 'disclose', meaning: 'reveal information', example: 'He refused to disclose the secret.', hint: 'Make known.', level: 'Hard' },
  { word: 'discount', meaning: 'reduce price or importance', example: 'The store will discount old items.', hint: 'Lower or ignore.', level: 'Hard' },
  { word: 'discover', meaning: 'find something new', example: 'Scientists discover new species.', hint: 'Learn something previously unknown.', level: 'Hard' },
  { word: 'discriminate', meaning: 'treat unfairly or notice difference', example: 'It is wrong to discriminate against others.', hint: 'Treat differently in a bad way.', level: 'Hard' },
  { word: 'discuss', meaning: 'talk about', example: 'We will discuss the story in class.', hint: 'Share ideas or opinions.', level: 'Hard' },
  { word: 'dismiss', meaning: 'reject or send away', example: 'The teacher may dismiss the class early.', hint: 'Say it is not important.', level: 'Hard' },
  { word: 'dispute', meaning: 'argue', example: 'They dispute the results of the test.', hint: 'Speak against something.', level: 'Hard' },
  { word: 'distinguish', meaning: 'tell apart', example: 'It is hard to distinguish the twins.', hint: 'Notice the difference.', level: 'Hard' },
  { word: 'distribute', meaning: 'give out', example: 'The volunteers distribute food to neighbors.', hint: 'Share with many people.', level: 'Hard' },
  { word: 'diverse', meaning: 'different', example: 'The class has diverse interests.', hint: 'Many kinds of things.', level: 'Hard' }
];

let currentIndex = 0;
let score = 0;
let correctCount = 0;
let wrongCount = 0;
let streakCount = 0;
let timeLeft = levelTimes.Easy;
let timerId = null;
let isPlaying = false;
let isReviewMode = false;
let currentLevel = 'Easy';
let currentMode = 'timed';
let playerName = '';
let mistakeQuestions = [];
let mistakeSet = new Set();
let leaderboard = loadLeaderboard();

const audioContext = new (window.AudioContext || window.webkitAudioContext)();

function shuffle(array) {
  return array.slice().sort(() => Math.random() - 0.5);
}

function getRandomChoices(wordEntry) {
  const allMeanings = words
    .filter(word => word.word !== wordEntry.word)
    .map(word => word.meaning);
  const options = [wordEntry.meaning, ...shuffle(allMeanings).slice(0, 3)];
  return shuffle(options);
}

function getActiveWordList() {
  const pool = words.filter(word => word.level === currentLevel);
  return isReviewMode ? mistakeQuestions : pool;
}

function showWord(index) {
  const activeWords = getActiveWordList();
  if (!activeWords.length) {
    statusText.textContent = isReviewMode ? 'No mistake questions to review yet. Keep playing!' : 'No words found for this level.';
    optionsGrid.innerHTML = '';
    return;
  }

  const wordEntry = activeWords[index % activeWords.length];
  wordDisplay.textContent = wordEntry.word;
  meaningDisplay.textContent = 'Tap an answer to reveal the meaning.';
  exampleDisplay.textContent = wordEntry.example;
  hintDisplay.textContent = wordEntry.hint;
  levelDisplay.textContent = wordEntry.level;
  statusText.textContent = isReviewMode ? 'Review your mistake question and try again!' : 'Choose the best meaning to earn sparkly points!';
  renderOptions(wordEntry);
  modeLabel.textContent = currentMode === 'timed' ? 'Timed' : 'Untimed';
  if (currentMode === 'timed') {
    resetTimer();
  } else {
    clearInterval(timerId);
    timerDisplay.textContent = '--';
  }
}

function renderOptions(wordEntry) {
  optionsGrid.innerHTML = '';
  const options = getRandomChoices(wordEntry);
  options.forEach(option => {
    const button = document.createElement('button');
    button.className = 'option-btn';
    button.type = 'button';
    button.textContent = option;
    button.addEventListener('click', () => handleAnswer(option, wordEntry));
    optionsGrid.appendChild(button);
  });
}

function updateMistakeDisplay() {
  mistakeCountEl.textContent = mistakeQuestions.length;
  const enabled = mistakeQuestions.length > 0;
  reviewBtn.disabled = !enabled;
  clearMistakesBtn.disabled = !enabled;
}

function updateStreakDisplay() {
  streakCountEl.textContent = streakCount;
  if (streakCount >= 3) {
    comboText.textContent = `Hot streak! +${streakCount * 2} bonus points on this correct answer.`;
  } else {
    comboText.textContent = 'Build a streak to earn bonus points!';
  }
}

function addMistake(wordEntry) {
  if (mistakeSet.has(wordEntry.word)) return;
  mistakeSet.add(wordEntry.word);
  mistakeQuestions.push(wordEntry);
  updateMistakeDisplay();
}

function removeMistake(word) {
  mistakeQuestions = mistakeQuestions.filter(entry => entry.word !== word);
  mistakeSet.delete(word);
  updateMistakeDisplay();
}

function loadLeaderboard() {
  try {
    return JSON.parse(localStorage.getItem('satVocabLeaderboard') || '[]');
  } catch {
    return [];
  }
}

function saveLeaderboard() {
  localStorage.setItem('satVocabLeaderboard', JSON.stringify(leaderboard));
}

function updateLeaderboard() {
  leaderboard.sort((a, b) => b.score - a.score);
  leaderboardList.innerHTML = '';
  leaderboard.slice(0, 5).forEach((entry, index) => {
    const medalClass = index === 0 ? 'gold' : index === 1 ? 'silver' : index === 2 ? 'bronze' : '';
    const medalLabel = index === 0 ? '🥇' : index === 1 ? '🥈' : index === 2 ? '🥉' : `${index + 1}`;
    const listItem = document.createElement('li');
    if (medalClass) listItem.classList.add(medalClass);
    listItem.innerHTML = `<span class="medal">${medalLabel}</span><span>${entry.name}</span><strong>${entry.score} pts</strong>`;
    leaderboardList.appendChild(listItem);
  });
}

function recordScore() {
  if (!playerName) return;
  const existing = leaderboard.find(entry => entry.name === playerName);
  if (existing) {
    existing.score = Math.max(existing.score, score);
  } else {
    leaderboard.push({ name: playerName, score });
  }
  saveLeaderboard();
  updateLeaderboard();
}

function playTone(frequency, duration = 0.15, type = 'sine') {
  if (!audioContext) return;
  const osc = audioContext.createOscillator();
  const gain = audioContext.createGain();
  osc.type = type;
  osc.frequency.value = frequency;
  osc.connect(gain);
  gain.connect(audioContext.destination);
  gain.gain.value = 0.08;
  osc.start();
  osc.stop(audioContext.currentTime + duration);
  gain.gain.exponentialRampToValueAtTime(0.001, audioContext.currentTime + duration);
}

function playCorrectSound() {
  playTone(880, 0.12, 'triangle');
  setTimeout(() => playTone(1100, 0.08, 'square'), 90);
}

function playWrongSound() {
  playTone(220, 0.2, 'sawtooth');
  setTimeout(() => playTone(170, 0.12, 'sine'), 120);
}

function playStartSound() {
  playTone(660, 0.12, 'triangle');
  setTimeout(() => playTone(880, 0.12, 'square'), 100);
}

function resetTimer() {
  clearInterval(timerId);
  if (currentMode !== 'timed') {
    timerDisplay.textContent = '--';
    return;
  }
  timeLeft = levelTimes[currentLevel];
  timerDisplay.textContent = timeLeft;
  timerId = setInterval(() => {
    timeLeft -= 1;
    timerDisplay.textContent = timeLeft;
    if (timeLeft <= 0) {
      clearInterval(timerId);
      handleTimeUp();
    }
  }, 1000);
}

function handleTimeUp() {
  if (currentMode !== 'timed') return;
  streakCount = 0;
  comboText.textContent = 'Time ran out! Streak reset. Try again!';
  statusText.textContent = 'Time ran out! The correct answer is shown below.';
  playWrongSound();
  const activeWords = getActiveWordList();
  const wordEntry = activeWords[currentIndex % activeWords.length];
  meaningDisplay.textContent = wordEntry.meaning;
  wrongCount += 1;
  updateScore();
  updateStreakDisplay();
  addMistake(wordEntry);
  setTimeout(nextQuestion, 900);
}

function handleAnswer(choice, wordEntry) {
  clearInterval(timerId);
  const buttons = Array.from(document.querySelectorAll('.option-btn'));
  buttons.forEach(btn => btn.disabled = true);

  if (choice === wordEntry.meaning) {
    streakCount += 1;
    const bonus = streakCount >= 3 ? streakCount * 2 : 0;
    score += 10 + bonus;
    correctCount += 1;
    statusText.textContent = 'Great job! You picked the right meaning!';
    buttons.find(btn => btn.textContent === choice).classList.add('correct');
    playCorrectSound();
    if (isReviewMode) {
      removeMistake(wordEntry.word);
    }
    comboText.textContent = bonus > 0 ? `Combo bonus! +${bonus} points for a ${streakCount}-correct streak.` : 'Nice! Keep the streak going.';
  } else {
    streakCount = 0;
    wrongCount += 1;
    statusText.textContent = `Oops! The right answer was “${wordEntry.meaning}”. Keep trying!`;
    buttons.find(btn => btn.textContent === choice).classList.add('wrong');
    buttons.find(btn => btn.textContent === wordEntry.meaning).classList.add('correct');
    playWrongSound();
    addMistake(wordEntry);
    comboText.textContent = 'Streak broken. Start a new combo!';
  }

  meaningDisplay.textContent = wordEntry.meaning;
  updateScore();
  playResultAnimation(choice === wordEntry.meaning);
  setTimeout(nextQuestion, 900);
}

function updateScore() {
  scoreDisplay.textContent = score;
  correctCountEl.textContent = correctCount;
  wrongCountEl.textContent = wrongCount;
  streakCountEl.textContent = streakCount;
  updateLeaderboard();
}

function playResultAnimation(isCorrect) {
  const wordCard = document.querySelector('.word-card');
  wordCard.classList.add(isCorrect ? 'correct-glow' : 'wrong-glow');
  setTimeout(() => wordCard.classList.remove('correct-glow', 'wrong-glow'), 600);
}

function nextQuestion() {
  const activeWords = getActiveWordList();
  if (isReviewMode && !activeWords.length) {
    isReviewMode = false;
    statusText.textContent = 'Review finished! Back to regular mode now.';
    currentIndex = 0;
    showWord(currentIndex);
    return;
  }

  currentIndex = (currentIndex + 1) % activeWords.length;
  showWord(currentIndex);
}

function setLevel(level) {
  currentLevel = level;
  levelButtons.forEach(button => {
    button.classList.toggle('active', button.dataset.level === level);
  });
  if (isPlaying) {
    currentIndex = 0;
    showWord(currentIndex);
  }
}

function startGame() {
  const name = playerNameInput.value.trim();
  playerName = name || 'Word Hero';
  playerNameInput.value = playerName;
  isPlaying = true;
  isReviewMode = false;
  currentIndex = 0;
  score = 0;
  correctCount = 0;
  wrongCount = 0;
  streakCount = 0;
  mistakeQuestions = [];
  mistakeSet.clear();
  updateScore();
  updateMistakeDisplay();
  updateStreakDisplay();
  levelButtons.forEach(button => button.disabled = false);
  modeButtons.forEach(button => button.disabled = false);
  nextWordBtn.disabled = false;
  reviewBtn.disabled = true;
  clearMistakesBtn.disabled = true;
  statusText.textContent = `Welcome, ${playerName}! The adventure begins now.`;
  playerGreeting.textContent = `Great choice, ${playerName}! ${currentMode === 'timed' ? 'Race the clock!' : 'Take your time and learn.'}`;
  playerNameInput.disabled = true;
  startBtn.disabled = true;
  playStartSound();
  recordScore();
  showWord(currentIndex);
}

function reviewMistakes() {
  if (!mistakeQuestions.length) return;
  isReviewMode = true;
  currentIndex = 0;
  statusText.textContent = 'Review mode: answer these mistake questions to clear them!';
  showWord(currentIndex);
}

function clearMistakes() {
  mistakeQuestions = [];
  mistakeSet.clear();
  updateMistakeDisplay();
  statusText.textContent = 'Mistake list cleared. Keep practicing!';
}

levelButtons.forEach(button => {
  button.addEventListener('click', () => setLevel(button.dataset.level));
});

modeButtons.forEach(button => {
  button.addEventListener('click', () => {
    modeButtons.forEach(btn => btn.classList.toggle('active', btn === button));
    currentMode = button.dataset.mode;
    modeLabel.textContent = currentMode === 'timed' ? 'Timed' : 'Untimed';
    if (isPlaying) showWord(currentIndex);
  });
});

startBtn.addEventListener('click', () => {
  audioContext.resume().then(startGame);
});

nextWordBtn.addEventListener('click', nextQuestion);
reviewBtn.addEventListener('click', reviewMistakes);
clearMistakesBtn.addEventListener('click', clearMistakes);

updateLeaderboard();
showWord(currentIndex);
