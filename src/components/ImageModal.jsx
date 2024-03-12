import {FaTimes} from 'react-icons/fa'


export default function ImageModal({img, closeView}) {
    return (
        <div className="fixed top-0 left-0 bg-black/50 flex items-center justify-center z-10 w-full h-screen">
            <div className="w-11/12 max-w-xl relative">
                <button onClick={closeView} className="absolute top-0 right-0 bg-white rounded-full p-2"> <FaTimes /> </button>
            <img src={img} alt="" className='w-full h-full object-contain' />
            </div>
        </div>
    )
}