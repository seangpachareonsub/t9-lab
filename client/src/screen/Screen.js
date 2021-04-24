import React from 'react';
import './screen.css';

const Screen = ({
  onScreenText
}) => {

  return (
    <textarea className='screen' value={onScreenText?.join(' ')} rows='10' readOnly />
  );
};

export default Screen;