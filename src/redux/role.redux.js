import axios from 'axios'

const ADD_ROLE = 'ADD_ROLE'
const ROLE_LIST = 'ROLE_LIST'
const CHANGE_ADDFORM = 'CHANGE_ADDFORM'

const initState = {
    addForm: {
        roleName: {
            value: '',
            error: '不能为空',
            required: true,
        },
        rights: {
            value: '',
            error: ''
        }
    }
}

export function role(state = initState, action) {
    switch (action.type) {
        case ROLE_LIST:
            {
                return { ...state }
            }
        default:
            return state
    }
}

export function addRole({ roleName, rights }) {
    return { type: ADD_ROLE, payload: { roleName, rights } }
}

export function changeAddForm(key,value){
    return {type:CHANGE_ADDFORM,payload:{key,value}}
}