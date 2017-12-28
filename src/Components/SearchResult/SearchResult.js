import React from 'react';

import TrackList from '../TrackList/TrackList';
import './SearchResult.css';

class SearchResult extends React.Component {

    render() {
        return (
            <div className="SearchResults">
                <h2>Results</h2>
                <TrackList onAdd={this.props.onAdd} tracks={this.props.searchResults}/>
            </div>
        );
    }

}

export default SearchResult;