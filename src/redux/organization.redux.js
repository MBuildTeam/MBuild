USE_MOCK && require('../../mock/organization')
import axios from 'axios'
const GET_LIST = "GET_LIST"

const initState = {
    orgaList: []
}

export function organization(state = initState, action) {
    switch (action.type) {
        case GET_LIST: {
            return { ...state, orgaList: JSON.parse(JSON.stringify(action.payload ))}
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
                //dispatch({ type: GET_LIST, payload: [] })
            })
    }
}