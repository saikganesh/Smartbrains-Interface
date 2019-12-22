import React, {Component} from 'react';

class SignIn extends Component {
	constructor(){
		super();
		this.state ={
			signInEmail : '',
			signInPassword : '',
		}
	}

	onEmailChange = (event)=>{
		this.setState({signInEmail : event.target.value},()=>{});
	} 

	onPasswordChange = (event)=>{
		this.setState({signInPassword : event.target.value},()=>{});
	} 

	onSubmitButton=() =>{
		fetch("http://localhost:3000/signIn",{
			method : "post",
			headers : {'Content-Type' :'application/json'},
			body : JSON.stringify({
				email : this.state.signInEmail,
				password : this.state.signInPassword
			})
		}).then(resp => resp.json())
			.then(data => {
				if(data.id){
					this.props.loadUser(data);
					this.props.onRouteChange("home");
				}
				else{
					alert("wrong username or password");
				}
			});

	}

	render(){
		const {onRouteChange} = this.props;
		return(
			<article className="br3 ba dark-gray b--black-10 mv4 w-third center shadow-5">
			<main className="pa4 black-80 w-100">
			  <div className="measure">
			    <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
			      <legend className="f4 fw6 ph0 mh0">Sign In</legend>
			      <div className="mt3">
			        <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
			        <input onChange={this.onEmailChange} className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="email" name="email-address"  id="email-address" />
			      </div>
			      <div className="mv3">
			        <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
			        <input onChange={this.onPasswordChange} className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="password" name="password"  id="password" />
			      </div>
			    </fieldset>
			    <div className="">
			      <input onClick={this.onSubmitButton} 
			      			className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib w-30" type="submit" value="Sign in" />
			    </div>
			    <div className="lh-copy mt3">
			      <a href="#0" className="f6 link dim black db" onClick={() => onRouteChange("register")}>Register</a>
			    </div>
			  </div>
			</main>
		</article>
		);
	}
}

export default SignIn;