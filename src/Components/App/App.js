import React from 'react';

import './reset.css';
import './App.css';

import SearchBar from '../SearchBar/SearchBar';
import SearchResults from '../SearchResult/SearchResult';
import Playlist from '../Playlist/Playlist';

class App extends React.Component {
   constructor(props) {
      super(props);

      this.state = {
         searchResults: [
            {
               id: 1,
               name: 'Prototype',
               artist: "Eisbrecher",
               album: 'DHMW'
            },
            {
               id: 2,
               name: 'Leider',
               artist: "Eisbrecher",
               album: 'Antikörper'
            },
            {
               id: 3,
               name: 'Die Hölle muss warten',
               artist: "Eisbrecher",
               album: 'DHMW'
            }
         ],
         playlistName: 'Jamming List',
         playlistTracks: [
            {
               id: 2,
               name: 'Leider',
               artist: "Eisbrecher",
               album: 'Antikörper'
            },
            {
               id: 3,
               name: 'Die Hölle muss warten',
               artist: "Eisbrecher",
               album: 'DHMW'
            }
         ]
      };

      this.addTrack = this.addTrack.bind(this);
   }

   addTrack(track) {
      for(let i = 0; i < this.state.playlistTracks.length; i++) {
         console.log(i);
      }
   }

   render() {
      return (
         <div>
            <h1>Ja<span className="highlight">mmm</span>ing</h1>
            <div className="App">
               <SearchBar/>
               <div className="App-playlist">
                  <SearchResults onAdd={this.addTrack} searchResults={this.state.searchResults}/>
                  <Playlist playlistName={this.state.playlistName} playlistTracks={this.state.playlistTracks}/>
               </div>
            </div>
         </div>
      );
   }
}

export default App;