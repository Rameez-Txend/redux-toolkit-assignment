import { configureStore } from '@reduxjs/toolkit'
import  counter  from './slices/counterSlice'   
import { apiSlice } from '../api/apiSlice'

export default configureStore({
  reducer: {
    name: counter,
    [apiSlice.reducerPath]: apiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware), // Adding RTK Query middleware
})