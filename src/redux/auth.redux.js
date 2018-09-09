USE_MOCK && require('../mock/userinfo')

import axios from 'axios'
import { getMenuList,alasUrlToCode ,FW_MENU_LIST,FW_SHOW_MSG} from './framework.redux'

const ERROR_MSG = 'ERROR_MSG'
const CLEAR_MSG = 'CLEAR_MSG'
const AUTH_SUCCESS = 'AUTH_SUCCESS'
const LOGOUT = 'LOGOUT'
const AUTO_FORM = 'AUTO_FORM'

const initState = {
    redirectTo: '',
    msg: '',
    isAuth: false,
    userid: '',
    password: '',
    username: '',
    realname: '',
    orgname: '',
    remember: true,
    token: ''
}

export function auth(state = initState, action) {
    switch (action.type) {
        case AUTH_SUCCESS: {
            const { token } = action.payload
            const { userid, name, realname, orgname } = action.payload.userinfo
            return {
                ...state,
                isAuth: true,
                userid,
                username: name,
                realname,
                orgname,
                token,
                msg: '',
                redirectTo: '/home',
            }
        }
        case ERROR_MSG: {
            return { ...state, msg: action.msg }
        }
        case CLEAR_MSG: {
            return { ...state, msg: '' }
        }
        case LOGOUT: {
            return { ...initState, redirectTo: '/login' }
        }
        case AUTO_FORM: {
            const { loginname, password, remember } = action.payload
            return {
                ...initState,
                username: loginname,
                password,
                remember
            }
        }
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
        axios.get(`/api/login/${loginname}/${password}`)
            .then(response => {
                const { code, msg, data } = response.data
                if (code == 0) {
                    //存入sessionStorage
                    sessionStorage.setItem('loginname', loginname)
                    sessionStorage.setItem('password', password)
                    //存入localStorage
                    localStorage.setItem('remember', remember)
                    localStorage.setItem('loginname', loginname)
                    localStorage.setItem('password', password)
                    dispatch(authSuccess(data))
                } else {
                    dispatch(errorMsg(msg))
                }
            })
            .catch(e => {
                dispatch(errorMsg('网络发生错误'))
            })
    }
}

export function authCheck(loginname, password) {
    return dispatch => {
        axios.get(`/api/login/${loginname}/${password}`)
            .then(response => {
                const { code, msg, data } = response.data
                if (code == 0) {
                    dispatch(authSuccess(data))
                    //获取菜单
                    let userid = data.userinfo.userid
                    axios.get(`/api/main/usermenulist/${userid}`)
                        .then(response => {
                            const { code, msg, data } = response.data
                            if (code == 0) {
                                //做一下转义，将服务器返回结果的url别名为code
                                let aliasdata = alasUrlToCode(data.menus)
                                dispatch({ type: FW_MENU_LIST, payload: aliasdata })
                            } else {
                                dispatch({ type: FW_SHOW_MSG, msg })
                            }
                        })
                } else {
                    dispatch({ type: LOGOUT })
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
    //强制刷新，避免redux状态仍在，最后的return
    location.reload()
    // return { type: LOGOUT }
}

export function setForm(formData) {
    return { type: AUTO_FORM, payload: formData }
}