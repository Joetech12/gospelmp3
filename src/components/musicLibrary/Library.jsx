import LibrarySong from './LibrarySong';
import { BiUserVoice } from 'react-icons/bi';
import ArtistMenu from '../ArtistMenu';
import styles from './styles.module.scss';
import { useMediaQuery } from 'react-responsive';
import useRedux from '../../utils/useRedux';

const Library = ({ audioRef }) => {
  const isMobile = useMediaQuery({ query: '(max-width: 768px)' });

  const { myState, dispatch, myActions } = useRedux();

  const { showPlaylist, isPlaying, songs, showArtistMenu } = myState;
  const { setShowArtistMenu } = myActions;

  return (
    <div
      className={`${styles.library} ${
        showPlaylist ? styles.active_library : ''
      }`}
      style={{ width: `${showPlaylist && isMobile ? '100%' : '20rem'}` }}
    >
      <div className={styles.library_header}>
        <h2>Trending</h2>
        <ul className={styles.artist_container}>
          <li
            className=""
            onMouseOver={() => dispatch(setShowArtistMenu(true))}
            onMouseLeave={() => dispatch(setShowArtistMenu(false))}
          >
            <button className={styles.artist_button}>
              <span>Artists</span>
              <BiUserVoice />
            </button>
            {showArtistMenu && <ArtistMenu />}
          </li>
        </ul>
      </div>
      <div className="">
        {songs.map((song) => (
          <LibrarySong
            songs={songs}
            song={song}
            id={song.id}
            key={song.id}
            audioRef={audioRef}
            isPlaying={isPlaying}
          />
        ))}
      </div>
    </div>
  );
};

export default Library;
