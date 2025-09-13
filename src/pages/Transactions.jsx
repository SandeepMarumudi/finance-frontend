import axios from "axios";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import BASE_URL from "../constants/constants";
import {
  addTransaction,
  removeTransaction,
} from "../redux/transactions/transactionSlice";
import { useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { useState } from "react";

const Transactions = () => {
  const { list, filterCategory } = useSelector((store) => store.transactions);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const allTransactions = async () => {
    try {
      console.log("hello")
      const res = await axios.get(BASE_URL + "/transactions", {
        withCredentials: true,
      });

      await dispatch(addTransaction(res.data.transactions));
    } catch (err) {
      // navigate("/login")
      console.log(err.message);
    }
  };
  useEffect(() => {
    allTransactions();
  }, []);
  const viewTransaction = (id) => [navigate(`/transaction/view/${id}`)];
  const editTransaction = (id) => {
    navigate(`/transaction/edit/${id}`);
  };
  const deleteTransaction = async (id) => {
    try {
      const res = await axios.delete(BASE_URL + `/${id}/delete`, {
        withCredentials: true,
      });
      if (res.status === 200) {
        dispatch(removeTransaction(id));
      }
    } catch (err) {
      console.log(err.message);
    }
  };
  const transactions =
    filterCategory === "All"
      ? list
      : list.filter((each) => each.category === filterCategory);
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 z-10">
      {transactions.map((tx) => (
        <div key={tx.id} className="card bg-base-200 shadow-md">
          <div className="card-body">
            <h2 className="card-title">{tx.title}</h2>
            <p>Amount: ₹{tx.amount}</p>
            <p>Category: {tx.category}</p>
            <p>Date: {new Date(tx.date).toLocaleDateString()}</p>
            <div className="card-actions justify-end">
              <button
                className="btn btn-sm btn-info"
                onClick={() => viewTransaction(tx._id)}
              >
                View
              </button>
              <button
                className="btn btn-sm btn-warning"
                onClick={() => editTransaction(tx._id)}
              >
                Edit
              </button>
              <button
                className="btn btn-sm btn-error"
                onClick={() => deleteTransaction(tx._id)}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Transactions;
