import React, { Component } from 'react';
import Navigation from './components/navigation/Navigation';
import Logo from './components/logo/Logo';
import ImageLinkForm from './components/imagelinkform/ImageLinkForm';
import Rank from './components/Rank/Rank';
import FaceRecognition from './components/facerecognition/FaceRecognition';
import SignIn from './components/SignIn/SignIn';
import Register from './components/Register/Register';
import './App.css';
import Particles from 'react-particles-js';

const particlesOptions={
   particles: {
      number:{
         value:80,
         density: {
            enable:true,
            value_area:800
         }
      },
      shape: {
         type: "circle",
         stroke: {
            width: 0,
            color: "#000000"
         },
         polygon: {
            nb_sides: 5
         }
      },
      color: {
         value: "#ffffff"
      },
      opacity:{
         value: 1,
         random: false,
         anim: {
            enable: false,
            speed: 1,
            opacity_min: 1,
            sync: true
         }
      },
   },
};

const initialstate = {
      input :'' ,
      imageUrl :'',
      box :{} ,
      route : "signIn",
      isSignedIn : false,
      user :{
        id : "",
        name : "",
        email : "",
        password : "",
        entries : 0,
        joined : ""
      }
    }

class App extends Component {
  
  constructor(){
    super();
    this.state = initialstate
  }

  loadUser = (data) =>{
    const {id,name,email,password,entries,joined} = data
    this.setState({
      user : {
        id : id,
        name : name,
        email : email,
        password : password,
        entries : entries,
        joined : joined
      }
    },()=>{});
  }

  onInputChange =(event)=>{
    this.setState({input: event.target.value}, () => {});
  }

  onRouteChange =(route)=> {
    if(route=== "signIn"){
      this.setState(initialstate, () =>{});
    }
    else if(route=== "home") {
      this.setState({isSignedIn : true}, () =>{});
    }
    this.setState({route : route}, () =>{});
  }


  calculateFaceLocation =(data) =>{
      const face = data.outputs[0].data.regions[0].region_info.bounding_box;
      const image = document.getElementById("inputImage");
      const width = image.width;
      const height = image.height;
      return {
        leftcol : face.left_col * width,
        rightcol : width - ( face.right_col * width),
        toprow : face.top_row * height,
        botrow : height - (face.bottom_row * height)
      }
  }

  displayFaceBox =(box) => {
    this.setState({box: box}, () =>{});
  }

  
  onPictureSubmit = ()=>{
    this.setState({imageUrl: this.state.input}, () => {
        fetch("http://localhost:3000/imageurl",{
              method : "post",
              headers : {'Content-Type' :'application/json'},
              body : JSON.stringify({
                input : this.state.input
              })
        })
        .then(response => response.json())
        .then(response  => {
          if(response){
            fetch("http://localhost:3000/image",{
              method : "put",
              headers : {'Content-Type' :'application/json'},
              body : JSON.stringify({
                id : this.state.user.id
              })
            }).then(resp => resp.json()).then(count =>{
              this.setState(Object.assign(this.state.user,{entries : count}))
            })
          }
        this.displayFaceBox(this.calculateFaceLocation(response))
      }).catch(err => console.log(err))
    });
  }

  // clearFields= () => {
  //   document.getElementById("clear").value = "";
  //   document.getElementById("inputImage").remove();

  // }

  render() {
    const {imageUrl,box,route,isSignedIn} = this.state;
    return (
      <div className="App">
        <Particles params={particlesOptions} className="particles"/>
        <Navigation onRouteChange={this.onRouteChange} isSignedIn={isSignedIn}/>
        { this.state.route === "home" ? 
        <div>
          <Logo />
          <Rank name ={this.state.user.name} entries ={this.state.user.entries}/>
          <ImageLinkForm onInputChange={this.onInputChange} onPictureSubmit={this.onPictureSubmit} clearFields={this.clearFields}/>
          <FaceRecognition imageUrl={imageUrl} box={box}/>
         </div> :  (route ==="signIn" ? <SignIn onRouteChange={this.onRouteChange} loadUser={this.loadUser}/>
                                                : <Register onRouteChange={this.onRouteChange} loadUser={this.loadUser}/>)
        }
      </div>
    );
  }
}

export default App;