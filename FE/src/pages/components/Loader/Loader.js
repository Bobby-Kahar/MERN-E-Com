import React from 'react';
import ClipLoader from 'react-spinners/ClipLoader';

const LoaderComp = ({ size, color }) => {
  return (
    <ClipLoader
      color="#CD7DCE"
      cssOverride={{
        display: 'block',
        margin: '0 auto',
        borderColor: color,
      }}
      size={size}
      aria-label="Loading Spinner"
      data-testid="loader"
    />
  );
};

export default LoaderComp;
