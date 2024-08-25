import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import DefaultCourtImage from "../../assets/futsal-court.webp";

const CourtComponent = () => {
  const [courts, setCourts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState(""); // State for search query
  const [sortOrder, setSortOrder] = useState(""); // State for sort order
  const [debouncedSearchQuery, setDebouncedSearchQuery] = useState(""); // Debounced search query
  const navigate = useNavigate();

  // Debounce the search input
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearchQuery(searchQuery);
    }, 500); // Wait 500ms after the last keystroke

    return () => {
      clearTimeout(handler);
    };
  }, [searchQuery]);

  useEffect(() => {
    const fetchCourts = async () => {
      setLoading(true);
      try {
        const response = await axios.get("http://localhost:5000/api/courts", {
          params: {
            search: debouncedSearchQuery,
            sort: sortOrder,
          },
        });
        setCourts(response.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCourts();
  }, [debouncedSearchQuery, sortOrder]); // Re-fetch courts when debouncedSearchQuery or sortOrder changes

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="p-10 bg-white text-black">
      <h2 className="text-2xl font-bold mb-6">Our Futsal Courts</h2>

      {/* Search Input */}
      <input
        type="text"
        placeholder="Search by name or location"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="mb-4 p-2 border border-gray-300 rounded"
      />

      {/* Sort Options */}
      <select
        value={sortOrder}
        onChange={(e) => setSortOrder(e.target.value)}
        className="mb-4 p-2 border border-gray-300 rounded"
      >
        <option value="">Sort by Price</option>
        <option value="asc">Price: Low to High</option>
        <option value="desc">Price: High to Low</option>
      </select>

      <div className="grid grid-cols-1 gap-4">
        {courts.map((court) => (
          <div key={court._id} className="p-4 bg-gray-100 rounded-lg shadow-lg">
            <div className="flex justify-between items-center">
              <img
                src={court.courtImage || DefaultCourtImage}
                alt={court.name}
                className="w-full/2 h-32 rounded-lg mb-4 object-cover"
              />
              <div className="flex flex-col ml-10 items-center">
                <h3 className="text-xl font-semibold">{court.name}</h3>
                <h3 className="text-xl text-gray-600">
                  Location: {court.location || "N/A"}
                </h3>
                <p className="text-sm text-gray-600">
                  Price Per Hour: {court.currency} {court.pricePerHour}
                </p>
              </div>
              <div>
                <button
                  onClick={() => navigate(`/court/${court._id}`)}
                  className="mt-4 bg-green-600 text-white py-2 px-4 rounded-full"
                >
                  Book Now
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CourtComponent;
