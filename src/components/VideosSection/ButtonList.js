import React from 'react'
import Button from './Button'

const list = ["All", "Gaming", "Music", "Cricket", "News", "Himalayas", "Trailers", "Tourism","React", "NextJs", "Computers", "Flights"]

const ButtonList = () => {
  return (
    <div className='flex overflow-x-hidden'>
      <div className='flex no-scrollbar overflow-y-auto'>
        {list.map((item) => <Button key={item} name={item} />)}
      </div>
    </div>
  );
}

export default ButtonList