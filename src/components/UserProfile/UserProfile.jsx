import React, { useEffect, useState } from 'react';
import axios from 'axios';

const UserProfile = () => {
    const [profile, setProfile] = useState(null);
    const [user, setUser] = useState(null);
    const [editMode, setEditMode] = useState(false);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [bio, setBio] = useState('');
    const [profileImage, setProfileImage] = useState(null);

    // Get user_id from local storage
    const userId = localStorage.getItem('user_id');

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const response = await axios.get(`/api/profile/${userId}`, {
                    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
                });
                setProfile(response.data);
                setUser(response.data.user);
                setName(response.data.name || '');
                setEmail(response.data.email || '');
                setBio(response.data.bio || '');
            } catch (error) {
                console.error('Error fetching profile:', error);
            }
        };

        fetchProfile();
    }, [userId]);

    const handleNameChange = (e) => setName(e.target.value);
    const handleEmailChange = (e) => setEmail(e.target.value);
    const handleBioChange = (e) => setBio(e.target.value);
    const handleFileChange = (e) => setProfileImage(e.target.files[0]);

    const handleUpdateProfile = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('name', name);
        formData.append('email', email);
        formData.append('bio', bio);
        if (profileImage) formData.append('profileImage', profileImage);

        try {
            await axios.put('/api/profile/update', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            });
            alert('Profile updated successfully!');
            setEditMode(false);
            const response = await axios.get(`/api/profile/${userId}`, {
                headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
            });
            setProfile(response.data);
        } catch (error) {
            console.error('Error updating profile:', error);
        }
    };

    if (!profile || !user) return <div>Loading...</div>;

    return (
        <div className="max-w-4xl mx-auto p-4">
            <div className="flex items-center space-x-4">
                <img
                    src={profile.profileImage || 'default-profile.png'}
                    alt="Profile"
                    className="w-24 h-24 rounded-full object-cover"
                />
                <div>
                    <h1 className="text-2xl font-bold">{user.name}</h1>
                    <p className="text-gray-600">{user.email}</p>
                </div>
            </div>
            <div className="mt-6">
                {editMode ? (
                    <form onSubmit={handleUpdateProfile} encType="multipart/form-data">
                        <h2 className="text-xl font-semibold">Edit Profile</h2>
                        <input
                            type="text"
                            className="w-full mt-2 p-2 border border-gray-300 rounded"
                            value={name}
                            onChange={handleNameChange}
                            placeholder="Update your name"
                        />
                        <input
                            type="email"
                            className="w-full mt-2 p-2 border border-gray-300 rounded"
                            value={email}
                            onChange={handleEmailChange}
                            placeholder="Update your email"
                            disabled
                        />
                        <textarea
                            className="w-full mt-2 p-2 border border-gray-300 rounded"
                            value={bio}
                            onChange={handleBioChange}
                            placeholder="Update your bio"
                        />
                        <input
                            type="file"
                            className="mt-2"
                            onChange={handleFileChange}
                        />
                        <button
                            type="submit"
                            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
                        >
                            Save Changes
                        </button>
                    </form>
                ) : (
                    <>
                        <h2 className="text-xl font-semibold">Bio</h2>
                        <p className="mt-2 text-gray-800">{profile.bio || 'No bio available.'}</p>
                        <button
                            onClick={() => setEditMode(true)}
                            className="mt-4 px-4 py-2 bg-green-500 text-white rounded"
                        >
                            Edit Profile
                        </button>
                    </>
                )}
            </div>
        </div>
    );
};

export default UserProfile;
