"use strict"


const game = {
	isActive: false,
	data:{
		score: 0,
		level: 1
	},
	player: {
		shape: 'circle',
		name: 'null',
		avatar: 'default',
		width: 40,
		height: 40,
		radius: 20,

		position: {
			x1: 0,
			y1: 0,
			x2: 0,
			y2: 0
		}
	},
	scenePosition:{
		first: {
			x: 0,
			y: 0
		},
		second: {
			x: 0,
			y: 0
		}
	},
	obstacles: {}

}

console.log('starting', game)

function updatePlayerPosition({x1=0, x2=0, y1=0, y2=0} = {}) {
	console.log('waiting to update player... ', game.player.position)
	game.player.position = {
		x1, x2, y1,y2
	}
	/*game.player.position.x2 = x2
	game.player.position.y1 = y1
	game.player.position.y2 = y2*/
	game.player.centerPoint = {
		x: parseInt(x1) + game.player.radius,
		y: parseInt(y1) + game.player.radius
	}
	
	//console.info('centerpoint', game.player.centerPoint)
	//console.log('updating player... ', game.player.position)
}



function saveObstacleData({obstacles, scene}={}){
	/* obstacles is an array of objects with details of rendered obstacles */
	console.log('save args', scene, obstacles)
	game.obstacles[scene] = obstacles.map(obstacle => {
		console.log('obstacle data', obstacle)
		let { size, shape='triangle', x, y=0 } = obstacle
		let { width, height, className } = size
		return {
			shape,
			x,
			y,
			width,
			height,
			centerAxis: width / 2,
			className
		}
	})
}

function saveSceneData({scene=null, x=0, y=0}={}){
	game.scenePosition[scene].x = x / 100 * 500
	game.scenePosition[scene].y = y / 100 * 300
}





/* instantiate game objects */
const scene1 = new SceneTemplate({
	id: 'first', 
	saveSceneData,
	saveObstacleData
})
const scene2 = new SceneTemplate({
	id: 'second', 
	saveSceneData,
	saveObstacleData
})
const score = new Score()
const player = new Player(updatePlayerPosition)
const scenes = [
	scene1.render(),
	scene2.render()
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
		scene1.playScene({startPos: 0 })
		scene2.playScene({startPos: 100})
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
