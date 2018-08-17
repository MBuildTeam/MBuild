USE_MOCK && require('../../mock/organization')
import axios from 'axios'
const GET_LIST = 'GET_LIST'
const HANDLE_MODAL_FORM = 'HANDLE_MODAL_FORM'

const initState = {
    modalOpen: false,
    formType: 'add',
    formData: {},
    orgaList: []
}

export function organization(state = initState, action) {
    switch (action.type) {
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
        default:
            return state
    }
}

export function getList(params) {
    return dispatch => {
        axios.get('/api/orga/list')
            .then(res => {
                console.log(res.data.data)
                dispatch({ type: GET_LIST, payload: res.data.data })
            })
            .catch(e => {

            })
    }
}


export function handleModalForm(formType, modalOpen, formData) {
    return { type: 'HANDLE_MODAL_FORM', formType, modalOpen, formData }
}