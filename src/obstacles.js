class Obstacle {
	constructor(updateObstacleCount){
		this.sizes = this.sizes.bind(this)
		this.template = this.template.bind(this)
		this.data = this.data.bind(this)
		this.updateObstacleCount = updateObstacleCount
		this.calcObstacleValues = this.calcObstacleValues.bind(this)
		this.data = this.data.bind(this)

		this.state = {}
	}

	sizes(){
		return {
			small: {
				className: 'small',
				width: 60,
				height: 40
			},
			medium: {
				className: "medium",
				width: 30,
				height: 80
			},
			large: {
				className: 'large',
				width: 60,
				height: 100
			}
		} 
	}
	calcObstacleValues(){
		let sizes = Object.keys(this.sizes())
		console.log(sizes)
		let randomSize = sizes[ Math.ceil(Math.random() * sizes.length) -1 ]
		console.log(randomSize)
		let {className, width, height} = this.sizes()[randomSize]
		this.state = {
			className: className,
			width: width,
			height: height,
			xpos: 400/100 * (Math.ceil( (Math.random()*100 )+1))
		}
		console.log(this.state)
		//return this.state
	}

	template( {count=0} = {} ){
		this.updateObstacleCount()
		this.calcObstacleValues()
		//let calcValues = this.calcObstacleValues()
		let {size, xpos, className, width, height} = this.state //this.calcObstacleValues()
		console.log('obstacle state', this.state)
		return `
			<div id="obs-${count}"
				class="obstacle ${className}"
				style="
					transform: translate3d(${xpos}px, 0, 0);
				"
				data-width=${width}
				data-height=${height}
			></div>
		`
	}
	data(){
		return this.state
	}

	/*render(){
		let quantity = Math.ceil(Math.random()*2)+1

	}*/

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