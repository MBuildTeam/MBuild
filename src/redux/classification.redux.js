USE_MOCK && require('../mock/classification')

import axios from 'axios'
import _ from 'lodash'

const CLASSIFICATION_SEARCH_FORM = 'CLASSIFICATION_SEARCH_FORM'
const CLASSIFICATION_GET_LIST = 'CLASSIFICATION_GET_LIST'
const CLASSIFICATION_HANDLE_MODAL_FORM = 'CLASSIFICATION_HANDLE_MODAL_FORM'
const CLASSIFICATION_ADD_INFO = 'CLASSIFICATION_ADD_INFO'
const CLASSIFICATION_EDIT_INFO = 'CLASSIFICATION_EDIT_INFO'
const CLASSIFICATION_DELETE_INFO = 'CLASSIFICATION_DELETE_INFO'
const CLASSIFICATION_SHOW_MSG = 'CLASSIFICATION_SHOW_MSG'
const CLASSIFICATION_GET_ORGA_LIST = 'CLASSIFICATION_GET_ORGA_LIST'
const CLASSIFICATION_GET_INTERFACE_LIST = 'CLASSIFICATION_GET_INTERFACE_LIST'

const initState = {
    searchForm: {},
    modalOpen: false,
    formType: 'add',
    formData: {},
    dataList: [],
    msg: '',
    orgaList: [],
    interfaceList:[],
}

export function classification(state = initState, action) {
    switch (action.type) {
        case CLASSIFICATION_SEARCH_FORM: {
            return {
                ...state,
                searchForm: action.data
            }
        }
        case CLASSIFICATION_GET_LIST: {
            return { ...state, dataList: action.payload }
        }
        case CLASSIFICATION_GET_ORGA_LIST: {
            return { ...state, orgaList: action.payload }
        }
        case CLASSIFICATION_GET_INTERFACE_LIST: {
            return { ...state, interfaceList: action.payload }
        }
        case CLASSIFICATION_HANDLE_MODAL_FORM: {
            return {
                ...state,
                formType: action.formType,
                modalOpen: action.modalOpen,
                formData: action.formData
            }
        }
        case CLASSIFICATION_ADD_INFO: {
            let dataList = _.cloneDeep(state.dataList)
            dataList.push(action.data)
            return {
                ...state,
                modalOpen: false,
                dataList: dataList
            }
        }
        case CLASSIFICATION_EDIT_INFO: {
            let dataList = _.cloneDeep(state.dataList)
            let toUpdate = _.find(dataList, item => (item.id === action.data.id))
            _.assign(toUpdate, action.data)
            return {
                ...state,
                modalOpen: false,
                dataList: dataList
            }
        }
        case CLASSIFICATION_DELETE_INFO: {
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
        dispatch({ type: CLASSIFICATION_SEARCH_FORM, data: params })
        axios.get('/api/classification/list', { params })
            .then(res => {
                dispatch({ type: CLASSIFICATION_GET_LIST, payload: res.data })
            })
            .catch(e => {

            })
    }
}

export function handleModalForm(formType, modalOpen, formData) {
    return { type: CLASSIFICATION_HANDLE_MODAL_FORM, formType, modalOpen, formData }
}

export function addInfo(info) {
    return dispatch => {
        axios.post('/api/classification/add', info)
            .then(res => {
                const { code, msg, data } = res.data
                if (code == 1) {
                    dispatch({ type: CLASSIFICATION_ADD_INFO, msg, data })
                } else {
                    dispatch({ type: CLASSIFICATION_SHOW_MSG, msg })
                }
            })
            .catch(e => {

            })
    }
}

export function editInfo(info) {
    return dispatch => {
        axios.post('/api/classification/edit', info)
            .then(res => {
                const { code, msg, data } = res.data
                if (code == 1) {
                    dispatch({ type: CLASSIFICATION_EDIT_INFO, msg, data })
                } else {
                    dispatch({ type: CLASSIFICATION_SHOW_MSG, msg })
                }
            })
            .catch(e => {

            })
    }
}

export function deleteInfo(id) {
    return dispatch => {
        axios.post('/api/classification/delete', { id })
            .then(res => {
                const { code, msg } = res.data
                if (code == 1) {
                    dispatch({ type: CLASSIFICATION_DELETE_INFO, msg, id })
                } else {
                    dispatch({ type: CLASSIFICATION_SHOW_MSG, msg })
                }
            })
            .catch(e => {

            })
    }
}

export function getOrgaList() {
    return dispatch => {
        axios.get('/api/orga/list')
            .then(res => {
                dispatch({ type: CLASSIFICATION_GET_ORGA_LIST, payload: res.data })
            })
            .catch(e => {

            })
    }
}

export function getInterfaceList() {
    return dispatch => {
        axios.get('/api/interface/list')
            .then(res => {
                dispatch({ type: CLASSIFICATION_GET_INTERFACE_LIST, payload: res.data })
            })
            .catch(e => {

            })
    }
}