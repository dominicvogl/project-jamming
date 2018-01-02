import React from 'react';
import './User.css';

class User extends React.Component {

    render() {
        return(
            <div id={this.props.userData.id} className="User">
                <span className="User-name">Your are logged in as: {this.props.userData.name}</span>
                {/*
                @Reviewer maybe for later use:
                <svg className="User-icon" viewBox="0 0 34 34">
                    <g>
                        <path d="M17,15.5c4,0,7.2-3.3,7.2-7.2S21,1,17,1S9.8,4.3,9.8,8.2S13,15.5,17,15.5z M17,3c2.9,0,5.2,2.4,5.2,5.2s-2.4,5.2-5.2,5.2s-5.2-2.4-5.2-5.2S14.1,3,17,3z"/>
                        <path d="M17,16C9.6,16,3.5,23.2,3.5,32v1h27v-1C30.5,23.2,24.4,16,17,16z M5.5,31C6,23.7,10.9,18,17,18s11,5.7,11.5,13H5.5z"/>
                    </g>
                </svg>
                */}
            </div>
        )
    }

}

export default User;