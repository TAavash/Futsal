import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const UserProfilesList = () => {
  const [profiles, setProfiles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfiles = async () => {
      const token = localStorage.getItem("token");
      console.log("Token used in request:", token); // Log the token to ensure it is correct

      if (!token) {
        toast.error("No token found. Please log in.");
        setLoading(false);
        return;
      }

      try {
        const response = await axios.get(
          `http://localhost:5000/api/profile/all`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        // Ensure the data structure is handled correctly
        setProfiles(response.data.profiles || []);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching profiles:", error);
        toast.error(
          `Failed to fetch profiles: ${
            error.response?.data?.message || error.message
          }`
        );
        setLoading(false);
      }
    };

    fetchProfiles();
  }, []);

  if (loading) return <div>Loading...</div>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">All User Profiles</h1>
      {profiles.length > 0 ? (
        <ul className="space-y-4">
          {profiles.map((profile) => (
            <li key={profile._id} className="border p-4 rounded-lg shadow-md">
              <div className="flex items-center">
                <div>
                  <h2 className="text-xl font-semibold">{profile.name}</h2>
                  <p className="text-sm text-gray-600">{profile.email}</p>
                  <p className="mt-2">{profile.role}</p>
                </div>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p>No profiles found.</p>
      )}
    </div>
  );
};

export default UserProfilesList;
