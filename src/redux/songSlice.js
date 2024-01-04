import { createSlice } from '@reduxjs/toolkit';
import { songList } from '../utils/songData';

const allArtist = [
  'All',
  ...new Set(
    songList
      .map((song) => song.artist)
      .sort((a, b) => {
        return a - b;
      })
  ),
];

function getRandomNumber(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

const randomSong = songList[getRandomNumber(0, songList.length - 1)];

const initialState = {
  songs: songList,
  isPlaying: false,
  songInfo: {
    currentTime: 0,
    duration: 0,
    animationPercentage: 0,
  },
  currentSong: randomSong,
  showPlaylist: false,
  showArtistMenu: false,
  artists: allArtist,
  activeSong: {},
};

export const songSlice = createSlice({
  name: 'song',
  initialState,
  reducers: {
    updateSongs: (state, action) => {
      state.songs = action.payload;
    },
    updateSongInfo: (state, action) => {
      state.songInfo = action.payload;
    },
    updateCurrentSong: (state, action) => {
      state.currentSong = action.payload;
    },
    toggleIsPlaying: (state, action) => {
      state.isPlaying = !state.isPlaying;
    },
    toggleShowPlaylist: (state, action) => {
      state.showPlaylist = !state.showPlaylist;
    },
    setShowPlaylist: (state, action) => {
      state.showPlaylist = action.payload;
    },
    setShowArtistMenu: (state, action) => {
      state.showArtistMenu = action.payload;
    },
    setActiveSong: (state, action) => {
      state.activeSong = action.payload;
    },
    setIsPlaying: (state, action) => {
      state.isPlaying = action.payload;
    },
    filterArtist: (state, action) => {
      if (action.payload === 'All') {
        state.songs = songList;
        return;
      }
      const newSongs = songList.filter(
        (song) => song.artist === action.payload
      );
      state.songs = newSongs;
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  updateSongInfo,
  updateCurrentSong,
  toggleIsPlaying,
  toggleShowPlaylist,
  setShowArtistMenu,
  updateSongs,
  setIsPlaying,
  filterArtist,
  setShowPlaylist,
  setActiveSong,
} = songSlice.actions;

export const getSongConfigs = (state) => state.song;

export default songSlice.reducer;
