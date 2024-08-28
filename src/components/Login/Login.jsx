import React, { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch } from "react-redux";
import { login } from "../../features/auth/authSlice";
import Footsal from "../../assets/foootsal.jpg";

function LoginComponent() {
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
    rememberMe: false,
  });

  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useDispatch();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setLoginData({
      ...loginData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const validate = () => {
    const errors = {};
    if (!loginData.email) errors.email = "Email is required";
    if (!loginData.password) errors.password = "Password is required";
    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    setErrors(validationErrors);
  
    if (Object.keys(validationErrors).length === 0) {
      try {
        console.log(loginData)
        const response = await axios.post(
          "http://localhost:5000/api/auth/login",
          {email:loginData.email, password:loginData.password}
        );
        const { token, user } = response.data;
        localStorage.setItem("token", token);
        localStorage.setItem("user_id", user.id);
        dispatch(login({ token, user_id: user.id, role: user.role }));
        toast.success("Login successful");
      } catch (error) {
        console.error(error.response?.data?.msg || error.message);
        toast.error(error.response?.data?.msg || 'An error occurred');
      }
    }
  };
  
  
  

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div
      className="flex items-center justify-center h-screen bg-cover bg-center"
      style={{
        backgroundImage: `url(${Footsal})`,
      }}
    >
      <div className="bg-white p-10 rounded-lg shadow-lg w-full max-w-md">
        <h1 className="text-4xl font-bold mb-6 text-center">WELCOME</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-gray-700 font-bold mb-2"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              value={loginData.email}
              onChange={handleChange}
              placeholder="Enter your email"
            />
            {errors.email && (
              <div className="text-red-500 text-sm">{errors.email}</div>
            )}
          </div>
          <div className="mb-4 relative">
            <label
              htmlFor="password"
              className="block text-gray-700 font-bold mb-2"
            >
              Password
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              type={showPassword ? "text" : "password"}
              id="password"
              name="password"
              placeholder="Enter your password"
              value={loginData.password}
              onChange={handleChange}
            />
            <div
              className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5 mt-8 cursor-pointer"
              onClick={togglePasswordVisibility}
            >
              {showPassword ? (
                <FaEyeSlash className="text-gray-500" />
              ) : (
                <FaEye className="text-gray-500" />
              )}
            </div>
            {errors.password && (
              <div className="text-red-500 text-sm">{errors.password}</div>
            )}
          </div>
          {/* <div className="mb-4 flex items-center">
            <input
              type="checkbox"
              id="rememberMe"
              name="rememberMe"
              className="mr-2 leading-tight"
              checked={loginData.rememberMe}
              onChange={handleChange}
            />
            <label
              htmlFor="rememberMe"
              className="text-gray-700 font-bold"
            >
              Remember Me
            </label>
          </div> */}
          <div className="flex items-center justify-between">
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
            >
              Login
            </button>
          </div>
        </form>
      </div>
      <ToastContainer />
    </div>
  );
}

export default LoginComponent;
