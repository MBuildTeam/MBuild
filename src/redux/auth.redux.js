/**
 * Created by 30113 on 2018/6/11.
 */
import axios from 'axios'

const ERROR_MSG = 'ERROR_MSG'
const LOAD_DATA = 'LOAD_DATA'
const AUTH_SUCCESS = 'AUTH_SUCCESS'
const LOGOUT = 'LOGOUT'

const initState = {
    redirectTo: '',
    msg: '',
    isAuth: false,
    user: '',
    pwd: ''
}

export function auth(state = initState, action) {
    switch (action.type) {
        case AUTH_SUCCESS:
            return { ...state, isAuth: true, user: action.payload.user, msg: '', redirectTo: '/home' }
        case ERROR_MSG:
            return { ...state, msg: action.msg }
        case LOAD_DATA:
            return { ...state, ...action.payload, isAuth: true }
        case LOGOUT:
            return {...state,isAuth:false,redirectTo: '/login'}
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



export function loadData(userinfo) {
    return { type: LOAD_DATA, payload: userinfo }
}



export function login({ user, pwd }) {
    return dispatch => {
        axios.post('/api/user/login', { user, pwd })
            .then(res => {
                if (res.status === 200 && res.data.code === 0) {
                    dispatch(authSuccess({ user, pwd }))
                } else {
                    dispatch(errorMsg(res.data.msg))
                }
            })
            .catch(e => {
                //dispatch(errorMsg('网络发生错误'))
                //todo:假设登录成功
                dispatch(authSuccess({ user, pwd }))
            })
    }
}

export function logout(){
    return {type:LOGOUT}
}