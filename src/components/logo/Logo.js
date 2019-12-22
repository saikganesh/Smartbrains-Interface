import React from 'react';
import Tilt from 'react-tilt';
import brain from './brains.png';

const Logo =() =>{
	return(
		<div>
			<Tilt className="Tilt ma3 sh-3" options={{ max : 50 }} style={{ height: 120, width: 120 }} >
			 	<div className="Tilt-inner pa3"><img src ={brain} alt="brain"/></div>
			</Tilt>
		</div>
	)
}

export default Logo;