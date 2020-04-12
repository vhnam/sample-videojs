import React from 'react';
import {Layout} from 'antd';

import styles from './Header.module.css';

const CustomHeader = ({title}) => {
  const {Header} = Layout;

  return (
    <Header className={styles.container}>
      <div>
        <span className={styles.brand} />
      </div>
    </Header>
  );
};

export default CustomHeader;
