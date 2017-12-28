import React from 'react';

import './reset.css';
import './App.css';

import SearchBar from '../SearchBar/SearchBar';
import SearchResults from '../SearchResult/SearchResult';
import Playlist from '../Playlist/Playlist';

class App extends React.Component {

    constructor(props) {
        super(props);

        // define states for this class
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
                    id: 3,
                    name: 'Die Hölle muss warten',
                    artist: "Eisbrecher",
                    album: 'DHMW'
                }
            ]
        };

        // bind functions
        this.addTrack = this.addTrack.bind(this);
    }

    /**
     * Add Track to Playlist
     * @param track
     */

    addTrack(track) {
        if (this.state.playlistTracks.every(playlistTrack => playlistTrack.id !== track.id)) {
            let newPlaylist = this.state.playlistTracks.concat(track);
            this.setState({playlistTracks: newPlaylist});
        }
    }

    /**
     * Render all the stuff
     * @returns {*}
     */

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