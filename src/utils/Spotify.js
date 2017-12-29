const clientID = '1fff999f2e7e425185c7351df392c57b';
const redirectURL = 'http://localhost:3000/';

let userAccessToken;

const Spotify = {

    getAccessToken() {
        // Case 1: User has token
        if(userAccessToken) {
            return userAccessToken;
        }

        let currentURL = window.location.href;
        userAccessToken = currentURL.match(/access_token=([^&]*)/);

        // Case 2: Token already in url
        if(userAccessToken) {
            let expires_in = currentURL.match(/expires_in=([^&]*)/);
            console.log(expires_in);

            window.setTimeout(() => userAccessToken = '', expires_in * 1000);
            window.history.pushState('Access Token', null, '/');
            return userAccessToken;
        }

        // Case 3: Authorizize and get token
        else {
            let state = 64984768;
            let authorizeURL = `https://accounts.spotify.com/authorize?client_id=${clientID}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirectURL}&state=${state}`;
            console.log(authorizeURL);
            window.location.href = authorizeURL;
        }
    }

};

export default Spotify;