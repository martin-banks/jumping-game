# Collision detection.
Two stages:
- First detect when in collision window
	- if true
		- calculate colision Y
		- calcualte obstacle X-left (enter)
		- calcualte obstacle X-right (exit)
		- calculate obstacle collision point 
		- calcualte collision point on player
		- compoare collions and evaluate 
	- if false
		- out of collision window


## Collision window
Co-ords are measured from top left reference 
player right edge = player X co-ord + player Width
obstacle left edge =  obstacle X co-ord

player bottom = player Y co-ord - player height
obstacle height

	IF (player right edge > obstacle left point) 
	& (player bottom < obstacle height)
		player is in obstacle window
		This would return a collision for square elements


## Player collision point
Assuming player is a circle

player center = player x co-ord + (player width / 2)

collision point = (X) * (Y)
collision point = (player right edge) * (player center point + player bottom)


## Obstacle collision point
Assumes obstacles are regular triangles
We need to calucalte the actual triangle edges not the square bounding area

Calculate left and right edges separately

### Left edge
obstacle height
obstacle width
center axis = obstacle width / 2

collision Y = player center height + player bottom

colision point from axis = (obstacle width / 2) - (collision Y / 2)

collision X left = 0 - collision point from axis
collision X right = 0 + collision point from axis


