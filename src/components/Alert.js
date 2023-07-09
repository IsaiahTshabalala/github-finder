import React from 'react';
import PropTypes from 'prop-types';
import { useState } from 'react';

function Alert({message}) {
  const [remove, setRemove] = useState(false);

  return (
    (remove === false) &&
      <div className="alert alert-dark m-2">
        <strong>{message}</strong>
        <button type="button" className="btn-close float-end"  onClick={e=> setRemove(true)}></button>
      </div>
  );
}

Alert.propTypes = {
  message: PropTypes.string.isRequired
};

export default Alert;