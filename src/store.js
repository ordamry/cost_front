/*
Submitted by:
Or damri - 316441088
Idit oksman - 207379769
*/

import { configureStore } from '@reduxjs/toolkit'
import userReducer from './redux/user/userSlice'
import costReducer from './redux/cost/costSlice'
import categoryReducer from './redux/category/categorySlice'

const store = configureStore({
  reducer: {
    user: userReducer,
    cost: costReducer,
    category: categoryReducer,
  },
  devTools: true,
})

export default store
