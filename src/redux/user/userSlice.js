/*
Submitted by:
Or damri - 316441088
Idit oksman - 207379769
*/
import { createSlice } from '@reduxjs/toolkit'
import { getUserDetails, profileUpdate, registerUser, userDelete, userLogin, usersList } from './userActions'

// initialize userToken from local storage
const userToken = localStorage.getItem('userToken')
  ? localStorage.getItem('userToken')
  : null

const initialState = {
  loading: false,
  userInfo: null,
  userToken,
  error: null,
  success: false,
  userData: [],
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    logout: (state) => {
      localStorage.removeItem('userToken'); // delete token from storage
      state.loading = false;
      state.userInfo = null;
      state.userToken = null;
      state.error = null;
    },
  },
  extraReducers: {
    // login user
    [userLogin.pending]: (state) => {
      state.loading = true
      state.error = null
    },
    [userLogin.fulfilled]: (state, { payload }) => {
      state.loading = false
      state.userInfo = payload
      state.userToken = payload.userToken
    },
    [userLogin.rejected]: (state, { payload }) => {
      state.loading = false
      state.error = payload
    },
    // register user
    [registerUser.pending]: (state) => {
      state.loading = true
      state.error = null
    },
    [registerUser.fulfilled]: (state, { payload }) => {
      state.loading = false
      state.success = true // registration successful
    },
    [registerUser.rejected]: (state, { payload }) => {
      state.loading = false
      state.error = payload
    },
    // get user details
    [getUserDetails.pending]: (state) => {
      state.loading = true
    },
    [getUserDetails.fulfilled]: (state, { payload }) => {
      state.loading = false
      state.userInfo = payload
    },
    [getUserDetails.rejected]: (state, { payload }) => {
      state.loading = false
    },

    [usersList.pending]: (state) => {
      state.loading = true
      state.error = null
    },
    [usersList.fulfilled]: (state, action) => {
      state.loading = false
      state.usersData = action.payload
    },
    [usersList.rejected]: (state, action) => {
      state.loading = false
      state.error = action.payload
    },

    //delete one User
    [userDelete.pending]: (state) => {
      state.loading = true
      state.error = null
    },
    [userDelete.fulfilled]: (state, action) => {
      state.loading = false
      state.successDelete = true
    },
    [userDelete.rejected]: (state, action) => {
      state.loading = false
      state.error = action.payload
    },

    //delete one User
    [profileUpdate.pending]: (state) => {
      state.loading = true
      state.error = null
    },
    [profileUpdate.fulfilled]: (state, action) => {
      state.loading = false
      state.success = true
    },
    [profileUpdate.rejected]: (state, action) => {
      state.loading = false
      state.error = action.payload
    },
  },
})

export const { logout } = userSlice.actions

export default userSlice.reducer
