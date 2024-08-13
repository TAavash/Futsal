import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const CourtComponent = () => {
  const { id } = useParams();
  const [court, setCourt] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCourtDetails = async () => {
      try {
        const response = await axios.get(`/api/courts/${id}`);
        setCourt(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching court details:', error);
        setLoading(false);
      }
    };

    fetchCourtDetails();
  }, [id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!court) {
    return <div>Court not found</div>;
  }

  return (
    <div className="max-w-4xl mx-auto mt-10 p-6 bg-white rounded-lg shadow-lg">
      <h1 className="text-3xl font-bold mb-4">{court.name}</h1>
      <p className="text-gray-700 text-lg mb-2">{court.location}</p>
      <p className="text-gray-500 mb-4">{court.description}</p>

      <img src={`/uploads/${court.courtImage}`} alt={court.name} className="w-full h-64 object-cover rounded-lg mb-4" />

      <h2 className="text-2xl font-bold mb-2">Details</h2>
      <p><span className="font-bold">Type:</span> {court.courtType}</p>
      <p><span className="font-bold">Price per Hour:</span> {court.pricePerHour} {court.currency}</p>
      <p><span className="font-bold">Contact:</span> {court.contactPerson} ({court.contactNumber}, {court.email})</p>
      <p><span className="font-bold">Surface Type:</span> {court.surfaceType}</p>
      <p><span className="font-bold">Capacity:</span> {court.capacity} people</p>
      <p><span className="font-bold">Lighting Available:</span> {court.lighting ? 'Yes' : 'No'}</p>

      <h2 className="text-2xl font-bold mt-6 mb-2">Amenities</h2>
      <ul className="list-disc list-inside">
        {court.amenities.map((amenity, index) => (
          <li key={index}>{amenity}</li>
        ))}
      </ul>

      <h2 className="text-2xl font-bold mt-6 mb-2">Availability</h2>
      <ul className="list-disc list-inside">
        {court.availability.map((slot, index) => (
          <li key={index}>{slot.day}: {slot.startTime} - {slot.endTime}</li>
        ))}
      </ul>

      {court.gallery && court.gallery.length > 0 && (
        <>
          <h2 className="text-2xl font-bold mt-6 mb-2">Gallery</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {/* {court.gallery.map((image, index) => (
              <img key={index} src={`/uploads/${image}`} alt={`Gallery image ${index + 1}`} className="w-full h-40 object-cover rounded-lg" />
            ))} */}
          </div>
        </>
      )}
    </div>
  );
};

export default CourtComponent;
