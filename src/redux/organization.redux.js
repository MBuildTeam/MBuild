USE_MOCK && require('../mock/organization')

import axios from 'axios'
import _ from 'lodash'

const ORGA_SEARCH_FORM = 'ORGA_SEARCH_FORM'
const ORGA_GET_LIST = 'ORGA_GET_LIST'
const ORGA_HANDLE_MODAL_FORM = 'ORGA_HANDLE_MODAL_FORM'
const ORGA_ADD_INFO = 'ORGA_ADD_INFO'
const ORGA_EDIT_INFO = 'ORGA_EDIT_INFO'
const ORGA_DELETE_INFO = 'ORGA_DELETE_INFO'
const ORGA_SHOW_MSG = 'ORGA_SHOW_MSG'

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

export function organization(state = initState, action) {
    switch (action.type) {
        case ORGA_SEARCH_FORM: {
            return {
                ...state,
                searchForm: action.data
            }
        }
        case ORGA_GET_LIST: {
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
        case ORGA_HANDLE_MODAL_FORM: {
            return {
                ...state,
                formType: action.formType,
                modalOpen: action.modalOpen,
                formData: action.formData
            }
        }
        case ORGA_ADD_INFO: {
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
        case ORGA_EDIT_INFO: {
            let dataList = _.cloneDeep(state.dataList)
            let toUpdate = _.find(dataList, item => (item.id === action.data.id))
            _.assign(toUpdate, action.data)
            return {
                ...state,
                modalOpen: false,
                dataList: dataList
            }
        }
        case ORGA_DELETE_INFO: {
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
        dispatch({ type: ORGA_SEARCH_FORM, data: params })
        axios.get('/api/organization/select', { params })
            .then(res => {
                const { code, msg, resultcounts, data } = res.data
                if (code == 0) {
                    dispatch({
                        type: ORGA_GET_LIST,
                        payload: data,
                        total: resultcounts,
                        current: params.pagenum,
                        pageSize: params.pagesize
                    })
                } else {
                    dispatch({ type: ORGA_SHOW_MSG, msg })
                }
            })
            .catch(e => {

            })
    }
}

export function handleModalForm(formType, modalOpen, formData) {
    return { type: ORGA_HANDLE_MODAL_FORM, formType, modalOpen, formData }
}

export function addInfo(info) {
    return dispatch => {
        axios.post('/api/organization/add', info)
            .then(res => {
                const { code, msg, data } = res.data
                if (code == 0) {
                    dispatch({ type: ORGA_ADD_INFO, msg, data })
                } else {
                    dispatch({ type: ORGA_SHOW_MSG, msg })
                }
            })
            .catch(e => {

            })
    }
}

export function editInfo(info) {
    return dispatch => {
        axios.post('/api/organization/update', info)
            .then(res => {
                const { code, msg, data } = res.data
                if (code == 0) {
                    dispatch({ type: ORGA_EDIT_INFO, msg, data })
                } else {
                    dispatch({ type: ORGA_SHOW_MSG, msg })
                }
            })
            .catch(e => {

            })
    }
}

export function deleteInfo(id) {
    return dispatch => {
        axios.get('/api/organization/delete', { params: { id } })
            .then(res => {
                const { code, msg } = res.data
                if (code == 0) {
                    dispatch({ type: ORGA_DELETE_INFO, msg, id })
                } else {
                    dispatch({ type: ORGA_SHOW_MSG, msg })
                }
            })
            .catch(e => {

            })
    }
}