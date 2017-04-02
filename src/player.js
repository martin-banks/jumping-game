
class Player {
	constructor(updatePlayerPosition){
		this.render = this.render.bind(this)
		this.jump = this.jump.bind(this)
		this.setJumping = this.setJumping.bind(this)
		this.startPosition = this.startPosition.bind(this)
		this.updatePlayerPosition = updatePlayerPosition
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
			let {x,y} = this.startPosition()
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
					increment = y + (0-Math.min((progress/duration)*target, target))
				} else {
					increment = y - Math.max(((1-progress/duration)*height), target)
				}

				elem.style.transform = `translate3d(${x}px, ${increment}px, 0)`
				//console.log('increment', increment + 40)
				updatePlayerPosition({
					x1: x,
					x2: x + 40,
					y1: 300 - increment,
					y2: 300 - increment - 40
				})
				/*x1: x,
			x2: x + 40,
			y1: 300 - y,
			y2: 300 - (y + 40)*/

				if(progress < duration && game.isActive){
					window.requestAnimationFrame(step)
				} else {
					if(direction ==='up' && game.isActive){
						//console.log('going down')
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

	startPosition(){
		return {
			x: 50,
			y: 260
		}
	}


	render(){
		let {x,y} = this.startPosition()
		this.updatePlayerPosition({
			x1: x,
			x2: x + 40,
			y1: 300 - y,
			y2: 300 - (y + 40)
		})
		return `<div id="player" 
			style="transform: translate3d(${x}px, ${y}px, 0)"
		></div>`
	}
}