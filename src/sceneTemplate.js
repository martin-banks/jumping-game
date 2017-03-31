
class SceneTemplate {
	constructor({updateObstaclePosition=null, count=0} = {}) {
		this.template = this.template.bind(this)
		this.playScene = this.playScene.bind(this)
		this.loadScene = this.loadScene.bind(this)
		this.toggleStatus = this.toggleStatus.bind(this)
		this.updateObstacleCount = this.updateObstacleCount.bind(this)
		this.updateObstaclePosition = updateObstaclePosition
		this.count = count

		this.state = {
			playing: false,
			gameSpeed: 3 * 1000,
			obstacleCount: 0
		}
	}


	toggleStatus(){
		let {playing} = this.state
		if (playing === true){
			this.state.playing = false
		} else {
			this.state.playing = true
		}
		console.log(this.state)
	}

	template (id){
		return `
			<div id='${id}' class="scene scene-loading">${this.loadScene()}</div>
		`
	}

	loadScene(){
		/* render random obstacles */
		return ''
	}

	updateObstacleCount(){
		this.state.obstacleCount++
	}


	playScene({id, startPos=100}={}){
		/* animate through to complete */
		let isPlaying = ()=> this.state.playing
		let animStart = null
		let elem = document.getElementById(id)
		let start = startPos
		let {gameSpeed} = this.state
		let duration = gameSpeed
		const step = (timestamp) => {
			if (!animStart) animStart = timestamp
			let progress = timestamp - animStart
			let increment = ()=> {
				let inc = Math.min((progress/duration*100), 100)
				//console.log('increment', inc)
				if (start === 100){
					return 2 * inc
				} else if ( start === 0 ){
					duration = gameSpeed / 2
					return inc
				}	
			}

			elem.style.transform = `translate3d(${start - (increment())}%, 0, 0)`
			if(progress < duration && isPlaying()){
				window.requestAnimationFrame(step)
			} else if (!isPlaying()){
				console.log('stopped')
				return
			} else {
				console.log('restart', isPlaying())
				elem.style.transform = `translate3d(${start}%,0,0)`
				animStart = null
				start = 100
				duration = gameSpeed

				let tmp = []
				for(let i=0; i< Math.ceil(Math.random()*2)+1; i++){
					let newObstacle = new Obstacle(this.updateObstacleCount)
					let xpos = 400/100 * (Math.ceil( (Math.random()*100 )+1))
					tmp.push( newObstacle.template({count: this.count}) )
				}
				elem.innerHTML = tmp.join('')
				window.requestAnimationFrame(step)
			}
		}	
		window.requestAnimationFrame(step)
	}



	render(id){
		return this.template(id)
	}
}

/*
if status is playing
	then animate from staging through to complete
	then reset to staging, load new content
	animate throough to complete 
	...

*/