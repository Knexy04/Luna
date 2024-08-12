import {combineReducers, configureStore} from "@reduxjs/toolkit";
import userReducer from "./reducers/userSlice.js";

const rootReducer = combineReducers({
    userReducer
})

export const store = () => {
    return configureStore({
        reducer: rootReducer,
    })
}
