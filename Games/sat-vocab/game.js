const wordDisplay = document.getElementById('wordDisplay');
const meaningDisplay = document.getElementById('meaningDisplay');
const exampleDisplay = document.getElementById('exampleDisplay');
const hintDisplay = document.getElementById('hintDisplay');
const optionsGrid = document.getElementById('optionsGrid');
const scoreDisplay = document.getElementById('scoreDisplay');
const correctCountEl = document.getElementById('correctCount');
const wrongCountEl = document.getElementById('wrongCount');
const statusText = document.getElementById('statusText');
const nextWordBtn = document.getElementById('nextWordBtn');
const levelDisplay = document.getElementById('levelDisplay');

const words = [
  {
    word: 'radiant',
    meaning: 'bright, shining, or joyful',
    example: 'The morning sun made the garden look radiant.',
    hint: 'Think of sparkling light and a happy glow.',
    level: 'Easy',
    choices: ['sad', 'bright', 'heavy', 'dull']
  },
  {
    word: 'vivid',
    meaning: 'clear, bright, and full of life',
    example: 'She remembered the vivid colors of the festival.',
    hint: 'Imagine a picture with strong, glowing colors.',
    level: 'Easy',
    choices: ['faded', 'sharp', 'boring', 'crowded']
  },
  {
    word: 'eager',
    meaning: 'excited and ready to begin',
    example: 'Alex was eager to start the new adventure.',
    hint: 'How does a child feel before a fun party?',
    level: 'Easy',
    choices: ['tired', 'bored', 'excited', 'slow']
  },
  {
    word: 'swift',
    meaning: 'very quick or fast',
    example: 'The rabbit made a swift escape into the forest.',
    hint: 'Like a superhero running very fast.',
    level: 'Medium',
    choices: ['slow', 'fast', 'heavy', 'simple']
  },
  {
    word: 'brave',
    meaning: 'showing courage and not fear',
    example: 'The brave knight helped the village.',
    hint: 'Think of someone who is not scared.',
    level: 'Medium',
    choices: ['quiet', 'scared', 'strong', 'small']
  },
  {
    word: 'curious',
    meaning: 'wanting to learn or know more',
    example: 'The curious kitten explored every corner.',
    hint: 'What do you feel when you ask lots of questions?',
    level: 'Medium',
    choices: ['sleepy', 'curious', 'hungry', 'lonely']
  },
  {
    word: 'sparkle',
    meaning: 'shine brightly with small flashes of light',
    example: 'The stars sparkle on a clear night.',
    hint: 'Like tiny lights glowing in the dark.',
    level: 'Hard',
    choices: ['sleep', 'glow', 'hide', 'drop']
  },
  {
    word: 'celebrate',
    meaning: 'to enjoy a special event with happiness',
    example: 'They celebrate birthdays with cake and songs.',
    hint: 'Think about a party with friends.',
    level: 'Hard',
    choices: ['give up', 'forget', 'chant', 'celebrate']
  },
  {
    word: 'adventure',
    meaning: 'an exciting experience or journey',
    example: 'The treasure map led them on a great adventure.',
    hint: 'A fun journey with surprises.',
    level: 'Hard',
    choices: ['adventure', 'sleep', 'study', 'rest']
  }
];

let currentIndex = 0;
let score = 0;
let correctCount = 0;
let wrongCount = 0;

function shuffle(array) {
  return array.slice().sort(() => Math.random() - 0.5);
}

function getRandomChoices(wordEntry) {
  const shuffled = shuffle(wordEntry.choices);
  return shuffled;
}

function showWord(index) {
  const wordEntry = words[index];
  wordDisplay.textContent = wordEntry.word;
  meaningDisplay.textContent = wordEntry.meaning;
  exampleDisplay.textContent = wordEntry.example;
  hintDisplay.textContent = wordEntry.hint;
  levelDisplay.textContent = wordEntry.level;
  statusText.textContent = 'Choose the best meaning to earn sparkly points!';
  renderOptions(wordEntry);
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

function handleAnswer(choice, wordEntry) {
  const buttons = Array.from(document.querySelectorAll('.option-btn'));
  buttons.forEach(btn => btn.disabled = true);

  if (choice === wordEntry.meaning) {
    score += 10;
    correctCount += 1;
    statusText.textContent = 'Great job! You picked the right meaning!';
    buttons.find(btn => btn.textContent === choice).classList.add('correct');
  } else {
    wrongCount += 1;
    statusText.textContent = `Oops! The right answer was “${wordEntry.meaning}”. Keep trying!`;
    buttons.find(btn => btn.textContent === choice).classList.add('wrong');
    buttons.find(btn => btn.textContent === wordEntry.meaning).classList.add('correct');
  }

  updateScore();
  playResultAnimation(choice === wordEntry.meaning);
}

function updateScore() {
  scoreDisplay.textContent = score;
  correctCountEl.textContent = correctCount;
  wrongCountEl.textContent = wrongCount;
}

function playResultAnimation(isCorrect) {
  const wordCard = document.querySelector('.word-card');
  wordCard.classList.add(isCorrect ? 'correct-glow' : 'wrong-glow');
  setTimeout(() => wordCard.classList.remove('correct-glow', 'wrong-glow'), 600);
}

function nextWord() {
  currentIndex = (currentIndex + 1) % words.length;
  showWord(currentIndex);
}

nextWordBtn.addEventListener('click', nextWord);

showWord(currentIndex);
