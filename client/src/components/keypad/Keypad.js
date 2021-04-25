import React from 'react';
import './Keypad.css';
import microphone from '../../assets/microphone.png'
import world from '../../assets/world.png'
import { keys } from '../../constants'
import { useSelector, useDispatch } from 'react-redux'
import { inputChange } from '../../redux/actions'

const Keyboard = ({ handleRequest }) => {

  const dispatch = useDispatch()

  // states
  const { onScreenText, suggestedText } = useSelector(state => state)

  return (

    <div className='keypad-container'>
      <div className='suggestion-bar'>

        {suggestedText.map((word, i) => {
          return (
            <span key={i}
              onClick={() => handleRequest('/auto-complete', { word })}
              className='suggestion-bar__text'>

              {word === onScreenText[onScreenText.length - 1] ? (
                `"${word}"`
              ) : (
                  word
                )}

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
              data-label={label}
              onClick={(e) => dispatch(inputChange(e))}
              className={`keypad__button ${/[0←]/.test(label) && `keypad__button--${action}`}`}>

              <h6> {label} </h6>
              <small> {action} </small>

            </div>
          )
        })}

      </div>

      <div className="keypad__toolbar">
        <img className='keypad__icons' src={world} alt="world" />
        <img className='keypad__icons' src={microphone} alt="microphone" />
      </div>

    </div >
  );
};

export default Keyboard;