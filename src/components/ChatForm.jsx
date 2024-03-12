import { useState } from "react";
import InputEmoji from "react-input-emoji";
import { FaRegPaperPlane } from 'react-icons/fa6'


export default function ChatForm({sendMessage}) {
    const [text, setText] = useState("");

    const SubmitContent = () => {
        sendMessage(text)
        setText("")
    }

    return (
        <div className="relative">
            <div className="flex items-center gap-3 w-11/12 mx-auto">
                <InputEmoji
                    value={text}
                    onChange={setText}
                    placeholder="Type a message"
                />
                {text.length > 0 &&
                    <button 
                    onClick={SubmitContent}
                    className="text-zinc-400 text-2xl">
                        <FaRegPaperPlane />
                    </button>}
            </div>
        </div>
    )
}

