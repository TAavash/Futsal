import React, { useState, useEffect } from "react";
import axiosInstance from "../../Config/axiosConfig";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link } from "react-router-dom";

const CourtList = () => {
  const [courts, setCourts] = useState([]);

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

const deleteCourt = async (id) => {
  try {
    await axiosInstance.delete(`/api/courts/${id}`);
    toast.success("Court successfully deleted.");
    // Optionally, refresh or navigate to another page
  } catch (error) {
    console.error("Error deleting court:", error);
    toast.error(error.response?.data?.msg || "An error occurred while deleting the court.");
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
                  onClick={() => deleteCourt(court._id)}
                  className="text-red-500 underline"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CourtList;
