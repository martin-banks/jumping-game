"use strict"


const game = {
	isActive: false,
	data:{
		score: 0,
		level: 1
	},
	player: {
		name: 'null',
		avatar: 'default'
	}

}

console.log('starting', game)

const scene1 = new SceneTemplate()
const scene2 = new SceneTemplate()
const scene3 = new SceneTemplate()

const scenes = [
	scene1.render('first'),
	scene2.render('second')
]

document.querySelector('#app').innerHTML = [
	`<div id="gameContainer">${scenes.join('')}</div>`,
	`<button id='startButton' type="button" class="btn btn-default">New Game</button>`
].join('')

document.getElementById('startButton').addEventListener('click', e =>{
	scene1.toggleStatus()
	scene2.toggleStatus()
	if (game.isActive){
		/* game is runnning: stop it */
		game.isActive = false
		e.target.innerText = 'New Game'
	} else {
		/* game is not running: start it */
		game.isActive = true
		scene1.playScene({startPos: 0, id:'first'})
		scene2.playScene({startPos: 100, id:'second'})
		e.target.innerText = 'End game'
	}
	
})


/*setTimeout(()=>{
	document.querySelector('.scene').classList.add('scene-playing')	
}, 1)*/

