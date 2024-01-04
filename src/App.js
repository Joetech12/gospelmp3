import { useEffect, useRef, useState } from 'react';
//Adding Components
import Player from './components/Player';
import Song from './components/Song';
import Library from './components/musicLibrary/Library';
//Import styles
import './styles/app.scss';
//Import Util
import DotLoaderSpinner from './components/loaders/dotLoader';

import Nav from './components/Nav';
import { useMediaQuery } from 'react-responsive';
import useRedux from './utils/useRedux';

function App() {
  const { myState, dispatch, myActions } = useRedux();

  const { showPlaylist, isPlaying, songInfo, currentSong, songs } = myState;
  const { updateSongInfo, updateCurrentSong, toggleShowPlaylist } = myActions;

  console.log(myState);
  const [showSpinner, setShowSpinner] = useState(true);
  //   const isMobile = useMediaQuery({ query: '(max-width: 768px)' });
  const isLarge = useMediaQuery({ query: '(min-width: 769px)' });
  //Ref
  const audioRef = useRef(null);

  const timeUpdateHandler = (e) => {
    const current = e.target.currentTime;
    const duration = e.target.duration;
    const roundedCurrent = Math.round(current);
    const roundedDuration = Math.round(duration);
    const animation = Math.round((roundedCurrent / roundedDuration) * 100);

    dispatch(
      updateSongInfo({
        ...songInfo,
        currentTime: current,
        duration,
        animationPercentage: animation,
      })
    );
  };
  const songEndHandler = async () => {
    let currentIndex = songs.findIndex((song) => song.id === currentSong.id);
    await dispatch(updateCurrentSong(songs[(currentIndex + 1) % songs.length]));
    if (isPlaying) audioRef.current.play();
  };

  useEffect(() => {
    setTimeout(() => {
      setShowSpinner(false);
    }, 3000);

    if (isLarge) {
      dispatch(toggleShowPlaylist());
    }
  }, []);

  return (
    <div
      className={`App ${showPlaylist ? 'library-active' : ''}`}
      style={{ background: "url('/music_bg.jpg')", backgroundSize: 'cover' }}
    >
      {showSpinner && <DotLoaderSpinner loading={showSpinner} />}

      <Nav />
      <Song currentSong={currentSong} audioRef={audioRef} />
      <Player audioRef={audioRef} />
      <Library audioRef={audioRef} />
      <audio
        onTimeUpdate={timeUpdateHandler}
        onLoadedMetadata={timeUpdateHandler}
        ref={audioRef}
        src={currentSong.audio}
        onEnded={songEndHandler}
      />
    </div>
  );
}

export default App;

