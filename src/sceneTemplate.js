
class SceneTemplate {
	constructor({
		id,
		saveSceneData,
		updateObstaclePosition = null, 
		count = 0,
	} = {}) {
		this.template = this.template.bind(this)
		this.playScene = this.playScene.bind(this)
		this.loadScene = this.loadScene.bind(this)
		this.toggleStatus = this.toggleStatus.bind(this)
		this.updateObstacleCount = this.updateObstacleCount.bind(this)
		this.updateObstaclePosition = updateObstaclePosition
		this.count = count
		this.saveSceneData = saveSceneData
		this.saveObstacleData = saveObstacleData
		this.id = id

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

	template (){
		return `
			<div id='${this.id}' class="scene scene-loading">${this.loadScene()}</div>
		`
	}

	loadScene(){
		/* render random obstacles */
		return 'background'
	}

	updateObstacleCount(){
		this.state.obstacleCount++
	}


	playScene({id, startPos=100}={}){
		/* animate through to complete */
		let isPlaying = ()=> this.state.playing
		let animStart = null
		let elem = document.getElementById(this.id)
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
			let newIncrement = increment()
			this.saveSceneData({
				scene: this.id,
				x: newIncrement
			})
			elem.style.transform = `translate3d(${start - (newIncrement)}%, 0, 0)`
			
			if(progress < duration && isPlaying()){
				window.requestAnimationFrame(step)
			} else if (!isPlaying()){
				console.log('stopped')
				return
			} else {
				/*reset scene and render new obstacles*/
				console.log('restart', isPlaying())
				elem.style.transform = `translate3d(${start}%,0,0)`
				animStart = null
				start = 100
				duration = gameSpeed

				let allNewObstacles = []
				let allNewObstacleData = []
				for(let i=0; i< Math.ceil(Math.random()*2)+1; i++){
					let newObstacle = new Obstacle(this.updateObstacleCount)
					let xpos = 400/100 * (Math.ceil( (Math.random()*100 )+1))
					allNewObstacles.push( newObstacle.template({count: this.count}) )
					allNewObstacleData.push({
						x: xpos,
						size: newObstacle.data()
					})
				}
				this.saveObstacleData(allNewObstacleData)
				elem.innerHTML = allNewObstacles.join('')
				window.requestAnimationFrame(step)
			}
		}	
		window.requestAnimationFrame(step)
	}



	render(){
		return this.template(this.id)
	}
}



/*
if status is playing
	then animate from staging through to complete
	then reset to staging, load new content
	animate throough to complete 
	...

*/