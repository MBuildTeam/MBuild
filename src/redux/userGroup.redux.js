USE_MOCK && require('../mock/usergroup')

import axios from 'axios'
import _ from 'lodash'

import {LOGOUT} from './auth.redux'

const USERGROUP_SEARCH_FORM = 'USERGROUP_SEARCH_FORM'
const USERGROUP_GET_LIST = 'USERGROUP_GET_LIST'
const USERGROUP_HANDLE_MODAL_FORM = 'USERGROUP_HANDLE_MODAL_FORM'
const USERGROUP_ADD_INFO = 'USERGROUP_ADD_INFO'
const USERGROUP_EDIT_INFO = 'USERGROUP_EDIT_INFO'
const USERGROUP_DELETE_INFO = 'USERGROUP_DELETE_INFO'
const USERGROUP_SHOW_MSG = 'USERGROUP_SHOW_MSG'
const USERGROUP_GET_USER_LIST = 'USERGROUP_GET_USER_LIST'
const USERGROUP_GET_ROLE_LIST = 'USERGROUP_GET_ROLE_LIST'

const initState = {
    searchForm: {},
    modalOpen: false,
    formType: 'add',
    formData: {},
    dataList: [],
    msg: '',
    roleList: [],
    pagination: {
        showSizeChanger: true,
        pageSize: 10,
        current: 1,
        total: 0
    }
}

export function usergroup(state = initState, action) {
    switch (action.type) {
        case USERGROUP_SEARCH_FORM: {
            return {
                ...state,
                searchForm: action.data
            }
        }
        case USERGROUP_GET_LIST: {
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
        case USERGROUP_GET_USER_LIST: {
            return { ...state, userList: action.payload }
        }
        case USERGROUP_GET_ROLE_LIST: {
            return { ...state, roleList: action.payload }
        }
        case USERGROUP_HANDLE_MODAL_FORM: {
            return {
                ...state,
                formType: action.formType,
                modalOpen: action.modalOpen,
                formData: action.formData
            }
        }
        case USERGROUP_ADD_INFO: {
            let dataList = _.cloneDeep(state.dataList)
            dataList.unshift(action.data)
            let pagination = _.cloneDeep(state.pagination)
            pagination.total += 1
            return {
                ...state,
                modalOpen: false,
                dataList: dataList,
                pagination
            }
        }
        case USERGROUP_EDIT_INFO: {
            let dataList = _.cloneDeep(state.dataList)
            let toUpdate = _.find(dataList, item => (item.id === action.data.id))
            _.assign(toUpdate, action.data)
            return {
                ...state,
                modalOpen: false,
                dataList: dataList,
            }
        }
        case USERGROUP_DELETE_INFO: {
            let dataList = _.cloneDeep(state.dataList)
            _.remove(dataList, item => item.id === action.id)
            let pagination = _.cloneDeep(state.pagination)
            pagination.total -= 1
            return {
                ...state,
                dataList: dataList,
                pagination
            }
        }
        case LOGOUT: {
            return { ...initState }
        }
        default:
            return state
    }
}

export function getList(params) {
    return dispatch => {
        dispatch({ type: USERGROUP_SEARCH_FORM, data: params })
        axios.post(`/api/usergroup/select/${params.pagenum}/${params.pagesize}`, params)
            .then(response => {
                const { code, msg, data } = response.data
                const {Total, Items} = data
                if (code == 0) {
                    dispatch({
                        type: USERGROUP_GET_LIST,
                        payload: Items,
                        total: Total,
                        current: params.pagenum,
                        pageSize: params.pagesize
                    })
                } else {
                    dispatch({ type: USERGROUP_SHOW_MSG, msg })
                }
            })
            .catch(e => {

            })
    }
}

export function handleModalForm(formType, modalOpen, formData) {
    if (modalOpen && formData) {
        formData.roleids = []
        formData.roles.forEach(item=>{
            formData.roleids.push(item.id)
        })
        formData.userids = []
        formData.users.forEach(item=>{
            formData.userids.push(item.id)
        })
    }
    return { type: USERGROUP_HANDLE_MODAL_FORM, formType, modalOpen, formData }
}

export function addInfo(info) {
    return dispatch => {
        axios.post('/api/usergroup/save', info)
            .then(response => {
                const { code, msg, data } = response.data
                if (code == 0) {
                    dispatch({ type: USERGROUP_ADD_INFO, msg, data })
                } else {
                    dispatch({ type: USERGROUP_SHOW_MSG, msg })
                }
            })
            .catch(e => {

            })
    }
}

export function editInfo(info) {
    return dispatch => {
        axios.post('/api/usergroup/save', info)
            .then(response => {
                const { code, msg, data } = response.data
                if (code == 0) {
                    dispatch({ type: USERGROUP_EDIT_INFO, msg, data })
                } else {
                    dispatch({ type: USERGROUP_SHOW_MSG, msg })
                }
            })
            .catch(e => {

            })
    }
}

export function deleteInfo(id) {
    return dispatch => {
        axios.get('/api/usergroup/delete',  { params: { id } })
            .then(response => {
                const { code, msg } = response.data
                if (code == 0) {
                    dispatch({ type: USERGROUP_DELETE_INFO, msg, id })
                } else {
                    dispatch({ type: USERGROUP_SHOW_MSG, msg })
                }
            })
            .catch(e => {

            })
    }
}

export function getUserList() {
    return dispatch => {
        axios.get('/api/userinfo/select')
            .then(response => {
                const { code, msg,  data } = response.data
                if (code == 0) {
                    dispatch({
                        type: USERGROUP_GET_USER_LIST,
                        payload: data,
                    })
                } else {
                    dispatch({ type: USERGROUP_SHOW_MSG, msg })
                }
            })
            .catch(e => {

            })
    }
}

export function getRoleList() {
    return dispatch => {
        axios.get('/api/roleinfo/select')
            .then(response => {
                const { code, msg,  data } = response.data
                if (code == 0) {
                    dispatch({
                        type: USERGROUP_GET_ROLE_LIST,
                        payload: data,
                    })
                } else {
                    dispatch({ type: USERGROUP_SHOW_MSG, msg })
                }
            })
            .catch(e => {

            })
    }
}
