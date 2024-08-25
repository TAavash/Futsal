import React, { useEffect, useState } from "react";
import axiosInstance from "../../Config/axiosConfig";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Modal from "react-modal";
import { useNavigate } from "react-router-dom";

Modal.setAppElement("#root");

const AdminBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [bookingToDelete, setBookingToDelete] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBookings = async () => {
      setLoading(true);
      try {
        const response = await axiosInstance.get("/api/bookings");
        setBookings(response.data);
      } catch (error) {
        toast.error("Failed to fetch bookings");
        console.error("Error fetching bookings:", error.response ? error.response.data : error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, []);

  const openModal = (booking) => {
    setBookingToDelete(booking);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
    setBookingToDelete(null);
  };

  const handleDelete = async () => {
    if (!bookingToDelete) return;
    try {
      await axiosInstance.delete(`/api/bookings/${bookingToDelete._id}`);
      setBookings(bookings.filter((booking) => booking._id !== bookingToDelete._id));
      toast.success("Booking successfully deleted");
      closeModal();
    } catch (error) {
      toast.error("Failed to delete booking");
      console.error("Error deleting booking:", error);
      closeModal();
    }
  };

  const handleUpdate = (bookingId) => {
    navigate(`/booking/update/${bookingId}`);
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="p-10 bg-white">
      <ToastContainer />
      <h2 className="text-2xl font-bold mb-6">Admin Bookings</h2>
      <div className="space-y-4">
        {bookings.length > 0 ? (
          bookings.map(
            (booking) =>
              booking && booking.court && booking.court.name && (
                <div
                  key={booking._id}
                  className="p-4 bg-gray-100 rounded-lg shadow-lg flex justify-between items-center"
                >
                  <div>
                    <h3 className="text-xl font-semibold">User Name: {booking.user.name}</h3>
                    <h3 className="text-xl font-semibold">Court Name: {booking.court.name}</h3>
                    <p className="text-sm text-gray-600">
                      Booking Date: {booking.date} | {booking.startTime} - {booking.endTime}
                    </p>
                    <p className="text-sm text-gray-600">Total Price: {booking.totalPrice}</p>
                    <p
                      className={`text-sm ${
                        booking.paymentStatus === "Pending" ? "text-green-600" : "text-yellow-600"
                      }`}
                    >
                      Payment Status: {booking.paymentStatus}
                    </p>
                  </div>
                  <div className="flex space-x-4">
                    <button
                      className="bg-blue-600 text-white py-2 px-4 rounded-full"
                      onClick={() => handleUpdate(booking._id)}
                    >
                      Update
                    </button>
                    <button
                      className="bg-red-600 text-white py-2 px-4 rounded-full"
                      onClick={() => openModal(booking)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              )
          )
        ) : (
          <p className="text-gray-600">No bookings available.</p>
        )}
      </div>

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Confirm Delete Modal"
        className="modal"
        overlayClassName="overlay"
      >
        <h2 className="text-lg font-bold mb-4">Confirm Deletion</h2>
        <p>Are you sure you want to delete this booking?</p>
        <div className="mt-4">
          <button
            onClick={handleDelete}
            className="bg-red-600 text-white py-2 px-4 rounded-full mr-4"
          >
            Confirm
          </button>
          <button
            onClick={closeModal}
            className="bg-gray-600 text-white py-2 px-4 rounded-full"
          >
            Cancel
          </button>
        </div>
      </Modal>
    </div>
  );
};

export default AdminBookings;
