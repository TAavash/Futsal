import React, { useEffect, useState } from "react";
import axiosInstance from "../../Config/axiosConfig";
import { useParams, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const BookingUpdate = () => {
  const { bookingId } = useParams(); // Get the booking ID from the URL
  const navigate = useNavigate();
  const [booking, setBooking] = useState(null);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    date: "",
    startTime: "",
    endTime: "",
    totalPrice: "",
    paymentStatus: "",
  });

  useEffect(() => {
    console.log(`Booking ID from useParams: ${bookingId}`); // Debug line
    const fetchBooking = async () => {
      try {
        if (!bookingId) {
          throw new Error("Booking ID is missing");
        }
        const response = await axiosInstance.get(`/api/bookings/${bookingId}`);
        setBooking(response.data);
        setFormData({
          date: response.data.date.split("T")[0],
          startTime: response.data.startTime,
          endTime: response.data.endTime,
          totalPrice: response.data.totalPrice,
          paymentStatus: response.data.paymentStatus,
        });
        setLoading(false);
      } catch (error) {
        toast.error("Failed to fetch booking details");
        console.error("Error fetching booking:", error);
        setLoading(false);
      }
    };

    fetchBooking();
  }, [bookingId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axiosInstance.put(`/api/bookings/${bookingId}`, formData);
      setTimeout(() => {
        toast.success("Booking Updated successful");
      }, 1000);
      navigate("/booking/admin"); // Corrected navigation path
    } catch (error) {
      toast.error("Failed to update booking");
      console.error("Error updating booking:", error);
    }
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="p-10 bg-white">
      <ToastContainer /> {/* Add ToastContainer here */}
      <h2 className="text-2xl font-bold mb-6">Update Booking</h2>
      {booking && (
        <div className="space-y-6">
          {/* Display User Details */}
          <div className="p-4 bg-gray-100 rounded-lg">
            <h3 className="text-xl font-semibold">User Details</h3>
            <p>
              <strong>Name:</strong> {booking.user.name}
            </p>
            <p>
              <strong>Email:</strong> {booking.user.email}
            </p>
            <p>
              <strong>Role:</strong> {booking.user.role}
            </p>
          </div>

          {/* Display Court Details */}
          <div className="p-4 bg-gray-100 rounded-lg">
            <h3 className="text-xl font-semibold">Court Details</h3>
            <p>
              <strong>Name:</strong> {booking.court.name}
            </p>
            <p>
              <strong>Location:</strong> {booking.court.location}
            </p>
            <p>
              <strong>Description:</strong> {booking.court.description}
            </p>
            <p>
              <strong>Court Type:</strong> {booking.court.courtType}
            </p>
          </div>

          {/* Booking Update Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-gray-700">Date</label>
              <input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                className="border p-2 w-full"
                required
              />
            </div>
            <div>
              <label className="block text-gray-700">Start Time</label>
              <input
                type="time"
                name="startTime"
                value={formData.startTime}
                onChange={handleChange}
                className="border p-2 w-full"
                required
              />
            </div>
            <div>
              <label className="block text-gray-700">End Time</label>
              <input
                type="time"
                name="endTime"
                value={formData.endTime}
                onChange={handleChange}
                className="border p-2 w-full"
                required
              />
            </div>
            <div>
              <label className="block text-gray-700">Total Price</label>
              <input
                type="number"
                name="totalPrice"
                step="0.01"
                value={formData.totalPrice}
                onChange={handleChange}
                className="border p-2 w-full"
                required
              />
            </div>
            <div>
              <label className="block text-gray-700">Payment Status</label>
              <select
                name="paymentStatus"
                value={formData.paymentStatus}
                onChange={handleChange}
                className="border p-2 w-full"
                required
              >
                <option value="pending">Pending</option>
                <option value="completed">Completed</option>
                <option value="failed">Failed</option>
              </select>
            </div>
            <button
              type="submit"
              className="bg-blue-600 text-white py-2 px-4 rounded-full"
            >
              Update Booking
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default BookingUpdate;
