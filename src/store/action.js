import * as types from './type'

//添加一个todo
export function test (data){
    return {
        type:types.TEST,
        data
    }
}

