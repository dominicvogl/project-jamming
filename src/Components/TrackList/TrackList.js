import React from 'react';

import Track from '../Track/Track';
import './TrackList.css';

class TrackList extends React.Component {
   render() {

      console.log(this.props.tracks);

      return(
         <div className="TrackList">
            {
               this.props.tracks.map(function(track) {
                  return <Track onAdd={this.props.onAdd} key={'track_' + track.name} track={track} />;
               })
            }
         </div>
      );
   }

}

export default TrackList;