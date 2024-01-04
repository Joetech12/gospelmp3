import styles from './styles.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMusic } from '@fortawesome/free-solid-svg-icons';
import useRedux from '../../utils/useRedux';

const Nav = () => {
  const { myState, dispatch, myActions } = useRedux();

  const { showPlaylist } = myState;
  const { toggleShowPlaylist } = myActions;

  return (
    <nav className="">
      <div className={styles.logotext}>
        <div className={styles.logo_container}>
          <img src="/gospel_mp3_logo.png" alt="" />
        </div>
        <span>v2.01</span>
      </div>

      <button onClick={() => dispatch(toggleShowPlaylist())}>
        {showPlaylist ? <span>Hide</span> : <span>Show</span>}
        <span>Playlist</span>
        <FontAwesomeIcon icon={faMusic} />
      </button>
    </nav>
  );
};

export default Nav;
