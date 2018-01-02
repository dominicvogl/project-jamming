import React from 'react';

import './SearchBar.css';

class SearchBar extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            searchTerm: ''
        };
        this.handleTermChange = this.handleTermChange.bind(this);
        this.search = this.search.bind(this);
    }

    /**
     * Handle the searchterm change
     * @param event
     */

    handleTermChange(event) {
        // Use this to search on onChange event
        this.props.onSearch(event.target.value);

        // @Reviewer
        // save searchterm to state if you want to use search on click
        // this.setState({searchTerm: event.target.value});
    }

    /**
     * Search with searchTerm from state
     */

    search() {
        this.props.onSearch(this.state.searchTerm);
    }

    render() {
        return (
            <div className="SearchBar">
                <input onChange={this.handleTermChange} placeholder="Enter A Song, Album, or Artist"/>
                { /*
                    @Reviewer
                    This button is not necessary if you search on entering input
                    <a className="SearchBar--Button" onClick={this.search}>Search</a>
                */ }
            </div>
        );
    }

}

export default SearchBar;