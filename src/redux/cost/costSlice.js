/*
Submitted by:
Or damri - 316441088
Idit oksman - 207379769
*/
import { createSlice } from '@reduxjs/toolkit'
import { costAllList, costCreate, costDelete, costGet, costUpdate } from "./costActions";

const initialState = {
    loading: false,
    costData: [],
    error: null,
    success: false,
    costD: {},
}

const costSlice = createSlice({
    name: 'cost',
    initialState,
    reducers: {},
    extraReducers: {
        // cost
        [costAllList.pending]: (state) => {
            state.loading = true
            state.error = null
        },
        [costAllList.fulfilled]: (state, action) => {
            state.loading = false
            state.costData = action.payload
        },
        [costAllList.rejected]: (state, action) => {
            state.loading = false
            state.error = action.payload
        },
        //create cost
        [costCreate.pending]: (state) => {
            state.loading = true
            state.error = null
        },
        [costCreate.fulfilled]: (state, action) => {
            state.loading = false
            state.success = true // add successful
        },
        [costCreate.rejected]: (state, action) => {
            state.loading = false
            state.error = action.payload
        },

        //update cost
        [costUpdate.pending]: (state) => {
            state.loading = true
            state.error = null
        },
        [costUpdate.fulfilled]: (state, action) => {
            state.loading = false
            state.success = true // add successful
        },
        [costUpdate.rejected]: (state, action) => {
            state.loading = false
            state.error = action.payload
        },

        //delete one Cost
        [costDelete.pending]: (state) => {
            state.loading = true
            state.error = null
        },
        [costDelete.fulfilled]: (state, action) => {
            state.loading = false
            state.successDelete = true
        },
        [costDelete.rejected]: (state, action) => {
            state.loading = false
            state.error = action.payload
        },

        //get one cost
        [costGet.pending]: (state) => {
            state.loading = true
            state.error = null
        },
        [costGet.fulfilled]: (state, action) => {
            state.loading = false
            state.costD = action.payload
        },
        [costGet.rejected]: (state, action) => {
            state.loading = false
            state.error = action.payload
        },
    }
})

export default costSlice.reducer;