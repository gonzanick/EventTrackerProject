window.addEventListener('load', function(evt){
	console.log('script.js loaded');
	init();
});


function init() {
	console.log('In init()');
	loadGamesList();
	document.newGameForm.addGameButton.addEventListener('click', createGame);
	document.updateGameForm.updateGameButton.addEventListener('click', updateGame);
	document.deleteGameForm.deleteGameButton.addEventListener('click', deleteGame);
	console.trace();
}

function createGame(evt) {
	evt.preventDefault();
	let form = document.newGameForm;
	let newGame = {
		name: form.name.value,
		genre: form.genre.value,
		rating: form.rating.value,
		console: form.console.value,
		multiplayer: form.multiplayer.value
	};
	sendNewGame(newGame);
}


function sendNewGame(newGame) {
	console.log('sendNewGame');
	let xhr = new XMLHttpRequest();
	xhr.open('POST', `api/games/create`);
	xhr.onreadystatechange = function() {
		if (xhr.readyState === 4) {
			if (xhr.status === 200 || xhr.status === 201) {
				let game = JSON.parse(xhr.responseText);
				console.log(game);
				displayGames(game);
			}
			else {
				displayError('Error creating game: ' + xhr.status + " " + xhr.statusText);
			}
		}
	};
	xhr.setRequestHeader('Content-type', 'application/json');
	xhr.send(JSON.stringify(newGame));
}




function loadGamesList() {
	let xhr = new XMLHttpRequest();
	xhr.open("GET", "api/games")
	xhr.onreadystatechange = function() {
		if(xhr.readyState === 4) {
			if(xhr.status === 200) {
				let games = JSON.parse(xhr.responseText);
				displayGames(games);
				
			}
			else{
				
			}
		}
	};
	xhr.send();
}

function displayGames(games) {
	let tbody = document.getElementById('gameRows');
	for(let game of games) {
		let tr = document.createElement('tr');
		tbody.appendChild(tr);
		let td = document.createElement('td');
		td.textContent = game.id;
		tr.appendChild(td);
		td = document.createElement('td');
		td.textContent = game.name;
		tr.appendChild(td);
		td = document.createElement('td');
		td.textContent = game.genre;
		tr.appendChild(td);
		td = document.createElement('td');
		td.textContent = game.rating;
		tr.appendChild(td);
		td = document.createElement('td');
		td.textContent = game.console;
		tr.appendChild(td);
		td = document.createElement('td');
		td.textContent = game.multiplayer;
		tr.appendChild(td);
	}
}

function updateGame(evt) {
	evt.preventDefault();
	let form = document.updateGameForm;
	let updateGame = {
		name: form.name.value,
		genre: form.genre.value,
		rating: form.rating.value,
		console: form.console.value,
		multiplayer: form.multiplayer.value
	};
	sendUpdateGame(updateGame);
}

function sendUpdateGame(updateGame) {
	let xhr = new XMLHttpRequest();
	xhr.open("PUT", "api/games/${id}")
	xhr.onreadystatechange = function() {
		if(xhr.readyState === 4) {
			if(xhr.status === 200) {
				let games = JSON.parse(xhr.responseText);
				displayGames(games);
				
			}
			else{
				
			}
		}
	};
	xhr.send(updateGame);
}

function deleteGame() {
	let xhr = new XMLHttpRequest();
	let id = target.parent.getId();
	xhr.open("DELETE", "api/games/delete/${id}")
	xhr.onreadystatechange = function() {
		if(xhr.readyState === 4) {
			if(xhr.status === 200 || xhr.status === 204) {
				let games = JSON.parse(xhr.responseText);
				loadGamesList();
				
			}
			else{
				
			}
		}
	};
	xhr.send();
	
}