let map = [
	[0, 0, 0, 0],
	[0, 0, 0, 0],
	[0, 0, 0, 0],
	[0, 0, 0, 0],
];
const gameSection = document.querySelector('.game2048');
const h2 = document.querySelector('.info2048');

// let map = [
// 	[2, 4, 8, 16],
// 	[16, 8, 4, 2],
// 	[2, 4, 8, 16],
// 	[16, 8, 4, 2],
// ];

function generateBoard() {
	for (let i = 0; i < map.length; i++) {
		for (let j = 0; j < map[i].length; j++) {
			gameSection.innerHTML += `<div class="cell" id="${i}${j}" data-value="0" data-position="${i} x ${j}"></div>`;
		}
	}
}

function updateBoard() {
	for (let i = 0; i < map.length; i++) {
		for (let j = 0; j < map[i].length; j++) {
			const cell = document.getElementById(`${i}${j}`);
			cell.dataset.value = map[i][j];
			cell.dataset.position = `${i} x ${j}`;
			cell.innerText = map[i][j];
			cell.className = `cell`;
			cell.classList.toggle(`cellx${cell.dataset.value * 2}`);
		}
	}
}

function generateStartingTile() {
	if (containsZeros(map)) {
		let randomNr1 = Math.floor(Math.random() * 4);
		let randomNr2 = Math.floor(Math.random() * 4);
		if (map[randomNr1][randomNr2] !== 0 && containsZeros(map)) {
			generateStartingTile();
		} else {
			let randomValue = Math.floor(Math.random() * 2 + 1);
			map[randomNr1][randomNr2] = randomValue * 2;
		}
	}
	updateBoard();
}

//  Listen for key presses
window.addEventListener('keydown', (e) => {
	checkForIllegalGeneration(e.key);
});

function checkForIllegalGeneration(key) {
	let copyMap = [].concat.apply([], map);

	if (key == 'w' || key == 's') shiftTilesVertically(key);
	else if (key == 'a' || key == 'd') shiftTilesHorizontally(key);

	let copy2MapShiftUp = [].concat.apply([], map);
	if (copyMap.toString() == copy2MapShiftUp.toString()) {
		return;
	} else {
		generateStartingTile();
	}
}

//  Shift tiles
function shiftTilesHorizontally(key) {
	let newMap = [];
	let newArr;

	for (let i = 0; i < map.length; i++) {
		newArr = map[i].filter((item) => item != 0);
		if (newArr.length) {
			switch (key) {
				case 'a':
					for (let k = 0; k < newArr.length; k++) {
						if (newArr[k] === newArr[k + 1]) {
							newArr[k] = newArr[k] + newArr[k + 1];
							newArr[k + 1] = 0;
							newArr = newArr.filter((item) => item != 0);
						}
					}
					break;

				case 'd':
					for (let k = newArr.length; k > 0; k--) {
						if (newArr[k] === newArr[k - 1]) {
							newArr[k] = newArr[k] + newArr[k - 1];
							newArr[k - 1] = 0;
							newArr = newArr.filter((item) => item != 0);
						}
					}
					break;
			}
		}
		switch (key) {
			case 'a':
				fillArray(newArr);
				break;
			case 'd':
				unshiftArr(newArr);
				break;
		}
		newMap.push(newArr);
	}
	map = newMap;
	updateBoard();
}

function shiftTilesVertically(key) {
	let newMap = [];
	let newArr;
	for (let i = 0; i < map.length; i++) {
		newArr = [];
		map.forEach((row) => {
			newArr.push(row[i]);
			newArr = newArr.filter((item) => item != 0);
		});
		if (newArr.length > 1) {
			if (key == 'w') {
				for (let k = 0; k < newArr.length; k++) {
					if (newArr[k] === newArr[k + 1]) {
						newArr[k] = newArr[k] + newArr[k + 1];
						newArr[k + 1] = 0;
						newArr = newArr.filter((item) => item != 0);
					}
				}
			} else if (key == 's') {
				for (let k = newArr.length; k > 0; k--) {
					if (newArr[k] === newArr[k - 1]) {
						newArr[k] = newArr[k] + newArr[k - 1];
						newArr[k - 1] = 0;
						newArr = newArr.filter((item) => item != 0);
						k--
					}
				}
			}
			}

		if (key == 'w') fillArray(newArr);
		else if (key == 's') unshiftArr(newArr);
		newMap.push(newArr);
	}

	let dummyMap = [
		[0, 0, 0, 0],
		[0, 0, 0, 0],
		[0, 0, 0, 0],
		[0, 0, 0, 0],
	];

	for (let i = 0; i < 4; i++) {
		for (let b = 0; b < 4; b++) {
			dummyMap[b][i] = newMap[i][b];
		}
	}
	map = dummyMap;
	updateBoard();
}

//  Utillity functions
function gameLoop() {
	generateBoard();
	generate2StartingTiles();
	updateBoard();
}
function fillArray(arr) {
	while (arr.length < 4) {
		arr.push(0);
	}
}
function unshiftArr(arr) {
	while (arr.length < 4) {
		arr.unshift(0);
	}
}
function containsZeros(arr) {
	return arr.some((row) => row.includes(0));
}
const doesNotHave0 = (currentValue) => currentValue != 0;

function generate2StartingTiles() {
	generateStartingTile();
	generateStartingTile();
}

gameLoop();
