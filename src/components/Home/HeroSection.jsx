import React from 'react';

const HeroSection = () => {
  return (
    <div className="text-center p-10 text-white">
      <h1 className="text-4xl font-bold mb-4">Futsal Book Garau!</h1>
      <p className="mb-8">Book Futsal Near You Safe & Quick.</p>
      <div className="relative max-w-lg mx-auto mb-8">
        <input 
          type="text" 
          placeholder="Courts" 
          className="w-full p-3 rounded-full text-black border-none focus:ring-2 focus:ring-green-300"
        />
        <button className="absolute right-0 top-0 mt-2 mr-2 bg-white text-green-500 rounded-full p-1">Search</button>
      </div>
      <div className="flex justify-center space-x-4">
        <button className="bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-full">Courts</button>
        <button className="bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-full">Booking</button>
        <button className="bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-full">Calendar</button>
      </div>
    </div>
  );
};

export default HeroSection;
