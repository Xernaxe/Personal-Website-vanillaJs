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
function containsZeros(arr) {
	return arr.some((row) => row.includes(0));
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

function generate2StartingTiles() {
	generateStartingTile();
	generateStartingTile();
}

window.addEventListener('keydown', (e) => {
	switch (e.key) {
		case 'a':
			shiftLeft();
			generateStartingTile();
			break;

		case 'd':
			shiftRight();
			generateStartingTile();
			break;

		case 'w':
			shiftUp();
			generateStartingTile();
			break;

		case 's':
			gameOver()
			shiftDown();
			generateStartingTile();
			break;
	}
});

function shiftLeft() {
	let newMap = [];
	for (let i = 0; i < map.length; i++) {
		let newArr = map[i].filter((item) => item != 0);
		if (newArr.length) {
			for (let k = 0; k < newArr.length; k++) {
				if (
					newArr[k] === newArr[k + 1] &&
					newArr[k] !== 0 &&
					newArr[k + 1] !== 0
				) {
					newArr[k] = newArr[k] + newArr[k + 1];
					newArr[k + 1] = 0;
					newArr = newArr.filter((item) => item != 0);
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
	let newMap = [];
	for (let i = 0; i < map.length; i++) {
		let newArr = map[i].filter((item) => item != 0);
		if (newArr.length) {
			for (let k = newArr.length; k > 0; k--) {
				if (newArr[k] === newArr[k - 1]) {
					newArr[k] = newArr[k] + newArr[k - 1];
					newArr[k - 1] = 0;
					newArr = newArr.filter((item) => item != 0);
				}
			}
		}
		unshiftArr(newArr);
		newMap.push(newArr);
	}
	map = newMap;
	updateBoard();
}

function shiftUp() {
	let newMap = [];
	let newArr;
	for (let i = 0; i < map.length; i++) {
		newArr = [];
		map.forEach((row) => {
			newArr.push(row[i]);
			newArr = newArr.filter((item) => item != 0);
		});
		if (newArr.length) {
			for (let k = 0; k < newArr.length; k++) {
				if (newArr[k] === newArr[k + 1]) {
					newArr[k] = newArr[k] + newArr[k + 1];
					newArr[k + 1] = 0;
					newArr = newArr.filter((item) => item != 0);
				}
			}
		}
		fillArray(newArr);
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

function shiftDown(checking) {
	let newMap = [];
	let newArr;
	for (let i = 0; i < map.length; i++) {
		newArr = [];
		map.forEach((row) => {
			newArr.push(row[i]);
			newArr = newArr.filter((item) => item != 0);
		});
		if (newArr.length > 1) {
			for (let k = newArr.length; k > 0; k--) {
				if (newArr[k] === newArr[k - 1]) {
					newArr[k] = newArr[k] + newArr[k - 1];
					newArr[k - 1] = 0;
					newArr = newArr.filter((item) => item != 0);
					k--
				}
			}
		}
		unshiftArr(newArr);
		newMap.push(newArr);
	}

	let dummyMap = [
		[0, 0, 0, 0],
		[0, 0, 0, 0],
		[0, 0, 0, 0],
		[0, 0, 0, 0],
	];

	for (let i = 3; i >= 0; i--) {
		for (let b = 0; b < map.length; b++) {
			dummyMap[b][i] = newMap[i][b];
		}
	}
	if(!checking){
		map = dummyMap;
		updateBoard();
	}
}
const doesNotHave0 = (currentValue) => currentValue != 0;
// GAME OVER CODE | STILL WORKING ON IT
// faci o copie la harta, aplici shiftDown,up,left,right si compari daca sunt la fel
// daca sunt la fel inseamna ca nu mai sunt mutari posibile
function gameOver(){
	let arr1dMap = [].concat.apply([], map);
	let arr1dDummyMap = map;
	shiftDown(arr1dDummyMap ,true)
	arr1dDummyMap.concat.apply([], arr1dDummyMap)
	console.log(arr1dMap);
	console.log(arr1dDummyMap);
	if(arr1dDummyMap == arr1dMap){
		h2.innerText = "game over"
	} else{
		h2.innerText = "not over"
	}
}

gameLoop();
