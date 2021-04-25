import React from 'react';
import './Screen.css';
import { useSelector } from 'react-redux'

const Screen = ({ onScreenText }) => {
  
  const text = useSelector(state => state.onScreenText)

  return (
    <textarea className='screen' value={text.join(' ')} rows='10' readOnly />
  );
};

export default Screen;