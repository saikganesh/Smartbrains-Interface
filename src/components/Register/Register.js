import React,{Component} from 'react';

class Register extends Component {
	constructor(){
		super();
		this.state ={
			name : '',
			email : '',
			password : ''
		}
	}
	onNameChange =(event)=>{
		this.setState({name : event.target.value},()=>{});
	}

	onEmailChange = (event)=>{
		this.setState({email : event.target.value},()=>{});
	} 

	onPasswordChange = (event)=>{
		this.setState({password : event.target.value},()=>{});
	}
	onSubmitButton=() =>{
		fetch("http://localhost:3000/register",{
			method : "post",
			headers : {'Content-Type' :'application/json'},
			body : JSON.stringify({
				name : this.state.name,
				email : this.state.email,
				password : this.state.password
			})
		}).then(resp => resp.json())
			.then(user =>{
				if(user.id){
					this.props.loadUser(user);
					this.props.onRouteChange("home")
				}
				else{
					alert("something went wrong");
				}
			})

	}

	render(){
		return(
			<article className="br3 ba dark-gray b--black-10 mv4 w-third center shadow-3">
			<main className="pa4 black-80 w-100">
			  <div className="measure">
			    <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
			      <legend className="f4 fw6 ph0 mh0">Sign Up</legend>
			      <div className="mt3">
			        <label className="db fw6 lh-copy f6" htmlFor="Name">Name</label>
			        <input onChange={this.onNameChange}className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="text" name="Name"  id="Name" />
			      </div>
			      <div className="mt3">
			        <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
			        <input onChange ={this.onEmailChange} className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="email" name="email-address"  id="email-address" />
			      </div>
			      <div className="mv3">
			        <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
			        <input onChange ={this.onPasswordChange}className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="password" name="password"  id="password" />
			      </div>
			    </fieldset>
			    <div className="">
			      <input onClick={this.onSubmitButton} 
			      			className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib w-30" type="submit" value="Sign Up" />
			    </div>
			  </div>
			</main>
		</article>
		);
	}
}

export default Register;