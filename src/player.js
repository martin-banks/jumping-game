
class Player {
	constructor(){
		this.render = this.render.bind(this)
		this.jump = this.jump.bind(this)
		this.setJumping = this.setJumping.bind(this)
		this.state = {
			direction: 'up',
			height: 200,
			time: 300,
			jumping: false
		}
	}

	setJumping(update){
		this.state.jumping = update
	}

	jump(){
		if(!this.state.jumping){
			this.setJumping(true)
			let animStart = null
			let elem = document.querySelector('#player')
			let {height, time, direction} = this.state
			let target = height
			let start = 0
			let duration = time

			let step = (timestamp)=>{
				if (!animStart) animStart = timestamp
				let progress = timestamp - animStart
				let increment = null
				if(direction === 'up'){
					increment = start + (0-Math.min((progress/duration)*target, target))
				} else {
					increment = 0-Math.max(((1-progress/duration)*height), target)
				}

				elem.style.transform = `translate3d(0, ${increment}px, 0)`

				if(progress < duration){
					window.requestAnimationFrame(step)
				} else {
					if(direction ==='up'){
						console.log('going down')
						animStart = null
						start = 0-height
						target = 0
						direction = 'down'
						window.requestAnimationFrame(step)
					} else {
						direction = 'up'
						this.setJumping(false)
						return
					}
				}	
			}
			window.requestAnimationFrame(step)
		} else {
			console.log('already jumping')
			return
		}
		
	}


	render(){
		return `<div id="player"></div>`
	}
}