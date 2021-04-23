import React from 'react';
import './screen.css';

const Screen = ({
  currentOnScreenText
}) => {

  return (
    <textarea class='screen' value={currentOnScreenText} rows='10' readOnly />
  );
};

export default Screen;