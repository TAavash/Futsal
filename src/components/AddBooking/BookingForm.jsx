import React, { useState, useEffect } from "react";
import axiosInstance from "../../Config/axiosConfig"; // Adjust based on your axios setup
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const BookingForm = ({ courtId, courtName, pricePerHour, currency }) => {
  const [date, setDate] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [totalPrice, setTotalPrice] = useState(0);
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    // Get user ID from localStorage
    const storedUserId = localStorage.getItem("user_id");
    if (storedUserId) {
      setUserId(storedUserId);
    } else {
      toast.error("User not logged in. Please log in to book a court.");
    }
  }, []);

  useEffect(() => {
    if (startTime && endTime) {
      const start = new Date(`1970-01-01T${startTime}:00`);
      const end = new Date(`1970-01-01T${endTime}:00`);
      const hours = (end - start) / (1000 * 60 * 60); // Duration in hours

      if (hours > 0) {
        setTotalPrice(hours * pricePerHour);
      } else {
        setTotalPrice(0);
      }
    }
  }, [startTime, endTime, pricePerHour]);

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token"); // Ensure this token has the "Bearer " prefix if required
  
    if (!token) {
      toast.error("User not logged in. Please log in to book a court.");
      return;
    }
  
    const bookingData = {
      courtId,
      date,
      startTime,
      endTime,
      totalPrice,
      paymentStatus: "pending",
    };
  
    try {
      await axiosInstance.post("/api/bookings/create", bookingData, {
        headers: {
          Authorization: `Bearer ${token}`, // Ensure this matches how your backend expects the token
        },
      });
      toast.success("Booking successful!");
    } catch (error) {
      console.error("Error booking court:", error.response?.data?.msg || error.message);
      toast.error(error.response?.data?.msg || "Failed to book court.");
    }
  };
  
  

  return (
    <div className="max-w-lg mx-auto p-8 bg-white shadow-md rounded-lg">
      <ToastContainer />
      <h2 className="text-2xl font-bold mb-6">Book {courtName}</h2>
      <form onSubmit={handleFormSubmit} className="space-y-4">
        <div>
          <label htmlFor="date" className="block text-sm font-medium text-gray-700">
            Date
          </label>
          <input
            type="date"
            id="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
            required
          />
        </div>

        <div>
          <label htmlFor="startTime" className="block text-sm font-medium text-gray-700">
            Start Time
          </label>
          <input
            type="time"
            id="startTime"
            value={startTime}
            onChange={(e) => setStartTime(e.target.value)}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
            required
          />
        </div>

        <div>
          <label htmlFor="endTime" className="block text-sm font-medium text-gray-700">
            End Time
          </label>
          <input
            type="time"
            id="endTime"
            value={endTime}
            onChange={(e) => setEndTime(e.target.value)}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
            required
          />
        </div>

        <div>
          <label htmlFor="totalPrice" className="block text-sm font-medium text-gray-700">
            Total Price
          </label>
          <input
            type="text"
            id="totalPrice"
            value={`${totalPrice.toFixed(2)} ${currency}`}
            readOnly
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm bg-gray-100"
          />
        </div>

        <button
          type="submit"
          className="w-full px-4 py-2 bg-blue-500 text-white font-bold rounded-md shadow-md hover:bg-blue-600"
        >
          Book Now
        </button>
      </form>
    </div>
  );
};

export default BookingForm;