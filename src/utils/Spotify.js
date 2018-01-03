import {clientID, redirectURL} from "./client";

// global limit for results
const resultLimit = 15; // Limit responds to number (Min: 1 | Max 50)

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
      if (userAccessToken) {
         return userAccessToken;
      }

      userAccessToken = this.extract(window.location.href, /access_token=([^&]*)/, 1);

      // Case 2: Token already in url
      if (userAccessToken) {
         expiresIn = this.extract(window.location.href, /expires_in=([^&]*)/, 1);
         window.setTimeout(() => userAccessToken = '', expiresIn * 1000);
         window.history.pushState('Access Token', null, '/');

         return userAccessToken;
      }
      // Case 3: Authorizize and get token
      else {
         let state = 1337; // @TODO I think this value later should be generated with any hash, or?
         let scope = 'playlist-modify-public+playlist-modify-private';
         window.location = `${spotifyAuthorizationEndpont}?client_id=${clientID}&response_type=token&scope=${scope}&redirect_uri=${redirectURL}&state=${state}`;
      }
   },

   /**
    * extract parts from url and return matching
    * @param url
    * @param reg
    * @param pos
    * @returns {*}
    */

   extract(url, reg, pos) {
      let matching = url.match(reg);
      if (matching !== null) {
         return matching[pos];
      }
      return undefined;
   },


   /**
    * get authorization header
    * @returns {{Authorization: string}}
    */

   getAuthorizationHeader() {
      let token = this.getAccessToken();
      return {Authorization: `Bearer ${token}`};
   },

   /**
    * Check response from api
    * @param response
    * @param url
    * @returns {JSON | Promise<any> | *}
    */

   checkResponse(response, url) {

      // log only for debugging
      if (url) {
         console.group('Check Response');
         console.log('Request URL:');
         console.info(url);
         console.log('Response:');
         console.log(response);
         console.groupEnd();
      }

      // check if response is ok, return json
      if (response.ok) {
         return response.json();
      }
      throw new Error('Request failed!');
   },

   /**
    * get limit for results
    * @url https://developer.spotify.com/web-api/search-item/
    * @returns {number}
    */

   getLimit() {
      if (resultLimit > 0 || resultLimit <= 50) {
         return resultLimit;
      }
      return 20;
   },

   /**
    * get userdata for view login name
    * @returns {Promise<Response>}
    */

   getUserData() {
      const requestURL = `${spotifyAPIProfileMeEndpoint}`;
      const requestHeader = {headers: this.getAuthorizationHeader()};

      return fetch(requestURL, requestHeader)
         .then(response => this.checkResponse(response))
         .then(jsonResponse => {
            if (jsonResponse) {
               return {
                  id: jsonResponse.id,
                  name: jsonResponse.display_name,
                  img: jsonResponse.images[0].url
               }
            }
            else {
               return [];
            }
         })

   },

   /**
    * search for songs at Spotify
    * @param searchTerm
    * @returns {Promise<Response>}
    */

   search(searchTerm) {

      const urlWithKey = `${spotifyAPISearchEndpoint}?type=track&q=${searchTerm}&limit=${this.getLimit()}`;
      const requestHeader = {
         headers: this.getAuthorizationHeader()
      };

      return fetch(urlWithKey, requestHeader)
         .then(response => this.checkResponse(response))
         .then(jsonResponse => {
            if (jsonResponse.tracks) {
               return jsonResponse.tracks.items.map(track => {
                     return {
                        // Map tracking data
                        id: track.id,
                        name: track.name,
                        image: track.album.images[2].url,
                        duration: track.duration_ms,
                        popularity: track.popularity,
                        uri: track.uri,
                        album: track.album.name,
                        artist: track.artists[0].name
                     }
                  }
               )
            }
            else {
               return {};
            }
         });

   },

   /**
    * save Playlist to Spotify account
    * @url https://developer.spotify.com/web-api/create-playlist/
    * @param name
    * @param tracklist
    * @returns {Promise<Response>}
    */

   savePlaylist(name, tracklist) {
      if (!name || !tracklist || tracklist.length === 0)
         return;

      const requestURL = spotifyAPIProfileMeEndpoint;
      const requestHeader = {headers: this.getAuthorizationHeader()};

      return fetch(requestURL, requestHeader)
         .then(response => this.checkResponse(response))
         .then(jsonResponse => {
            let userID = jsonResponse.id;
            return this.createPlaylist(name, tracklist, userID);
         })

   },

   /**
    * create playlist
    * @url https://developer.spotify.com/web-api/create-playlist/
    * @param name
    * @param tracklist
    * @param userID
    * @returns {Promise<Response>}
    */

   createPlaylist(name, tracklist, userID) {
      const requestURL = `${spotifyAPIUsersEndpoint}${userID}/playlists`;
      const requestHeader = {
         method: 'POST',
         headers: this.getAuthorizationHeader(),
         body: JSON.stringify({
            name: name,
            public: false
         })
      };

      return fetch(requestURL, requestHeader)
         .then(response => this.checkResponse(response))
         .then(jsonResponse => {
            let playlistID = jsonResponse.id;
            return this.addTracksToPlaylist(userID, playlistID, tracklist);
         })
   },

   /**
    * add tracklist to playlist
    * @url https://developer.spotify.com/web-api/create-playlist/
    * @param userID
    * @param playlistID
    * @param tracklist
    * @returns {Promise<Response>}
    */

   addTracksToPlaylist(userID, playlistID, tracklist) {
      const requestURL = `${spotifyAPIUsersEndpoint}${userID}/playlists/${playlistID}/tracks`;
      const requestHeader = {
         method: 'POST',
         headers: this.getAuthorizationHeader(),
         body: JSON.stringify(tracklist)
      };

      return fetch(requestURL, requestHeader)
         .then(response => this.checkResponse(response))
         .then(jsonResponse => {
            return jsonResponse.snapshot_id;
         })
   }

};

export default Spotify;
