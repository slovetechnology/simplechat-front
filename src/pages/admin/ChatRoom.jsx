import { Link, useParams } from 'react-router-dom'
import { FaArrowLeft, FaEllipsisV } from "react-icons/fa";
import ChatForm from "../../components/ChatForm";
import Layout from "../../components/Layout";
import avatar from '../../assets/avatar.png'
import ChatMessages from '../../components/ChatMessages';
import { useCallback, useEffect, useState } from 'react';
import { MoveToBottom } from '../../components/functions';
import {useQuery} from '@tanstack/react-query'
import { API, AuthGetApi, imgurl } from '../../services/API';
import {useSelector} from 'react-redux'

export default function ChatRoom() {
    const [messages, setMessages] = useState([])
    const profile = useSelector(state => state.data.profile)
    const {roomid} = useParams()

    const {data, isLoading} = useQuery({
        queryKey: [`room-${roomid}`],
        queryFn: async () => {
            const response = await AuthGetApi(`${API.auth.get_chat_room}/${roomid}`)
            return response.msg
        }
    })
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

    if(isLoading) {
        return (
            <div>Loading...</div>
        )
    }

    console.log(data, profile)
    return (
        <Layout>
            <div className="h-screen tile  border-x border-slate-700">
                <div className="w-full h-full bg-mainbg/90">
                    <div className="h-[10vh] bg-mainbg">
                        <div className="flex items-center justify-between w-11/12 mx-auto pt-3">
                            <div className="w-full">
                                <div className="flex items-center gap-3">
                                    <Link to="/">  <FaArrowLeft className="text-white text-xl" /> </Link>
                                    <img src={!data.friend?.image ? avatar : `${imgurl}/profiles/${data.friend?.image}`} alt="" className="w-10 h-10 rounded-full object-cover" />
                                    <div className="">
                                        <div className="text-white">{data.friend?.username}</div>
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

