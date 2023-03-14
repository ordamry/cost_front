/*
Submitted by:
Or damri - 316441088
Idit oksman - 207379769
*/

import { createSlice } from '@reduxjs/toolkit'
import { categoryAllList, categoryCreate, categoryDelete, categoryGet, categoryUpdate } from "./categoryActions";

const initialState = {
    loading: false,
    categoryData: [],
    error: null,
    success: false,
    category: {},
    successDelete: false,
}

const categorySlice = createSlice({
    name: 'category',
    initialState,
    reducers: {},
    extraReducers: {
        // category
        [categoryAllList.pending]: (state) => {
            state.loading = true
            state.error = null
        },
        [categoryAllList.fulfilled]: (state, action) => {
            state.loading = false
            state.categoryData = action.payload
        },
        [categoryAllList.rejected]: (state, action) => {
            state.loading = false
            state.error = action.payload
        },
        //create category
        [categoryCreate.pending]: (state) => {
            state.loading = true
            state.error = null
        },
        [categoryCreate.fulfilled]: (state, action) => {
            state.loading = false
            state.success = true // add successful
        },
        [categoryCreate.rejected]: (state, action) => {
            state.loading = false
            state.error = action.payload
        },

        //update category
        [categoryUpdate.pending]: (state) => {
            state.loading = true
            state.error = null
        },
        [categoryUpdate.fulfilled]: (state, action) => {
            state.loading = false
            state.success = true // update successful
        },
        [categoryUpdate.rejected]: (state, action) => {
            state.loading = false
            state.error = action.payload
        },

        //get one category
        [categoryGet.pending]: (state) => {
            state.loading = true
            state.error = null
        },
        [categoryGet.fulfilled]: (state, action) => {
            state.loading = false
            state.category = action.payload
        },
        [categoryGet.rejected]: (state, action) => {
            state.loading = false
            state.error = action.payload
        },

        //delete one category
        [categoryDelete.pending]: (state) => {
            state.loading = true
            state.error = null
        },
        [categoryDelete.fulfilled]: (state, action) => {
            state.loading = false
            state.successDelete = true
        },
        [categoryDelete.rejected]: (state, action) => {
            state.loading = false
            state.error = action.payload
        },
    }
})

export default categorySlice.reducer;