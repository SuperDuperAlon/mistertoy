// // const { useState } = React
// // const { NavLink } = ReactRouterDOM
// // const { useSelector, useDispatch } = ReactRedux

// import { userService } from '../services/user.service.js'
// import { SET_USER } from '../store/user.reducer.js'
// import { TOGGLE_CART_SHOWN } from '../store/car.reducer.js'
// import { logout } from '../store/user.action.js'

// import { LoginSignup } from './login-signup.jsx'
// import { useDispatch, useSelector } from 'react-redux'
import { NavLink } from 'react-router-dom'

export function AppHeader() {


    return (
        <header className="app-header">
            <nav>
                <NavLink to="/">Home</NavLink> |
                <NavLink to="/toys">Toys</NavLink> |
                <NavLink to="/dashboard">Dashboard</NavLink> |
                <NavLink to="/about">About</NavLink> |
                </nav>

        </header>
    )
}

