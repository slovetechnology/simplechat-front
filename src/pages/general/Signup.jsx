import React from 'react'
import Layout from '../../components/Layout'
import { MdMarkEmailUnread, MdLock } from "react-icons/md";
import { IoEye } from "react-icons/io5";
import { IoMdEyeOff } from "react-icons/io";
import { Link, useNavigate } from 'react-router-dom/dist';
import { useState } from 'react';
import { FaPhoneAlt } from "react-icons/fa";
import Loading from '../../components/Loading';
import { useRef } from 'react';
import { SlCamera, SlUser } from 'react-icons/sl'

const Signup = () => {
    const navigate = useNavigate()
    const [eye, setEye] = useState(false)
    const [eye2, setEye2] = useState(false)
    const EyeIcon = eye === true ? IoEye : IoMdEyeOff
    const EyeIcon2 = eye2 === true ? IoEye : IoMdEyeOff
    const [phonemsg, setphoneMsg] = useState('')
    const [passmsg, setPassMsg] = useState('')
    const [conmsg, setConMsg] = useState('')
    const [loading, setLoading] = useState(false)

    const [form, setForm] = useState({
        username: '',
        phone: '',
        password: '',
        confirm_password: ''
    })
    const inputHandler = event => {
        setForm({
            ...form,
            [event.target.name]: event.target.value
        })
    }
    const [profile, setProfile] = useState({
        img: null,
        image: null
      })
      const imgref = useRef()

      const handleProfileUpload = (event) => {
        setTimeout(() => {
          setImageError(false)
        }, 2000)
        const file = event.target.files[0]
        if (file.size >= 1000000) {
          imgref.current.value = null
          return setImageError('File size too large', 'image uploads must not exceed 1MB file size', 'info')
        }
        if (!file.type.startsWith('image/')) {
          imgref.current.value = null
          return setImageError('File Error', 'image uploaded must be a valid image format (jpg, jpeg, png, svg)', 'info')
        }
        setProfile({
          img: URL.createObjectURL(file),
          image: file
        })
      }


    const submitForm = async event => {
        event.preventDefault()
        setTimeout(() => {
            setphoneMsg('')
            setPassMsg('')
            setConMsg('')
        }, 1000)
        if (!form.phone) return setphoneMsg('field cannot be empty')
        if (!form.password) return setPassMsg('field cannot be empty')
        if (form.password.length < 5) return setPassMsg('password should to be more than 5 characters ')
        if(!form.confirm_password) return setConMsg('field cannot be empty')
        if(form.confirm_password !== form.password) return setConMsg('password(s) do not match')

        const formbody = new FormData()
        formbody.append('image', profile.image)
        formbody.append('username', form.username)
        formbody.append('phone', form.phone)
        formbody.append('password', form.password)

    }
    return (
        <Layout>
            <div className="h-[100vh] overflow-y-auto border border-slate-700">
                {loading && <Loading />}
                <div className='w-[90%] mx-auto py-[2.5rem]'>
                    <div className='text-[2rem] text-white uppercase  mb-[1rem]'>sign up page</div>
                    <label className='cursor-pointer'>
                        {profile.img ?
                            <div className='relative flex items-center justify-center'>
                                <img src={profile.img} alt="" className="w-[3.9rem] object-cover h-[3.9rem] rounded-full border border-white" />
                            </div>
                            :
                            <div className="w-fit mx-auto text-3xl bg-slate-200 p-4 rounded-full relative"> <SlUser className='text-[#61611a]'  />
                                <SlCamera className='absolute top-6 right-[-0.4rem] text-[0.95rem] text-[#61611a]' />
                            </div>
                        }
                        <input ref={imgref} type="file" onChange={handleProfileUpload} hidden />
                    </label>
                    <form onSubmit={submitForm} className='mt-[2rem]'>
                        <div className='flex flex-col gap-[2rem]'>
                            <div className='flex gap-[1rem] flex-col'>
                                <div className='flex gap-[0.5rem] flex-col relative'>
                                    <div className='flex gap-1'>
                                        <FaPhoneAlt className='text-[0.9rem] mt-[0.12rem] text-[#61611a]' />
                                        <div className='text-[0.75rem]  font-[550] text-white flex items-center gap-2'>
                                            <span className='capitalize'>username</span>
                                            <span>(optional)</span>
                                        </div>
                                    </div>
                                    <input placeholder='Enter a username' className=' outline-none rounded-[3px] w-full h-fit py-[0.5rem] border bg-[#111827] pl-[1rem] justify-center text-[0.9rem] text-white ipt' type='text' value={form.username} name='username' onChange={inputHandler}></input>
                                </div>
                            </div>
                            <div className='flex gap-[1rem] flex-col'>
                                <div className='flex gap-[0.5rem] flex-col relative'>
                                    <div className='flex gap-1'>
                                        <FaPhoneAlt className='text-[0.9rem] mt-[0.12rem] text-[#61611a]' />
                                        <div className='text-[0.75rem] capitalize font-[550] text-white'>phone number</div>
                                    </div>
                                    <input placeholder='Enter your mobile number' className=' outline-none rounded-[3px] w-full h-fit py-[0.5rem] border bg-[#111827] pl-[1rem] justify-center text-[0.9rem] text-white ipt' type='text' value={form.phone} name='phone' onChange={inputHandler}></input>
                                    <div className={`text-[0.75rem] mt-[-0.3rem] absolute bottom-[-1.2rem] left-0 text-[#dd4f4f]`}>{phonemsg}</div>
                                </div>
                            </div>
                            <div className='flex gap-[1rem] flex-col'>
                                <div className='flex gap-[0.5rem] flex-col relative'>
                                    <div className='flex gap-1'>
                                        <MdLock className='text-[0.9rem] mt-[0.12rem] text-[#61611a]' />
                                        <div className='text-[0.75rem] capitalize font-[550] text-white'>password</div>
                                    </div>
                                    <input placeholder='Enter password' className=' outline-none rounded-[3px] w-full h-fit py-[0.5rem]  border bg-[#111827] pl-[1rem] justify-center text-[0.9rem] text-white ipt ' type={eye === true ? 'text' : 'password'} value={form.password} name='password' onChange={inputHandler}></input>
                                    <EyeIcon className='absolute top-[2.4rem] right-2 cursor-pointer text-[#61611a]' onClick={() => setEye(!eye)} />
                                    <div className={`text-[0.75rem] mt-[-0.3rem] absolute bottom-[-1.2rem] left-0 text-[#a53636]`}> {passmsg} </div>
                                </div>
                            </div>
                            <div className='flex gap-[1rem] flex-col'>
                                <div className='flex gap-[0.5rem] flex-col relative'>
                                    <div className='flex gap-1'>
                                        <MdLock className='text-[0.9rem] mt-[0.12rem] text-[#61611a]' />
                                        <div className='text-[0.75rem] capitalize font-[550] text-white'>confirm password</div>
                                    </div>
                                    <input placeholder='Enter password' className=' outline-none rounded-[3px] w-full h-fit py-[0.5rem]  border bg-[#111827] pl-[1rem] justify-center text-[0.9rem] text-white ipt ' type={eye2 === true ? 'text' : 'password'} value={form.confirm_password} name='confirm_password' onChange={inputHandler}></input>
                                    <EyeIcon2 className='absolute top-[2.4rem] right-2 cursor-pointer text-[#61611a]' onClick={() => setEye2(!eye2)} />
                                    <div className={`text-[0.75rem] mt-[-0.3rem] absolute bottom-[-1.2rem] left-0 text-[#a53636]`}> {conmsg} </div>
                                </div>
                            </div>
                        </div>
                        <div className='flex flex-col gap-[0.5rem] items-center mt-[2rem]'>
                            <button className='outline-none bg-[#61611a] py-[0.5rem] px-[8rem] h-fit w-fit rounded-md capitalize text-[0.9rem] text-[white] cursor-pointer font-[550]' type='submit' >sign up</button>
                            <div className='text-white text-[0.8rem] font-[550]'>Already have an account?
                                <Link to='/login' className='cursor-pointer text-[#61611a]' > Login</Link>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </Layout>
    )
}

export default Signup