import React from 'react';
import './FaceRecognition.css';

const FaceRecognition =({imageUrl,box})=>{
	return(
		<div className="ma2 pa4 center"> 
			<div className="absolute mb2">
				<img className="shadow-3" id="inputImage" alt='' src={imageUrl} />
				<div className="boundingBox" style={{top : box.toprow , left : box.leftcol , right : box.rightcol,
														bottom : box.botrow}}></div>
			</div>
		</div>
	);
}

export default FaceRecognition;