import { useDispatch, useSelector } from 'react-redux';
import {
  getSongConfigs,
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
} from '../redux/songSlice';

const useRedux = () => {
  const {
    showPlaylist,
    isPlaying,
    songs,
    showArtistMenu,
    songInfo,
    currentSong,
    artists,
    activeSong,
  } = useSelector(getSongConfigs);
  const dispatch = useDispatch();

  return {
    myState: {
      showPlaylist,
      isPlaying,
      songs,
      showArtistMenu,
      songInfo,
      currentSong,
      artists,
      activeSong,
    },
    myActions: {
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
    },
    dispatch,
  };
};

export default useRedux;
