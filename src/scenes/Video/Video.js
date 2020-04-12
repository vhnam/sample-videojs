import React, {useCallback} from 'react';
import {Button, Layout} from 'antd';
import {PlayCircleOutlined} from '@ant-design/icons';

import useToggle from '../../hooks/useToggle';

import Player from '../../components/Player';
import Hero from '../../components/Hero';

import styles from './Video.module.css';

const Video = () => {
  const toggleShowPlayer = useToggle();

  const {Content} = Layout;

  const handleOpenPlayer = useCallback(() => {
    toggleShowPlayer.setActive();
  }, [toggleShowPlayer]);

  const handleClosePlayer = useCallback(() => {
    toggleShowPlayer.setInActive();
  }, [toggleShowPlayer]);

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
          source="/assets/mot-trieu-like.mp4"
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
        />
      )}
    </Content>
  );
};

export default Video;
