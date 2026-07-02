const puzzleShell = document.getElementById('puzzleShell');
const shuffleBtn = document.getElementById('shuffleBtn');
const moveCount = document.getElementById('moveCount');
const scoreValue = document.getElementById('scoreValue');
const statusText = document.getElementById('statusText');
const artSelector = document.getElementById('artSelector');
const previewImage = document.getElementById('previewImage');
const previewTitle = document.getElementById('previewTitle');
const difficultySelector = document.getElementById('difficultySelector');
const winBanner = document.getElementById('winBanner');
const winDetails = document.getElementById('winDetails');

function resolveAssetPath(path) {
  return new URL(path, window.location.href).toString();
}

const artworks = [
  {
    id: 'starry-night',
    title: 'Starry Night',
    src: resolveAssetPath('./artworks/starry-night-local.svg'),
  },
  {
    id: 'water-lilies',
    title: 'Water Lilies',
    src: resolveAssetPath('./artworks/water-lilies-local.svg'),
  },
  {
    id: 'mona-lisa',
    title: 'Mona Lisa',
    src: resolveAssetPath('./artworks/mona-lisa-local.svg'),
  },
  {
    id: 'scream',
    title: 'The Scream',
    src: resolveAssetPath('./artworks/scream-local.svg'),
  },
  {
    id: 'last-supper',
    title: 'The Last Supper',
    src: resolveAssetPath('./artworks/last-supper-local.svg'),
  },
  {
    id: 'girl-with-pearl-earring',
    title: 'Girl with a Pearl Earring',
    src: resolveAssetPath('./artworks/girl-with-pearl-earring-local.svg'),
  },
  {
    id: 'impression-sunrise',
    title: 'Impression, Sunrise',
    src: resolveAssetPath('./artworks/impression-sunrise-local.svg'),
  },
];

const levelSettings = {
  easy: { size: 2, label: 'Easy (2×2)' },
  medium: { size: 3, label: 'Medium (3×3)' },
  hard: { size: 4, label: 'Hard (4×4)' },
};

let puzzleSize = levelSettings.easy.size;
let totalTiles = puzzleSize * puzzleSize;
let tileOrder = [];
let moves = 0;
let currentArtwork = artworks[0];
let currentLevel = 'easy';
let bestScore = 0;

function createTiles() {
  puzzleShell.innerHTML = '';
  puzzleShell.style.gridTemplateColumns = `repeat(${puzzleSize}, 1fr)`;
  for (let index = 0; index < totalTiles; index++) {
    const tile = document.createElement('button');
    tile.className = 'tile';
    tile.dataset.index = index;
    tile.addEventListener('click', () => handleTileClick(index));
    puzzleShell.appendChild(tile);
  }
}

function updateArtworkSelection() {
  if (!artSelector) return;
  Array.from(artSelector.children).forEach((button) => {
    button.classList.toggle('active', button.dataset.art === currentArtwork.id);
  });
}

function updateDifficultySelection() {
  if (!difficultySelector) return;
  Array.from(difficultySelector.children).forEach((button) => {
    button.classList.toggle('active', button.dataset.level === currentLevel);
  });
}

function updatePreview() {
  if (previewImage) {
    previewImage.src = currentArtwork.src;
    previewImage.alt = currentArtwork.title;
  }
  if (previewTitle) {
    previewTitle.textContent = currentArtwork.title;
  }
}

function updateTiles() {
  const tiles = Array.from(puzzleShell.children);
  tiles.forEach((tile, tileIndex) => {
    const order = tileOrder[tileIndex];
    if (order === totalTiles - 1) {
      tile.classList.add('hidden');
      tile.style.backgroundImage = 'none';
    } else {
      tile.classList.remove('hidden');
      const row = Math.floor(order / puzzleSize);
      const col = order % puzzleSize;
      const bgX = (col / (puzzleSize - 1)) * 100;
      const bgY = (row / (puzzleSize - 1)) * 100;
      tile.style.backgroundImage = `url(${currentArtwork.src})`;
      tile.style.backgroundPosition = `${bgX}% ${bgY}%`;
      tile.style.backgroundSize = `${puzzleSize * 100}% ${puzzleSize * 100}%`;
    }
  });
}

function isSolved() {
  return tileOrder.every((value, index) => value === index);
}

function getEmptyIndex() {
  return tileOrder.indexOf(totalTiles - 1);
}

function isAdjacent(clickedIndex, emptyIndex) {
  const clickedRow = Math.floor(clickedIndex / puzzleSize);
  const clickedCol = clickedIndex % puzzleSize;
  const emptyRow = Math.floor(emptyIndex / puzzleSize);
  const emptyCol = emptyIndex % puzzleSize;
  return (
    (clickedRow === emptyRow && Math.abs(clickedCol - emptyCol) === 1) ||
    (clickedCol === emptyCol && Math.abs(clickedRow - emptyRow) === 1)
  );
}

function handleTileClick(index) {
  const emptyIndex = getEmptyIndex();
  if (!isAdjacent(index, emptyIndex) || statusText.textContent.includes('Complete')) return;
  [tileOrder[index], tileOrder[emptyIndex]] = [tileOrder[emptyIndex], tileOrder[index]];
  moves += 1;
  moveCount.textContent = moves;
  updateScore();
  updateTiles();
  if (isSolved()) {
    const score = Math.max(100 - moves * 5, 20);
    bestScore = Math.max(bestScore, score);
    updateStatus('Puzzle complete! Enjoy the public-domain masterpiece.');
    showWinBanner(score);
  } else {
    updateStatus('Keep solving the puzzle!');
    hideWinBanner();
  }
}

function shufflePuzzle() {
  totalTiles = puzzleSize * puzzleSize;
  tileOrder = Array.from({ length: totalTiles }, (_, i) => i);
  for (let i = tileOrder.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [tileOrder[i], tileOrder[j]] = [tileOrder[j], tileOrder[i]];
  }
  if (isSolved()) shufflePuzzle();
  moves = 0;
  moveCount.textContent = moves;
  updateScore();
  createTiles();
  updateTiles();
  hideWinBanner();
  updateStatus(`Puzzle shuffled at ${levelSettings[currentLevel].label}. Slide tiles to restore the public-domain painting.`);
}

function updateStatus(message) {
  statusText.textContent = message;
}

function updateScore() {
  const score = Math.max(100 - moves * 5, 20);
  scoreValue.textContent = score;
}

function showWinBanner(score) {
  if (!winBanner || !winDetails) return;
  winBanner.classList.remove('hidden');
  winDetails.textContent = `You finished in ${moves} moves with a score of ${score}!`;
}

function hideWinBanner() {
  if (!winBanner) return;
  winBanner.classList.add('hidden');
}

function selectArtwork(artId) {
  const chosenArtwork = artworks.find((artwork) => artwork.id === artId);
  if (!chosenArtwork) return;
  currentArtwork = chosenArtwork;
  updateArtworkSelection();
  updatePreview();
  shufflePuzzle();
}

function selectDifficulty(level) {
  if (!levelSettings[level]) return;
  currentLevel = level;
  puzzleSize = levelSettings[level].size;
  updateDifficultySelection();
  shufflePuzzle();
}

shuffleBtn.addEventListener('click', shufflePuzzle);

if (artSelector) {
  Array.from(artSelector.children).forEach((button) => {
    button.addEventListener('click', () => selectArtwork(button.dataset.art));
  });
}

if (difficultySelector) {
  Array.from(difficultySelector.children).forEach((button) => {
    button.addEventListener('click', () => selectDifficulty(button.dataset.level));
  });
}

updateArtworkSelection();
updateDifficultySelection();
updatePreview();
shufflePuzzle();
