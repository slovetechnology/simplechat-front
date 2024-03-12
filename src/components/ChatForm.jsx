import { useRef, useState } from "react";
import InputEmoji from "react-input-emoji";
import { FaRegPaperPlane } from 'react-icons/fa6'
import { EmojiPicker, Emoji } from "react-emoji-search";
import { FaPlus, FaRegSmile } from "react-icons/fa";



export default function ChatForm({ sendMessage }) {
    const [text, setText] = useState("");
    const [icons, setIcons] = useState(false)
    const textareaRef = useRef()

    const SubmitContent = () => {
        sendMessage(text)
        setText("")
        setIcons(false)
    }

    const InputEmojiHandler = val => {
        const textarea = textareaRef.current;
        const start = textarea.selectionStart;
        const end = textarea.selectionEnd;
        const newText = text.substring(0, start) + val + text.substring(end);
        setText(newText);
        textarea.focus();
        textarea.setSelectionRange(start + val.length, start + val.length);
    }

    return (
        <div className="relative">
            <div className="flex items-center gap-3 w-11/12 mx-auto pt-2">
                {icons && <div className="h-[20rem] w-full absolute bottom-16 left-0">
                    <EmojiPicker
                        onEmojiClick={(emoji) => InputEmojiHandler(emoji)}
                        emojiSize={24}
                        emojiSpacing={8}
                        styles={{
                            backgroundColor: "#212e35"
                        }}
                    />
                </div>}
                <button><FaRegSmile onClick={() => setIcons(!icons)} className={`text-2xl ${icons ? 'text-green-500' : 'text-zinc-400'}`} /></button>
                <button> <FaPlus className="text-2xl text-zinc-400" /> </button>
                <textarea 
                    ref={textareaRef}
                onChange={e => setText(e.target.value)} 
                value={text} 
                className="chatform w-full resize-none rounded-lg bg-[#2e404a] pt-2 pl-3 scrolls outline-none border-none" placeholder="Type a message"></textarea>
                {/* <InputEmoji
                    value={text}
                    onChange={setText}
                    placeholder="Type a message"
                /> */}
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

