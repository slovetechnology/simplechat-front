import { Link } from 'react-router-dom'
import { FaArrowLeft, FaEllipsisV } from "react-icons/fa";
import ChatForm from "../../components/ChatForm";
import Layout from "../../components/Layout";
import avatar from '../../assets/avatar.png'
import ChatMessages from '../../components/ChatMessages';
import { useCallback, useEffect, useState } from 'react';
import { MoveToBottom } from '../../components/functions';

export default function ChatRoom() {
    const [messages, setMessages] = useState([])

    const FetchMessages = useCallback(() => {
        // MoveToBottom()
    }, [])

    useEffect(() => {
        MoveToBottom()
    }, [messages])

    const sendMessage = (msg) => {
        let newSender;
        const lastMessage = messages[messages.length - 1];
        if (lastMessage) {
            if (lastMessage.sender === 'incoming') {
                newSender = 'outgoing'
            }
            else {
                newSender = 'incoming'
            }
        } else {
            newSender = 'outgoing'
        }
        const data = {
            content: msg,
            sender: newSender,
        }
        // setMessages([...messages, data])
        setMessages(prev => [...prev, data])
        MoveToBottom()
    }
    return (
        <Layout>
            <div className="h-screen tile  border-x border-slate-700">
                <div className="w-full h-full bg-mainbg/90">
                    <div className="h-[10vh] bg-mainbg">
                        <div className="flex items-center justify-between w-11/12 mx-auto pt-3">
                            <div className="w-full">
                                <div className="flex items-center gap-3">
                                    <Link to="/">  <FaArrowLeft className="text-white text-xl" /> </Link>
                                    <img src={avatar} alt="" className="w-10 rounded-full object-cover" />
                                    <div className="">
                                        <div className="text-white">username</div>
                                        <div className="text-slate-400 text-sm">online</div>
                                    </div>
                                </div>
                            </div>
                            <div className="">
                                <button> <FaEllipsisV className="text-white text-xl" /> </button>
                            </div>
                        </div>
                    </div>
                    <div className=" text-white relative flex flex-col h-[90vh]">
                        <div className="overflow-y-auto divs h-[75vh] flex-1">
                            <ChatMessages
                                messages={messages}
                            />
                        </div>
                        <div className="pb-2">
                            <ChatForm
                                sendMessage={sendMessage}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    )
}

