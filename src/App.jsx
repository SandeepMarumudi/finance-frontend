import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Provider } from 'react-redux'
import appStore from './redux/store'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

import Body from './components/Body'
import React from 'react'
import Login from './pages/Login'
import Transactions from './pages/Transactions'
import AddTransactionForm from './pages/AddTransactionForm'
import ViewTransaction from './pages/ViewTransaction'
import EditTransaction from './pages/EditTransaction'


function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Provider store={appStore}>
        <BrowserRouter>
        <Routes>
          <Route path='/' element={<Body/>}>
          <Route path='/' element={<Transactions/>}></Route>
          <Route path='/login' element={<Login/>}></Route>
          <Route path='/addTransaction' element={<AddTransactionForm/>}></Route>
          <Route path='/transaction/view/:id' element={<ViewTransaction/>}></Route>
          <Route path='/transaction/edit/:id' element={<EditTransaction/>}></Route>
          </Route>

        </Routes>
        </BrowserRouter>

      </Provider>
       
    </>
  )
}

export default App
