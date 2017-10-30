
import {combineReducers} from 'redux'
import * as types from './type'

const initialState = {
    test:'hello wrold'
}

function testStore(state=initialState,action){
    switch(action.type){
        case 'SEARCH_SLIDE' :
            return {state,...action.data}
        default:
            return state
        
        
    }
}

const testReducer = combineReducers({
    testStore
})
export default testReducer
