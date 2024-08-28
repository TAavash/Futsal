import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Ffotsal from "../../assets/ffotsal.png";

const UserProfile = () => {
  const [profile, setProfile] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  const [password, setPassword] = useState(null);

  const userId = localStorage.getItem("user_id");

  useEffect(() => {
    const fetchProfile = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        toast.error("No token found. Please log in.");
        return;
      }

      try {
        const response = await axios.get(
          `http://localhost:5000/api/profile/${userId}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        const profileData = response.data.profile;
        setProfile(profileData);
        setName(profileData.name || "");
        setEmail(profileData.email || "");
        setRole(profileData.role || "");
        setPassword(profileData.password || Ffotsal);
      } catch (error) {
        console.error("Error fetching profile:", error);
        toast.error("Failed to fetch profile data.");
      }
    };

    fetchProfile();
  }, [userId]);

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", name);
    formData.append("email", email);
    formData.append("role", role);
    if (password) formData.append("password", password);

    try {
      const response = await axios.put(
        "http://localhost:5000/api/profile/update", // Full URL to ensure no issues with base URL
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${localStorage.getItem("token")}`, // Ensure the token is correctly fetched
          },
        }
      );
      toast.success("Profile updated successfully!");
      setProfile(response.data.profile);
      setEditMode(false);
    } catch (error) {
      if (error.response && error.response.status === 401) {
        toast.error("Unauthorized. Please log in again.");
      } else {
        toast.error("Error updating profile.");
      }
      console.error("Error updating profile:", error);
    }
  };

  if (!profile) return <div>Loading...</div>;

  return (
    <div className="absolute top-[20%] left-1/2 -translate-x-1/2 bg-white shadow-gray-600 shadow-xl rounded-lg p-6 pb-3 w-full max-w-4xl">
      {/* Toast Notification Container */}
      <ToastContainer />

      {/* Profile Section */}
      <div className="bg-gradient-to-r from-black via-gray-500 to-white p-4 flex items-center rounded-lg mb-6">
        <img
          src={Ffotsal}
          className="w-24 h-24 object-cover rounded-full border-4 border-white mr-4"
          alt="profile"
        />
        <div className="text-white">
          <h2 className="text-2xl font-semibold">{name}</h2>
          <p className="text-lg">{email}</p>
        </div>
      </div>

      {/* Profile Information */}
      <div className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-gray-100 p-3 rounded-lg shadow-md">
            <h3 className="text-base font-semibold text-gray-800 mb-1">Name</h3>
            <p className="text-gray-700 text-sm">{name}</p>
          </div>
          <div className="bg-gray-100 p-3 rounded-lg shadow-md">
            <h3 className="text-base font-semibold text-gray-800 mb-1">
              Email
            </h3>
            <p className="text-gray-700 text-sm">{email}</p>
          </div>
          <div className="bg-gray-100 p-3 rounded-lg shadow-md">
            <h3 className="text-base font-semibold text-gray-800 mb-1">role</h3>
            <p className="text-gray-700 text-sm">
              {role || "No role available."}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
