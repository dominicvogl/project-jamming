import React from 'react';
import User from '../User/User';
import './Header.css';

class Header extends React.Component {

    render() {
        return(
            <header>
                <h1>Ja<span className="highlight">mmm</span>ing</h1>
                <User userData={this.props.userData} />
            </header>
        )
    }

}

export default Header;