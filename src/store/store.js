import { createStore } from 'redux'
import testReducer from './reducer'

// export default function configureStore(initialState) {
//     // const store = createStore(rootReducer, initialState,
//     //     // 触发 redux-devtools
//     //     window.devToolsExtension ? window.devToolsExtension() : undefined
//     // )
//     const store = createStore(testReducer, initialState)
//     return store
// }
const store = createStore(testReducer)
export default store
