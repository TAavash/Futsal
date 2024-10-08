import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import DefaultCourtImage from '../../assets/futsal-court.webp';

const CourtCard = ({ searchQuery = '', sortOrder = 'asc' }) => {
  const [courts, setCourts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCourts = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/courts');
        setCourts(response.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCourts();
  }, []);

  const filteredCourts = courts
    .filter(court => {
      const nameMatch = court.name?.toLowerCase().includes(searchQuery.toLowerCase());
      const locationMatch = court.location?.toLowerCase().includes(searchQuery.toLowerCase());
      return nameMatch || locationMatch;
    })
    .sort((a, b) => {
      if (sortOrder === 'asc') {
        return a.pricePerHour - b.pricePerHour;
      } else {
        return b.pricePerHour - a.pricePerHour;
      }
    })
    .slice(0, 4); // Limit to 4 courts

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="p-10 bg-white rounded-t-3xl">
      <h2 className="text-2xl font-bold mb-6">Futsal Courts</h2>
      <div className="grid grid-cols-2 gap-4">
        {filteredCourts.map((court) => (
          <div key={court._id} className="p-4 bg-gray-100 rounded-lg shadow-lg">
            <img
              src={court.courtImage || DefaultCourtImage}
              alt={court.name}
              className="w-full h-32 rounded-lg mb-4 object-cover"
            />
            <h3 className="text-xl font-semibold">{court.name}</h3>
            <p className="text-sm text-gray-600">Location: {court.location || 'N/A'}</p>
            <p className="text-sm text-gray-600">Price: {court.currency} {court.pricePerHour}</p>
            <button
              onClick={() => navigate(`/court/${court._id}`)}
              className="mt-4 bg-green-600 text-white py-2 px-4 rounded-full"
            >
              Book Now
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CourtCard;
