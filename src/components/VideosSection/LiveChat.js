import React, { useEffect } from 'react'
import ChatMessage from './ChatMessage'
import { useDispatch, useSelector } from 'react-redux';
import { addMessage } from '../../store/chatSlice';
import {generateRandomMessage, generateRandomName} from "../../utils/helper"
const LiveChat = () => {
    const dispatch = useDispatch();
    const chatMessages = useSelector(store => store.chat.messages);


    useEffect(() => {
        const i = setInterval(() => {
            //Api polling
            console.log("api polling")
            dispatch(
                addMessage({
                    name: generateRandomName(),
                    message: generateRandomMessage()
                })
            )
        }, 2000);
        return () => clearInterval(i);
    }, []);

    return (
        <div className='w-full h-[400px] ml-2 p-2 border border-gray-400 bg-slate-100 rounded-lg overflow-y-scroll flex flex-col-reverse'>
            {chatMessages.map((chat, i) => (
                <ChatMessage key={i}
                    name={chat.name}
                    message={chat.message} />
            ))}
        </div>
    )
}

export default LiveChat