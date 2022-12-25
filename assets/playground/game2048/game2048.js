let map = [
	[0, 0, 0, 0],
	[0, 0, 0, 0],
	[0, 0, 0, 0],
	[0, 0, 0, 0],
];

const gameSection = document.querySelector('.game2048');

function generateBoard() {
	for (let i = 0; i < map.length; i++) {
		for (let j = 0; j < map[i].length; j++) {
			gameSection.innerHTML += `<div class="cell" id="${i}${j}" data-value="0" data-position="${i} x ${j}"></div>`;
		}
	}
}
function gameLoop() {
	generateBoard();
	generate2StartingTiles();
}

function updateBoard() {
	for (let i = 0; i < map.length; i++) {
		for (let j = 0; j < map[i].length; j++) {
			const cell = document.getElementById(`${i}${j}`);
			cell.dataset.value = map[i][j];
			cell.dataset.position = `${i} x ${j}`;
			cell.innerText = map[i][j];

			switch (cell.dataset.value) {
				case '0':
					cell.className = 'cell';
					break;
				case '2':
					cell.className = 'cell';
					cell.classList.toggle('cellx2');
					break;
				case '4':
					cell.className = 'cell';
					cell.classList.toggle('cellx4');
					break;
				case '8':
					cell.className = 'cell';
					cell.classList.toggle('cellx8');
					break;
				case '16':
					cell.className = 'cell';
					cell.classList.toggle('cellx16');
					break;
				case '32':
					cell.className = 'cell';
					cell.classList.toggle('cellx32');
					break;
				case '64':
					cell.className = 'cell';
					cell.classList.toggle('cellx64');
					break;
				case '128':
					cell.className = 'cell';
					cell.classList.toggle('cellx128');
					break;
				case '256':
					cell.className = 'cell';
					cell.classList.toggle('cellx256');
					break;
				case '512':
					cell.className = 'cell';
					cell.classList.toggle('cellx512');
					break;
				case '1024':
					cell.className = 'cell';
					cell.classList.toggle('cellx1024');
					break;
				case '2048':
					cell.className = 'cell';
					cell.classList.toggle('cellx2048');
					break;
			}
		}
	}
}

function generateStartingTile() {
	let randomNr1 = Math.floor(Math.random() * 4);
	let randomNr2 = Math.floor(Math.random() * 4);
	console.log(`${randomNr1} x ${randomNr2} "tile"`);
	let randomValue = Math.floor(Math.random() * 2 + 1);
	map[randomNr1][randomNr2] = randomValue * 2;
}

function generate2StartingTiles() {
	generateStartingTile();
	generateStartingTile();
	generateStartingTile();
	generateStartingTile();
	generateStartingTile();
	generateStartingTile();
	generateStartingTile();
	generateStartingTile();
	updateBoard();
	console.log(map);
}

gameLoop();

window.addEventListener('keydown', (e) => {
	console.log(e.key);

	switch (e.key) {
		case 'a':
			shiftLeft();
			break;

		case 'd':
			shiftRight();
			break;

		case 'w':
			shiftUp();
			break;

		case 's':
			shiftDown();
			break;
	}
});

function shiftLeft() {
	// mapa provizorie
	let newMap = [];

	//parse prin tot map-u pentru randuri
	for (let i = 0; i < map.length; i++) {
		// populeaza un nou array cu valori care nu sunt egale cu 0
		let newArr = map[i].filter((item) => item != 0);
		// verifica daca noul array are cel putin un element
		if (newArr.length) {
			// parseaza noul array incepand de la index-
			for (let k = 0; k < newArr.length; k++) {
				if (newArr[k] === newArr[k + 1]) {
					newArr[k] = newArr[k] + newArr[k + 1];
					newArr[k + 1] = 0;
					newArr = newArr.filter((item) => item != 0);
					console.log(newArr + 'new arr');
				}
			}
		}
		fillArray(newArr);
		newMap.push(newArr);
	}
	map = newMap;
	updateBoard();
}

function shiftRight() {
	// let newMap = []
	// map.reverse()
	// updateBoard()
}

function fillArray(arr) {
	while (arr.length < 4) {
		arr.push(0);
	}
}
