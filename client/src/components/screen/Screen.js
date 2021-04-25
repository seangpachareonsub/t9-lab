import React from 'react';
import './Screen.css';
import { useSelector } from 'react-redux'

const Screen = () => {

  const onScreenText = useSelector(state => state.onScreenText)

  return (
    <textarea className='screen' placeholder='Type a message...' value={onScreenText.join(' ')} rows='10' readOnly />
  );
};

export default Screen;