import React from 'react';

const Error = () => {
  let errorCount = 0;
  if(errorCount === 0){
    window.location.reload()
    errorCount++;
  };
  return (
    <div>
      <h1>Something went wrong!</h1>
      <p>Sorry, an unexpected error has occurred.</p>
    </div>
  );
};

export default Error;