import React from "react";
import { Link, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../features/auth/authSlice";
import { toggle } from "../../features/navbar/navbarSlice";

function Navbar() {
  const dispatch = useDispatch();
  const authState = useSelector((state) => state.auth);
  const isOpen = useSelector((state) => state.navbar.isOpen);
  const location = useLocation();

  const getLinkClass = (path) => 
    location.pathname === path 
      ? "py-4 px-2 text-green-500 border-b-4 border-green-500 font-semibold" 
      : "py-4 px-2 text-gray-500 font-semibold hover:text-green-500 transition duration-300";

  return (
    <nav className="bg-white shadow-lg">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex justify-between">
          <div className="flex space-x-7">
            <div>
              <Link to="/" className="flex items-center py-4 px-2">
                <span className="font-bold text-gray-600 text-xl">Futsal</span>
              </Link>
            </div>
            <div className="hidden md:flex items-center space-x-1">
              <Link to="/" className={getLinkClass("/")}>Home</Link>
              {authState.isAuthenticated && (
                <>
                  <Link to="/court" className={getLinkClass("/court")}>Court</Link>
                  <Link to="/booking/my" className={getLinkClass("/booking/my")}>Booking</Link>
                  <Link to="/profile" className={getLinkClass("/profile")}>Profile</Link>
                </>
              )}
              {authState.userRole === 'admin' && (
                <>
                  <Link to="/court/add" className={getLinkClass("/court/add")}>Add Court</Link>
                  <Link to="/court/list" className={getLinkClass("/court/list")}>Court List</Link>
                  <Link to="/booking/admin" className={getLinkClass("/booking/admin")}>Booking List</Link>
                  <Link to="/profiles" className={getLinkClass("/profiles")}>User List</Link>
                </>
              )}
            </div>
          </div>
          <div className="hidden md:flex items-center space-x-3">
            {authState.isAuthenticated ? (
              <button onClick={() => dispatch(logout())} className="py-2 px-2 font-medium text-gray-500 rounded hover:bg-gray-200 transition duration-300">Log Out</button>
            ) : (
              <>
                <Link to="/login" className={getLinkClass("/login")}>Log In</Link>
                <Link to="/signup" className="py-2 px-2 font-medium text-white bg-green-500 rounded hover:bg-green-400 transition duration-300">Sign Up</Link>
              </>
            )}
          </div>
          <div className="md:hidden flex items-center">
            <button className="outline-none mobile-menu-button" onClick={() => dispatch(toggle())}>
              <svg className="w-6 h-6 text-gray-500 hover:text-green-500" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                <path d="M4 6h16M4 12h16m-7 6h7" />
              </svg>
            </button>
          </div>
        </div>
      </div>
      {isOpen && (
        <div className="md:hidden">
          <ul>
            <li><Link to="/" className={location.pathname === "/" ? "block text-sm px-2 py-4 text-white bg-green-500 font-semibold" : "block text-sm px-2 py-4 hover:bg-green-500 transition duration-300"}>Home</Link></li>
            {authState.isAuthenticated && (
              <>
                <li><Link to="/court" className={location.pathname === "/court" ? "block text-sm px-2 py-4 text-white bg-green-500 font-semibold" : "block text-sm px-2 py-4 hover:bg-green-500 transition duration-300"}>Court</Link></li>
                <li><Link to="/booking/my" className={location.pathname === "/booking/my" ? "block text-sm px-2 py-4 text-white bg-green-500 font-semibold" : "block text-sm px-2 py-4 hover:bg-green-500 transition duration-300"}>Booking</Link></li>
                <li><Link to="/profile" className={location.pathname === "/profile" ? "block text-sm px-2 py-4 text-white bg-green-500 font-semibold" : "block text-sm px-2 py-4 hover:bg-green-500 transition duration-300"}>Profile</Link></li>
              </>
            )}
            {authState.userRole === 'admin' && (
              <>
                <li><Link to="/court/add" className={location.pathname === "/court/add" ? "block text-sm px-2 py-4 text-white bg-green-500 font-semibold" : "block text-sm px-2 py-4 hover:bg-green-500 transition duration-300"}>Add Court</Link></li>
                <li><Link to="/court/list" className={location.pathname === "/court/list" ? "block text-sm px-2 py-4 text-white bg-green-500 font-semibold" : "block text-sm px-2 py-4 hover:bg-green-500 transition duration-300"}>Court List</Link></li>
                <li><Link to="/booking/admin" className={location.pathname === "/booking/admin" ? "block text-sm px-2 py-4 text-white bg-green-500 font-semibold" : "block text-sm px-2 py-4 hover:bg-green-500 transition duration-300"}>Booking List</Link></li>
                <li><Link to="/profiles" className={location.pathname === "/profiles" ? "block text-sm px-2 py-4 text-white bg-green-500 font-semibold" : "block text-sm px-2 py-4 hover:bg-green-500 transition duration-300"}>User List</Link></li>
              </>
            )}
            {authState.isAuthenticated ? (
              <li><button onClick={() => dispatch(logout())} className="block text-sm px-2 py-4 hover:bg-green-500 transition duration-300">Log Out</button></li>
            ) : (
              <>
                <li><Link to="/login" className={location.pathname === "/login" ? "block text-sm px-2 py-4 text-white bg-green-500 font-semibold" : "block text-sm px-2 py-4 hover:bg-green-500 transition duration-300"}>Log In</Link></li>
                <li><Link to="/signup" className={location.pathname === "/signup" ? "block text-sm px-2 py-4 text-white bg-green-500 font-semibold" : "block text-sm px-2 py-4 hover:bg-green-500 transition duration-300"}>Sign Up</Link></li>
              </>
            )}
          </ul>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
