import React from 'react';

import './reset.css';
import './App.css';

import Header from '../Header/Header';
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
            userData: [],
            searchResults: [],
            playlistName: 'New Playlist',
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
        this.userData = this.userData.bind(this);
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

    userData() {
        // this.setState( {userData: Spotify.getUserData()} )

        if(Spotify.getUserData() !== undefined) {
            Spotify.getUserData().then(user => {
                console.log(user);
                this.setState( {userData: user } )
            })
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

        if(searchTerm !== '') {
            Spotify.search(searchTerm).then(tracks => {
                this.setState( {searchResults: tracks } )
            })
        }
        return undefined;

    }

    /**
     * Render all the stuff
     * @returns {*}
     */

    render() {

        return (
            <div>
                <Header />
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