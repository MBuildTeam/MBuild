import axios from 'axios'

const RIGHTS_LIST = 'RIGHTS_LIST'

const initState={

}

export function rights(state=initState,action){
    switch(action.type){
        case RIGHTS_LIST:
        {
            return {...state}
        }
        default:
        return state
    }
}

export function getRightsList(){
    return dispatch =>{
        axios.get('/api/rights/list').then(res=>{

        }).catch(e=>{
            
        })
    }
}