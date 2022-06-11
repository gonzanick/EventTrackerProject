window.addEventListener('load', function(evt){
	console.log('script.js loaded');
	init();
});


function init() {
	console.log('In init()');
	loadGamesList();
}

function loadGamesList() {
	let xhr = new XMLHttpRequest();
	xhr.open("GET", "api/games")
	xhr.onreadystatechange = function() {
		if(xhr.readyState === 4) {
			if(xhr.status === 200) {
				let games = JSON.parse(xhr.responseText);
				displayGamesList(games);
				
			}
			else{
				
			}
		}
	};
	xhr.send();
}

function displayGamesList(games) {
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
	}
}