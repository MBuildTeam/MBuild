USE_MOCK && require('../mock/role')

import axios from 'axios'
import _ from 'lodash'

const ROLE_SEARCH_FORM = 'ROLE_SEARCH_FORM'
const ROLE_GET_LIST = 'ROLE_GET_LIST'
const ROLE_HANDLE_MODAL_FORM = 'ROLE_HANDLE_MODAL_FORM'
const ROLE_ADD_INFO = 'ROLE_ADD_INFO'
const ROLE_EDIT_INFO = 'ROLE_EDIT_INFO'
const ROLE_DELETE_INFO = 'ROLE_DELETE_INFO'
const ROLE_SHOW_MSG = 'ROLE_SHOW_MSG'

const initState = {
    searchForm: {},
    modalOpen: false,
    formType: 'add',
    formData: {},
    orgaList: [],
    msg: ''
}

export function role(state = initState, action) {
    switch (action.type) {
        case ROLE_SEARCH_FORM: {
            return {
                ...state,
                searchForm: action.data
            }
        }
        case ROLE_GET_LIST: {
            return { ...state, orgaList: action.payload }
        }
        case ROLE_HANDLE_MODAL_FORM: {
            return {
                ...state,
                formType: action.formType,
                modalOpen: action.modalOpen,
                formData: action.formData
            }
        }
        case ROLE_ADD_INFO: {
            let orgaList = _.cloneDeep(state.orgaList)
            orgaList.push(action.data)
            return {
                ...state,
                modalOpen: false,
                orgaList: orgaList
            }
        }
        case ROLE_EDIT_INFO: {
            let orgaList = _.cloneDeep(state.orgaList)
            let toUpdate = _.find(orgaList, item => (item.ID === action.data.ID))
            _.assign(toUpdate, action.data)
            return {
                ...state,
                modalOpen: false,
                orgaList: orgaList
            }
        }
        case ROLE_DELETE_INFO: {
            let orgaList = _.cloneDeep(state.orgaList)
            _.remove(orgaList, item => item.ID === action.ID)
            return {
                ...state,
                orgaList: orgaList
            }
        }
        default:
            return state
    }
}

export function getList(params) {
    return dispatch => {
        dispatch({ type: ROLE_SEARCH_FORM, data: params })
        axios.get('/api/role/list', { params })
            .then(res => {
                dispatch({ type: ROLE_GET_LIST, payload: res.data })
            })
            .catch(e => {

            })
    }
}

export function handleModalForm(formType, modalOpen, formData) {
    return { type: ROLE_HANDLE_MODAL_FORM, formType, modalOpen, formData }
}

export function addInfo(info) {
    return dispatch => {
        axios.post('/api/role/add', info)
            .then(res => {
                const { code, msg, data } = res.data
                if (code == 1) {
                    dispatch({ type: ROLE_ADD_INFO, msg, data })
                } else {
                    dispatch({ type: ROLE_SHOW_MSG, msg })
                }
            })
            .catch(e => {

            })
    }
}

export function editInfo(info) {
    return dispatch => {
        axios.post('/api/role/edit', info)
            .then(res => {
                const { code, msg, data } = res.data
                if (code == 1) {
                    dispatch({ type: ROLE_EDIT_INFO, msg, data })
                } else {
                    dispatch({ type: ROLE_SHOW_MSG, msg })
                }
            })
            .catch(e => {

            })
    }
}

export function deleteInfo(ID) {
    return dispatch => {
        axios.post('/api/role/delete', { ID })
            .then(res => {
                const { code, msg } = res.data
                if (code == 1) {
                    dispatch({ type: ROLE_DELETE_INFO, msg, ID })
                } else {
                    dispatch({ type: ROLE_SHOW_MSG, msg })
                }
            })
            .catch(e => {

            })
    }
}