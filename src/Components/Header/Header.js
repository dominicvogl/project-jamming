import React from 'react';
import User from '../User/User';
import './Header.css';

class Header extends React.Component {

    render() {
        return(
            <header>
                <div>
                    <h1>Ja<span className="highlight">mmm</span>ing</h1>
                </div>
                <div>
                    <User userData={this.props.userData} />
                </div>
            </header>
        )
    }

}

export default Header;