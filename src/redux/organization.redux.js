USE_MOCK && require('../mock/organization')

import axios from 'axios'
import _ from 'lodash'

const SEARCH_FORM = 'SEARCH_FORM'
const GET_LIST = 'GET_LIST'
const HANDLE_MODAL_FORM = 'HANDLE_MODAL_FORM'
const ADD_INFO = 'ADD_INFO'
const EDIT_INFO = 'EDIT_INFO'
const DELETE_INFO = 'DELETE_INFO'
const SHOW_MSG = 'SHOW_MSG'

const initState = {
    searchForm: {},
    modalOpen: false,
    formType: 'add',
    formData: {},
    orgaList: [],
    msg: ''
}

export function organization(state = initState, action) {
    switch (action.type) {
        case SEARCH_FORM:{
            return {
                ...state,
                searchForm:action.data
            }
        }
        case GET_LIST: {
            return { ...state, orgaList: action.payload }
        }
        case HANDLE_MODAL_FORM: {
            return {
                ...state,
                formType: action.formType,
                modalOpen: action.modalOpen,
                formData: action.formData
            }
        }
        case ADD_INFO: {
            let orgaList = _.cloneDeep(state.orgaList)
            orgaList.push(action.data)
            return {
                ...state,
                modalOpen: false,
                orgaList: orgaList
            }
        }
        case EDIT_INFO: {
            let orgaList = _.cloneDeep(state.orgaList)
            let toUpdate = _.find(orgaList, item => (item.ID === action.data.ID))
            _.assign(toUpdate, action.data)
            return {
                ...state,
                modalOpen: false,
                orgaList: orgaList
            }
        }
        case DELETE_INFO: {
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
        dispatch({ type: SEARCH_FORM, data: params })
        axios.get('/api/orga/list', { params })
            .then(res => {
                dispatch({ type: GET_LIST, payload: res.data })
            })
            .catch(e => {

            })
    }
}

export function handleModalForm(formType, modalOpen, formData) {
    return { type: 'HANDLE_MODAL_FORM', formType, modalOpen, formData }
}

export function addOrga(info) {
    return dispatch => {
        axios.post('/api/orga/add', info)
            .then(res => {
                const { code, msg, data } = res.data
                if (code == 1) {
                    dispatch({ type: ADD_INFO, msg, data })
                } else {
                    dispatch({ type: SHOW_MSG, msg })
                }
            })
            .catch(e => {

            })
    }
}

export function editOrga(info) {
    return dispatch => {
        axios.post('/api/orga/edit', info)
            .then(res => {
                const { code, msg, data } = res.data
                if (code == 1) {
                    dispatch({ type: EDIT_INFO, msg, data })
                } else {
                    dispatch({ type: SHOW_MSG, msg })
                }
            })
            .catch(e => {

            })
    }
}

export function deleteOrga(ID) {
    return dispatch => {
        axios.post('/api/orga/delete', { ID })
            .then(res => {
                const { code, msg } = res.data
                if (code == 1) {
                    dispatch({ type: DELETE_INFO, msg, ID })
                } else {
                    dispatch({ type: SHOW_MSG, msg })
                }
            })
            .catch(e => {

            })
    }
}