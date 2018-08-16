USE_MOCK && require('../../mock/organization')
import axios from 'axios'
const GET_LIST = "GET_LIST"

const initState = {

}

export function organization(state = initState, action) {
    switch (action.type) {
        case GET_LIST: {
            return { ...state }
        }
        default:
            return state
    }
}

export function getList({}){
    return dispatch =>{
        axios.get('/api/orga/list',{})
        .then(res=>{
            console.log(res)
        })
        .catch(e=>{

        })
    }
}