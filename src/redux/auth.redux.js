USE_MOCK && require('../mock/user')

import axios from 'axios'

const ERROR_MSG = 'ERROR_MSG'
const CLEAR_MSG = 'CLEAR_MSG'
const AUTH_SUCCESS = 'AUTH_SUCCESS'
const LOGOUT = 'LOGOUT'

const initState = {
    redirectTo: '',
    msg: '',
    isAuth: false,
    userid: '',
    username: '',
    realname: '',
    token: ''
}

export function auth(state = initState, action) {
    switch (action.type) {
        case AUTH_SUCCESS:
            const { userid, username, realname, token } = action.payload
            return {
                ...state,
                isAuth: true,
                userid,
                username,
                realname,
                token,
                msg: '',
                redirectTo: '/home'
            }
        case ERROR_MSG:
            return { ...state, msg: action.msg }
        case CLEAR_MSG:
            return { ...state, msg: '' }
        case LOGOUT:
            return { ...initState ,redirectTo:'/login'}
        default:
            return state
    }
}

function authSuccess(obj) {
    return { type: AUTH_SUCCESS, payload: obj }
}

function errorMsg(msg) {
    return { msg, type: ERROR_MSG, }
}

export function clearMsg() {
    return { type: CLEAR_MSG }
}

export function login(formData) {
    const { loginname, password, remember } = formData
    return dispatch => {
        axios.get('/api/login/submit', { params: { loginname, password } })
            .then(res => {
                const { code, message, data } = res.data
                if (code == 0) {
                    //存入sessionStorage
                    sessionStorage.setItem('loginname', loginname)
                    sessionStorage.setItem('password', password)
                    dispatch(authSuccess(data))
                } else {
                    dispatch(errorMsg(message))
                }
            })
            .catch(e => {
                dispatch(errorMsg('网络发生错误'))
            })
    }
}

export function authCheck(loginname, password) {
    return dispatch => {
        axios.get('/api/login/submit', { params: { loginname, password } })
            .then(res => {
                const { code, message, data } = res.data
                if (code == 0) {
                    dispatch(authSuccess(data))
                } else {
                    dispatch ({ type: LOGOUT })
                }
            })
            .catch(e => {
                return { type: LOGOUT }
            })
    }
}

export function logout() {
    sessionStorage.removeItem('loginname')
    sessionStorage.removeItem('password')
    return { type: LOGOUT }
}