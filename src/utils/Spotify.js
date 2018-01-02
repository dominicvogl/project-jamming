const clientID = '1fff999f2e7e425185c7351df392c57b'; // Spotify client id from my application
const redirectURL = `${window.location.protocol}//${window.location.hostname}${(window.location.port !== undefined ? ':':'') + window.location.port}/`;
const requestLimit = 10; // Limit responds to number (Min: 1 | Max 50)

// Define spotify endpoints
const spotifyAuthorizationEndpont = 'https://accounts.spotify.com/authorize';
const spotifyAPISearchEndpoint = 'https://api.spotify.com/v1/search';
const spotifyAPIProfileMeEndpoint = 'https://api.spotify.com/v1/me';
const spotifyAPIUsersEndpoint = 'https://api.spotify.com/v1/users/';

let userAccessToken;
let expiresIn;

const Spotify = {

    _userID: 1337,

    getAccessToken() {
        // Case 1: User has token
        if(userAccessToken) {
            // console.log('Token active');
            return userAccessToken;
        }

        let currentURL = window.location.href;
        userAccessToken = this.extract(currentURL, /access_token=([^&]*)/, 1);
        console.log(userAccessToken);

        // Case 2: Token already in url
        if(userAccessToken) {
            expiresIn = this.extract(currentURL, /expires_in=([^&]*)/, 1);
            window.setTimeout(() => userAccessToken = '', expiresIn * 1000);
            window.history.pushState('Access Token', null, '/');
            return userAccessToken;
        }

        // Case 3: Authorizize and get token
        else {
            let state = 4321; // @TODO I think this value later should be generated with any hash, or?
            let authorizeURL = `${spotifyAuthorizationEndpont}?client_id=${clientID}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirectURL}&state=${state}`;
            window.location.href = authorizeURL;
        }
    },


    getAuthorizationHeader() {
        let token = this.getAccessToken();
        return {Authorization: `Bearer ${token}`};
    },

    checkResponse(response) {
        if(response.ok) {
            // console.log('Response okay');
            return response.json();
        }
        throw new Error('Request failed!');
    },

    getLimit() {
        if(requestLimit > 0 || requestLimit <= 50) {
            return requestLimit;
        }
        return 20;
    },

    getUserData() {

        let request = `${spotifyAPIProfileMeEndpoint}`;

        return fetch(request, {headers: this.getAuthorizationHeader()})
            .then(response => this.checkResponse(response))
            // .then(response => {console.log(response)})
            .then(jsonResponse => {
                if(jsonResponse) {
                    return {
                        id: jsonResponse.id,
                        name: jsonResponse.display_name
                    }
                }
                else {
                    return [];
                }
            })

    },

    search(searchTerm) {

        let urlWithKey = `${spotifyAPISearchEndpoint}?type=track&q=${searchTerm}&limit=${this.getLimit()}`;

        return fetch(urlWithKey, {
            headers: this.getAuthorizationHeader()
        })
            .then(response => this.checkResponse(response))
            // .then(response => {console.log(response)})
            .then(jsonResponse => {
                if (jsonResponse.tracks) {
                    return jsonResponse.tracks.items.map(track => {
                        // console.log(track);
                        return {
                            id: track.id,
                            name: track.name,
                            image: track.album.images[2].url,
                            duration: track.duration_ms,
                            popularity: track.popularity,
                            uri: track.uri,
                            album: track.album.name,
                            artist: track.artists[0].name
                        }}
                    )}
                else {
                    return [];
                }
            });

    },

    set userID(newID) {

        console.log('Test: ' + newID);

        if (typeof newID === 'string') {
            this._userID = newID;
        }
        else {
            console.log('Invalid input');
            return 'Invalid input';
        }
    },

    get userID() {
        return this._userID;
    },

    savePlaylist(name, tracklist) {
        if(name === 'undefined')
            return undefined;

        if(tracklist === 'undefined')
            return undefined;

        console.group('savePlaylist');
        this.getUserData().then(user => {
            this.userID = user.id;
            let requestURL = `${spotifyAPIUsersEndpoint}${user.id}/playlists`;
            console.log(requestURL);
        });
        console.log(this.userID);
        console.groupEnd();

    },

    extract(url, reg, pos) {
        let matching = url.match(reg);
        if(matching !== null) {
            return matching[pos];
        }
        return undefined;
    }

};

export default Spotify;