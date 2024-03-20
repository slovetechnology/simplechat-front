import { useNavigate } from "react-router-dom";
import Chats from "../../components/Chats";
import Layout from "../../components/Layout";
import { BiSolidCommentDetail } from 'react-icons/bi'

export default function HomePage() {
    const navigate = useNavigate()
    return (
        <Layout>
            <div className="h-screen border-x border-slate-700">
            <div className="h-[10vh] border-b border-slate-700"></div>
            <div className="h-[90vh] overflow-y-auto pb-20">
                <div className="fixed bg-white z-10 text-4xl cursor-pointer h-fit top-[90%] rounded-xl p-2 bottom-5 right-5 lg:right-[30%] w-fit ">
                    <BiSolidCommentDetail onClick={() => navigate('/users')} />
                </div>
                <div className="relative">
                    <Chats />
                </div>
            </div>
            </div>
        </Layout>
    )
}