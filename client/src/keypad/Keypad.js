import React from 'react';
import './keypad.css';
import { keys } from '../utils/keys'


const Keyboard = ({
  handleInputChange,
  numInput,
  predictiveText,
  onScreenText
}) => {

  return (

    <>
      <div className='suggestion-bar'>
        {predictiveText?.slice(0, 4).map((word, i) => {
          return (
            <span key={i} className='suggestion-bar__text'>
              {word === onScreenText ? `"${word}"` : word}
            </span>
          )
        })}
      </div>


      <div className='keypad'>

        {keys.map((key, i) => {
          const { label, action } = key
          return (
            <div
              key={i}
              className={`keypad__button ${['0', '←'].includes(label) && `keypad__button--${action}`}`}
              data-label={label}
              onClick={label !== '1' ? (e) => handleInputChange(e) : undefined}>

              <h6>
                {label}
              </h6>

              <small>
                {action}
              </small>

            </div>
          )
        })}

      </div>
    </>
  );
};

export default Keyboard;