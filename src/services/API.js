
import axios from 'axios'
import Cookies from 'js-cookie'
import { CookieName } from '../utils/utils'
import {io} from 'socket.io-client'


const BaseURL = import.meta.env.VITE_API_URL
export const imgurl = import.meta.env.VITE_API_URL

export const socket = io(BaseURL)

socket.on('connect', (data) => {
    // console.log('connected to server')
})

const user = 'api/user/'
const auth_urls = {
    create_account: user + 'create',
    login_account: user + 'login',
    profile: user + 'getuser',
    all_users: user + 'allusers',
    create_room: user + 'create-room',
    get_chat_room: user + 'get-chat-room',
    send_chat_message: user + 'send-chat-message',
}

const chats_urls = {
    //
}

export const API = {
    auth: auth_urls,
    chats: chats_urls,
}

export const ClientPostApi = async (endpoint, data) => {
    const response = await axios.post(`${BaseURL}/${endpoint}`, data)
    return response.data
}

export const AuthGetApi = async (endpoint) => {
    const token = Cookies.get(CookieName)
    const response = await axios.get(`${BaseURL}/${endpoint}`, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
    return response.data
}

export const AuthPostApi = async (endpoint, data) => {
    const token = Cookies.get(CookieName)
    const response = await axios.post(`${BaseURL}/${endpoint}`, data, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
    return response.data
}