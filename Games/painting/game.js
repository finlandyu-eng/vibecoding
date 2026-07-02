const puzzleSize = 4;
const totalTiles = puzzleSize * puzzleSize;
const puzzleShell = document.getElementById('puzzleShell');
const shuffleBtn = document.getElementById('shuffleBtn');
const moveCount = document.getElementById('moveCount');
const statusText = document.getElementById('statusText');

const imageUrl = 'https://upload.wikimedia.org/wikipedia/commons/5/57/Van_Gogh_-_Starry_Night_-_Google_Art_Project.jpg';
let tileOrder = [];
let moves = 0;

function createTiles() {
  puzzleShell.innerHTML = '';
  for (let index = 0; index < totalTiles; index++) {
    const tile = document.createElement('button');
    tile.className = 'tile';
    tile.dataset.index = index;
    tile.addEventListener('click', () => handleTileClick(index));
    puzzleShell.appendChild(tile);
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
      tile.style.backgroundImage = `url(${imageUrl})`;
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
  updateTiles();
  if (isSolved()) {
    updateStatus('Puzzle complete! Enjoy the masterpiece.');
  } else {
    updateStatus('Keep solving the puzzle!');
  }
}

function shufflePuzzle() {
  tileOrder = Array.from({ length: totalTiles }, (_, i) => i);
  for (let i = tileOrder.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [tileOrder[i], tileOrder[j]] = [tileOrder[j], tileOrder[i]];
  }
  if (isSolved()) shufflePuzzle();
  moves = 0;
  moveCount.textContent = moves;
  updateTiles();
  updateStatus('Puzzle shuffled. Slide tiles to restore the painting.');
}

function updateStatus(message) {
  statusText.textContent = message;
}

shuffleBtn.addEventListener('click', shufflePuzzle);
createTiles();
shufflePuzzle();
