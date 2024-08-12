import {createSlice} from "@reduxjs/toolkit";

const defaultState = {
    user: undefined,
    isLoading: false,
    error: undefined
};

export const userSlice = createSlice({
    name: 'user',
    initialState: defaultState,
    reducers: {

    }
})

export default userSlice.reducer;