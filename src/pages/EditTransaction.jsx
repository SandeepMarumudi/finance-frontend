import axios from "axios";
import React from "react";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import BASE_URL from "../constants/constants";
import { useState } from "react";
import Toast from "../components/toast/Toast";
import { useDispatch } from "react-redux";
import { updateTransaction } from "../redux/transactions/transactionSlice";

const EditTransaction = () => {
  const { id } = useParams();
  const [transaction, setTransaction] = useState({});
  const [amount, setAmount] = useState(transaction.amount);
  const [title, setTitle] = useState(transaction.title);
  const [category, setCategory] = useState(transaction.category);
  const [date, setDate] = useState(transaction.date);
  const [error, setError] = useState("");
  const [toast, setToast] = useState(false);
  const dispatch=useDispatch()
  const navigate=useNavigate()

  const editTransaction = async () => {
    try {
      const result = await axios.patch(
        BASE_URL + `/${id}/edit`,
        { amount, title, date, category },
        { withCredentials: true }
      );
      setToast(true)
      setTimeout(()=>{
       setToast(false)
        navigate("/")
      },3000)
      setError("")
     
      
    } catch (err) {
      console.log(err.message);
    }
  };

  const getTransaction = async () => {
    try {
      const res = await axios.get(BASE_URL + `/transaction/view/${id}`, {
        withCredentials: true,
      });
      const tx = res.data.data;
      setTransaction(tx);
      setTitle(tx.title);
      setAmount(tx.amount);
      setCategory(tx.category);
      setDate(tx.date.split("T")[0]);
    } catch (err) {
      console.log(err.message);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault()
    editTransaction();
    dispatch(updateTransaction({id,amount,title,category,date}))
    
  };
  useEffect(() => {
    getTransaction(id);
  }, []);

  return (
    <div>
      {toast && <Toast text={"updated successfully "} />}
      <div className="flex justify-center my-10 z-10">
        <div className="card bg-base-200 w-full max-w-md shadow-xl">
          <div className="card-body">
            <h2 className="card-title">➕ Edit Transaction</h2>
            <form className="form-control space-y-3" onSubmit={handleSubmit}>
              <label className="label">
                <span className="label-text">Title</span>
              </label>
              <input
                type="text"
                placeholder="Ex: Salary, Shopping"
                className="input input-bordered w-full"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />

              <label className="label">
                <span className="label-text">Amount</span>
              </label>
              <input
                type="number"
                placeholder="Ex: 500 or -200"
                className="input input-bordered w-full"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                required
              />

              <label className="label">
                <span className="label-text">Category</span>
              </label>
              <select
                className="select select-bordered w-full"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                required
              >
                <option disabled value="">
                  Select Category
                </option>
                <option value="Food">Food</option>
                <option value="Travel">Travel</option>
                <option value="Shopping">Shopping</option>
                <option value="Rent">Rent</option>
                <option value="Petrol">Petrol</option>
                <option value="others">Others</option>
              </select>

              <label className="label">
                <span className="label-text">Date</span>
              </label>
              <input
                type="date"
                className="input input-bordered w-full"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                required
              />

              {error && <p className="text-red-500">{error}</p>}

              <div className="card-actions justify-end mt-4">
                <button type="submit" className="btn btn-primary w-full">
                  Save Transaction
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditTransaction;
