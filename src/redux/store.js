import { configureStore } from '@reduxjs/toolkit';
// import rootReducer from './reducers'
import songReducer from './songSlice';

const store = configureStore({
  reducer: {
    song: songReducer,
  },
});

export default store;
