import React, {useCallback, useRef} from 'react';
import {Button, Layout} from 'antd';
import {PlayCircleOutlined} from '@ant-design/icons';

import ga, {gaCategories, gaEvents} from '../../helpers/ga';

import useToggle from '../../hooks/useToggle';

import Player from '../../components/Player';
import Hero from '../../components/Hero';

import styles from './Video.module.css';

const Video = () => {
  const toggleShowPlayer = useToggle();

  const isResume = useRef(false);

  const {Content} = Layout;

  const handleOpenPlayer = useCallback(() => {
    toggleShowPlayer.setActive();
  }, [toggleShowPlayer]);

  const handleClosePlayer = useCallback(() => {
    toggleShowPlayer.setInActive();
  }, [toggleShowPlayer]);

  const handleTrackingPlay = useCallback(() => {
    ga.trackEvent(
      gaCategories.MEDIA_PLAYBACK,
      gaEvents.mediaPlayback.MEDIA_LAUNCH,
      {
        ContentID: 'oigiXW6XyCQ',
        Title: 'Một Triệu Like',
      },
    );
  }, []);

  const handleTrackingPause = useCallback(() => {
    ga.trackEvent(
      gaCategories.MEDIA_PLAYBACK,
      gaEvents.mediaPlayback.MEDIA_PAUSE,
      {
        ContentID: 'oigiXW6XyCQ',
        Title: 'Một Triệu Like',
      },
    );
  }, []);

  const handleTrackingSeek = useCallback((elapsedTime) => {
    if (isResume.current) {
      isResume.current = false;
    } else {
      ga.trackEvent(
        gaCategories.MEDIA_PLAYBACK,
        gaEvents.mediaPlayback.MEDIA_SEEK,
        {
          ContentID: 'oigiXW6XyCQ',
          Title: 'Một Triệu Like',
          ElapsedTime: elapsedTime,
        },
      );
    }
  }, []);

  const handleTrackingExit = useCallback((elapsedTime) => {
    ga.trackEvent(
      gaCategories.MEDIA_PLAYBACK,
      gaEvents.mediaPlayback.MEDIA_EXIT,
      {
        ContentID: 'oigiXW6XyCQ',
        Title: 'Một Triệu Like',
        ElapsedTime: elapsedTime,
      },
    );
  }, []);

  const handleTrackingEnded = useCallback(() => {
    ga.trackEvent(
      gaCategories.MEDIA_PLAYBACK,
      gaEvents.mediaPlayback.MEDIA_ENDED,
      {
        ContentID: 'oigiXW6XyCQ',
        Title: 'Một Triệu Like',
      },
    );
  }, []);

  return (
    <Content>
      <Hero
        options={{
          backgroundColor: '#020204',
          backgroundImage: '/assets/den-vau.jpg',
        }}
      >
        <div className={styles.playerContainer}>
          <Button
            type="default"
            shape="circle"
            icon={<PlayCircleOutlined />}
            onClick={handleOpenPlayer}
          />
        </div>
      </Hero>

      {toggleShowPlayer.active && (
        <Player
          onClosePlayer={handleClosePlayer}
          source="https://drive.google.com/u/0/uc?id=1TCe8ArwpNSQeO1OuFDEJXcGRGnxijcl6&export=download"
          textTracks={[
            {
              label: 'en-US',
              kind: 'captions',
              srclang: 'en',
              src: '/assets/mot-trieu-like--english.vtt',
            },
            {
              label: 'vi-VN',
              kind: 'captions',
              srclang: 'vi',
              src: '/assets/mot-trieu-like--vietnamese.vtt',
              default: true,
            },
          ]}
          onTrackingPlay={handleTrackingPlay}
          onTrackingPause={handleTrackingPause}
          onTrackingSeek={handleTrackingSeek}
          onTrackingExit={handleTrackingExit}
          onTrackingEnded={handleTrackingEnded}
        />
      )}
    </Content>
  );
};

export default Video;
