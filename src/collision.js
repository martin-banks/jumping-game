class Collision {
	constructor(stopGame){
		this.window = this.window.bind(this)
		this.check = this.check.bind(this)
		this.point = this.point.bind(this)
		this.stopGame = stopGame
	}

	window(){
		let {player, obstacles} = game
		/* check if the player is in a collision window */
		/* this should also work for suare detection */
		//let horizontal = (player.centerPoint + (player.radius * 2)) > obstacle.position.x ? true : false
		//console.info('checking collision')
		for (const scene in obstacles) {
			
			for (const obstacle of obstacles[scene]) {
				/*console.log('obstacle', obstacle)*/
				let horizontal = ()=> {
					/*console.log(scene, obstacle, '\n',
						player.position.x2, obstacle.x, game.scenePosition[scene].x ,
						'\n', player.position.x1, obstacle.x + obstacle.width + game.scenePosition[scene].x)*/
					if( (player.position.x2 > (obstacle.x + game.scenePosition[scene].x)) && (player.position.x1 < (obstacle.x + obstacle.width + game.scenePosition[scene].x)) ){
						return true
					} else {
						return false
					}	
				}
				let vertical = ()=> player.position.y2 < obstacle.height ? true : false
				//console.log(horizontal, vertical)
				if( horizontal() && vertical() ){
					this.stopGame()
					//return true
				} else {
					document.querySelector('#app').style.backgroundColor = ''
					//return false
				}
			}
			
		}
		
	}

	obstacle(){
		let anglePoint = (obstacle.width / 2) 
	}

	point(){
		return {
			player: null,
			obstacle: null
		}
	}
	check(){

	}
}