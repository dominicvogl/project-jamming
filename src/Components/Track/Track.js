import React from 'react';
import './Track.css';

class Track extends React.Component {

   constructor(props) {
      super(props);

      this.addTrack = this.addTrack.bind(this);
      this.removeTrack = this.removeTrack.bind(this);
   }

   /**
    * Render the correct button for adding or removing buttons
    * @param isRemoval
    * @returns {*}
    */

   renderAction(isRemoval) {
      if (isRemoval) {
         return (<a onClick={this.removeTrack} className="Track-action">-</a>);
      }
      return (<a onClick={this.addTrack} className="Track-action">+</a>);
   }

   /**
    * add track to playlist
    */

   addTrack() {
      this.props.onAdd(this.props.track);
   }

   /**
    * remove track from playlist
    */

   removeTrack() {
      this.props.onRemove(this.props.track);
   }

   /**
    * convert duration from ms to normal timeformat of songtracks
    * @param duration
    * @returns {string}
    */

   convertDurationTime(duration) {
      let minutes = Math.floor(duration / 1000 / 60);
      let seconds = ((duration % 60000) / 1000).toFixed(0);
      return minutes + ':' + (seconds < 10 ? '0' : '') + seconds;
   }

   render() {
      return (
         <div className="Track">
            <div className="Track-image">
               {/* @Reviewer I added the song image here */}
               <img src={this.props.track.image} alt={this.props.track.name}/>
            </div>
            <div className="Track-information">
               <h3>{this.props.track.name}</h3>
               <p>{this.props.track.artist} | {this.props.track.album}</p>
               {/* @Reviewer I added some more information about the track here */}
               <p>Duration: {this.convertDurationTime(this.props.track.duration)} | Rang: {this.props.track.popularity}</p>
            </div>
            {this.renderAction(this.props.toRemove)}
         </div>
      );
   }

}

export default Track;
