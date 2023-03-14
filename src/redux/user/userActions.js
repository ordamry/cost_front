/*
Submitted by:
Or damri - 316441088
Idit oksman - 207379769
*/
import axios from 'axios'
import { createAsyncThunk } from '@reduxjs/toolkit'

const backendApiURL = "http://13.53.201.157/api";

export const userLogin = createAsyncThunk(
  'users/login',
  async ({ email, password }, { rejectWithValue }) => {
    try {
      // configure header's Content-Type as JSON
      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      }

      const { data } = await axios.post(
        `${backendApiURL}/users/login`,
        { email, password },
        config
      )

      // store user's token in local storage
      localStorage.setItem('userToken', data.userToken)

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

export const registerUser = createAsyncThunk(
  'users/register',
  async ({ firstname, lastname, birthday, email, password }, { rejectWithValue }) => {
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      }

      await axios.post(
        `${backendApiURL}/users/register`,
        { firstname, lastname, birthday, email, password },
        config
      )
    } catch (error) {
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message)
      } else {
        return rejectWithValue(error.message)
      }
    }
  }
)

export const getUserDetails = createAsyncThunk(
  'users/getUserDetails',
  async (arg, { getState, rejectWithValue }) => {
    try {
      // get user data from store
      const { user } = getState()

      // configure authorization header with user's token
      const config = {
        headers: {
          Authorization: `Bearer ${user.userToken}`,
        },
      }
      const { data } = await axios.get(`${backendApiURL}/users/profile/me`, config)
      return data
    } catch (error) {
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message)
      } else {
        return rejectWithValue(error.message)
      }
    }
  }
)

export const usersList = createAsyncThunk(
  "users/list",
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
        `${backendApiURL}/users`,
        config
      )

      if (search !== "") {
        return data.filter((sub) => sub?.firstname.startsWith(search))
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

export const userDelete = createAsyncThunk(
  "users/delete",
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
        `${backendApiURL}/users/${id}`,
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

export const profileUpdate = createAsyncThunk(
  'users/profile-update',
  async ({ id, firstname, lastname, birthday, email }, { getState, rejectWithValue }) => {
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
              `${backendApiURL}/users`,
              { firstname, lastname, birthday, email },
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
