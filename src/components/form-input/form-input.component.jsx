import React from 'react';

import './form-input.styles.scss';

export default ({ handleChange, label, ...otherProps }) => (
  <div className="group">
    <input
      className="form-input"
      onChange={handleChange}
      {...otherProps}
    />
    { label && (
      <label
        className={`${otherProps.value.length ? 'shrink' : ''} form-input-label`}
        htmlFor={label}>
          {label}
      </label>
    )}
  </div>
);
