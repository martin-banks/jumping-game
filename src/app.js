"use strict"


const game = {
	isActive: false,
	data:{
		score: 0,
		level: 1
	},
	player: {
		name: 'null',
		avatar: 'default',
		position: {
			x1: 0,
			y1: 0,
			x2: 0,
			y2: 0
		}
	}
	obstacles: [
		{
			x1: 0,
			y1: 0,
			x2: 0,
			y2: 0	
		}
	]

}

console.log('starting', game)

function updatePlayerPosition({x1=0, x2=0, y1=0, y2=0} = {}) {
	console.log('waiting to update... ', game.player.position)
	game.player.position.x1 = x1
	game.player.position.x2 = x2
	game.player.position.y1 = y1
	game.player.position.y2 = y2
	console.log('updating... ', game.player.position)
}
function updateObstaclePosition({x1=0, x2=0, y1=0, y2=0} = {}) {
	console.log('waiting to update... ', game.player.position)
	game.player.position.x1 = x1
	game.player.position.x2 = x2
	game.player.position.y1 = y1
	game.player.position.y2 = y2
	console.log('updating... ', game.player.position)
}


const scene1 = new SceneTemplate()
const scene2 = new SceneTemplate()
const scene3 = new SceneTemplate()
const score = new Score()
const player = new Player(updatePlayerPosition)
const scenes = [
	scene1.render('first'),
	scene2.render('second')
]

document.querySelector('#app').innerHTML = [
	score.render(),
	`<div id="gameContainer">${scenes.join('')}</div>`,
	`<div class="playerContainer">${player.render()}</div>`,
	`<button id='startButton' type="button" class="btn btn-default">New Game</button>`
].join('')



document.getElementById('startButton').addEventListener('click', e =>{
	scene1.toggleStatus()
	scene2.toggleStatus()
	if (game.isActive){
		/* game is runnning: stop it */
		game.isActive = false
		e.target.innerText = 'New Game'
		score.stop()
		window.removeEventListener('keydown', true)
	} else {
		/* game is not running: start it */
		game.isActive = true
		scene1.playScene({startPos: 0, id:'first'})
		scene2.playScene({startPos: 100, id:'second'})
		e.target.innerText = 'End game'
		score.start()
		window.addEventListener('keydown', e => {
			console.log(e.keyCode)
			if(e.keyCode === 32){
				e.preventDefault()
				player.jump()
			}
		})
	}
})
