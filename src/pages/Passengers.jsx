import { useState } from "react";
import Layout from "../components/Layout";

export default function Passengers() {
    const [total, setTotal] = useState([])
    const [screen, setScreen] = useState(1)
    const [adults, setAdults] = useState({
        type: 'Adult',
        total: 0
    })
    const [child, setChild] = useState({
        type: 'Child',
        total: 0
    })
    const [infant, setInfant] = useState({
        type: 'Infant',
        total: 0
    })
    const handleAdults = tag => {
        if(tag === 'minus') {
            if(adults.total <= 0) return setAdults({...adults, total: 0})
            setAdults({
                ...adults,
                 total: adults.total - 1
            })
        }
        if(tag === 'plus') {
            setAdults({
                ...adults,
                 total: adults.total + 1
            })
        }
    }
    const handleChild = tag => {
        if(tag === 'minus') {
            if(child.total <= 0) return setChild({...child, total: 0})
            setChild({
                ...child,
                 total: child.total - 1
            })
        }
        if(tag === 'plus') {
            setChild({
                ...child,
                 total: child.total + 1
            })
        }
    }
    const handleInfant = tag => {
        if(tag === 'minus') {
            if(infant.total <= 0) return setInfant({...infant, total: 0})
            setInfant({
                ...infant,
                 total: infant.total - 1
            })
        }
        if(tag === 'plus') {
            setInfant({
                ...infant,
                 total: infant.total + 1
            })
        }
    }

    const ProceedForm =() => {
        const data = [
            adults,
            child,
            infant
        ]
        setTotal(data)
        console.log(data)
        setScreen(2)
    }
    return (
        <Layout>
           {screen === 1 && <div className="text-white">
                <div className="grid grid-cols-1 gap-10">
                    <div className="">
                        <div className="">Adults</div>
                        <div className="flex items-center gap-2">
                            <button className="w-full p-2 border" onClick={() => handleAdults('minus')}>-</button>
                            <div className="">{adults.total}</div>
                            <button className="w-full p-2 border" onClick={() => handleAdults('plus')}>+</button>
                        </div>
                    </div>
                    <div className="">
                        <div className="">Children</div>
                        <div className="flex items-center gap-2">
                            <button className="w-full p-2 border" onClick={() => handleChild('minus')}>-</button>
                            <div className="">{child.total}</div>
                            <button className="w-full p-2 border" onClick={() => handleChild('plus')}>+</button>
                        </div>
                    </div>
                    <div className="">
                        <div className="">Infants</div>
                        <div className="flex items-center gap-2">
                            <button className="w-full p-2 border" onClick={() => handleInfant('minus')}>-</button>
                            <div className="">{infant.total}</div>
                            <button className="w-full p-2 border" onClick={() => handleInfant('plus')}>+</button>
                        </div>
                    </div>
                </div>
                <div className="mt-10 ml-auto w-fit">
                    <button onClick={ProceedForm} className="w-full p-3 border">proceed</button>
                </div>
            </div>}
            {screen === 2 &&  <div className="text-white">
            {total.map((item, index) => (
                <div className="" key={index}>
                    {new Array(item.total).fill().map((ele, i) => (
                        <div key={i}>{item.type} form {i + 1}</div>
                    ))}
                </div>
            ))}
            </div>}
        </Layout>
    )
}