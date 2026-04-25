import { useState } from "react";
import { motion } from "framer-motion";
import { Camera } from "lucide-react";
import axios from "axios";
import Sidebar from "../components/Sidebar";

function Profile() {
  const storedUser = JSON.parse(localStorage.getItem("user")) || {};

  const [username, setUsername] = useState(storedUser.username || "");
  const [email, setEmail] = useState(storedUser.email || "");
  const [image, setImage] = useState(
    storedUser.image || "https://i.pravatar.cc/150"
  );

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [loadingProfile, setLoadingProfile] = useState(false);
  const [loadingPassword, setLoadingPassword] = useState(false);

  // Upload Image Preview
  const handleImageUpload = (e) => {
    const file = e.target.files[0];

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  // ✅ PROFILE UPDATE (UPDATED ROUTE)
  const handleProfileUpdate = async () => {
    if (!storedUser.id) {
      alert("User not found. Please login again.");
      return;
    }

    if (!username.trim() || !email.trim()) {
      alert("Username and email are required");
      return;
    }

    try {
      setLoadingProfile(true);

      const res = await axios.put(
        `http://localhost:5000/api/profile/update/${storedUser.id}`, // ✅ NEW ROUTE
        {
          username: username.trim(),
          email: email.trim(),
        }
      );

      if (res.data.success) {
        const updatedUser = {
          ...storedUser,
          ...res.data.user,
          image,
        };

        localStorage.setItem("user", JSON.stringify(updatedUser));
        alert("Profile updated successfully!");
      } else {
        alert("Profile update failed");
      }
    } catch (err) {
      console.log("Profile update error:", err);
      alert(err.response?.data?.message || "Failed to update profile");
    } finally {
      setLoadingProfile(false);
    }
  };

  // ✅ PASSWORD UPDATE (UPDATED ROUTE)
  const handlePasswordUpdate = async () => {
    if (!storedUser.id) {
      alert("User not found. Please login again.");
      return;
    }

    if (!currentPassword || !newPassword || !confirmPassword) {
      alert("Please fill all password fields");
      return;
    }

    if (newPassword.length < 6) {
      alert("New password must be at least 6 characters");
      return;
    }

    if (newPassword !== confirmPassword) {
      alert("New password and confirm password do not match");
      return;
    }

    try {
      setLoadingPassword(true);

      const res = await axios.put(
        `http://localhost:5000/api/password/change/${storedUser.id}`, // ✅ NEW ROUTE
        {
          currentPassword,
          newPassword,
        }
      );

      if (res.data.success) {
        setCurrentPassword("");
        setNewPassword("");
        setConfirmPassword("");
        alert("Password changed successfully!");
      } else {
        alert("Password update failed");
      }
    } catch (err) {
      console.log("Password update error:", err);
      alert(err.response?.data?.message || "Failed to change password");
    } finally {
      setLoadingPassword(false);
    }
  };

  return (
    <div className="flex min-h-screen">
      <Sidebar />

      <div className="flex-1 flex items-center justify-center p-8 bg-gradient-to-br from-blue-100 to-indigo-200">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white shadow-xl rounded-2xl p-8 w-[400px]"
        >
          <h2 className="text-xl font-bold mb-6 text-center">My Profile</h2>

          {/* Image */}
          <div className="flex justify-center mb-6">
            <div className="relative">
              <img
                src={image}
                className="w-32 h-32 rounded-full object-cover"
              />
              <label className="absolute bottom-2 right-2 bg-black/60 p-2 rounded-full cursor-pointer">
                <Camera size={18} color="white" />
                <input type="file" className="hidden" onChange={handleImageUpload} />
              </label>
            </div>
          </div>

          {/* Username */}
          <input
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full border p-3 rounded mb-3"
          />

          {/* Email */}
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border p-3 rounded mb-4"
          />

          <button
            onClick={handleProfileUpdate}
            className="w-full bg-indigo-600 text-white py-2 rounded mb-6"
          >
            {loadingProfile ? "Saving..." : "Save Profile"}
          </button>

          {/* Password */}
          <input
            type="password"
            placeholder="Current Password"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
            className="w-full border p-3 rounded mb-2"
          />

          <input
            type="password"
            placeholder="New Password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            className="w-full border p-3 rounded mb-2"
          />

          <input
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="w-full border p-3 rounded mb-3"
          />

          <button
            onClick={handlePasswordUpdate}
            className="w-full bg-red-500 text-white py-2 rounded"
          >
            {loadingPassword ? "Updating..." : "Change Password"}
          </button>
        </motion.div>
      </div>
    </div>
  );
}

export default Profile;