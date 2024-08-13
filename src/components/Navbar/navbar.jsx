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
                  <Link to="/shop" className={getLinkClass("/shop")}>Shop</Link>
                  <Link to="/product" className={getLinkClass("/product")}>Product</Link>
                </>
              )}
              {authState.userRole === 'admin' && (
                <>
                  <Link to="/category" className={getLinkClass("/category")}>category</Link>
                  <Link to="/addproduct" className={getLinkClass("/addproduct")}>Add Product</Link>
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
                <li><Link to="/shop" className={location.pathname === "/shop" ? "block text-sm px-2 py-4 text-white bg-green-500 font-semibold" : "block text-sm px-2 py-4 hover:bg-green-500 transition duration-300"}>Shop</Link></li>
                <li><Link to="/product" className={location.pathname === "/product" ? "block text-sm px-2 py-4 text-white bg-green-500 font-semibold" : "block text-sm px-2 py-4 hover:bg-green-500 transition duration-300"}>Product</Link></li>
              </>
            )}
            {authState.userRole === 'admin' && (
              <>
                <li><Link to="/category" className={location.pathname === "/category" ? "block text-sm px-2 py-4 text-white bg-green-500 font-semibold" : "block text-sm px-2 py-4 hover:bg-green-500 transition duration-300"}>category</Link></li>
                <li><Link to="/addproduct" className={location.pathname === "/addproduct" ? "block text-sm px-2 py-4 text-white bg-green-500 font-semibold" : "block text-sm px-2 py-4 hover:bg-green-500 transition duration-300"}>Add Product</Link></li>
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
