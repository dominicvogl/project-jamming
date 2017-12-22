import React from 'react';

import TrackList from '../TrackList/TrackList';
import './SearchResult.css';

class SearchResult extends React.Component {

   render() {
     return (
        <div className="SearchResults">
           <h2>Results</h2>
           <TrackList />
        </div>
     );
   }

}

export default SearchResult;