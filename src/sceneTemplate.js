
class SceneTemplate {
	constructor({
		id,
		saveSceneData,
		updateObstaclePosition = null, 
		count = 0,
		stopGame
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
		this.stopGame = stopGame

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
			this.stopGame()
		} else {
			this.state.playing = true
		}
		//console.log(this.state)
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
		let isPlaying = ()=> game.isActive//this.state.playing
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
			let checkCollision = new Collision(this.stopGame)
			checkCollision.window()
			
			if(progress < duration && isPlaying()){
				window.requestAnimationFrame(step)
			} else if (!isPlaying()){
				console.log('stopped')
				return
			} else {
				/*reset scene and render new obstacles*/
				elem.style.transform = `translate3d(${start}%,0,0)`
				animStart = null
				start = 100
				duration = gameSpeed

				let allNewObstacles = []
				let allNewObstacleData = []
				for(let i=0; i< Math.ceil(Math.random()*1)+1; i++){
					let newObstacle = new Obstacle(this.updateObstacleCount)
					let xpos = 400/100 * (Math.ceil( (Math.random()*100 )+1))
					allNewObstacles.push( newObstacle.template({count: this.count, xpos}) )
					allNewObstacleData.push({
						x: xpos,
						size: newObstacle.data()
					})
				}
				
				
				window.requestAnimationFrame(step)
				setTimeout(()=>{
					elem.innerHTML = allNewObstacles.join('')
					this.saveObstacleData({obstacles:allNewObstacleData, scene:this.id})
				}, 10);
				
			}
		}	
		window.requestAnimationFrame(step)
	}



	render(){
		return this.template(this.id)
	}
}
