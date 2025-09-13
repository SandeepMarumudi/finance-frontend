import { configureStore } from "@reduxjs/toolkit"
import userReducer from "./users/userSlice"
import transactionReducer from "./transactions/transactionSlice"



const appStore=configureStore({
    reducer:{
        users:userReducer,
        transactions:transactionReducer
    }
})
export default appStore