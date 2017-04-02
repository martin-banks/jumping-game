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
				let playerRightEdge = player.position.x2
				let playerLeftEdge = player.position.x1
				let obstacleLeftEdge = obstacle.x + game.scenePosition[scene].x
				let obstacleRightEdge = obstacle.x + obstacle.width + game.scenePosition[scene].x
				let obstacleCenterAxis = obstacleLeftEdge + (obstacle.width / 2)
				let playerCenterX = playerLeftEdge + player.radius
				let playerCenterY = player.position.y2 + player.radius
				const inHorizontal = ()=> {
					if( (playerRightEdge > obstacleLeftEdge) && (playerLeftEdge < obstacleRightEdge) ) {
						return true
					} else {
						return false
					}	
				}
				const inVertical = ()=> player.position.y2 < obstacle.height ? true : false
				
				if( inHorizontal() && inVertical() ){
					/* in colision window */
					let obstacleCollisionFromAxis = (obstacle.width / 2) - ((playerCenterY + player.position.y2) / 2)
					let pcY = (playerCenterY/obstacle.height) * playerCenterY
					let leftoffset = ((obstacle.width/2) / obstacle.height) * playerCenterY
					let obstacleIntersectLeft = obstacleLeftEdge + ( leftoffset )
					let obstacleIntersectRight = obstacleRightEdge - ( leftoffset )

					let playerPointX = ()=> {
						if(playerCenterX > obstacleCenterAxis){
							return playerCenterX - (player.radius)
						} else {
							return playerCenterX + (player.radius)
						}
						
					}
					let playerPointY = ()=> {
						console.log(playerCenterY, obstacle.height)
						if(playerCenterY > obstacle.height){
							return 300 - player.position.y2
						} else {
							return 300 - playerCenterY	
						}	
					}
					document.querySelector('.collisionContainer').innerHTML = `
						<div class="obstacleCollide" style="left: ${playerCenterX < obstacleCenterAxis ? obstacleIntersectLeft: obstacleIntersectRight}px; top: ${300 - playerCenterY}px;"></div>
						<div class="playerCollide" style="left: ${playerPointX()}px; top: ${playerPointY()}px;"></div>
					`
					if(playerCenterX > obstacleCenterAxis){
						if(playerPointX() < obstacleIntersectRight){
							this.stopGame()
						}
					} else {
						if(playerPointX() > obstacleIntersectLeft){
							this.stopGame()
						}
					}
					
				
				} else {
					/* outside of collision window */
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