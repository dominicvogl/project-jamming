import React from 'react';
import './User.css';

class User extends React.Component {

   /**
    * fallback if user has no name added
    * @returns user.id or user.name
    */

   getUserName(userData) {
      if(userData.id === 1337) {
         return 'You are not logged in ;-(';
      }
      if (userData.name == null) {
         return userData.id;
      }
      return userData.name;
   }

   /**
    * return user image url, when available
    * @param userImage
    * @returns {*}
    */

   getUserImage(userImage) {
      if(Array.isArray(userImage)) {
         return userImage[0].url;
      }
      return undefined;
   }

   /**
    * render user name and image if data is available
    * @param userData
    * @returns {*}
    */

   renderUserImage(userData) {
      if(userData.img) {
         return (
            <div className="User-image--wrapper">
               <img className="User-image" src={this.getUserImage(userData.img)} alt={this.getUserName(userData)}/>
            </div>
         )
      }
      else {
         return null;
      }
   }

   render() {
      return (
         <div id={this.props.userData.id} className="User">
            <span className="User-name">{this.getUserName(this.props.userData)}</span>
            {this.renderUserImage(this.props.userData)}
         </div>
      );
   }

}

export default User;
