import React from 'react';
import './statusBar.css'
import moment from 'moment'

const StatusBar = () => {

  const icons = [
    {
      alt: 'signal',
      src: 'https://www.flaticon.com/svg/vstatic/svg/2313/2313339.svg?token=exp=1619223794~hmac=14786193cdd15dc3bc586b0286c83902'
    },
    {
      alt: 'wifi',
      src: 'https://www.flaticon.com/svg/vstatic/svg/254/254613.svg?token=exp=1619223766~hmac=0f7e8f4174aa1c8c184e224a67c11f26'
    },
    {
      alt: 'battery',
      src: 'https://www.flaticon.com/svg/vstatic/svg/569/569467.svg?token=exp=1619223147~hmac=13b86c2a4ca122c9f7268b242b9e7b66'
    }
  ]

  return (
    <div className='status-bar'>

      <span> {moment().format('hh:mm')} </span>

      {icons.map((icon, i) => {
        const { alt, src } = icon
        return (
          <img key={i} className='status-bar__img' src={src} alt={alt} />
        )
      })}

    </div>
  );
};

export default StatusBar;