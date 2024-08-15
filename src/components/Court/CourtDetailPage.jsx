import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { FaMapMarkerAlt, FaMoneyBillWave, FaClipboardList, FaEnvelope, FaPhone, FaLightbulb, FaUsers, FaClock } from 'react-icons/fa';
import DefaultCourtImage from '../../assets/futsal-court.webp';
import BookingForm from '../AddBooking/BookingForm'; // Import the BookingForm component

const CourtDetailPage = () => {
  const { id } = useParams();
  const [court, setCourt] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showBookingForm, setShowBookingForm] = useState(false); // State to control form visibility

  useEffect(() => {
    const fetchCourt = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/courts/${id}`);
        setCourt(response.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCourt();
  }, [id]);

  if (loading) return <p className="text-center text-gray-500">Loading...</p>;
  if (error) return <p className="text-center text-red-500">Error: {error}</p>;
  if (!court) return <p className="text-center text-gray-500">No court details available.</p>;

  return (
    <div className="container mx-auto p-4">
      <div className="bg-white text-black rounded-lg shadow-lg p-6">
        <img 
          src={court.courtImage || DefaultCourtImage} 
          alt={court.name} 
          className="w-full h-64 object-cover rounded-lg mb-6"
        />
        <h2 className="text-3xl font-bold mb-4 text-center">{court.name}</h2>

        <div className="space-y-4">
          <div className="flex items-center text-lg">
            <FaMapMarkerAlt className="text-blue-500 mr-2" />
            <span><strong>Location:</strong> {court.location}</span>
          </div>
          <div className="flex items-center text-lg">
            <FaMoneyBillWave className="text-green-500 mr-2" />
            <span><strong>Price per Hour:</strong> {court.pricePerHour} {court.currency || 'NPR'}</span>
          </div>
          <div className="flex items-center text-lg">
            <FaClipboardList className="text-purple-500 mr-2" />
            <span><strong>Type:</strong> {court.courtType || 'Not specified'}</span>
          </div>
          <div className="flex items-center text-lg">
            <FaUsers className="text-yellow-500 mr-2" />
            <span><strong>Capacity:</strong> {court.capacity || 'Not specified'}</span>
          </div>
          <div className="flex items-center text-lg">
            <FaLightbulb className="text-orange-500 mr-2" />
            <span><strong>Lighting:</strong> {court.lighting ? 'Yes' : 'No'}</span>
          </div>
          <div className="flex items-center text-lg">
            <FaPhone className="text-green-500 mr-2" />
            <span><strong>Contact Number:</strong> {court.contactNumber || 'Not provided'}</span>
          </div>
          <div className="flex items-center text-lg">
            <FaEnvelope className="text-red-500 mr-2" />
            <span><strong>Email:</strong> {court.email || 'Not provided'}</span>
          </div>
          <div className="text-lg">
            <p className="font-semibold">Description:</p>
            <p>{court.description || 'No description available'}</p>
          </div>
          <div className="text-lg">
            <p className="font-semibold">Surface Type:</p>
            <p>{court.surfaceType || 'Not specified'}</p>
          </div>
          <div className="text-lg">
            <p className="font-semibold">Amenities:</p>
            <p>{court.amenities.length ? court.amenities.join(', ') : 'No amenities listed.'}</p>
          </div>
        </div>

        {/* Availability Table */}
        <h3 className="text-2xl font-semibold mt-6 mb-4 flex items-center">
          <FaClock className="text-blue-500 mr-2" /> Availability
        </h3>
        <table className="min-w-full bg-gray-200 border border-gray-300 rounded-lg mb-6">
          <thead>
            <tr className="bg-gray-300 text-gray-700">
              <th className="py-2 px-4 border-b">Day</th>
              <th className="py-2 px-4 border-b">Start Time</th>
              <th className="py-2 px-4 border-b">End Time</th>
            </tr>
          </thead>
          <tbody>
            {court.availability && court.availability.length > 0 ? (
              court.availability.map((slot, index) => (
                <tr key={index}>
                  <td className="py-2 px-4 border-b">{slot.day}</td>
                  <td className="py-2 px-4 border-b">{slot.startTime}</td>
                  <td className="py-2 px-4 border-b">{slot.endTime}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="3" className="py-2 px-4 text-center">No availability information</td>
              </tr>
            )}
          </tbody>
        </table>

        <div className="text-center">
          <button 
            onClick={() => setShowBookingForm(true)} 
            className="mt-6 bg-green-600 text-white py-2 px-6 rounded-full hover:bg-green-700 transition"
          >
            Book Now
          </button>
        </div>

        {showBookingForm && (
          <div className="mt-10">
            <BookingForm courtId={court._id} courtName={court.name} pricePerHour={court.pricePerHour} currency={court.currency} />
          </div>
        )}
      </div>
    </div>
  );
};

export default CourtDetailPage;
