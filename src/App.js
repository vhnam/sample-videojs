import React from 'react';
import {Layout} from 'antd';

import Header from './components/Header';

import Video from './scenes/Video';

const App = () => {
  return (
    <Layout>
      <Header />
      <Video />
    </Layout>
  );
};

export default App;
