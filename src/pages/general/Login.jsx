import React from 'react'
import Layout from '../../components/Layout'
import { Link, useNavigate } from 'react-router-dom/dist'
import { MdMarkEmailUnread, MdLock } from "react-icons/md";
import { IoEye } from "react-icons/io5";
import { IoMdEyeOff } from "react-icons/io";
import { useState } from 'react';
import Loading from '../../components/Loading';
import { FaPhoneAlt } from "react-icons/fa";

const Login = () => {
    const navigate = useNavigate()
    const [eye, setEye] = useState(false)
    const EyeIcon = eye === true ? IoEye : IoMdEyeOff
    const [phonemsg, setphoneMsg] = useState('')
    const [passmsg, setPassMsg] = useState('')
    const [loading, setLoading] = useState(false)
    const [form, setForm] = useState({
        phone: '',
        password: ''
    })
    const inputHandler = event => {
        setForm({
            ...form,
            [event.target.name]: event.target.value
        })
    }


    const submitForm = async event => {
        event.preventDefault()
        setTimeout(() => {
            setphoneMsg('')
            setPassMsg('')
        }, 1000)

        if (!form.phone) return setphoneMsg('field cannot be empty')
        if (!form.password) return setPassMsg('field cannot be empty')

        const formbody = {
            email: form.email,
            password: form.password
        }
        setLoading(true)
    }

    return (
        <Layout>
            <div className="h-screen border-x border-slate-700 relative">
                {loading && <Loading />}
                <div className='w-[85%] mx-auto py-[3rem]'>
                    <div className='text-[2rem] text-white uppercase '>Login Page</div>
                    <form onSubmit={submitForm} className='mt-[4rem]'>
                        <div className='flex flex-col gap-[3rem]'>
                            <div className='flex gap-[1rem] flex-col'>
                                <div className='flex gap-[0.5rem] flex-col relative'>
                                    <div className='flex gap-1'>
                                        <FaPhoneAlt className='text-[0.9rem] mt-[0.12rem] text-green-500' />
                                        <div className='text-[0.75rem] capitalize font-[550] text-white'>phone number</div>
                                    </div>
                                    <input placeholder='Enter email address' className=' outline-none rounded-[3px] w-full h-fit py-[0.5rem] border bg-[#111827] pl-[1rem] justify-center text-[0.9rem] text-white ipt' type='text' value={form.phone} name='phone' onChange={inputHandler}></input>
                                    <div className={`text-[0.75rem] mt-[-0.3rem] absolute bottom-[-1.2rem] left-0 text-[#dd4f4f] `}>{phonemsg}</div>
                                </div>
                            </div>
                            <div className='flex gap-[1rem] flex-col'>
                                <div className='flex gap-[0.5rem] flex-col relative'>
                                    <div className='flex gap-1'>
                                        <MdLock className='text-[0.9rem] mt-[0.12rem] text-green-500' />
                                        <div className='text-[0.75rem] capitalize font-[550] text-white'>password</div>
                                    </div>
                                    <input placeholder='Enter password' className=' outline-none rounded-[3px] w-full h-fit py-[0.5rem]  border bg-[#111827] pl-[1rem] justify-center text-[0.9rem] text-white ipt ' type={eye === true ? 'text' : 'password'} value={form.password} name='password' onChange={inputHandler}></input>
                                    <EyeIcon className='absolute top-[2.4rem] right-2 cursor-pointer text-green-500' onClick={() => setEye(!eye)} />
                                    <div className={`text-[0.75rem] mt-[-0.3rem] absolute bottom-[-1.2rem] left-0 text-[#dd4f4f]`}> {passmsg} </div>
                                </div>
                            </div>
                        </div>

                        <div className='text-[0.8rem] font-[550] text-green-500 text-right pt-[0.5rem] cursor-pointer capitalize'>forgot password?</div>
                        <div className='flex flex-col gap-[0.5rem] items-center mt-[3rem]'>
                            <button className='outline-none bg-green-500 py-[0.5rem] px-[8rem] h-fit w-fit rounded-md capitalize text-[0.9rem] text-[white] cursor-pointer font-[550]' type='submit' >login</button>
                            <div className='text-white text-[0.8rem] font-[550]'>Don't have an account?
                                <Link to='/signup' className='cursor-pointer text-green-500' > Sign Up</Link>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </Layout>
    )
}

export default Login