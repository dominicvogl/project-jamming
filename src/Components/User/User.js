import React from 'react';
import userDefaultIcon from './assets/user.svg';
import './User.css';

class User extends React.Component {

    render() {
        return(
            <div id={this.props.userData.id} className="User">
                <span className="User-name">{this.props.userData.name}</span>
                <img className="User-icon" src={userDefaultIcon} alt="Icon"/>
            </div>
        )
    }

}

export default User;