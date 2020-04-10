import React from 'react';
import './App.css';
import SearchBar from '../SearchBar/SearchBar';
import SearchResults from '../SearchResults/SearchResults';
import Playlist from '../Playlist/Playlist';
import Spotify from '../../util/Spotify';
// import Logout from '../Logout/Logout';

class App extends React.Component {
  constructor(props){
    super(props);
//set an initial states
    this.state = {
      searchResults: [],
      playlistName: 'playlist',
      playlistTracks: []
    }
    //bind the methods that use state/setState to update the state
    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
    this.updatePlaylistName = this.updatePlaylistName.bind(this);
    this.savePlaylist = this.savePlaylist.bind(this);
    this.search = this.search.bind(this);
  }

  //method for adding song from the search results to the user's playlist
addTrack(track) {
  let tracks = this.state.playlistTracks;
  //check to see if song is already in playlistTracks state with track's id property
  if(tracks.find(savedTrack => savedTrack.id === track.id)) {
    //if it is then end the method
    return;
  }
    //if new then push the new song to the array
    tracks.push(track);
    //then set the state of the playlist to the tracks array of objects
    //where is tracks coming from??
    this.setState({playlistTracks: tracks});
    console.log(this.state.playlistTracks);
  }

  //method for removing song from user's playlist
  removeTrack(track) {
    let tracks = this.state.playlistTracks;
    //look through the playlistTracks for see if the song has a matching id
    //if it matches the function !== is a false statement and it will be filtered out.
    tracks = tracks.filter(currentTrack => currentTrack.id !== track.id);
//set the value of playlistTracks to the new filtered array, tracks
  this.setState({playlistTracks : tracks});
  }

  //method that allows users to change the name of their playlist
  updatePlaylistName(name){
    this.setState({playlistName: name});
  }

  //method for generating saving user's playlist to their Spotify account
  //and resets the state of playlistName and playlistTracks array
  savePlaylist(){
    //Spotify uses a property named uri to reference each song
    //loop through these uri values with .map and save them to a variable
    const trackUris = this.state.playlistTracks.map(track => track.uri);
    //pass in the savePlaylist method from Spotify.js and use a promise
    //to update the state of PlaylistName and PlaylistTracks
    Spotify.savePlaylist(this.state.playlistName, trackUris).then(() => {
      this.setState({
        playlistName: 'New Playlist',
        playlistTracks: []
      });
    });
  }

  //method that updates searchResults with the user's search results from the Spotify API
  search(term){
    //pass in the search method from Spotify.js and use a promise
    //to update the state of searchResults' to value result of the Spotify.search promise
    Spotify.search(term).then(searchResults => {
      this.setState({searchResults: searchResults});
      console.log(searchResults);
    });
  }
 

  render() {
  return (
<div>
<h1>Gr<span className="highlight">oo</span>ving</h1>
    <div className="App">
      {/* Pass all the methods down through the components */}
    
      <SearchResults className="App-playlist" searchResults={this.state.searchResults} onAdd={this.addTrack} />
      <SearchBar onSearch={this.search} />
      <Playlist className="App-playlist" playlistName={this.state.playlistName} playlistTracks={this.state.playlistTracks} 
        onRemove={this.removeTrack} onNameChange={this.updatePlaylistName} 
        onSave={this.savePlaylist}
        />
    
  </div>
</div>
    );
  }
}

export default App;
