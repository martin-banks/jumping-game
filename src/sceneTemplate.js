console.log('blah')
class SceneTemplate {
	constructor({}={}) {
		this.template = this.template.bind(this)
		this.playScene = this.playScene.bind(this)
		this.loadScene = this.loadScene.bind(this)
		this.toggleStatus = this.toggleStatus.bind(this)

		this.state = {
			playing: false,
			gameSpeed: 3 * 1000
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
		return 'hello world'
	}


	playScene({id, startPos=100}={}){
		/* animate through to complete */
		let isPlaying = ()=> this.state.playing
		let animStart = null
		let elem = document.getElementById(id)
		let start = startPos
		let {gameSpeed} = this.state
		let duration = gameSpeed
		function step(timestamp) {
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
			//console.log(increment())
			
			/* do animation */

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
				const obstacleSizes = [
				'small', 'medium', 'large'
				]
				const obstacles = ()=>{
					let tmp = []
					for(let i=0; i< Math.ceil(Math.random()*2)+1; i++){
						tmp.push(`
							<div 
								class="obstacle ${obstacleSizes[Math.ceil(Math.random()*obstacleSizes.length)-1]}"
								style="transform: translate3d(${ 500/100 * (Math.ceil( (Math.random()*100 )+1)) }px, 0, 0)"
							></div>`
						)
					}
					return tmp.join('')
				}
				elem.innerHTML = obstacles()
				// comment out animation call to prevent infinite 
				// recursion until start/stop is in place
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