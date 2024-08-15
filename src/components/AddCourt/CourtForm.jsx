import React, { useState, useEffect } from "react";
import axiosInstance from "../../Config/axiosConfig"; // Adjust the import based on your axios setup
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useParams, useNavigate } from "react-router-dom";

const CourtForm = () => {
  const { id } = useParams(); // Get court ID from URL
  const navigate = useNavigate(); // Hook for navigation
  const [courtData, setCourtData] = useState({
    name: "",
    location: "",
    description: "",
    courtType: "",
    pricePerHour: "",
    currency: "NPR",
    courtImage: null,
    gallery: [],
    amenities: [],
    contactPerson: "",
    contactNumber: "",
    email: "",
    availability: [],
    surfaceType: "",
    capacity: "",
    lighting: false,
  });

  useEffect(() => {
    if (id) {
      const fetchCourt = async () => {
        try {
          const response = await axiosInstance.get(`/api/courts/${id}`);
          setCourtData(response.data);
        } catch (err) {
          toast.error("Failed to fetch court details.");
        }
      };

      fetchCourt();
    }
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCourtData({
      ...courtData,
      [name]: value,
    });
  };

  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    setCourtData({
      ...courtData,
      [name]: checked,
    });
  };

  const handleFileChange = (e) => {
    setCourtData({
      ...courtData,
      courtImage: e.target.files[0],
    });
  };

  const handleAvailabilityChange = (index, e) => {
    const { name, value } = e.target;
    const updatedAvailability = [...courtData.availability];
    updatedAvailability[index] = {
      ...updatedAvailability[index],
      [name]: value,
    };
    setCourtData({
      ...courtData,
      availability: updatedAvailability,
    });
  };

  const addAvailabilityField = () => {
    setCourtData((courtData) => ({
      ...courtData,
      availability: [
        ...courtData.availability,
        { day: "", startTime: "", endTime: "" },
      ],
    }));
  };
  const handleFormSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    data.append("name", courtData.name);
    data.append("location", courtData.location);
    data.append("description", courtData.description);
    data.append("courtType", courtData.courtType);
    data.append("pricePerHour", courtData.pricePerHour);
    data.append("currency", courtData.currency);
    data.append("courtImage", courtData.courtImage);
    data.append("gallery", JSON.stringify(courtData.gallery)); // Convert array to JSON
    data.append("amenities", JSON.stringify(courtData.amenities));
    data.append("contactPerson", courtData.contactPerson);
    data.append("contactNumber", courtData.contactNumber);
    data.append("email", courtData.email);
    data.append("availability", JSON.stringify(courtData.availability));
    data.append("surfaceType", courtData.surfaceType);
    data.append("capacity", courtData.capacity);
    data.append("lighting", courtData.lighting);

    try {
      let response;
      if (id) {
        // Update existing court
        response = await axiosInstance.put(`/api/courts/${id}`, data, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
      } else {
        // Add new court
        response = await axiosInstance.post("/api/courts", data, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
      }
      console.log("Response:", response);
      // Add a delay before showing the success toast
      setTimeout(() => {
        toast.success(response.data.msg || "Operation successful"); // Fallback message
      }, 1000); // 1000 milliseconds = 1 second delay
  
      navigate("/court/list"); // Redirect after successful submission
    } catch (error) {
      console.error("Error saving court:", error);
      toast.error(error.response?.data?.msg || "An error occurred");
    }
  };

  return (
    <form
      onSubmit={handleFormSubmit}
      className="max-w-3xl mx-auto p-8 bg-white shadow-md rounded-lg"
    >
      <ToastContainer />
      <h2 className="text-2xl font-bold mb-6">
        {id ? "Edit Court" : "Add New Court"}
      </h2>

      <div className="mb-4">
        <label
          htmlFor="name"
          className="block text-sm font-medium text-gray-700"
        >
          Court Name
        </label>
        <input
          type="text"
          id="name"
          name="name"
          value={courtData.name}
          onChange={handleInputChange}
          required
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
        />
      </div>

      <div className="mb-4">
        <label
          htmlFor="location"
          className="block text-sm font-medium text-gray-700"
        >
          Location
        </label>
        <input
          type="text"
          id="location"
          name="location"
          value={courtData.location}
          onChange={handleInputChange}
          required
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
        />
      </div>

      <div className="mb-4">
        <label
          htmlFor="description"
          className="block text-sm font-medium text-gray-700"
        >
          Description
        </label>
        <textarea
          id="description"
          name="description"
          value={courtData.description}
          onChange={handleInputChange}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
        />
      </div>

      <div className="mb-4">
        <label
          htmlFor="courtType"
          className="block text-sm font-medium text-gray-700"
        >
          Court Type
        </label>
        <input
          type="text"
          id="courtType"
          name="courtType"
          value={courtData.courtType}
          onChange={handleInputChange}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
        />
      </div>

      <div className="mb-4">
        <label
          htmlFor="pricePerHour"
          className="block text-sm font-medium text-gray-700"
        >
          Price Per Hour
        </label>
        <input
          type="number"
          id="pricePerHour"
          name="pricePerHour"
          value={courtData.pricePerHour}
          onChange={handleInputChange}
          required
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
        />
      </div>

      <div className="mb-4">
        <label
          htmlFor="currency"
          className="block text-sm font-medium text-gray-700"
        >
          Currency
        </label>
        <select
          id="currency"
          name="currency"
          value={courtData.currency}
          onChange={handleInputChange}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
        >
          <option value="NPR">NPR</option>
          <option value="USD">USD</option>
        </select>
      </div>

      <div className="mb-4">
        <label
          htmlFor="courtImage"
          className="block text-sm font-medium text-gray-700"
        >
          Court Image
        </label>
        <input
          type="file"
          id="courtImage"
          name="courtImage"
          onChange={handleFileChange}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
        />
      </div>

      <div className="mb-4">
        <label
          htmlFor="gallery"
          className="block text-sm font-medium text-gray-700"
        >
          Gallery Image URLs
        </label>
        <textarea
          id="gallery"
          name="gallery"
          value={courtData.gallery.join("\n")}
          onChange={(e) =>
            setCourtData({
              ...courtData,
              gallery: e.target.value.split("\n"),
            })
          }
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
        />
      </div>

      <div className="mb-4">
        <label
          htmlFor="amenities"
          className="block text-sm font-medium text-gray-700"
        >
          Amenities
        </label>
        <textarea
          id="amenities"
          name="amenities"
          value={courtData.amenities.join(", ")}
          onChange={(e) =>
            setCourtData({
              ...courtData,
              amenities: e.target.value.split(", "),
            })
          }
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
        />
      </div>

      <div className="mb-4">
        <label
          htmlFor="contactPerson"
          className="block text-sm font-medium text-gray-700"
        >
          Contact Person
        </label>
        <input
          type="text"
          id="contactPerson"
          name="contactPerson"
          value={courtData.contactPerson}
          onChange={handleInputChange}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
        />
      </div>

      <div className="mb-4">
        <label
          htmlFor="contactNumber"
          className="block text-sm font-medium text-gray-700"
        >
          Contact Number
        </label>
        <input
          type="text"
          id="contactNumber"
          name="contactNumber"
          value={courtData.contactNumber}
          onChange={handleInputChange}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
        />
      </div>

      <div className="mb-4">
        <label
          htmlFor="email"
          className="block text-sm font-medium text-gray-700"
        >
          Email
        </label>
        <input
          type="email"
          id="email"
          name="email"
          value={courtData.email}
          onChange={handleInputChange}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
        />
      </div>

      <div className="mb-4">
        <label
          htmlFor="availability"
          className="block text-sm font-medium text-gray-700"
        >
          Availability
        </label>
        {courtData.availability.map((availability, index) => (
          <div key={index} className="mb-2">
            <input
              type="text"
              name="day"
              value={availability.day}
              onChange={(e) => handleAvailabilityChange(index, e)}
              placeholder="Day"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
            />
            <input
              type="time"
              name="startTime"
              value={availability.startTime}
              onChange={(e) => handleAvailabilityChange(index, e)}
              placeholder="Start Time"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
            />
            <input
              type="time"
              name="endTime"
              value={availability.endTime}
              onChange={(e) => handleAvailabilityChange(index, e)}
              placeholder="End Time"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
            />
          </div>
        ))}
        <button
          type="button"
          onClick={addAvailabilityField}
          className="mt-1 block text-blue-500 underline"
        >
          Add Availability
        </button>
      </div>

      <div className="mb-4">
        <label
          htmlFor="surfaceType"
          className="block text-sm font-medium text-gray-700"
        >
          Surface Type
        </label>
        <input
          type="text"
          id="surfaceType"
          name="surfaceType"
          value={courtData.surfaceType}
          onChange={handleInputChange}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
        />
      </div>

      <div className="mb-4">
        <label
          htmlFor="capacity"
          className="block text-sm font-medium text-gray-700"
        >
          Capacity
        </label>
        <input
          type="number"
          id="capacity"
          name="capacity"
          value={courtData.capacity}
          onChange={handleInputChange}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
        />
      </div>

      <div className="mb-4">
        <label
          htmlFor="lighting"
          className="block text-sm font-medium text-gray-700"
        >
          Lighting
        </label>
        <input
          type="checkbox"
          id="lighting"
          name="lighting"
          checked={courtData.lighting}
          onChange={handleCheckboxChange}
          className="mt-1"
        />
      </div>

      <button
        type="submit"
        className="w-full px-4 py-2 bg-blue-500 text-white font-bold rounded-md shadow-md hover:bg-blue-600"
      >
        {id ? "Update Court" : "Add Court"}
      </button>
    </form>
  );
};

export default CourtForm;
