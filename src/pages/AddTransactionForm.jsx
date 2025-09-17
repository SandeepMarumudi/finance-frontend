import axios from "axios";
import React from "react";
import { useState } from "react";
import BASE_URL from "../constants/constants";
import { useDispatch } from "react-redux";
import Toast from "../components/toast/Toast";
import { addTransaction } from "../redux/transactions/transactionSlice";

const AddTransactionForm = () => {
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState(null);
  const [category, setCategory] = useState("");
  const [date, setDate] = useState("");
  const [error,setError]=useState("")
  const [toast,setToast]=useState(false)
  const dispatch=useDispatch()
  const navigate=useNavigate()

  const handleSubmit=async(e)=>{
    e.preventDefault()
    setError("")
    try{
        const res=await axios.post(BASE_URL+"/addTransaction",{title,amount:Number(amount),category,date},{withCredentials:true})
        setToast(true)
        dispatch(addTransaction(res.data.transactionData))

        setTimeout(()=>{
         setToast(false)
        },3000)

    }catch(err){
        console.log(err.message)
        setError(err.message)
    }
  }

  return (
   <div>
     {toast && (<Toast text={"Transaction successfully saved"}/>)}
    <div className="flex justify-center my-10">
      <div className="card bg-base-200 w-full max-w-md shadow-xl">
        <div className="card-body">
          <h2 className="card-title">➕ Add Transaction</h2>
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
              onChange={(e)=>setDate(e.target.value)}
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
       <button
              className="btn btn-error"
              onClick={() => navigate("/")}
            >
              Back
            </button>
    </div>
    
   </div>
  );
};

export default AddTransactionForm;
