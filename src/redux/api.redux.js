USE_MOCK && require('../mock/api')

import axios from 'axios'
import _ from 'lodash'

const API_SEARCH_FORM = 'API_SEARCH_FORM'
const API_GET_LIST = 'API_GET_LIST'
const API_HANDLE_MODAL_FORM = 'API_HANDLE_MODAL_FORM'
const API_ADD_INFO = 'API_ADD_INFO'
const API_EDIT_INFO = 'API_EDIT_INFO'
const API_DELETE_INFO = 'API_DELETE_INFO'
const API_SHOW_MSG = 'API_SHOW_MSG'
const API_GET_RIGHTS_LIST = 'API_GET_RIGHTS_LIST'

const initState = {
    searchForm: {},
    modalOpen: false,
    formType: 'add',
    formData: {},
    dataList: [],
    msg: '',
    rightsList: [],
}

export function api(state = initState, action) {
    switch (action.type) {
        case API_SEARCH_FORM: {
            return {
                ...state,
                searchForm: action.data
            }
        }
        case API_GET_LIST: {
            return { ...state, dataList: action.payload }
        }
        case API_GET_RIGHTS_LIST: {
            return { ...state, rightsList: action.payload }
        }
        case API_HANDLE_MODAL_FORM: {
            return {
                ...state,
                formType: action.formType,
                modalOpen: action.modalOpen,
                formData: action.formData
            }
        }
        case API_ADD_INFO: {
            let dataList = _.cloneDeep(state.dataList)
            dataList.push(action.data)
            return {
                ...state,
                modalOpen: false,
                dataList: dataList
            }
        }
        case API_EDIT_INFO: {
            let dataList = _.cloneDeep(state.dataList)
            let toUpdate = _.find(dataList, item => (item.id === action.data.id))
            _.assign(toUpdate, action.data)
            return {
                ...state,
                modalOpen: false,
                dataList: dataList
            }
        }
        case API_DELETE_INFO: {
            let dataList = _.cloneDeep(state.dataList)
            _.remove(dataList, item => item.id === action.id)
            return {
                ...state,
                dataList: dataList
            }
        }
        default:
            return state
    }
}

export function getList(params) {
    return dispatch => {
        dispatch({ type: API_SEARCH_FORM, data: params })
        axios.get('/api/api/list', { params })
            .then(res => {
                dispatch({ type: API_GET_LIST, payload: res.data })
            })
            .catch(e => {

            })
    }
}

export function handleModalForm(formType, modalOpen, formData) {
    return { type: API_HANDLE_MODAL_FORM, formType, modalOpen, formData }
}

export function addInfo(info) {
    return dispatch => {
        axios.post('/api/api/add', info)
            .then(res => {
                const { code, msg, data } = res.data
                if (code == 1) {
                    dispatch({ type: API_ADD_INFO, msg, data })
                } else {
                    dispatch({ type: API_SHOW_MSG, msg })
                }
            })
            .catch(e => {

            })
    }
}

export function editInfo(info) {
    return dispatch => {
        axios.post('/api/api/edit', info)
            .then(res => {
                const { code, msg, data } = res.data
                if (code == 1) {
                    dispatch({ type: API_EDIT_INFO, msg, data })
                } else {
                    dispatch({ type: API_SHOW_MSG, msg })
                }
            })
            .catch(e => {

            })
    }
}

export function deleteInfo(id) {
    return dispatch => {
        axios.post('/api/api/delete', { id })
            .then(res => {
                const { code, msg } = res.data
                if (code == 1) {
                    dispatch({ type: API_DELETE_INFO, msg, id })
                } else {
                    dispatch({ type: API_SHOW_MSG, msg })
                }
            })
            .catch(e => {

            })
    }
}

export function getRightsList() {
    return dispatch => {
        axios.get('/api/rights/list')
            .then(res => {
                dispatch({ type: API_GET_RIGHTS_LIST, payload: res.data })
            })
            .catch(e => {

            })
    }
}