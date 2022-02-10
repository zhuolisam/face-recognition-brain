import React, { useState } from 'react';
import Particles from 'react-tsparticles';
import FaceRecognition from './Components/FaceRecognition/FaceRecognition';
import Navigation from './Components/Navigation/Navigation';
import Logo from './Components/Logo/Logo.js';
import ImageLinkForm from './Components/ImageLinkForm/ImageLinkForm';
import Signin from './Components/Signin';
import Register from './Components/Register';
import Rank from './Components/Rank';
import './App.css';

const particlesOptions = {
  "particles": {
    "number": {
      "value": 80,
      "density": {
        "enable": true,
        "value_area": 800
      }
    },
    "shape": {
      "type": "circle",
      "stroke": {
        "width": 0,
        "color": "#000000"
      },
      "polygon": {
        "nb_sides": 5
      }
    },
    "opacity": {
      "value": 0,
    },
    "line_linked": {
      "enable": true,
      "distance": 150,
      "color": "#ffffff",
      "opacity": 0.4,
      "width": 1
    },
    "move": {
      "enable": true,
      "speed": 3,
    }
  },
  "interactivity": {
    "detect_on": "canvas",
    "events": {
      "onhover": {
        "enable": false,
        "mode": "repulse"
      },
      "resize": true
    }
  }
}


function App() {
  const [imageUrl, setImageUrl] = useState('');
  const [input, setInput] = useState('');
  const [user, setUser] = useState({
    id: '',
    name: '',
    email: '',
    entries: 0,
    joined: ''
  });
  const [route, setRoute] = useState('signin');
  const [box, setBox] = useState({});

  const calculateFaceLocation = (data) => {
    console.log('calculateFaceIsTriggered');
    const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box;
    const image = document.getElementById('inputimage');
    const width = Number(image.width);
    const height = Number(image.height);
    return {
      leftCol: clarifaiFace.left_col * width,
      topRow: clarifaiFace.top_row * height,
      rightCol: width - (clarifaiFace.right_col * width),
      bottomRow: height - (clarifaiFace.bottom_row * height)
    }
  }

  const loadUser = (user) => {
    setUser({
      id: user.id,
      name: user.name,
      email: user.email,
      entries: user.entries,
      joined: user.joined
    })
  }

  const onButtonSubmit = () => {
    setImageUrl(input);
    fetch('https://rocky-meadow-29133.herokuapp.com/imageurl', {
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        input: imageUrl
      })
    })
      .then(response => response.json())
      .then(response => {
        if (input) {
          fetch('https://rocky-meadow-29133.herokuapp.com/image', {
            method: 'put',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              id: user.id
            })
          })
            .then(res => res.json())
            .then(count => {
              setUser({
                ...user,
                entries: count
              })
            })
            .catch(err => console.log(err))
        }
        setBox(calculateFaceLocation(response));
      })
      .catch(err => console.log(err));
  }


  return (
    <div className="App">
      <Particles classname='particles' params={particlesOptions} />
      <Navigation route={route} onRouteChange={setRoute} />
      <Logo />
      {
        route === 'home'
          ?
          <div>
            <Rank name={user.name} entries={user.entries} />
            <ImageLinkForm onInputChange={setInput} onButtonSubmit={onButtonSubmit} />
            <FaceRecognition imageUrl={imageUrl} box={box} />
          </div>
          : (
            route === 'signin'
              ?
              <Signin onRouteChange={setRoute} loadUser={loadUser} />
              :
              <Register onRouteChange={setRoute} loadUser={loadUser} />
          )
      }
    </div>
  );
}

export default App;