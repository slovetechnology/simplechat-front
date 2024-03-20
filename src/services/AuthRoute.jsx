import Cookies from 'js-cookie'
import { useEffect, useState } from 'react'
import { isExpired } from 'react-jwt'
import { useAtom } from 'jotai'
import { Alert, CookieName } from '../utils/utils'
import { useNavigate } from 'react-router-dom'
import { PROFILE } from '../store'

const AuthRoute = ({ children }) => {

    const [login, setLogin] = useState(false)
    const navigate = useNavigate()
    const [, setProfile] = useAtom(PROFILE)

    useEffect(() => {
        const ValidateEntrance = async () => {
        try {
            const token = Cookies.get(CookieName)
            const isinValid = isExpired(token)
            if (!token) {
                setLogin(false)
                return navigate('/login')
            }
            if (isinValid) {
                setLogin(false)
                return navigate('/login')
            }

        } catch (error) {
            Alert('request failed', error.msg, 'error')
        }
    }
    
    ValidateEntrance()

    }, [])

    if (login) return children
}

export default AuthRoute