/*
Submitted by:
Or damri - 316441088
Idit oksman - 207379769
*/
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const backendApiURL = "http://13.53.201.157/api";

export const costAllList = createAsyncThunk(
  "addcost/list",
  async ({ search }, { getState, rejectWithValue }) => {
    // get user data from store
    const { user } = getState();
    try {
      // configure header's Content-Type as JSON
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.userToken}`,
        },
      };
      const { data } = await axios.get(`${backendApiURL}/addcost`, config);

      if (search !== "") {
        return data.filter((sub) => sub.category?.name.startsWith(search));
      }

      return data;
    } catch (error) {
      // return custom error message from API if any
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);

export const costCreate = createAsyncThunk(
  "addcost/create",
  async (
    { category, description, sum, date },
    { getState, rejectWithValue }
  ) => {
    try {
      // get user data from store
      const { user } = getState();
      // configure header's Content-Type as JSON
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.userToken}`,
        },
      };

      const { data } = await axios.post(
        `${backendApiURL}/addcost`,
        { category, description, sum, date },
        config
      );

      return data;
    } catch (error) {
      // return custom error message from API if any
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);

export const costUpdate = createAsyncThunk(
  "addcost/update",
  async (
    { id, category, description, sum, date },
    { getState, rejectWithValue }
  ) => {
    try {
      // get user data from store
      const { user } = getState();
      // configure header's Content-Type as JSON
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.userToken}`,
        },
      };

      const { data } = await axios.put(
        `${backendApiURL}/addcost/${id}`,
        { category, description, sum, date },
        config
      );

      return data;
    } catch (error) {
      // return custom error message from API if any
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);

export const costDelete = createAsyncThunk(
  "addcost/delete",
  async ({ id }, { getState, rejectWithValue }) => {
    try {
      // get user data from store
      const { user } = getState();
      // configure header's Content-Type as JSON
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.userToken}`,
        },
      };

      const { data } = await axios.delete(
        `${backendApiURL}/addcost/${id}`,
        config
      );

      return data;
    } catch (error) {
      // return custom error message from API if any
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);

export const costGet = createAsyncThunk(
  "addcost/getone",
  async ({ id }, { getState, rejectWithValue }) => {
    try {
      // get user data from store
      const { user } = getState();
      // configure header's Content-Type as JSON
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.userToken}`,
        },
      };

      const { data } = await axios.get(
        `${backendApiURL}/addcost/${id}`,
        config
      );

      return data;
    } catch (error) {
      // return custom error message from API if any
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);
