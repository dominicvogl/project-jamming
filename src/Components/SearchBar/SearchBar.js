import React from 'react';

import './SearchBar.css';

class SearchBar extends React.Component {

    constructor(props) {
        super(props);

        this.handleSearch = this.handleSearch.bind(this);
    }

    handleSearch(event) {
        this.props.onSearch(event.target.value);
    }

   render() {
      return (
         <div className="SearchBar">
            <input placeholder="Enter A Song, Album, or Artist" onChange={this.handleSearch} />
         </div>
      );
   }

}

export default SearchBar;