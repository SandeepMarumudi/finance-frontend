import axios from "axios";
import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import BASE_URL from "../../constants/constants";
import { addUser, removeUser } from "../../redux/users/userSlice";
import { removeTransaction, setFilterCategory } from "../../redux/transactions/transactionSlice";

const Navbar = () => {
  const user = useSelector((store) => store.users);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const res = await axios.post(
        BASE_URL + "/signout",
        {},
        { withCredentials: true }
      );
      dispatch(removeUser())
      dispatch(removeTransaction())
      navigate("/login");
    } catch (err) {
      console.log(err.message);
    }

    {
    }
  };

  const handleLogin=()=>{
    navigate("/login")
  }

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await axios.get(BASE_URL + "/get", {
          withCredentials: true,
        });
        dispatch(addUser(res.data.data));
      } catch (err) {
        console.log(err.message);
      }
    }
    fetchData();
  }, []);

  const handleCategorySelect=(category)=>{
    dispatch(setFilterCategory(category))
  }

  return (
    <div className="navbar bg-base-100 shadow-sm ">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {" "}
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />{" "}
            </svg>
          </div>
        </div>
        <Link to="/">
          {" "}
          <a className="btn btn-ghost text-xl">Finance</a>
        </Link>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">
          <li>
            <details>
              <summary>Category</summary>
              <ul className="p-2 z-50">
                <li><a onClick={() => handleCategorySelect("All")}>All</a></li>
                <li><a onClick={() => handleCategorySelect("Shopping")}>Shopping</a></li>
                <li><a onClick={() => handleCategorySelect("Travel")}>Travel</a></li>
                <li><a onClick={() => handleCategorySelect("Rent")}>Rent</a></li>
                <li><a onClick={() => handleCategorySelect("Food")}>Food</a></li>
                <li><a onClick={() => handleCategorySelect("Petrol")}>Petrol</a></li>
                <li><a onClick={() => handleCategorySelect("Others")}>Others</a></li>
              </ul>
            </details>
          </li>
          <Link to="/addTransaction">
            <li>
              <a>Add transaction</a>
            </li>
          </Link>
        </ul>
      </div>
      <div className="navbar-end">
        <p className="mx-2">welcome,{user?.firstName}</p>
        {user == null ? (
          <a onClick={handleLogin} className="btn">
            Login
          </a>
        ) : (
          <a onClick={handleLogout} className="btn">
            Logout
          </a>
        )}
      </div>
    </div>
  );
};

export default Navbar;
