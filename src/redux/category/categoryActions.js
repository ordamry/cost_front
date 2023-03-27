/*
Submitted by:
Or damri - 316441088
Idit oksman - 207379769
*/

import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios'

//const backendApiURL = "http://13.53.201.157/api";
const backendApiURL = "http://localhost:5000";

export const categoryAllList = createAsyncThunk(
    "category/list",
    async ({search}, { getState, rejectWithValue }) => {
        // get user data from store
        const { user } = getState()
        try {
            // configure header's Content-Type as JSON
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${user.userToken}`,
                },
            }
            const { data } = await axios.get(
                `${backendApiURL}/categories`,
                config
            )
            if (search !== "") {
                return data.filter((sub) => sub.name.startsWith(search))
            }

            return data
        } catch (error) {
            // return custom error message from API if any
            if (error.response && error.response.data.message) {
                return rejectWithValue(error.response.data.message)
            } else {
                return rejectWithValue(error.message)
            }
        }
    }
)

export const categoryCreate = createAsyncThunk(
    'category/create',
    async ({ name, sum, description }, { getState, rejectWithValue }) => {
        try {
            // get user data from store
            const { user } = getState()
            // configure header's Content-Type as JSON
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${user.userToken}`,
                },
            }

            const { data } = await axios.post(
                `${backendApiURL}/categories`,
                { name, sum, description },
                config
            )

            return data
        } catch (error) {
            // return custom error message from API if any
            if (error.response && error.response.data.message) {
                return rejectWithValue(error.response.data.message)
            } else {
                return rejectWithValue(error.message)
            }
        }
    }
)

export const categoryUpdate = createAsyncThunk(
    'category/update',
    async ({ id, name, sum, description }, { getState, rejectWithValue }) => {
        try {
            // get user data from store
            const { user } = getState()
            // configure header's Content-Type as JSON
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${user.userToken}`,
                },
            }

            const { data } = await axios.put(
                `${backendApiURL}/categories/${id}`,
                { name, sum, description },
                config
            )

            return data
        } catch (error) {
            // return custom error message from API if any
            if (error.response && error.response.data.message) {
                return rejectWithValue(error.response.data.message)
            } else {
                return rejectWithValue(error.message)
            }
        }
    }
)

export const categoryGet = createAsyncThunk(
    'category/getone',
    async ({ id }, { getState, rejectWithValue }) => {
        try {
            // get user data from store
            const { user } = getState()
            // configure header's Content-Type as JSON
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${user.userToken}`,
                },
            }

            const { data } = await axios.get(
                `${backendApiURL}/categories/${id}`,
                config
            )

            return data
        } catch (error) {
            // return custom error message from API if any
            if (error.response && error.response.data.message) {
                return rejectWithValue(error.response.data.message)
            } else {
                return rejectWithValue(error.message)
            }
        }
    }
)

export const categoryDelete = createAsyncThunk(
    "category/delete",
    async ({ id }, { getState, rejectWithValue }) => {
        try {
            // get user data from store
            const { user } = getState()
            // configure header's Content-Type as JSON
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${user.userToken}`,
                },
            }

            const { data } = await axios.delete(
                `${backendApiURL}/categories/${id}`,
                config
            )

            return data
        } catch (error) {
            // return custom error message from API if any
            if (error.response && error.response.data.message) {
                return rejectWithValue(error.response.data.message)
            } else {
                return rejectWithValue(error.message)
            }
        }
    }
);