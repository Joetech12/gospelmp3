import styles from './styles.module.scss';
import { useMediaQuery } from 'react-responsive';
import useRedux from '../../utils/useRedux';

const LibrarySong = ({ song, songs, id, audioRef, isPlaying }) => {
  const isMobile = useMediaQuery({ query: '(max-width: 768px)' });
  //   console.log(song);
  const { myState, dispatch, myActions } = useRedux();

  const { currentSong } = myState;
  const { updateCurrentSong, toggleShowPlaylist, updateSongs, setIsPlaying } =
    myActions;
  const songSelectHandler = async () => {
    // await setCurrentSong(song);
    await dispatch(updateCurrentSong(song));
    audioRef.current.play();

    dispatch(setIsPlaying(true));

    const newSongs = songs.map((song) => {
      if (song.id === id) {
        return {
          ...song,
          active: true,
        };
      } else {
        return {
          ...song,
          active: false,
        };
      }
    });

    if (isMobile) {
      await dispatch(toggleShowPlaylist());
    }

    // setSongs(newSongs);
    dispatch(updateSongs(newSongs));
    if (isPlaying) audioRef.current.play();
  };

  return (
    <div
      onClick={songSelectHandler}
      className={`${styles.library_song} ${
        song.active ? styles.selected : ''
      } ${song.audio === currentSong.audio ? styles.selected : ''}`}
    >
      <img alt={song.name} src={song.cover}></img>
      <div className={styles.song_description}>
        <h3>{song.name}</h3>
        <h4>{song.artist}</h4>
      </div>
    </div>
  );
};

export default LibrarySong;
