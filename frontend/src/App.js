import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import MainLayout from './components/MainLayout';
import Dashboard from './pages/Dashboard'
import Login from './pages/Login';
import Signup from './pages/Signup';
// import Resetpassword from './pages/Resetpassword';
// import Forgotpassword from './pages/Forgotpassword';
import Category from './pages/Categorylist'
import ItemsIn from './pages/ItemsIn';
import AddRemove from './pages/AddRemove';

import ItemsOut from './pages/ItemsOut';
import Addproduct from './pages/Addproduct';
import Addcategory from './pages/Addcategory';



function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/signup' element={<Signup />} />
        {/* <Route path='/reset-password' element={<Resetpassword />} /> */}
        {/* <Route path='/forgot-password' element={<Forgotpassword />} /> */}
        <Route path='/admin' element={<MainLayout />}>
          <Route index element={<Dashboard />} />
          <Route path='category-list' element={<Category />} />
          <Route path='add-remove' element={<AddRemove />} />

          <Route path='items-in' element={<ItemsIn />} />
          <Route path='items-out' element={<ItemsOut />} />         
          <Route path='product' element={<Addproduct />} />
          <Route path='product/:id' element={<Addproduct />} />
          <Route path='category' element={<Addcategory />} />
          <Route path='category/:id' element={<Addcategory />} />
         

        </Route>
      </Routes>
    </Router>
  );
}

export default App;
