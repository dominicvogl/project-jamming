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
               name: 'Prototype',
               artist: "Eisbrecher",
               album: 'DHMW'
            },
            {
               name: 'Leider',
               artist: "Eisbrecher",
               album: 'Antikörper'
            },
            {
               name: 'Die Hölle muss warten',
               artist: "Eisbrecher",
               album: 'DHMW'
            }
         ]
      };
   }

   render() {
      return (
         <div>
            <h1>Ja<span className="highlight">mmm</span>ing</h1>
            <div className="App">
               <SearchBar/>
               <div className="App-playlist">
                  <SearchResults searchResults={this.state.searchResults}/>
                  <Playlist/>
               </div>
            </div>
         </div>
      );
   }
}

export default App;