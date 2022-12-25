const map = [
	[0, 0, 0, 0],
	[0, 0, 0, 0],
	[0, 0, 0, 0],
	[0, 0, 0, 0],
];

const gameSection = document.querySelector('.game2048');

function gameLoop() {
	for (let i = 0; i < map.length; i++) {
		for (let j = 0; j < map[i].length; j++) {
			gameSection.innerHTML += `<div class="cell" data-value="0" data-position="${i} x ${j}">0</div>`;
		}
	}
  generate2StartingTiles()
}

function reasignPosition() {
	for (let i = 0; i < map.length; i++) {
		for (let j = 0; j < map[i].length; j++) {
			gameSection.innerHTML += `<div class="cell" data-value="0" data-position="${i} x ${j}"></div>`;
		}
	}
}

function generateStartingTile() {
	let randomNr1 = Math.floor(Math.random() * 4);
	let randomNr2 = Math.floor(Math.random() * 4);
	let randomValue = Math.floor(Math.random() * 2);
	// console.log(map[randomNr1][randomNr2]);
  map[randomNr1][randomNr2] = randomValue * 2
  // console.log(map);
}
function generate2StartingTiles() {
	generateStartingTile();
	generateStartingTile();
  console.log(map);
}

gameLoop();
