/*global swal*/

import React, { useEffect } from 'react';
import logo from './logo.svg';
import loading from './loading.svg';
import './App.css';
import Sound from 'react-sound';
import Button from './Button';
import { useState } from 'react';

const apiToken =
  'BQC1j1pHOnZD-cKHqkIH7wR0GwfuiFn2f68EXpkItgKusPlbSSt7e77EOdb-FDqugy2T__ccDF_t9a6v1AlpmOv2KAj1eakEWCCe7h-Y4T7XHzC9czScolwy5xrmqH67uiHILixgFV-MnatnecBcd9tGprS-GjWMwA0MxwQGtC6g';

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

const AlbumCover = (props) => {
  console.log(props);
  return <img src={props.tracks[0].track.album.images[1].url} />;
};

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
        settracks(data.items);
        setsongsloaded(true);
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
            <p>
              J'ai trouvé {tracks.length} musiques. La première est
              {tracks[0].track.name}.
            </p>
            <AlbumCover tracks={tracks} />
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
