import styles from './styles.module.scss';
import useRedux from '../../utils/useRedux';

const ArtistMenu = () => {
  const { myState, dispatch, myActions } = useRedux();

  const { artists } = myState;
  const { setShowArtistMenu, filterArtist } = myActions;

  const filterHandle = (artist) => {
    dispatch(filterArtist(artist));
    dispatch(setShowArtistMenu(false));
  };

  return (
    <div className={styles.menu}>
      <ul>
        {artists.map((artist, i) => (
          <li
            key={i}
            onClick={() => {
              filterHandle(artist);
            }}
          >
            <span>{artist}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ArtistMenu;
