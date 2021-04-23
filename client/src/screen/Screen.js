import React from 'react';

const Screen = ({ textSuggestion }) => {

  return (

    <textarea value={textSuggestion} rows='10' readOnly/>

  );
};

export default Screen;