import styles from './styles.module.scss';
import React from 'react';
import { IoPlaySkipBack, IoPlaySkipForward } from 'react-icons/io5';
import { BsPlayFill, BsPauseFill } from 'react-icons/bs';
import useRedux from '../../utils/useRedux';

const Player = ({ audioRef }) => {
  const { myState, dispatch, myActions } = useRedux();

  const { isPlaying, songInfo, currentSong, songs } = myState;
  const { updateSongInfo, updateCurrentSong, toggleIsPlaying, updateSongs } =
    myActions;

  const activeLibraryHandler = (nextPrev) => {
    const newSongs = songs.map((song) => {
      if (song.id === nextPrev.id) {
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
    dispatch(updateSongs(newSongs));
  };

  //Event Handlers
  const playSongHandler = () => {
    if (isPlaying) {
      audioRef.current.pause();
      dispatch(toggleIsPlaying());
    } else {
      audioRef.current.play();
      dispatch(toggleIsPlaying());
    }
  };

  const getTime = (time) => {
    return (
      Math.floor(time / 60) + ':' + ('0' + Math.floor(time % 60)).slice(-2)
    );
  };

  const dragHandler = (e) => {
    audioRef.current.currentTime = e.target.value;
    dispatch(updateSongInfo({ ...songInfo, currentTime: e.target.value }));
  };

  const skipTrackHandler = async (direction) => {
    let currentIndex = songs.findIndex((song) => song.id === currentSong.id);
    if (direction === 'skip-forward') {
      await dispatch(
        updateCurrentSong(songs[(currentIndex + 1) % songs.length])
      );
      activeLibraryHandler(songs[(currentIndex + 1) % songs.length]);
    }
    if (direction === 'skip-back') {
      if (currentIndex === 0) {
        await dispatch(updateCurrentSong(songs[songs.length - 1]));
        activeLibraryHandler(songs[songs.length - 1]);

        if (isPlaying) audioRef.current.play();
        return;
      }
      await dispatch(
        updateCurrentSong(songs[(currentIndex - 1) % songs.length])
      );

      activeLibraryHandler(songs[(currentIndex - 1) % songs.length]);
    }
    if (isPlaying) audioRef.current.play();
  };

  //Add the styles
  const trackAnim = {
    transform: `translateX(${songInfo.animationPercentage}%)`,
  };

  return (
    <div className={styles.player}>
      <div className={styles.time_control}>
        <p>{getTime(songInfo.currentTime)}</p>
        <div
          style={{
            background: `linear-gradient(to right, ${currentSong.color[0]},${currentSong.color[1]})`,
          }}
          className={styles.track}
        >
          <input
            min={0}
            max={songInfo.duration || 0}
            value={songInfo.currentTime}
            onChange={dragHandler}
            type="range"
          />
          <div style={trackAnim} className={styles.animate_track}></div>
        </div>
        <p>{songInfo.duration ? getTime(songInfo.duration) : '0:00'}</p>
      </div>
      <div className={styles.play_control}>
        <IoPlaySkipBack
          size="40px"
          onClick={() => skipTrackHandler('skip-back')}
        />

        <div className={styles.play_container}>
          {isPlaying ? (
            <BsPauseFill size="50px" onClick={() => playSongHandler()} />
          ) : (
            <BsPlayFill size="50px" onClick={() => playSongHandler()} />
          )}
        </div>

        <IoPlaySkipForward
          size="40px"
          onClick={() => skipTrackHandler('skip-forward')}
        />
      </div>
      {/* <button>Download</button> */}
      <div className={styles.copyright}>
        <p>
          © 2022 -{' '}
          <a
            href="https://www.ifeanyiumeh.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            Ifeanyi Umeh
          </a>
        </p>
      </div>
    </div>
  );
};

export default Player;
