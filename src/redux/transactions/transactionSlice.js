import { createSlice } from "@reduxjs/toolkit"


const transactionSlice=createSlice({
    name:"transactions",
    initialState:{
        list:[],
        filterCategory:"All"
    },
    reducers:{
        addTransaction:(state,action)=>{
             state.list=action.payload
        },
        updateTransaction:(state,action)=>{
            const {id,amount,title,category,date}=action.payload
            const index=state.list.findIndex((each)=>each._id===id)
            state.list[index]={...state.list[index],amount,category,title,date}

        },
        removeTransaction:(state,action)=>{
           state.list.filter((each)=>each._id!==action.payload)
        },
        setFilterCategory:(state,action)=>{
            state.filterCategory = action.payload;
        }

    }
})
export const{addTransaction,updateTransaction,removeTransaction,setFilterCategory}=transactionSlice.actions
export default transactionSlice.reducer