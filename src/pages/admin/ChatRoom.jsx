import { Link, useLocation, useParams, useSearchParams } from 'react-router-dom'
import { FaArrowLeft, FaEllipsisV } from "react-icons/fa";
import ChatForm from "../../components/ChatForm";
import Layout from "../../components/Layout";
import avatar from '../../assets/avatar.png'
import ChatMessages from '../../components/ChatMessages';
import { useCallback, useEffect, useState } from 'react';
import { MoveToBottom } from '../../components/functions';
import {useQuery} from '@tanstack/react-query'
import { API, AuthGetApi, imgurl, socket } from '../../services/API';
import {useSelector} from 'react-redux'

export default function ChatRoom() {
    const profile = useSelector(state => state.data.profile)
    const [typing, setTyping] = useState(false)
    const [params, setParams] = useSearchParams()
    const roomid = params.get('u')
    

    const {data, isLoading, refetch} = useQuery({
        queryKey: [`room-${roomid}`],
        queryFn: async () => {
            const response = await AuthGetApi(`${API.auth.get_chat_room}/${roomid}`)
            return response.msg
        }
    })
    useEffect(() => {
        MoveToBottom()
    }, [])

    const sendMessage = () => {
        refetch()
        socket.emit('sending-chat-message')
        MoveToBottom()
    }

    useEffect(() => {
        socket.on('send-back-chat', () => {
            refetch()
            MoveToBottom()
        })

        socket.on('user-is-typing', () => {
            setTyping(true)
        })
        socket.on('user-is-not-typing', () => {
            setTyping(false)
        })
    }, [socket])

    if(isLoading) {
        return (
            <div>Loading...</div>
        )
    }


    return (
        <Layout>
            <div className="h-screen tile  border-x border-slate-700">
                <div className="w-full h-full bg-mainbg/90">
                    <div className="h-[10dvh] bg-mainbg">
                        <div className="flex items-center justify-between w-11/12 mx-auto pt-3">
                            <div className="w-full">
                                <div className="flex items-center gap-3">
                                    <Link to="/">  <FaArrowLeft className="text-white text-xl" /> </Link>
                                    <img src={!data.friend?.image ? avatar : `${imgurl}/profiles/${data.friend?.image}`} alt="" className="w-10 h-10 rounded-full object-cover" />
                                    <div className="">
                                        <div className="text-white">{data.friend?.username}</div>
                                        <div className="text-slate-400 text-sm">{typing ? 'typing...' : 'online'}</div>
                                    </div>
                                </div>
                            </div>
                            <div className="">
                                <button> <FaEllipsisV className="text-white text-xl" /> </button>
                            </div>
                        </div>
                    </div>
                    <div className=" text-white relative flex flex-col h-[90dvh]">
                        <div className="overflow-y-auto divs h-[75dvh] flex-1">
                            <ChatMessages
                                messages={data?.messages}
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

