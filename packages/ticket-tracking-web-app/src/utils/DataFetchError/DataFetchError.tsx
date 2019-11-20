import React from 'react';
import './DataFetchError.scss';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faExclamationCircle } from '@fortawesome/free-solid-svg-icons';

const DataFetchError: React.FC<{ message: string }> = ({ message }) => {
  return (
    <div className="loading-error">
      <FontAwesomeIcon icon={faExclamationCircle} className="error-icon"></FontAwesomeIcon>
      <p>{message}</p>
    </div>
  );
}

export default DataFetchError;
