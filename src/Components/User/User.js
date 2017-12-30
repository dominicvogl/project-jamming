import React from 'react';
import userDefaultIcon from './assets/user.svg';
import './User.css';

class User extends React.Component {

    render() {
        return(
            <div className="User">
                <span className="User-name">Annonymus</span>
                <img className="User-icon" src={userDefaultIcon} alt="Icon"/>
            </div>
        )
    }

}

export default User;