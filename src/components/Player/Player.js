import React, {useRef, useCallback, useEffect, useState, memo} from 'react';
import videojs from 'video.js';
import 'videojs-contrib-eme';
import clsx from 'clsx';

import styles from './Player.module.css';

const Player = ({
  source,
  textTracks,
  onClosePlayer,
  onTrackingPlay,
  onTrackingPause,
  onTrackingSeek,
  onTrackingExit,
  onTrackingEnded,
}) => {
  const player = useRef(null);
  const videoNode = useRef(null);

  const isPlaying = useRef();
  const isSeeking = useRef();
  const previousTime = useRef(0);
  const currentTime = useRef(0);
  const seekStart = useRef(-1);
  const currentVolume = useRef();

  const [isUserActive, setIsUserActive] = useState(true);

  const setVideoSource = useCallback(() => {
    if (player.current && source) {
      player.current.src({
        src: source,
        type: 'video/mp4',
      });

      for (let i = 0; i < textTracks.length; i++) {
        player.current.addRemoteTextTrack(textTracks[i], false);
      }
    }
  }, [source, textTracks]);

  const addEventListeners = useCallback(() => {
    currentVolume.current = player.current.volume();

    player.current.on('useractive', () => {
      setIsUserActive(true);
    });

    player.current.on('userinactive', () => {
      setIsUserActive(false);
    });

    player.current.on('play', () => {
      if (!isSeeking.current) {
        onTrackingPlay();
      }

      isPlaying.current = true;
    });

    player.current.on('pause', () => {
      const mediaDuration = player.current.duration();

      if (!isSeeking.current && currentTime.current !== mediaDuration) {
        onTrackingPause();
      }

      isPlaying.current = false;
    });

    player.current.on('timeupdate', () => {
      previousTime.current = currentTime.current;
      currentTime.current = player.current.currentTime();
    });

    player.current.on('seeking', () => {
      if (seekStart.current === -1) {
        isSeeking.current = true;
        seekStart.current = previousTime.current;
      }
    });

    player.current.on('seeked', () => {
      onTrackingSeek(seekStart.current);

      isSeeking.current = false;
      seekStart.current = -1;
    });

    player.current.on('ended', () => {
      onTrackingEnded();
    });
  }, [onTrackingPlay, onTrackingPause, onTrackingSeek, onTrackingEnded]);

  const handleTogglePlay = useCallback(() => {
    if (isPlaying.current) {
      player.current.pause();
    } else {
      player.current.play();
    }
  }, []);

  const handleToggleFullscreen = useCallback(() => {
    // if native fullscreen is not supported
    if (!player.current.supportsFullScreen()) {
      if (player.current.isFullscreen()) {
        player.current.exitFullscreen();
      } else {
        player.current.requestFullscreen();
      }
    }
  }, []);

  const handleToggleMute = useCallback(() => {
    player.current.muted(!player.current.muted());
  }, []);

  const handleIncreaseVolume = useCallback(() => {
    if (currentVolume.current < 1) {
      currentVolume.current = currentVolume.current + 0.05;
      player.current.volume(currentVolume.current);
    }
  }, []);

  const handleDecreaseVolume = useCallback(() => {
    if (currentVolume.current > 0) {
      currentVolume.current = currentVolume.current - 0.05;
      player.current.volume(currentVolume.current);
    } else {
      currentVolume.current = 0;
      player.current.volume(currentVolume.current);
    }
  }, []);

  const handleForward = useCallback(() => {
    currentTime.current = player.current.currentTime() + 5;
    player.current.currentTime(currentTime.current);

    if (currentTime.current >= player.current.duration()) {
      currentTime.current = player.current.duration();
    }
  }, []);

  const handleBackward = useCallback(() => {
    currentTime.current = player.current.currentTime() - 5;
    player.current.currentTime(currentTime.current);

    if (currentTime.current <= 0) {
      currentTime.current = 0;
    } else {
      player.current.play();
      isPlaying.current = true;
    }
  }, []);

  const handleClosePlayer = useCallback(() => {
    const currentTime = player.current.currentTime();

    player.current.dispose();
    onTrackingExit(currentTime);
    onClosePlayer();
  }, [onClosePlayer, onTrackingExit]);

  const handleHotKeys = useCallback(
    (e) => {
      // space || k
      if (32 === e.which || 75 === e.which) {
        handleTogglePlay();
      }

      // f
      if (70 === e.which) {
        handleToggleFullscreen();
      }

      // m
      if (77 === e.which) {
        handleToggleMute();
      }

      // arrow up
      if (38 === e.which) {
        handleIncreaseVolume();
      }

      // arrow down
      if (40 === e.which) {
        handleDecreaseVolume();
      }

      // arrow left
      if (37 === e.which) {
        handleBackward();
      }

      // arrow right
      if (39 === e.which) {
        handleForward();
      }
    },
    [
      handleTogglePlay,
      handleToggleFullscreen,
      handleToggleMute,
      handleIncreaseVolume,
      handleDecreaseVolume,
      handleForward,
      handleBackward,
    ],
  );

  const createInstance = useCallback(() => {
    const videoJsOptions = {
      autoplay: true,
      controls: true,
      controlBar: {
        pictureInPictureToggle: false,
        volumePanel: {
          inline: false,
        },
      },
      userActions: {
        hotkeys: (e) => handleHotKeys(e),
      },
      fluid: true,
      responsive: true,
      aspectRatio: '16:9',
      preload: true,
      html5: {
        nativeCaptions: false,
        nativeTextTracks: false,
      },
      textTrackSettings: false,
    };

    player.current = videojs(videoNode.current, videoJsOptions, () => {
      setVideoSource();
      addEventListeners();
      player.current.addClass('vjs-custom');
    });
  }, [setVideoSource, addEventListeners, handleHotKeys]);

  useEffect(() => {
    createInstance();
  }, [createInstance]);

  return (
    <div className={styles.container}>
      <div
        className={clsx('vjs-dismiss-player-icon', {
          'vjs-dismiss-player-icon--hidden': !isUserActive,
        })}
        onClick={handleClosePlayer}
      />
      <video
        vjs-player="true"
        ref={videoNode}
        className="video-js vjs-big-play-centered"
      />
    </div>
  );
};

export default memo(Player);
