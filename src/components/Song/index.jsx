import styles from './styles.module.scss';
import React from 'react';
import VolumeSlider from '../VolumeSlider';
import DotLoaderSpinner2 from '../loaders/dotLoader2';
import useRedux from '../../utils/useRedux';

const Song = ({ currentSong, audioRef }) => {
  const { myState } = useRedux();

  const { isPlaying, songInfo } = myState;

  //   const dragVolumeHandler = (e) => {
  //     audioRef.current.volume = e.target.value;
  //     dispatch(updateSongInfo({ ...songInfo, volume: e.target.value }));
  //   };

  const songReading = songInfo.duration > 0;

  return (
    <>
      <div className={styles.container}>
        <div className={styles.song_container}>
          <div
            className={`${styles.image_wrapper1} ${
              isPlaying && songReading && styles.spinner
            }`}
          >
            {!songReading && isPlaying && (
              <DotLoaderSpinner2 loading={!songReading} />
            )}
            <div className={styles.image_wrapper2}>
              <img
                alt={currentSong.name}
                src={currentSong.cover}
                className={styles.image}
              />
            </div>
          </div>
          <h2 style={{ textAlign: 'center' }}>{currentSong.name}</h2>
          <h3
            style={{ textAlign: 'center', fontWeight: '500', color: 'black' }}
          >
            {currentSong.feature}
          </h3>
          <a href={currentSong.audio}>
            <button className={styles.download_button}>Download Mp3</button>
          </a>
        </div>
        <VolumeSlider
          audioRef={audioRef}
          songInfo={songInfo}
          currentSong={currentSong}
          MAX={50}
        />
      </div>
    </>
  );
};

export default Song;
