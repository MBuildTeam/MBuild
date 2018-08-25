USE_MOCK && require('../mock/menu')

import axios from 'axios'
import _ from 'lodash'

const MENU_SEARCH_FORM = 'MENU_SEARCH_FORM'
const MENU_GET_LIST = 'MENU_GET_LIST'
const MENU_HANDLE_MODAL_FORM = 'MENU_HANDLE_MODAL_FORM'
const MENU_ADD_INFO = 'MENU_ADD_INFO'
const MENU_EDIT_INFO = 'MENU_EDIT_INFO'
const MENU_DELETE_INFO = 'MENU_DELETE_INFO'
const MENU_SHOW_MSG = 'MENU_SHOW_MSG'

const initState = {
    searchForm: {},
    modalOpen: false,
    formType: 'add',
    formData: {},
    dataList: [],
    msg: '',
    pagination: {
        showSizeChanger: true,
        pageSize: 10,
        current: 1,
        total: 0
    }
}

export function menu(state = initState, action) {
    switch (action.type) {
        case MENU_SEARCH_FORM: {
            return {
                ...state,
                searchForm: action.data
            }
        }
        case MENU_GET_LIST: {
            let pagination = _.cloneDeep(state.pagination)
            pagination.total = action.total
            pagination.current = action.current
            pagination.pageSize = action.pageSize
            return {
                ...state,
                dataList: action.payload,
                pagination: pagination
            }
        }
        case MENU_HANDLE_MODAL_FORM: {
            return {
                ...state,
                formType: action.formType,
                modalOpen: action.modalOpen,
                formData: action.formData
            }
        }
        case MENU_ADD_INFO: {
            let dataList = _.cloneDeep(state.dataList)
            dataList.unshift(action.data)
            let pagination = _.cloneDeep(state.pagination)
            pagination.total += 1
            return {
                ...state,
                modalOpen: false,
                dataList: dataList,
                pagination: pagination
            }
        }
        case MENU_EDIT_INFO: {
            let dataList = _.cloneDeep(state.dataList)
            let toUpdate = _.find(dataList, item => (item.id === action.data.id))
            _.assign(toUpdate, action.data)
            return {
                ...state,
                modalOpen: false,
                dataList: dataList
            }
        }
        case MENU_DELETE_INFO: {
            let dataList = _.cloneDeep(state.dataList)
            _.remove(dataList, item => item.id === action.id)
            let pagination = _.cloneDeep(state.pagination)
            pagination.total -= 1
            return {
                ...state,
                dataList: dataList,
                pagination: pagination
            }
        }
        default:
            return state
    }
}

export function getList(params) {
    return dispatch => {
        dispatch({ type: MENU_SEARCH_FORM, data: params })
        axios.get('/api/menu/select', { params })
            .then(res => {
                const { code, msg, resultcounts, data } = res.data
                if (code == 0) {
                    dispatch({
                        type: MENU_GET_LIST,
                        payload: data,
                        total: resultcounts,
                        current: params.pagenum,
                        pageSize: params.pagesize
                    })
                } else {
                    dispatch({ type: MENU_SHOW_MSG, msg })
                }
            })
            .catch(e => {

            })
    }
}

export function handleModalForm(formType, modalOpen, formData) {
    return { type: MENU_HANDLE_MODAL_FORM, formType, modalOpen, formData }
}

export function addInfo(info) {
    return dispatch => {
        axios.post('/api/menu/add', info)
            .then(res => {
                const { code, msg, data } = res.data
                if (code == 0) {
                    dispatch({ type: MENU_ADD_INFO, msg, data })
                } else {
                    dispatch({ type: MENU_SHOW_MSG, msg })
                }
            })
            .catch(e => {

            })
    }
}

export function editInfo(info) {
    return dispatch => {
        axios.post('/api/menu/update', info)
            .then(res => {
                const { code, msg, data } = res.data
                if (code == 0) {
                    dispatch({ type: MENU_EDIT_INFO, msg, data })
                } else {
                    dispatch({ type: MENU_SHOW_MSG, msg })
                }
            })
            .catch(e => {

            })
    }
}

export function deleteInfo(id) {
    return dispatch => {
        axios.get('/api/menu/delete', { params: { id } })
            .then(res => {
                const { code, msg } = res.data
                if (code == 0) {
                    dispatch({ type: MENU_DELETE_INFO, msg, id })
                } else {
                    dispatch({ type: MENU_SHOW_MSG, msg })
                }
            })
            .catch(e => {

            })
    }
}