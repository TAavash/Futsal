// src/pages/UserProfilesList.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

const UserProfilesList = () => {
  const [profiles, setProfiles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfiles = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          throw new Error('No token found');
        }

        const response = await axios.get('http://localhost:5000/api/profile/all', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setProfiles(response.data.profiles);
      } catch (error) {
        console.error('Error fetching profiles:', error);
        toast.error(`Error fetching profiles: ${error.response?.data?.message || error.message}`);
      } finally {
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
                <img
                  src={profile.profileImage || 'path/to/default/image.png'}
                  alt={`${profile.name}'s profile`}
                  className="w-16 h-16 object-cover rounded-full border-2 border-gray-300 mr-4"
                />
                <div>
                  <h2 className="text-xl font-semibold">{profile.name}</h2>
                  <p className="text-sm text-gray-600">{profile.email}</p>
                  <p className="mt-2">{profile.bio || 'No bio available.'}</p>
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
