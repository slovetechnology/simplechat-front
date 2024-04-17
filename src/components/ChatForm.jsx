import { useEffect, useRef, useState } from "react";
import InputEmoji from "react-input-emoji";
import { FaRegPaperPlane } from 'react-icons/fa6'
import { EmojiPicker, Emoji } from "react-emoji-search";
import { FaPlus, FaRegSmile } from "react-icons/fa";
import { MoveToBottom } from "./functions";
import { Alert } from "../utils/utils";
import { API, AuthPostApi, socket } from "../services/API";
import {useSearchParams} from 'react-router-dom'




export default function ChatForm({ sendMessage }) {
    const [text, setText] = useState("");
    const [icons, setIcons] = useState(false)
    const textareaRef = useRef()
    const [params, setParams] = useSearchParams()
    const roomid = params.get('u')

    const SubmitContent = async () => {
        const formdata = {
            roomid: roomid,
            content: text
        }
        try {
            const response = await AuthPostApi(API.auth.send_chat_message, formdata)
            if(response.status === 200) {
                sendMessage()
                setText("")
                setIcons(false)
                MoveToBottom()
            }
        } catch (error) {
            Alert('Failed', `${error.message}`, 'error')
        }
    }

    const InputEmojiHandler = val => {
        const textarea = textareaRef.current;
        const start = textarea.selectionStart; 
        const end = textarea.selectionEnd;
        const newText = text.substring(0, start) + val + text.substring(end);
        setText(newText);
        textarea.focus();
        // textarea.setSelectionRange(start + val.length, start + val.length);
        MoveToBottom()
    }

    const handleTyping  = e => {
        const value = e.target.value;
        if(value) {
            socket.emit('user-is-typing')
        }else {
            socket.emit('user-is-not-typing')
        }
    }

    return (
        <div className="relative">
            <div className="flex items-center w-11/12 gap-3 pt-2 mx-auto">
                {icons && 
                    <div className="h-[20rem] w-full absolute bottom-16 left-0">
                    <EmojiPicker
                        onEmojiClick={(emoji) => InputEmojiHandler(emoji)}
                        emojiSize={24}
                        emojiSpacing={8}
                        styles={{
                            backgroundColor: "#212e35"
                        }}
                    />
                </div>}
                <button><FaRegSmile onClick={() => setIcons(!icons)} className={`text-xl ${icons ? 'text-green-500' : 'text-zinc-400'}`} /></button>
                <button>
                    <label>
                    <FaPlus className="text-xl text-zinc-400" /> 
                        <input type="file" hidden />
                    </label>
                </button>
                <textarea
                    ref={textareaRef}
                    onChange={e => setText(e.target.value)}
                    value={text}
                    onKeyUp={handleTyping}
                    className="chatform w-full resize-none rounded-lg bg-[#2e404a] pt-2 pl-3 scrolls outline-none border-none" placeholder="Type a message"></textarea>
                {/* <InputEmoji
                    value={text}
                    onChange={setText}
                    placeholder="Type a message"
                /> */}
                {text.length > 0 &&
                    <button
                        onClick={SubmitContent}
                        className="text-xl text-zinc-400">
                        <FaRegPaperPlane />
                    </button>}
            </div>
        </div>
    )
}

