import React from 'react';
import TrackList from '../TrackList/TrackList';
import './Playlist.css';

class Playlist extends React.Component {

   constructor(props) {
      super(props);
      this.handleNameChange = this.handleNameChange.bind(this);
   }

   /**
    * handle playlist's name change
    * @param event
    */

   handleNameChange(event) {
      this.props.onNameChange(event.target.value);
   }

   /**
    * render all the stuff
    * @returns {*}
    */

   render() {
      return (
         <div className="Playlist">
            <input defaultValue={this.props.playlistName} onChange={this.handleNameChange}/>
            <TrackList onRemove={this.props.onRemove} tracks={this.props.playlistTracks} toRemove={true}/>
            <a className="Playlist-save" onClick={this.props.onSave}>Save to Spotify</a>
         </div>
      );
   }

}

export default Playlist;
