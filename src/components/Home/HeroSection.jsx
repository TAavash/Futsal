import React, { useState } from "react";

const HeroSection = ({ onSearch }) => {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = () => {
    // Trigger the search function passed from the parent component
    onSearch(searchQuery);
  };

  return (
    <div className="text-center p-10 text-white">
      <h1 className="text-4xl font-bold mb-4">Futsal Book Garau!</h1>
      <p className="mb-8">Book Futsal Near You Safe & Quick.</p>
      <div className="relative max-w-lg mx-auto mb-8">
        <input
          type="text"
          placeholder="Search Courts by Name or Location"
          className="w-full p-3 rounded-full text-black border-none focus:ring-2 focus:ring-green-300"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button
          onClick={handleSearch}
          className="absolute right-0 top-0 mt-2 mr-2 bg-white text-green-500 rounded-full p-1"
        >
          Search
        </button>
      </div>
    </div>
  );
};

export default HeroSection;
