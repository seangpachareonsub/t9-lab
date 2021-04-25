import React from 'react';
import './Screen.css';
import { useSelector } from 'react-redux'

const Screen = ({
  onScreenText
}) => {

  const text = useSelector(state => state.onScreenText)

  // console.log(text)

  return (
    // <textarea className='screen' value={onScreenText?.join(' ')} rows='10' readOnly />
    <textarea className='screen' value={text.join(' ')} rows='10' readOnly />
  );
};

export default Screen;