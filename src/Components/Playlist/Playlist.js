import React from 'react';

import TrackList from '../TrackList/TrackList';

import './Playlist.css';

class Playlist extends React.Component {

   render() {
      return(
         <div className="Playlist">
            <input defaultValue={this.props.playlistName} />
            <TrackList onRemove={this.props.onRemove} tracks={this.props.playlistTracks} toRemove={true} />
            <a className="Playlist-save">Save to Spotify</a>
         </div>
      );
   }

}

export default Playlist;