// Spotify client id from my application
const clientID = '1fff999f2e7e425185c7351df392c57b';
// redirect url generated automatically for your current environment
const redirectURL = `${window.location.protocol}//${window.location.hostname}${(window.location.port !== undefined ? ':':'') + window.location.port}/`;
// global limit for results
const resultLimit = 10; // Limit responds to number (Min: 1 | Max 50)

// Define spotify endpoints
const spotifyAuthorizationEndpont = 'https://accounts.spotify.com/authorize';
const spotifyAPISearchEndpoint = 'https://api.spotify.com/v1/search';
const spotifyAPIProfileMeEndpoint = 'https://api.spotify.com/v1/me';
const spotifyAPIUsersEndpoint = 'https://api.spotify.com/v1/users/';

// Define global variables
let userAccessToken;
let expiresIn;

// Define Spotify functions
const Spotify = {

    /**
     * Returns token or redirect to spotify login
     * @returns {*}
     */

    getAccessToken() {
        // Case 1: User has token
        if(userAccessToken) {
            // console.log('Token active');
            return userAccessToken;
        }

        let currentURL = window.location.href;
        userAccessToken = this.extract(currentURL, /access_token=([^&]*)/, 1);

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

    checkResponse(response, url) {
        // for debugging
        if(url) {
            console.group('Check Response');
            console.log('Request URL:');
            console.info(url);
            console.log('Response:');
            console.log(response);
            console.groupEnd();
        }

        if(response.ok) {
            return response.json();
        }
        throw new Error('Request failed!');
    },

    getLimit() {
        if(resultLimit > 0 || resultLimit <= 50) {
            return resultLimit;
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
            .then(jsonResponse => {
                if (jsonResponse.tracks) {
                    return jsonResponse.tracks.items.map(track => {
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

    savePlaylist(name, tracklist) {
        if(!name || !tracklist || tracklist.length === 0)
            return;

        const requestURL = spotifyAPIProfileMeEndpoint;
        const headers = { headers: this.getAuthorizationHeader() };

        return fetch(requestURL, headers)
            .then(response => this.checkResponse(response))
            .then(jsonResponse => {
                let userID = jsonResponse.id;
                return this.createPlaylist(name, tracklist, userID);
            })

    },

    createPlaylist(name, tracklist, userID) {
        const requestURL = `${spotifyAPIUsersEndpoint}${userID}/playlists`;

        return fetch(requestURL, {
            method: 'POST',
            headers: this.getAuthorizationHeader(),
            body: JSON.stringify({
                name: name,
                public: false
            })
        })
            .then(response => this.checkResponse(response))
            .then(jsonResponse => {
                let playlistID = jsonResponse.id;
                return this.addTracksToPlaylist(userID, playlistID, tracklist);
            })
    },

    addTracksToPlaylist(userID, playlistID, tracklist) {
        const SpotifyApiAddPlaylistTracks = `${spotifyAPIUsersEndpoint}${userID}/playlists/${playlistID}/tracks`;

        return fetch(SpotifyApiAddPlaylistTracks, {
            method: 'POST',
            headers: this.getAuthorizationHeader(),
            body: JSON.stringify(tracklist)
        })
            .then(response => this.checkResponse(response))
            .then(jsonResponse => {
                return jsonResponse.snapshot_id;
            })
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