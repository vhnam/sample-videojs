import React from 'react';

import styles from './Hero.module.css';

const Hero = ({options, children}) => {
  return (
    <div
      className={styles.container}
      style={{
        backgroundColor: options.backgroundColor,
      }}
    >
      <div
        className={styles.backgroundImage}
        style={{
          backgroundImage: `url(${options.backgroundImage})`,
        }}
      >
        {children}
      </div>
    </div>
  );
};

export default Hero;
