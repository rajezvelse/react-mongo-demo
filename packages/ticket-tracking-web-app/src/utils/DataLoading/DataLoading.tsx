import React from 'react';
import './DataLoading.scss';

import { CircularProgress } from '@material-ui/core';

const DataLoading = () => {
  return (
    <div className="loading-animation">
      <CircularProgress className="loader"/>
      <p>Fetching...</p>
    </div>
  );
}

export default DataLoading;
