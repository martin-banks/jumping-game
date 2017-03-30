"use strict"


const game = {
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
	scene2.render('second'),
	/*scene3.render ('complete')*/
]

document.querySelector('#app').innerHTML = scenes.join('')

scene1.playScene({startPos: 0, id:'first'})
scene2.playScene({startPos: 100, id:'second'})

/*setTimeout(()=>{
	document.querySelector('.scene').classList.add('scene-playing')	
}, 1)*/

