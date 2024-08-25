import React, { useEffect, useState } from "react";
import axiosInstance from "../../Config/axiosConfig"; // Adjust the import based on your axios setup
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Modal from "react-modal";
import bannerImg from "../../assets/foootsal.jpg"; // Import your banner image

Modal.setAppElement("#root"); // Set the app root element for accessibility

const MyBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [bookingToDelete, setBookingToDelete] = useState(null);
  const [loading, setLoading] = useState(true); // Add loading state

  useEffect(() => {
    const fetchBookings = async () => {
      setLoading(true);
      try {
        const userId = localStorage.getItem("user_id");
        if (!userId) {
          toast.error("User not logged in. Please log in.");
          return;
        }

        // Fetch bookings for the user
        const response = await axiosInstance.get(`/api/bookings/user`);
        setBookings(response.data);
      } catch (error) {
        toast.error("Failed to fetch bookings");
        console.error("Error fetching bookings:", error);
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
    if (!bookingToDelete) return; // Ensure there is a booking to delete
    try {
      await axiosInstance.delete(`/api/bookings/${bookingToDelete._id}`);
      setBookings(
        bookings.filter((booking) => booking._id !== bookingToDelete._id)
      );
      toast.success("Booking successfully deleted");
      closeModal();
    } catch (error) {
      toast.error("Failed to delete booking");
      console.error("Error deleting booking:", error);
      closeModal();
    }
  };

  if (loading) {
    return <p>Loading...</p>; // Show loading state
  }

  return (
    <div className="p-10 bg-white">
      <img src={bannerImg} alt="Banner" className="w-full h-48 object-cover mb-6" /> {/* Banner Image */}
      <ToastContainer />
      <h2 className="text-2xl font-bold mb-6">My Bookings</h2>
      <div className="space-y-4">
        {bookings.length > 0 ? (
          bookings.map((booking) =>
            booking && booking.court && booking.court.name ? ( // Ensure booking and booking.court are not null
              <div
                key={booking._id}
                className="p-4 bg-gray-100 rounded-lg shadow-lg flex justify-between items-center"
              >
                <div>
                  <h3 className="text-xl font-semibold">
                    Court Name: {booking.court.name}
                  </h3>
                  <p className="text-sm text-gray-600">
                    Booking Date: {booking.date} | {booking.startTime} -{" "}
                    {booking.endTime}
                  </p>
                  <p className="text-sm text-gray-600">
                    Total Price: {booking.totalPrice}
                  </p>
                  <p
                    className={`text-sm ${
                      booking.paymentStatus === "Pending"
                        ? "text-green-600"
                        : "text-yellow-600"
                    }`}
                  >
                    Payment Status: {booking.paymentStatus}
                  </p>
                </div>
                <button
                  className="bg-red-600 text-white py-2 px-4 rounded-full"
                  onClick={() => openModal(booking)}
                >
                  Delete
                </button>
              </div>
            ) : null // Handle cases where booking or booking.court is null
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

export default MyBookings;
