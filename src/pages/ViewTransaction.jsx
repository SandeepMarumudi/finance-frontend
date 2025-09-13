    import axios from 'axios'
import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import BASE_URL from '../constants/constants'
import { useNavigate, useParams } from 'react-router-dom'
    
    const ViewTransaction = () => {
        const {id}=useParams()
        const navigate=useNavigate()
        const [transactions,setTransactions]=useState({})

        const fetchViewTransaction=async()=>{
            try{
                const res=await axios.get(BASE_URL+`/transaction/view/${id}`,{withCredentials:true})
                 setTransactions(res.data.data)
            }catch(err){
                console.log(err.message)
            }
        }
        useEffect(()=>{
            fetchViewTransaction()
        },[])
       if (!transactions) {
    return (
      <div className="flex justify-center items-center h-screen">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto p-6">
      <div className="card bg-base-200 shadow-lg">
        <div className="card-body">
          <h2 className="card-title text-2xl font-bold text-primary">
            {transactions.title}
          </h2>

          <div className="mt-4 space-y-2">
            <p>
              <span className="font-semibold">Amount:</span>{" "}
              <span className="text-green-600 font-bold">
                ₹{transactions.amount}
              </span>
            </p>
            <p>
              <span className="font-semibold">Category:</span>{" "}
              {transactions.category}
            </p>
            <p>
              <span className="font-semibold">Date:</span>{" "}
              {new Date(transactions.date).toLocaleDateString("en-IN", {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </p>
            <p>
              <span className="font-semibold">Status:</span>{" "}
              <span className="badge badge-success">Completed</span>
            </p>
          </div>

          {/* Notes Section */}
          <div className="mt-6">
            <h3 className="font-semibold mb-2">Notes</h3>
            <p className="textarea textarea-bordered w-full">
              {`${transactions.title} celebrated.`}
            </p>
          </div>

          {/* Action Buttons */}
          <div className="card-actions justify-end mt-6">
            <button
              className="btn btn-warning"
              onClick={() => navigate(`/transaction/edit/${transactions._id}`)}
            >
              Edit
            </button>
            <button
              className="btn btn-error"
              onClick={() => navigate("/")}
            >
              Back
            </button>
          </div>
        </div>
      </div>
    </div>
  );
    }
    
    export default ViewTransaction