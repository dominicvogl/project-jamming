import React from 'react';

import Track from '../Track/Track';
import './TrackList.css';

class TrackList extends React.Component {

   render() {
      return(
         <div className="TrackList">
            {
               this.props.tracks.map(track => {
                  return <Track onAdd={this.props.onAdd} onRemove={this.props.onRemove} toRemove={this.props.toRemove} key={'track_' + track.id} track={track} />;
               })
            }
         </div>
      );
   }

}

export default TrackList;