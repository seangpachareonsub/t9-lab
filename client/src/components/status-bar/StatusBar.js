import React from 'react';
import './StatusBar.css'
import signal from '../../assets/signal.png'
import wifi from '../../assets/wifi.png'
import battery from '../../assets/battery.png'
import moment from 'moment'

const StatusBar = () => {

  const icons = [
    {
      id: '1',
      alt: 'signal',
      src: signal
    },
    {
      id: '2',
      alt: 'wifi',
      src: wifi
    },
    {
      id: '3',
      alt: 'battery',
      src: battery
    }
  ]

  return (
    <div className='status-bar'>

      <span> {moment().format('HH:MM')} </span>

      {icons.map(icon => {
        const { alt, src, id } = icon

        return (
          <img key={id}
            className='status-bar__img'
            src={src}
            alt={alt}
          />
        )
      })}

    </div>
  );
};

export default StatusBar;