import React from 'react';

const BookingList = () => {
  const bookings = [
    {
      id: 1,
      name: 'Castelmola Futsal',
      date: '2024-08-15',
      time: '18:00 - 19:00',
      price: 'Rp 250.000',
      status: 'Confirmed'
    },
    {
      id: 2,
      name: 'AS Futsal',
      date: '2024-08-20',
      time: '19:00 - 20:00',
      price: 'Rp 200.000',
      status: 'Pending'
    }
  ];

  return (
    <div className="p-10 bg-white rounded-t-3xl">
      <h2 className="text-2xl font-bold mb-6">My Bookings</h2>
      <div className="space-y-4">
        {bookings.map((booking) => (
          <div key={booking.id} className="p-4 bg-gray-100 rounded-lg shadow-lg flex justify-between items-center">
            <div>
              <h3 className="text-xl font-semibold">{booking.name}</h3>
              <p className="text-sm text-gray-600">{booking.date} | {booking.time}</p>
              <p className="text-sm text-gray-600">Harga: {booking.price}</p>
              <p className={`text-sm ${booking.status === 'Confirmed' ? 'text-green-600' : 'text-yellow-600'}`}>Status: {booking.status}</p>
            </div>
            <button className="bg-green-600 text-white py-2 px-4 rounded-full">View Details</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BookingList;
