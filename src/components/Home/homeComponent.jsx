import React, { useState } from 'react';
import HeroSection from "./HeroSection";
import CourtCard from "../Court/CourtCard";

function HomeComponent() {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  return (
    <div className="bg-green-500 min-h-screen">
      <HeroSection onSearch={handleSearch} />
      <CourtCard searchQuery={searchQuery} />
    </div>
  );
}

export default HomeComponent;
