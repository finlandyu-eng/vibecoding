const boardCanvas = document.getElementById('board');
const ctx = boardCanvas.getContext('2d');
const boardSize = 8;
const tileSize = boardCanvas.width / boardSize;
const status = document.getElementById('status');
const historyList = document.getElementById('history');
const resetBtn = document.getElementById('resetBtn');
const shuffleBtn = document.getElementById('shuffleBtn');

const initialBoard = [
  ['r','n','b','q','k','b','n','r'],
  ['p','p','p','p','p','p','p','p'],
  ['','','','','','','',''],
  ['','','','','','','',''],
  ['','','','','','','',''],
  ['','','','','','','',''],
  ['P','P','P','P','P','P','P','P'],
  ['R','N','B','Q','K','B','N','R']
];

let board = [];
let selected = null;
let validMoves = [];
let turn = 'white';
let gameOver = false;
let history = [];
let audioContext = null;

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
  const osc = audioContext.createOscillator();
  const gain = audioContext.createGain();
  osc.connect(gain);
  gain.connect(audioContext.destination);

  let frequency = 440;
  let duration = 0.12;
  let type = 'triangle';

  if (kind === 'move') {
    frequency = 520;
    duration = 0.1;
    type = 'square';
  } else if (kind === 'win') {
    frequency = 880;
    duration = 0.22;
    type = 'sine';
  } else if (kind === 'reset') {
    frequency = 360;
    duration = 0.14;
    type = 'triangle';
  }

  osc.type = type;
  osc.frequency.setValueAtTime(frequency, now);
  gain.gain.setValueAtTime(0.08, now);
  gain.gain.exponentialRampToValueAtTime(0.0001, now + duration);
  osc.start(now);
  osc.stop(now + duration);
}

function resetGame() {
  board = initialBoard.map(row => row.slice());
  selected = null;
  validMoves = [];
  turn = 'white';
  gameOver = false;
  history = [];
  updateStatus();
  renderHistory();
  drawBoard();
}

function renderHistory() {
  historyList.innerHTML = history.map(item => `<li>${item}</li>`).join('');
}

function updateStatus() {
  const winner = getWinner();
  if (winner) {
    status.textContent = `🎉 ${winner} wins! Great job!`;
    gameOver = true;
    playSound('win');
  } else {
    status.textContent = `${turn.charAt(0).toUpperCase() + turn.slice(1)} to move`;
  }
}

function drawBoard() {
  for (let row = 0; row < boardSize; row++) {
    for (let col = 0; col < boardSize; col++) {
      const x = col * tileSize;
      const y = row * tileSize;
      const isLight = (row + col) % 2 === 0;
      ctx.fillStyle = isLight ? '#ffe7f3' : '#f7a7d9';
      ctx.fillRect(x, y, tileSize, tileSize);
      if (selected && selected.row === row && selected.col === col) {
        ctx.fillStyle = 'rgba(255, 255, 255, 0.55)';
        ctx.fillRect(x, y, tileSize, tileSize);
      }
      if (validMoves.some(move => move.row === row && move.col === col)) {
        ctx.fillStyle = 'rgba(255, 255, 255, 0.6)';
        ctx.beginPath();
        ctx.arc(x + tileSize/2, y + tileSize/2, tileSize/10, 0, Math.PI*2);
        ctx.fill();
      }
      const piece = board[row][col];
      if (piece) drawPiece(piece, x, y);
    }
  }
  drawCoords();
}

function drawCoords() {
  ctx.font = '18px Inter, system-ui, sans-serif';
  ctx.fillStyle = 'rgba(87, 26, 69, 0.8)';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  const files = ['a','b','c','d','e','f','g','h'];
  for (let i = 0; i < 8; i++) {
    ctx.fillText(files[i], (i + 0.5) * tileSize, boardCanvas.height - 14);
    ctx.fillText(8 - i, 14, (i + 0.5) * tileSize);
  }
}

function drawPiece(piece, x, y) {
  const isWhite = piece === piece.toUpperCase();
  ctx.fillStyle = isWhite ? '#4d003a' : '#26001c';
  ctx.font = 'bold 48px Inter, system-ui, sans-serif';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText(getPieceSymbol(piece), x + tileSize/2, y + tileSize/2 + 4);
}

function getPieceSymbol(piece) {
  const mapping = {
    'p':'♟','r':'♜','n':'♞','b':'♝','q':'♛','k':'♚',
    'P':'♙','R':'♖','N':'♘','B':'♗','Q':'♕','K':'♔'
  };
  return mapping[piece] || '';
}

function getTeam(piece) {
  if (!piece) return null;
  return piece === piece.toUpperCase() ? 'white' : 'black';
}

function insideBoard(row, col) {
  return row >= 0 && row < 8 && col >= 0 && col < 8;
}

function getMoves(row, col) {
  const piece = board[row][col];
  if (!piece || getTeam(piece) !== turn) return [];
  const moves = [];
  const unit = piece.toLowerCase();
  if (unit === 'p') {
    const step = piece === 'P' ? -1 : 1;
    const next = row + step;
    if (insideBoard(next, col) && !board[next][col]) {
      moves.push({row: next, col});
      const start = piece === 'P' ? 6 : 1;
      if (row === start && !board[row + step*2][col]) {
        moves.push({row: row + step*2, col});
      }
    }
    for (const dc of [-1, 1]) {
      const nr = row + step;
      const nc = col + dc;
      if (insideBoard(nr, nc) && board[nr][nc] && getTeam(board[nr][nc]) !== turn) {
        moves.push({row: nr, col: nc});
      }
    }
    return moves;
  }
  if (unit === 'n') {
    const deltas = [[2,1],[2,-1],[-2,1],[-2,-1],[1,2],[1,-2],[-1,2],[-1,-2]];
    for (const [dr, dc] of deltas) {
      const nr = row + dr;
      const nc = col + dc;
      if (!insideBoard(nr,nc)) continue;
      if (!board[nr][nc] || getTeam(board[nr][nc]) !== turn) moves.push({row:nr,col:nc});
    }
    return moves;
  }
  if (unit === 'b' || unit === 'r' || unit === 'q') {
    const rays = [];
    if (unit === 'b' || unit === 'q') rays.push([1,1],[1,-1],[-1,1],[-1,-1]);
    if (unit === 'r' || unit === 'q') rays.push([1,0],[-1,0],[0,1],[0,-1]);
    for (const [dr,dc] of rays) {
      let nr = row + dr;
      let nc = col + dc;
      while (insideBoard(nr,nc)) {
        if (!board[nr][nc]) moves.push({row:nr,col:nc});
        else {
          if (getTeam(board[nr][nc]) !== turn) moves.push({row:nr,col:nc});
          break;
        }
        nr += dr;
        nc += dc;
      }
    }
    return moves;
  }
  if (unit === 'k') {
    for (let dr=-1; dr<=1; dr++) {
      for (let dc=-1; dc<=1; dc++) {
        if (dr===0 && dc===0) continue;
        const nr = row + dr;
        const nc = col + dc;
        if (!insideBoard(nr,nc)) continue;
        if (!board[nr][nc] || getTeam(board[nr][nc]) !== turn) moves.push({row:nr,col:nc});
      }
    }
    return moves;
  }
  return moves;
}

function positionFromEvent(evt) {
  const rect = boardCanvas.getBoundingClientRect();
  const scaleX = boardCanvas.width / rect.width;
  const scaleY = boardCanvas.height / rect.height;
  const x = (evt.clientX - rect.left) * scaleX;
  const y = (evt.clientY - rect.top) * scaleY;
  const col = Math.floor(x / tileSize);
  const row = Math.floor(y / tileSize);
  return {row, col};
}

function squareName(row, col) {
  const files = 'abcdefgh';
  return `${files[col]}${8 - row}`;
}

function movePiece(from, to) {
  const piece = board[from.row][from.col];
  board[to.row][to.col] = piece;
  board[from.row][from.col] = '';
  if ((piece === 'P' && to.row === 0) || (piece === 'p' && to.row === 7)) {
    board[to.row][to.col] = piece === 'P' ? 'Q' : 'q';
  }
  history.push(`${squareName(from.row, from.col)} → ${squareName(to.row, to.col)}`);
  renderHistory();
  turn = turn === 'white' ? 'black' : 'white';
  selected = null;
  validMoves = [];
  playSound('move');
  updateStatus();
}

function getWinner() {
  let whiteKing = false;
  let blackKing = false;
  for (let row = 0; row < boardSize; row++) {
    for (let col = 0; col < boardSize; col++) {
      if (board[row][col] === 'K') whiteKing = true;
      if (board[row][col] === 'k') blackKing = true;
    }
  }
  if (!whiteKing) return 'Black';
  if (!blackKing) return 'White';
  return null;
}

boardCanvas.addEventListener('click', evt => {
  if (gameOver) return;
  const pos = positionFromEvent(evt);
  if (!insideBoard(pos.row, pos.col)) return;
  const clicked = board[pos.row][pos.col];
  if (selected) {
    const target = validMoves.find(move => move.row === pos.row && move.col === pos.col);
    if (target) {
      movePiece(selected, target);
      drawBoard();
      return;
    }
  }
  if (clicked && getTeam(clicked) === turn) {
    selected = pos;
    validMoves = getMoves(pos.row, pos.col);
  } else {
    selected = null;
    validMoves = [];
  }
  drawBoard();
});

resetBtn.addEventListener('click', () => {
  resetGame();
  playSound('reset');
});
shuffleBtn.addEventListener('click', () => {
  resetGame();
  playSound('reset');
});

resetGame();
