import avatar from '../assets/avatar.png'
import { useNavigate } from 'react-router-dom'
import ImageModal from './ImageModal'
import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { API, AuthGetApi, AuthPostApi, imgurl } from '../services/API'
import moment from  'moment'
import { Alert } from '../utils/utils'
import {useSelector} from 'react-redux'



export default function Users() {
    const navigate = useNavigate()
    const profile = useSelector(state => state.data.profile)
    const [view, setView] = useState({
        status: false,
        img: null
    })
    const setImageModal = val => {
        setView({
            status: true,
            img: val
        })
    }

    const { data, isLoading, isError, error, refetch } = useQuery({
        queryKey: ['all-users'],
        queryFn: async () => {
            const response = await AuthGetApi(API.auth.all_users)
            return response.users
        }
    })

    const CreateRoom = async (id) => {
        const formdata = {
            reciever: id,
            sender: profile.id
        }
        try {
            const response = await AuthPostApi(API.auth.create_room, formdata)
            if(response.status === 200) {
                navigate(`/chat?u=${response.msg}`)
            }
        } catch (error) {
            Alert(`${error.message}`)
        }
    }


if(isLoading) {
    return <div className='mt-3'>
        {new Array(10).fill(0).map((ele, index) => (
            <div key={index} className="h-20 animate-pulse w-11/12 mx-auto bg-slate-700 mb-3"></div>
        ))}
    </div>
}

if(isError) {
    return (
        <div className='text-center mt-10 text-white'>
            {error}
        </div>
    )
}

    return (
        <div className=''>
            {view.status && <ImageModal
                img={view.img}
                closeView={() => setView({ ...view, status: false })}
            />}
            <div className="">
                {data.map((item, index) => (
                    <div className='p-2 grid grid-cols-7 hover:bg-slate-700 cursor-pointer border-b border-slate-500 last:border-none' key={index}>
                        <div className="flex items-center gap-2 col-span-6">
                            <div className="">
                                <img src={!item?.image ? avatar : `${imgurl}/profiles/${item?.image}`} alt="" className="w-12 h-12 object-cover rounded-full cursor-pointer" onClick={() => setImageModal(avatar)} />
                            </div>
                            <div className="cursor-pointer w-full"
                                onClick={() => CreateRoom(item.id)}
                            >
                                <div className="text-white font-light">{item.username}</div>
                                <div className="text-slate-400 text-sm">{moment(item.createdAt).calendar()}</div>
                            </div>
                        </div>
                        <div className="col-span-1">
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}