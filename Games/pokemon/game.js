const starters = [
  {
    name: 'Flora',
    emoji: '🌸',
    maxHp: 90,
    attack: 26,
    defense: 18,
    moves: [
      { name: 'Vine Whip', power: 18 },
      { name: 'Petal Dance', power: 24 },
      { name: 'Heal', power: 0, heal: 20 },
    ],
  },
  {
    name: 'Blaze',
    emoji: '🔥',
    maxHp: 88,
    attack: 28,
    defense: 16,
    moves: [
      { name: 'Ember', power: 16 },
      { name: 'Flame Charge', power: 22 },
      { name: 'Smokescreen', power: 0, shield: 12 },
    ],
  },
  {
    name: 'Bubble',
    emoji: '💧',
    maxHp: 94,
    attack: 24,
    defense: 20,
    moves: [
      { name: 'Bubble', power: 14 },
      { name: 'Aqua Jet', power: 20 },
      { name: 'Refresh', power: 0, heal: 18 },
    ],
  },
];

const wildOpponents = [
  {
    name: 'Frost',
    emoji: '❄️',
    maxHp: 92,
    attack: 24,
    defense: 18,
    moves: [
      { name: 'Ice Shard', power: 16 },
      { name: 'Frost Breath', power: 20 },
      { name: 'Harden', power: 0, shield: 14 },
    ],
  },
  {
    name: 'Spark',
    emoji: '⚡',
    maxHp: 86,
    attack: 26,
    defense: 17,
    moves: [
      { name: 'Spark', power: 16 },
      { name: 'Thunderbolt', power: 24 },
      { name: 'Quick Guard', power: 0, shield: 12 },
    ],
  },
];

const playerAvatar = document.getElementById('playerAvatar');
const playerName = document.getElementById('playerName');
const playerHp = document.getElementById('playerHp');
const playerMaxHp = document.getElementById('playerMaxHp');
const enemyAvatar = document.getElementById('enemyAvatar');
const enemyName = document.getElementById('enemyName');
const enemyHp = document.getElementById('enemyHp');
const enemyMaxHp = document.getElementById('enemyMaxHp');
const moveButtons = document.getElementById('moveButtons');
const starterOptions = document.getElementById('starterOptions');
const battleLog = document.getElementById('battleLog');
const gameStatus = document.getElementById('gameStatus');
const restartBtn = document.getElementById('restartBtn');

let player = null;
let enemy = null;
let playerShield = 0;
let enemyShield = 0;
let turn = 'player';
let gameActive = false;

function createPokemon(template) {
  return {
    name: template.name,
    emoji: template.emoji,
    hp: template.maxHp,
    maxHp: template.maxHp,
    attack: template.attack,
    defense: template.defense,
    moves: template.moves,
  };
}

function resetBattle() {
  player = null;
  enemy = null;
  playerShield = 0;
  enemyShield = 0;
  turn = 'player';
  gameActive = false;
  battleLog.innerHTML = '';
  gameStatus.textContent = 'Select a starter to begin.';
  moveButtons.innerHTML = '';
  starterOptions.innerHTML = '';
  playerAvatar.textContent = '?';
  enemyAvatar.textContent = '?';
  playerName.textContent = 'Choose a starter';
  enemyName.textContent = 'Waiting...';
  playerHp.textContent = '0';
  playerMaxHp.textContent = '0';
  enemyHp.textContent = '0';
  enemyMaxHp.textContent = '0';
  renderStarters();
}

function renderStarters() {
  starters.forEach((starter, index) => {
    const button = document.createElement('button');
    button.className = 'starter-btn';
    button.innerHTML = `<strong>${starter.emoji} ${starter.name}</strong><span>HP ${starter.maxHp}</span>`;
    button.addEventListener('click', () => chooseStarter(index));
    starterOptions.appendChild(button);
  });
}

function chooseStarter(index) {
  player = createPokemon(starters[index]);
  enemy = createPokemon(wildOpponents[Math.floor(Math.random() * wildOpponents.length)]);
  gameActive = true;
  playerShield = 0;
  enemyShield = 0;
  renderBattle();
  addLog(`You chose ${player.name}! A wild ${enemy.name} appears!`);
  updateStatus('Choose a move.');
  renderMoves();
}

function renderBattle() {
  playerAvatar.textContent = player.emoji;
  playerName.textContent = player.name;
  playerHp.textContent = player.hp;
  playerMaxHp.textContent = player.maxHp;
  enemyAvatar.textContent = enemy.emoji;
  enemyName.textContent = enemy.name;
  enemyHp.textContent = enemy.hp;
  enemyMaxHp.textContent = enemy.maxHp;
}

function renderMoves() {
  moveButtons.innerHTML = '';
  player.moves.forEach((move, index) => {
    const button = document.createElement('button');
    button.className = 'move-btn';
    button.textContent = move.name;
    button.addEventListener('click', () => playerMove(index));
    moveButtons.appendChild(button);
  });
}

function playerMove(index) {
  if (!gameActive || turn !== 'player') return;
  const move = player.moves[index];
  applyMove(move, player, enemy, 'player');
  if (!gameActive) return;
  renderBattle();
  turn = 'enemy';
  setTimeout(enemyTurn, 800);
}

function enemyTurn() {
  if (!gameActive) return;
  const move = enemy.moves[Math.floor(Math.random() * enemy.moves.length)];
  applyMove(move, enemy, player, 'enemy');
  if (!gameActive) return;
  renderBattle();
  turn = 'player';
  updateStatus('Your turn. Choose a move.');
}

function applyMove(move, attacker, defender, actor) {
  if (move.heal) {
    const healAmount = Math.min(move.heal, attacker.maxHp - attacker.hp);
    attacker.hp += healAmount;
    addLog(`${attacker.name} used ${move.name} and healed ${healAmount} HP!`);
  } else if (move.shield) {
    if (actor === 'player') playerShield = move.shield;
    else enemyShield = move.shield;
    addLog(`${attacker.name} used ${move.name} and raised a shield!`);
  } else {
    const defense = defender.defense + (actor === 'player' ? enemyShield : playerShield);
    const damage = Math.max(1, move.power + attacker.attack - defense);
    if (actor === 'player' && enemyShield > 0) enemyShield = Math.max(0, enemyShield - Math.floor(move.power / 2));
    if (actor === 'enemy' && playerShield > 0) playerShield = Math.max(0, playerShield - Math.floor(move.power / 2));
    defender.hp -= damage;
    addLog(`${attacker.name} used ${move.name} and dealt ${damage} damage!`);
  }

  if (defender.hp <= 0) {
    defender.hp = 0;
    renderBattle();
    gameActive = false;
    if (actor === 'player') {
      updateStatus('Victory! You defeated the wild Pokémon.');
      addLog(`You won the battle!`);
    } else {
      updateStatus('Defeat... Your Pokémon fainted.');
      addLog(`You lost the battle.`);
    }
  }
}

function addLog(message) {
  const line = document.createElement('p');
  line.textContent = message;
  battleLog.prepend(line);
}

function updateStatus(message) {
  gameStatus.textContent = message;
}

restartBtn.addEventListener('click', resetBattle);

resetBattle();
