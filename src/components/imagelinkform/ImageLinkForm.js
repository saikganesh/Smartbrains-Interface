import React from 'react';
import './ImageLinkForm.css';

const ImageLinkForm =({onInputChange, onPictureSubmit,clearFields}) =>{
	return(
		<div>
			<p className="f4">Post a picture and this application will detect the faces</p>
			<div className="center">
				<div className = "pa4 br3 shadow-5 form">
					<input className="f4 pa2 w-70 center" type ="text" onChange={onInputChange} id="clear"/>
					<button className ="f6 w-30 link ph3 pv2 dib white bg-light navy ma2 ba pointer dim" type ="submit"
								onClick={onPictureSubmit}>DETECT</button> 
					
				</div>
			</div>
			
		</div>
	);
}

export default ImageLinkForm;