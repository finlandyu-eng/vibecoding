const cardBoard = document.getElementById('cardBoard');
const statusText = document.getElementById('statusText');
const newGameBtn = document.getElementById('newGameBtn');
const clearSelectionBtn = document.getElementById('clearSelectionBtn');
const skipPuzzleBtn = document.getElementById('skipPuzzleBtn');
const operatorButtons = document.querySelectorAll('.operator-btn');
const timerDisplay = document.getElementById('timerDisplay');
const scoreDisplay = document.getElementById('scoreDisplay');
const timedModeToggle = document.getElementById('timedModeToggle');
const leaderboardList = document.getElementById('leaderboardList');
const nameModal = document.getElementById('nameModal');
const playerNameInput = document.getElementById('playerNameInput');
const nameSubmitBtn = document.getElementById('nameSubmitBtn');
const fireworksOverlay = document.getElementById('fireworksOverlay');

const palettes = ['sun', 'sky', 'mint', 'lilac', 'pink'];
const emojis = ['⭐', '🌈', '🧁', '🎈', '🌟', '🍀', '🐻', '🦄'];

let cards = [];
let selectedIndices = [];
let score = 0;
let timerId = null;
let timeLeft = 60;
let gameActive = true;
let timedMode = true;
let audioContext = null;
let playerName = '';
let timerStarted = false;
const leaderboardKey = '24points-leaderboard';

function loadLeaderboard() {
  const stored = localStorage.getItem(leaderboardKey);
  if (!stored) {
    return [];
  }
  try {
    return JSON.parse(stored);
  } catch (error) {
    return [];
  }
}

function saveLeaderboard(entries) {
  localStorage.setItem(leaderboardKey, JSON.stringify(entries));
}

function renderLeaderboard() {
  const entries = loadLeaderboard()
    .sort((a, b) => b.score - a.score)
    .slice(0, 5);

  if (!entries.length) {
    leaderboardList.innerHTML = '<li>No records yet. Be the first superstar!</li>';
    return;
  }

  const medals = ['🥇 Gold', '🥈 Silver', '🥉 Bronze', '⭐ Star', '🌟 Spark'];

  leaderboardList.innerHTML = entries
    .map((entry, index) => `<li>${medals[index] || '🌈 Bright'} — ${entry.name} — ${entry.score} points</li>`)
    .join('');
}

function updateLeaderboard() {
  const entries = loadLeaderboard();
  entries.push({ name: playerName || 'Player', score });
  const sorted = entries.sort((a, b) => b.score - a.score).slice(0, 5);
  saveLeaderboard(sorted);
  renderLeaderboard();
}

function pickEmoji(value) {
  const safeValue = Math.max(1, Math.round(value));
  return emojis[safeValue % emojis.length];
}

function formatNumber(value) {
  if (Number.isInteger(value)) {
    return String(value);
  }
  return Number(value.toFixed(2)).toString();
}

function makeCard(value) {
  return {
    id: crypto.randomUUID(),
    value,
    color: palettes[Math.floor(Math.random() * palettes.length)],
    emoji: pickEmoji(value),
  };
}

function canMake24(values) {
  if (values.length === 1) {
    return Math.abs(values[0] - 24) < 1e-9;
  }

  for (let i = 0; i < values.length; i += 1) {
    for (let j = i + 1; j < values.length; j += 1) {
      const a = values[i];
      const b = values[j];
      const rest = values.filter((_, index) => index !== i && index !== j);
      const candidates = [a + b, a - b, b - a, a * b];

      if (b !== 0) {
        candidates.push(a / b);
      }
      if (a !== 0) {
        candidates.push(b / a);
      }

      for (const candidate of candidates) {
        const nextValues = [...rest, candidate];
        if (canMake24(nextValues)) {
          return true;
        }
      }
    }
  }

  return false;
}

function initAudio() {
  if (!audioContext) {
    audioContext = new (window.AudioContext || window.webkitAudioContext)();
  }
  if (audioContext.state === 'suspended') {
    audioContext.resume();
  }
}

function playSound(kind) {
  initAudio();
  const now = audioContext.currentTime;
  const oscillator = audioContext.createOscillator();
  const gainNode = audioContext.createGain();
  oscillator.connect(gainNode);
  gainNode.connect(audioContext.destination);

  let frequency = 440;
  let duration = 0.12;

  if (kind === 'select') {
    frequency = 620;
    duration = 0.08;
  } else if (kind === 'win') {
    frequency = 880;
    duration = 0.2;
  } else if (kind === 'lose') {
    frequency = 220;
    duration = 0.24;
  } else if (kind === 'new') {
    frequency = 540;
    duration = 0.1;
  } else if (kind === 'skip') {
    frequency = 700;
    duration = 0.12;
  } else if (kind === 'clear') {
    frequency = 480;
    duration = 0.09;
  } else if (kind === 'warning') {
    frequency = 300;
    duration = 0.16;
  }

  oscillator.type = 'triangle';
  oscillator.frequency.setValueAtTime(frequency, now);
  gainNode.gain.setValueAtTime(0.06, now);
  gainNode.gain.exponentialRampToValueAtTime(0.0001, now + duration);
  oscillator.start(now);
  oscillator.stop(now + duration);
}

function updateTimerDisplay() {
  if (!timedMode) {
    timerDisplay.textContent = 'Off';
    return;
  }
  timerDisplay.textContent = `${timeLeft}s`;
}

function clearTimer() {
  if (timerId) {
    clearInterval(timerId);
    timerId = null;
  }
}

function startTimer() {
  clearTimer();
  if (!timedMode) {
    updateTimerDisplay();
    return;
  }

  if (!timerStarted) {
    timeLeft = 60;
    timerStarted = true;
  }

  updateTimerDisplay();
  timerId = window.setInterval(() => {
    timeLeft -= 1;
    updateTimerDisplay();

    if (timeLeft <= 5) {
      playSound('warning');
    }

    if (timeLeft <= 0) {
      clearTimer();
      gameActive = false;
      updateStatus('Time is up! Great effort! A fresh round is starting for you.');
      playSound('lose');
      showFireworks();
      render();
      window.setTimeout(() => {
        timerStarted = false;
        timeLeft = 60;
        updateTimerDisplay();
        createPuzzle();
      }, 900);
    }
  }, 1000);
}

function updateScoreDisplay() {
  scoreDisplay.textContent = score;
}

function showFireworks() {
  if (!fireworksOverlay) return;
  fireworksOverlay.classList.remove('hidden');
  fireworksOverlay.setAttribute('aria-hidden', 'false');
  window.setTimeout(() => {
    fireworksOverlay.classList.add('hidden');
    fireworksOverlay.setAttribute('aria-hidden', 'true');
  }, 1100);
}

function showNameModal() {
  if (playerName) {
    updateStatus(`Hello ${playerName}! Welcome to 24 Points. You are very clever!`);
    return;
  }

  nameModal.classList.remove('hidden');
  nameModal.setAttribute('aria-hidden', 'false');
  playerNameInput.focus();
}

function handleNameSubmit() {
  const enteredName = playerNameInput.value.trim();
  playerName = enteredName || 'Friend';
  nameModal.classList.add('hidden');
  nameModal.setAttribute('aria-hidden', 'true');
  updateStatus(`Hello ${playerName}! Welcome to 24 Points. You are very clever!`);
  playSound('new');
  createPuzzle();
}

function createPuzzle() {
  let numbers;
  do {
    numbers = Array.from({ length: 4 }, () => Math.floor(Math.random() * 13) + 1);
  } while (!canMake24([...numbers]));

  cards = numbers.map(makeCard);
  selectedIndices = [];
  gameActive = true;
  render();
  updateStatus('Pick two cards and choose an operation to make 24!');
  playSound('new');
  if (timedMode) {
    if (!timerStarted) {
      timeLeft = 60;
      timerStarted = true;
    }
    startTimer();
  } else {
    clearTimer();
    updateTimerDisplay();
  }
}

function render() {
  cardBoard.innerHTML = '';

  cards.forEach((card, index) => {
    const button = document.createElement('button');
    button.className = `card ${card.color}`;
    if (selectedIndices.includes(index)) {
      button.classList.add('selected');
    }
    button.type = 'button';
    button.innerHTML = `
      <span class="emoji">${card.emoji}</span>
      <span class="value">${formatNumber(card.value)}</span>
      <span class="emoji">✨</span>
    `;
    button.addEventListener('click', () => toggleCardSelection(index));
    cardBoard.appendChild(button);
  });

  operatorButtons.forEach((button) => {
    button.disabled = !gameActive || selectedIndices.length !== 2;
  });
}

function toggleCardSelection(index) {
  if (!gameActive) {
    return;
  }

  if (selectedIndices.includes(index)) {
    selectedIndices = selectedIndices.filter((selectedIndex) => selectedIndex !== index);
    updateStatus('Selection cleared. Pick two cards again!');
    playSound('clear');
  } else {
    if (selectedIndices.length >= 2) {
      updateStatus('You can only choose two cards at a time.');
      return;
    }
    selectedIndices.push(index);
    playSound('select');
    if (selectedIndices.length === 2) {
      updateStatus('Great choice! Now pick an operation.');
    } else {
      updateStatus('One more card, then choose your math move!');
    }
  }
  render();
}

function applyOperation(symbol) {
  if (!gameActive) {
    updateStatus('Start a new puzzle to keep playing.');
    return;
  }

  if (selectedIndices.length !== 2) {
    updateStatus('Choose exactly two cards first.');
    return;
  }

  const [firstIndex, secondIndex] = selectedIndices;
  const firstCard = cards[firstIndex];
  const secondCard = cards[secondIndex];
  let result;

  switch (symbol) {
    case '+':
      result = firstCard.value + secondCard.value;
      break;
    case '-':
      result = firstCard.value - secondCard.value;
      break;
    case '×':
      result = firstCard.value * secondCard.value;
      break;
    case '÷':
      if (secondCard.value === 0) {
        updateStatus('Oops! Division by zero is not allowed.');
        return;
      }
      result = firstCard.value / secondCard.value;
      break;
    default:
      return;
  }

  const remainingCards = cards.filter((_, index) => !selectedIndices.includes(index));
  const newCard = makeCard(result);
  cards = [...remainingCards, newCard];
  selectedIndices = [];

  if (cards.length === 1 && Math.abs(cards[0].value - 24) < 1e-9) {
    score += timedMode ? 120 + timeLeft * 2 : 100;
    updateScoreDisplay();
    clearTimer();
    gameActive = false;
    updateLeaderboard();
    updateStatus(`You did it, ${playerName || 'friend'}! Twenty-four is your lucky number!`);
    playSound('win');
    window.setTimeout(() => {
      gameActive = true;
      createPuzzle();
    }, 500);
  } else {
    score += timedMode ? 10 : 8;
    updateScoreDisplay();
    updateStatus(`Nice work! The new card is ${formatNumber(result)}. Keep going!`);
    playSound('select');
  }

  render();
}

function updateStatus(message) {
  statusText.textContent = message;
}

newGameBtn.addEventListener('click', () => {
  if (!playerName) {
    showNameModal();
    return;
  }
  timerStarted = false;
  timeLeft = 60;
  updateTimerDisplay();
  createPuzzle();
});
clearSelectionBtn.addEventListener('click', () => {
  selectedIndices = [];
  updateStatus('Selection cleared. Try another pair of cards!');
  playSound('clear');
  render();
});

skipPuzzleBtn.addEventListener('click', () => {
  if (!playerName) {
    showNameModal();
    return;
  }
  if (!gameActive) {
    createPuzzle();
    return;
  }
  updateStatus('Skipped! Here is a fresh puzzle to try.');
  playSound('skip');
  createPuzzle();
});

operatorButtons.forEach((button) => {
  button.addEventListener('click', () => applyOperation(button.dataset.op));
});

nameSubmitBtn.addEventListener('click', handleNameSubmit);
playerNameInput.addEventListener('keydown', (event) => {
  if (event.key === 'Enter') {
    handleNameSubmit();
  }
});

timedModeToggle.addEventListener('change', () => {
  timedMode = timedModeToggle.checked;
  if (timedMode) {
    timerStarted = false;
    timeLeft = 60;
    updateStatus('Timed mode is on! You have 60 seconds per puzzle.');
    if (gameActive) {
      startTimer();
    }
  } else {
    clearTimer();
    updateStatus('Timed mode is off. Play at your own pace!');
  }
  updateTimerDisplay();
  render();
});

updateScoreDisplay();
updateTimerDisplay();
renderLeaderboard();
showNameModal();
