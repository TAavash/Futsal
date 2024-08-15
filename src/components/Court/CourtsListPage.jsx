import React, { useState, useEffect } from "react";
import axiosInstance from "../../Config/axiosConfig";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link } from "react-router-dom";
import Modal from "react-modal";

Modal.setAppElement("#root"); // Set the app root element for accessibility

const CourtList = () => {
  const [courts, setCourts] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [courtToDelete, setCourtToDelete] = useState(null);

  useEffect(() => {
    fetchCourts();
  }, []);

  const fetchCourts = async () => {
    try {
      const response = await axiosInstance.get("/api/courts");
      setCourts(response.data);
    } catch (error) {
      console.error("Error fetching courts:", error);
      toast.error("Error fetching courts");
    }
  };

  const openModal = (court) => {
    setCourtToDelete(court);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
    setCourtToDelete(null); // Clear the court to delete
  };

  const deleteCourt = async () => {
    if (!courtToDelete) return; // Ensure there is a court to delete
    try {
      await axiosInstance.delete(`/api/courts/${courtToDelete._id}`);
      setCourts(courts.filter((court) => court._id !== courtToDelete._id));
      toast.success("Court successfully deleted.");
      closeModal();
    } catch (error) {
      console.error("Error deleting court:", error);
      toast.error(
        error.response?.data?.msg ||
        "An error occurred while deleting the court."
      );
      closeModal();
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-8">
      <ToastContainer />
      <h2 className="text-2xl font-bold mb-6">Court List</h2>
      <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
        <thead className="bg-gray-200">
          <tr>
            <th className="text-left px-4 py-2">Name</th>
            <th className="text-left px-4 py-2">Location</th>
            <th className="text-left px-4 py-2">Price Per Hour</th>
            <th className="text-left px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {courts.map((court) => (
            <tr key={court._id} className="border-b">
              <td className="px-4 py-2">{court.name}</td>
              <td className="px-4 py-2">{court.location}</td>
              <td className="px-4 py-2">{court.pricePerHour}</td>
              <td className="px-4 py-2">
                <Link
                  to={`/court/edit/${court._id}`}
                  className="text-blue-500 underline mr-4"
                >
                  Edit
                </Link>
                <button
                  onClick={() => openModal(court)}
                  className="text-red-500 underline"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Confirm Delete Modal"
        className="modal"
        overlayClassName="overlay"
      >
        <h2 className="text-lg font-bold mb-4">Confirm Deletion</h2>
        <p>Are you sure you want to delete this court?</p>
        <div className="mt-4">
          <button
            onClick={deleteCourt}
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

export default CourtList;
