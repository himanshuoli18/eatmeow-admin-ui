import React from 'react'
import { Link } from 'react-router-dom'
import {assets} from '../../assets/assets'

const Sidebar = ({sidebarActive}) => {
    return (
        <div className={`border-end bg-white ${sidebarActive ? '':'d-none'}`} id="sidebar-wrapper">
            <div className="sidebar-heading border-bottom bg-light">
                <img src={assets.logo} alt='Logo' height={48} width={48}></img>
                <span className='mx-4 fw-bold'>EatMeow</span>
            </div>
            <div className="list-group list-group-flush">
                <Link className="list-group-item fw-bold list-group-item-action list-group-item-light p-3" to="/add">
                    <i className='bi bi-plus-circle me-2' style={{ WebkitTextStroke: '1px', fontSize: '1rem' }}></i>Add Food
                </Link>
                <Link className="list-group-item fw-bold list-group-item-action list-group-item-light p-3" to="/list">
                <i className='bi bi-list-ul me-2' style={{ WebkitTextStroke: '1px', fontSize: '1rem' }}></i>List Foods
                </Link>
                <Link className="list-group-item fw-bold list-group-item-action list-group-item-light p-3" to="/orders">
                <i className='bi bi-cart me-2' style={{ WebkitTextStroke: '1px', fontSize: '1rem' }}></i>Orders
                </Link>
                <Link className="list-group-item fw-bold list-group-item-action list-group-item-light p-3" to="/users">
                <i className='bi bi-people-fill me-2' style={{ WebkitTextStroke: '1px', fontSize: '1rem' }}></i>Users
                </Link>
            </div>
        </div>
    )
}

export default Sidebar