import React from 'react';
import './keypad.css';
import { keys } from '../utils/keys'


const Keyboard = ({
  handleInputChange,
  numInput,
  predictiveText,
  onScreenText,
  handleAutoComplete
}) => {

  return (

    <div className='keypad-container'>

      <div className='suggestion-bar'>

        {predictiveText?.map((word, i) => {
          return (
            <span key={i}
              onClick={() => handleAutoComplete(word)}
              className='suggestion-bar__text'>
              {word === onScreenText[onScreenText.length - 1] ? `"${word}"` : word}
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

      <div className="keypad__toolbar">
        <img className='keypad__icons' src="https://www.flaticon.com/svg/vstatic/svg/3083/3083741.svg?token=exp=1619300906~hmac=cc3515c801a5a283c82bc49ff3afde30" alt="world" />
        <img className='keypad__icons' src="https://www.flaticon.com/svg/vstatic/svg/1082/1082810.svg?token=exp=1619300952~hmac=2223233649c5a41bb3e455dc4a900ad5" alt="microphone" />
      </div>

    </div>
  );
};

export default Keyboard;