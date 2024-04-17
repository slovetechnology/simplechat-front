import { useSelector } from "react-redux"



export default function ChatMessages({messages}) {
    const profile = useSelector((state) => state.data.profile)
    return (
        <div className="p-3">
            {messages.map((item, index) => (
               item.sender !== profile.id ? <div className="mb-2 max-w-[80%]" key={index}>
                    <div className="bg-white text-mainbg text-sm incoming relative w-fit p-1.5 rounded-md">
                    {/* <div className="bg-slate-300 rounded-lg"> <img src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80" alt="" className="w-full min-h-20 max-h-[30dvh] object-contain" /> </div> */}
                        <div className=" whitespace-pre-wrap">{item.content}</div>
                    </div>
                </div> :
                <div className="mb-2 max-w-[80%] ml-auto" key={index}>
                <div className="outgo text-mainbg relative outgoing text-sm w-fit ml-auto p-1.5 rounded-md">
                    {/* <div className="outgodark rounded-lg"> <img src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80" alt="" className="w-full min-h-20 max-h-[30dvh] object-contain" /> </div> */}
                    <div className=" whitespace-pre-wrap">{item.content}</div>
                </div>
            </div>
            ))}

        </div>
    )
}