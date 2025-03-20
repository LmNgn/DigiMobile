import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import {HiOutlineUser, HiOutlineShoppingBag, HiBars3BottomRight} from 'react-icons/hi2'
import SearchBar from './SearchBar'
import CartDrawer from '../Layout/CartDrawer'
import { IoMdClose } from 'react-icons/io'
const Navbar = () => {
    const [drawOpen,setDrawOpen] = useState(false);
    const [navDraw,setNavDraw] = useState(false);
    const toggleNavDraw =()=>{
        setNavDraw(!navDraw);
    }
    const toggleCart =()=>{
        setDrawOpen(!drawOpen)
    }
  return (
    <>
            <nav className="navbar navbar-expand-md navbar-light bg-light">
                <div className="container">
                    <Link to="/" className="navbar-brand">Mantes</Link>
                    
                    <button className="navbar-toggler" type="button" onClick={toggleNavDraw}>
                        <HiBars3BottomRight className='h-6 w-6' />
                    </button>

                    <div className={`collapse navbar-collapse ${navDraw ? 'show' : ''}`}>
                        <ul className="navbar-nav mx-auto">
                            <li className="nav-item"><Link to="/" className="nav-link">Shop</Link></li>
                            <li className="nav-item"><Link to="/client/product" className="nav-link">Laptop</Link></li>
                            <li className="nav-item"><Link to="#" className="nav-link">SmartPhone</Link></li>
                            <li className="nav-item"><Link to="#" className="nav-link">Tablet</Link></li>
                            <li className="nav-item"><Link to="#" className="nav-link">Support</Link></li>
                        </ul>
                    </div>
                    
                    <div className="d-flex align-items-center">
                        <Link to="/admin/login" className="btn btn-link text-dark">
                            <HiOutlineUser className='h-6 w-6' />
                        </Link>
                        <button onClick={toggleCart} className="btn btn-link text-dark position-relative">
                            <HiOutlineShoppingBag className='h-6 w-6' />
                            <span className='position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger'>3</span>
                        </button>
                        <SearchBar />
                    </div>
                </div>
            </nav>
            <CartDrawer drawOpen={drawOpen} toggleCart={toggleCart} />
        </>
  )
}

export default Navbar