class Score {
	constructor(){
		this.stop = this.stop.bind(this)
		this.start = this.start.bind(this)
		this.state = {
			score: 0,
			stopScoring: true
		}
	}

	start(){
		this.state.stopScoring = false
		const container = document.querySelector('#scoreContainer span')
		this.state.score = 1
		const counter = setInterval(()=> {
			this.state.score++
			container.innerText = this.state.score
			if(!!this.state.stopScoring){
				clearInterval(counter)
			}
		}, 100)
		console.log(this.state.score)
	}

	stop(){
		console.log('stopping score')
		this.state.stopScoring = true
	}

	

	render(){
		return `<div id="scoreContainer">Score: <span>${this.state.score}</span></div>`
	}
}