import React from 'react'

const ChatMessage = ({name, message}) => {
  return (
    <div className='flex items-center shadow-sm p-2'>
          <img className='h-8'
              alt='user'
              src="https://www.iconpacks.net/icons/2/free-user-icon-3296-thumb.png"
          />
          <span className='px-2 font-bold'>{name}</span>
          <span className='px-2'>{message}</span>
    </div>
  )
}

export default ChatMessage