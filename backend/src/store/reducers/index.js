import { FORMVALUE } from "../action/Action";
const initial_state = {
    message : ''
}

const fun = (state = initial_state, action)=>{
    switch(action.type){
        case FORMVALUE:
            return {
                ...state,
                message : action.payload
            }
            default:
                return state
    }
}

export default fun