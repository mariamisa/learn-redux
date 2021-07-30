import {configureStore} from '@reduxjs/toolkit'

// add reducer function from the counter slice to the store
// reducer parameter tell the store that reduce function will handel all updates to that state
import counterReducer from '../features/counter/counterSlice'
export default configureStore({
    reducer:{
        counter:counterReducer
    }
})