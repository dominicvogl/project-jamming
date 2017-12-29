import React from 'react';

import './reset.css';
import './App.css';

import SearchBar from '../SearchBar/SearchBar';
import SearchResults from '../SearchResult/SearchResult';
import Playlist from '../Playlist/Playlist';
import Spotify from '../../utils/Spotify';

class App extends React.Component {

    /**
     * Construct the app ;-)
     * @param props
     */

    constructor(props) {
        super(props);

        // define states for this class
        this.state = {
            searchResults: [
                {
                    id: 1,
                    name: 'Prototype',
                    artist: "Eisbrecher",
                    album: 'DHMW',
                    uri: 'https://open.spotify.com/track/1enjOqKkJHbdqDtGtKuYW5'
                },
                {
                    id: 2,
                    name: 'Leider',
                    artist: "Eisbrecher",
                    album: 'Antikörper',
                    uri: 'https://open.spotify.com/track/1enjOqKkJHbdqDtGtKuYW5'
                },
                {
                    id: 3,
                    name: 'Die Hölle muss warten',
                    artist: "Eisbrecher",
                    album: 'DHMW',
                    uri: 'https://open.spotify.com/track/1enjOqKkJHbdqDtGtKuYW5'
                },
                {
                    id: 4,
                    name: 'Killing in the name',
                    artist: "Rage against the machines",
                    album: 'Rage against the machines',
                    uri: 'https://open.spotify.com/track/1enjOqKkJHbdqDtGtKuYW5'
                },
                {
                    id: 5,
                    name: 'Sweet Dreams',
                    artist: "Marilyn Manson",
                    album: 'Smells like Children',
                    uri: 'https://open.spotify.com/track/1enjOqKkJHbdqDtGtKuYW5'
                }
            ],
            playlistName: 'Jammming List',
            playlistTracks: [
                {
                    id: 3,
                    name: 'Die Hölle muss warten',
                    artist: "Eisbrecher",
                    album: 'DHMW',
                    uri: 'https://open.spotify.com/track/1enjOqKkJHbdqDtGtKuYW5'
                }
            ]
        };

        // bind functions
        this.addTrack = this.addTrack.bind(this);
        this.removeTrack = this.removeTrack.bind(this);
        this.updatePlaylistName = this.updatePlaylistName.bind(this);
        this.savePlaylist = this.savePlaylist.bind(this);
        this.search = this.search.bind(this);
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
     * Remove track from Playlist
     * @param track
     */

    removeTrack(track) {
        let newPlaylist = this.state.playlistTracks.filter(playlistTrack => playlistTrack.id !== track.id);
        this.setState( {playlistTracks: newPlaylist} );
    }

    /**
     * Update the Playlistname
     * @param name
     */

    updatePlaylistName(name) {
        this.setState( {playlistName: name} );
    }

    /**
     * save the playlist to your spotify account
     */

    savePlaylist() {
        let trackURIs = this.state.playlistTracks.map(singleTrack => singleTrack.uri);
        console.log(trackURIs);
    }

    /**
     * Search for music on Spotify
     * @param searchTerm
     */

    search(searchTerm) {
        console.log(searchTerm);
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
                    <SearchBar onSearch={this.search}/>
                    <div className="App-playlist">
                        <SearchResults onAdd={this.addTrack} searchResults={this.state.searchResults}/>
                        <Playlist playlistName={this.state.playlistName} onNameChange={this.updatePlaylistName} onSave={this.savePlaylist} playlistTracks={this.state.playlistTracks} onRemove={this.removeTrack}/>
                    </div>
                </div>
            </div>
        );
    }
}

export default App;