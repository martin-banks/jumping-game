console.log('blah')
class SceneTemplate {
	constructor({}={}) {
		this.template = this.template.bind(this)
		this.playScene = this.playScene.bind(this)
		this.loadScene = this.loadScene.bind(this)
	}


	

	template (id){
		return `
			<div id='${id}' class="scene scene-loading">${this.loadScene()}</div>
		`
	}

	loadScene(){
		/* render random obstacles */
		return 'helo world'
	}


	playScene({id, startPos=100}={}){
		/* animate through to complete */
		let animStart = null
		let elem = document.getElementById(id)
		let start = startPos
		console.log(elem)
		let duration = 3000
		function step(timestamp) {
			if (!animStart) animStart = timestamp
			let progress = timestamp - animStart
			let increment = ()=> {
				let inc = progress/duration * 100
				if (start === 100){
					return 2 * inc
				} else if ( start === 0 ){
					duration = 1500
					return inc
				}
				
			}
			console.log(increment())
			
			/* do animation */
			elem.style.transform = `translate3d(${start - (increment())}%, 0, 0)`
			if(progress < duration){
				window.requestAnimationFrame(step)
			} else {
				elem.style.transform = `translate3d(${start}%,0,0)`
				animStart = null
				start = 100
				duration = 3000
				// comment out animation call to prevent infinite 
				// recursion until start/stop is in place
				//window.requestAnimationFrame(step)
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