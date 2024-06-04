import { configureStore } from '@reduxjs/toolkit'
import registerReducer from '../features/auth/registerSlice';
import loginReducer from '../features/auth/loginSlice';

export default configureStore({
    reducer: {
        register: registerReducer,
        login: loginReducer,
    },
})