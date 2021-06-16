/*global swal*/

import React, { useEffect } from 'react';
import logo from './logo.svg';
import loading from './loading.svg';
import './App.css';
import Sound from 'react-sound';
import Button from './Button';
import { useState } from 'react';

const apiToken =
  'BQDdtZO0iCRotdJieXAUEeZvFqvKrWrcIYy-9GLGIRZ0y93OsZUWJUsX2RU4o5VnnUL1k8nXCJ11VfFnM2h7k6yJgNVaczdrjuv5o6RXP6imoBCWDc_ZcB9Qd9BspRHkL7u-Roy79z6AP_GrOmA-nMMpjVmCIT6Z0djAfAGlMiqJ';

function shuffleArray(array) {
  let counter = array.length;

  while (counter > 0) {
    let index = getRandomNumber(counter);
    counter--;
    let temp = array[counter];
    array[counter] = array[index];
    array[index] = temp;
  }

  return array;
}

/* Return a random number between 0 included and x excluded */
function getRandomNumber(x) {
  return Math.floor(Math.random() * x);
}

const App = () => {
  const [text, setText] = useState('');
  const [tracks, settracks] = useState('');
  var [songsloaded, setsongsloaded] = useState(false);

  useEffect(() => {
    setText('Bonjour');
    fetch('https://api.spotify.com/v1/me/tracks', {
      method: 'GET',
      headers: {
        Authorization: 'Bearer ' + apiToken,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Réponse reçue ! Voilà ce que j'ai reçu : ", data);
        setsongsloaded(true);
        settracks(data.items);
      });
  }, []);

  useEffect(() => {
    console.log('Hello');
    console.log(text);
  }, [text]);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h1 className="App-title">
          <p>{text}</p>
        </h1>
      </header>
      {songsloaded ? (
        <>
          <div className="App-images">
            <p>J'ai trouvé {tracks.length} musiques.</p>
          </div>
          <div className="App-buttons"></div>
        </>
      ) : (
        <img src={loading} className="App-logo" alt="logo" />
      )}
    </div>
  );
};

export default App;
