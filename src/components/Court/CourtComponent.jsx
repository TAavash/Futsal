// src/components/Court/CourtComponent.jsx

import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchCourtById, createBooking } from '../../utils/Api';
import { useAuthContext } from '../../features/auth/authContext'; // Correct the import path here

const CourtComponent = () => {
  const { id } = useParams();
  const [court, setCourt] = useState(null);
  const [bookingTime, setBookingTime] = useState({ startTime: '', endTime: '' });
  const { user } = useAuthContext();

  useEffect(() => {
    const fetchCourt = async () => {
      const response = await fetchCourtById(id);
      setCourt(response.data);
    };
    fetchCourt();
  }, [id]);

  const handleBooking = async () => {
    const data = {
      court: id,
      date: new Date(), // you may want to handle date selection
      startTime: bookingTime.startTime,
      endTime: bookingTime.endTime,
      user: user._id
    };
    await createBooking(data);
    alert('Booking successful!');
  };

  if (!court) return <div>Loading...</div>;

  return (
    <div>
      <h1>{court.name}</h1>
      <p>{court.location}</p>
      <p>{court.pricePerHour} per hour</p>
      <img src={court.courtImage} alt={court.name} />
      
      {/* Booking Form */}
      <h2>Book this Court</h2>
      <input
        type="text"
        placeholder="Start Time"
        value={bookingTime.startTime}
        onChange={(e) => setBookingTime({ ...bookingTime, startTime: e.target.value })}
      />
      <input
        type="text"
        placeholder="End Time"
        value={bookingTime.endTime}
        onChange={(e) => setBookingTime({ ...bookingTime, endTime: e.target.value })}
      />
      <button onClick={handleBooking}>Book Now</button>
    </div>
  );
};

export default CourtComponent;
