class Obstacle {
	constructor(updateObstacleCount){
		this.sizes = this.sizes.bind(this)
		this.template = this.template.bind(this)
		this.updateObstacleCount = updateObstacleCount
	}

	sizes(){
		return [
			'small', 'medium', 'large'
		]
	}

	template( {count=0} = {} ){
		this.updateObstacleCount()
		let size = this.sizes()[Math.ceil(Math.random()*this.sizes().length)-1]
		let xpos = 400/100 * (Math.ceil( (Math.random()*100 )+1))
		return `
			<div id="obs-${count}"
				class="obstacle ${size}"
				style="transform: translate3d(${xpos}px, 0, 0)"
			></div>
		`
	}

	render(){
		let quantity = Math.ceil(Math.random()*2)+1

	}

}


/*

const obstacles = ()=>{
	let tmp = []
	for(let i=0; i< Math.ceil(Math.random()*2)+1; i++){
		this.updateObstacleCount()
		let xpos = 400/100 * (Math.ceil( (Math.random()*100 )+1))
		tmp.push(`
			<div id="obs-${this.state.obstacleCount}"
				class="obstacle ${obstacleSizes[Math.ceil(Math.random()*obstacleSizes.length)-1]}"
				style="transform: translate3d(${xpos}px, 0, 0)"
			></div>`
		)
	}
	return tmp.join('')
}*/