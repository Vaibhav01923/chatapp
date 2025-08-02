import React from "react";
import { useAuthStore } from "../store/useAuthStore";
import { Camera, Mail, User } from "lucide-react";

const ProfilePage = () => {
  const { authUser, isUpdatingProfile, updateProfile } = useAuthStore();
  const [selectedImg, setSelectedImg] = React.useState(null);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();

    reader.readAsDataURL(file);

    reader.onload = async () => {
      const base64Image = reader.result;
      setSelectedImg(base64Image);
      await updateProfile({ profilePic: base64Image });
    };
  };

  return (
    <div className="flex items-center justify-center min-h-screen py-6 px-4">
      <div className="w-full max-w-sm bg-white/10 backdrop-blur-lg shadow-lg rounded-xl p-5 max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="text-center mb-4">
          <h1 className="text-lg font-semibold text-white">Profile</h1>
          <p className="text-white/60 text-xs">Your Profile Info</p>
        </div>

        {/* Avatar Upload */}
        <div className="flex flex-col items-center gap-2">
          <div className="relative">
            <img
              src={selectedImg || authUser?.profilePic || "/avatar.png"}
              alt="Avatar"
              className="w-16 h-16 rounded-full object-cover border border-white/20"
            />
            <label
              htmlFor="avatar-upload"
              className={`absolute bottom-0 right-0 hover:scale-105 p-1.5 rounded-full cursor-pointer transition-all duration-200 ${
                isUpdatingProfile ? "animate-pulse pointer-events-none" : ""
              }`}
            >
              <Camera className="w-4 h-4 text-base-200 bg-white rounded-full border" />
              <input
                type="file"
                id="avatar-upload"
                className="hidden"
                disabled={isUpdatingProfile}
                accept="image/*"
                onChange={handleImageUpload}
              />
            </label>
          </div>
          <p className="text-xs text-zinc-400">
            {isUpdatingProfile
              ? "Uploading..."
              : "Click camera to update photo"}
          </p>
        </div>

        {/* Profile Info */}
        <div className="space-y-3 mt-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-xs text-zinc-400">
              <User className="w-3.5 h-3.5" />
              Full Name
            </div>
            <p className="px-2.5 py-1.5 bg-white/10 rounded-md border text-sm text-white/90">
              {authUser?.fullName || "Something Went Wrong"}
            </p>
          </div>
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-xs text-zinc-400">
              <Mail className="w-3.5 h-3.5" />
              Email
            </div>
            <p className="px-2.5 py-1.5 bg-white/10 rounded-md border text-sm text-white/90">
              {authUser?.email || "Something Went Wrong"}
            </p>
          </div>
        </div>

        {/* Account Info */}
        <div className="mt-5 bg-gray-800/40 rounded-lg py-2.5 px-3 text-sm text-white">
          <h2 className="font-medium mb-3 text-sm">Account Information</h2>
          <div className="space-y-2">
            <div className="flex items-center justify-between border-b border-zinc-700 pb-2">
              <span className="text-zinc-300">Member Since</span>
              <span>{authUser?.createdAt?.split("T")[0]}</span>
            </div>
            <div className="flex items-center justify-between pt-1">
              <span className="text-zinc-300">Account Status</span>
              <span className="text-green-500">Active</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
