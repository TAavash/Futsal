import React, { useState } from "react";
import axios from "axios"; // Import axios for HTTP requests

const CourtForm = () => {
  const [courtData, setCourtData] = useState({
    name: "",
    location: "",
    description: "",
    courtType: "",
    pricePerHour: "",
    currency: "NPR",
    courtImage: "",
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
    setCourtData({
      ...courtData,
      availability: [
        ...courtData.availability,
        { day: "", startTime: "", endTime: "" },
      ],
    });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:5000/courts",
        courtData
      );
      console.log("Court added successfully:", response.data);

      // Clear form after successful submission
      setCourtData({
        name: "",
        location: "",
        description: "",
        courtType: "",
        pricePerHour: "",
        currency: "USD",
        courtImage: "",
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
    } catch (error) {
      console.error("Error adding court:", error);
      // You might want to handle errors more gracefully
    }
  };

  return (
    <form
      onSubmit={handleFormSubmit}
      className="max-w-3xl mx-auto p-8 bg-white shadow-md rounded-lg"
    >
      <h2 className="text-2xl font-bold mb-6">Add New Court</h2>

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
          Court Image URL
        </label>
        <input
          type="text"
          id="courtImage"
          name="courtImage"
          value={courtData.courtImage}
          onChange={handleInputChange}
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
            setCourtData({ ...courtData, gallery: e.target.value.split("\n") })
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
        <label className="block text-sm font-medium text-gray-700">
          Availability
        </label>
        {courtData.availability.map((slot, index) => (
          <div key={index} className="flex space-x-4 mb-2">
            <input
              type="text"
              name="day"
              value={slot.day}
              onChange={(e) => handleAvailabilityChange(index, e)}
              placeholder="Day"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
            />
            <input
              type="time"
              name="startTime"
              value={slot.startTime}
              onChange={(e) => handleAvailabilityChange(index, e)}
              placeholder="Start Time"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
            />
            <input
              type="time"
              name="endTime"
              value={slot.endTime}
              onChange={(e) => handleAvailabilityChange(index, e)}
              placeholder="End Time"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
            />
          </div>
        ))}
        <button
          type="button"
          onClick={addAvailabilityField}
          className="text-blue-500 mt-2"
        >
          + Add Availability
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
        <label className="inline-flex items-center">
          <input
            type="checkbox"
            name="lighting"
            checked={courtData.lighting}
            onChange={handleCheckboxChange}
            className="form-checkbox"
          />
          <span className="ml-2 text-sm font-medium text-gray-700">
            Lighting Available
          </span>
        </label>
      </div>

      <button
        type="submit"
        className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-500 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
      >
        Submit
      </button>
    </form>
  );
};

export default CourtForm;
