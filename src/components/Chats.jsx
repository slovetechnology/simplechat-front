import avatar from '../assets/avatar.png'
import {useNavigate} from 'react-router-dom'
import ImageModal from './ImageModal'
import { useState } from 'react'


export default function Chats() {
    const navigate = useNavigate()
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
    return (
        <div className=''>
           {view.status && <ImageModal
           img={view.img}
           closeView={() => setView({...view, status: false})}
           />}
            <div className="">
                {new Array(50).fill(0).map((item, index) => (
                    <div className='p-2 grid grid-cols-7 border-b hover:bg-slate-600 border-slate-500 last:border-none' key={index}>
                        <div className="flex items-center gap-2 col-span-6">
                            <div className="">
                                <img src={avatar} alt="" className="w-12 cursor-pointer" onClick={() => setImageModal(avatar)} />
                            </div>
                            <div className="cursor-pointer w-full"
                            onClick={() => navigate(`/chat/${index+1}`)}
                            >
                                <div className="text-white font-light">User name</div>
                                <div className="text-slate-400 text-sm">Lorem ipsum, dolor sit amet consectetur adipisicing elit. Id, deleniti!</div>
                            </div>
                        </div>
                        <div className="col-span-1">
                            <div className="w-fit h-fit ml-auto rounded-full text-green-400 text-xs py-1.5 px-1">10+</div>
                            <div className="text-right text-sm text-slate-400">10/10/2024</div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}