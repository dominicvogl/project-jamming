import React from 'react';
import './Track.css';

class Track extends React.Component {
    constructor(props) {
        super(props);

        this.addTrack = this.addTrack.bind(this);
        this.removeTrack = this.removeTrack.bind(this);
    }

    renderAction(isRemoval) {
        if (isRemoval) {
            return (<a onClick={this.removeTrack} className="Track-action">-</a>);
        }
        return (<a onClick={this.addTrack} className="Track-action">+</a>);
    }

    addTrack() {
        this.props.onAdd(this.props.track);
    }

    removeTrack() {
        this.props.onRemove(this.props.track);
    }

    convertDurationTime(duration) {
        let minutes = Math.floor(duration / 1000 / 60);
        let seconds = ((duration % 60000) / 1000).toFixed(0);
        return minutes + ':' + (seconds < 10 ? '0' : '') + seconds;
    }

    render() {
        return (
            <div className="Track">
                <div className="Track-image">
                    <img src={this.props.track.image} alt={this.props.track.name} />
                </div>
                <div className="Track-information">
                    <h3>{this.props.track.name}</h3>
                    <p>{this.props.track.artist} | {this.props.track.album}</p>
                    <p>Duration: {this.convertDurationTime(this.props.track.duration)} | Rang: {this.props.track.popularity}</p>
                </div>
                {this.renderAction(this.props.toRemove)}
            </div>
        );
    }

}

export default Track;