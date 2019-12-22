import React from 'react';

const Navigation =({onRouteChange ,isSignedIn}) =>{
		if(isSignedIn)
		{
			return(
			<nav style={{display: 'flex' ,justifyContent : 'flex-end'}}>
			<p className="f4 link dim ttu black underline pa3 pointer" 
				onClick={()=> onRouteChange("signIn")}>Sign out</p>
			</nav>
			);
		} 
		else{
			return(
				<nav style={{display: 'flex' ,justifyContent : 'flex-end'}}>
				<p className="f4 link dim ttu black underline pa3 pointer" 
				onClick={()=> onRouteChange("signIn")}>Sign in</p>
				<p className="f4 link dim ttu black underline pa3 pointer" 
				onClick={()=> onRouteChange("Register")}>Register</p>
				</nav>
			);
		}
}

export default Navigation; 