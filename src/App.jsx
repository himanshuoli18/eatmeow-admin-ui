import React, { useState } from 'react'
import { Route, Routes } from 'react-router-dom';
import AddFood from './pages/AddFood/AddFood';
import Orders from './pages/Orders/Orders';
import ListFoods from './pages/ListFoods/ListFoods';
import Sidebar from './components/Sidebar/Sidebar';
import Menubar from './components/Menubar/Menubar';
import { ToastContainer } from 'react-toastify';
import Users from './pages/Users/Users';

const App = () => {
    const [sidebarActive, setSidebarActive] = useState(true)
    const toggleSidebar = () => {
        setSidebarActive(!sidebarActive)
    }
    return (
        <div className="d-flex" id="wrapper">
            <Sidebar sidebarActive={sidebarActive} />  
            <div id="page-content-wrapper"> 
                <Menubar toggleSidebar={toggleSidebar} />
                <ToastContainer />
                <div className="container-fluid">
                    <Routes>
                        <Route path='/add' element={<AddFood />} />
                        <Route path='/list' element={<ListFoods />} />
                        <Route path='/orders' element={<Orders />} />
                        <Route path='/' element={<ListFoods />} />
                        <Route path='/users' element={<Users />} />
                    </Routes>
                </div>
            </div>
        </div>
    )
}

export default App;