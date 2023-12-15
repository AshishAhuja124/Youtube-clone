import React, { useEffect, useState } from 'react'
import ChatMessage from './ChatMessage'
import { useDispatch, useSelector } from 'react-redux';
import { addMessage } from '../../store/chatSlice';
import {generateRandomMessage, generateRandomName} from "../../utils/helper"
const LiveChat = () => {
    const dispatch = useDispatch();
    const chatMessages = useSelector(store => store.chat.messages);
    const [liveMessage , setLiveMessage] = useState("");

    useEffect(() => {
        const i = setInterval(() => {
            //Api polling
            dispatch(
                addMessage({
                    name: generateRandomName(),
                    message: generateRandomMessage()
                })
            )
        }, 1500);
        return () => clearInterval(i);
    }, []);

    return (
        <>
            <div className='w-full h-[400px] ml-2 p-2 border border-gray-400 bg-slate-100 rounded-lg overflow-y-scroll flex flex-col-reverse'>
                <div>
                    {chatMessages.map((chat, i) => (
                        <ChatMessage key={i}
                            name={chat.name}
                            message={chat.message} />
                    ))}
                </div>

            </div>
            <form
                className='w-full p-2 ml-2 border border-black rounded-lg'
                onSubmit={(e) => {
                    console.log('form submitted')
                    e.preventDefault();
                    dispatch(addMessage({
                        name: "Ashish",
                        message: liveMessage
                    }));
                    setLiveMessage('');
                }}
            >
                <input type='text'
                    className='border border-black w-72 px-2'
                    value={liveMessage}
                    onChange={(e) => setLiveMessage(e.target.value)}
                />

                <button className='px-2 mx-2 bg-blue-200'>Send</button>
            </form>              
        </>
    )
}

export default LiveChat