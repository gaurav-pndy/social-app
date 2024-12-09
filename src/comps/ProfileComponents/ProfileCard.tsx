// This file contains code for the Profile Card component for displaying the information of logged in user in the Profile page.

import React from "react";
import { TiHomeOutline } from "react-icons/ti";
import CreatePost from "../PostCreationComps/CreatePost";
import { useNavigate } from "react-router-dom";
import { useFetchCurrentUser } from "@/hooks/useFetchCurrentUser";
import { useAuth } from "@/hooks/useAuth";

interface ProfileCardProps {
  noOfFollowers: number;
  noOfFollowing: number;
  noOfPosts: number | undefined;
}

const ProfileCard: React.FC<ProfileCardProps> = ({
  noOfFollowers,
  noOfFollowing,
  noOfPosts,
}) => {
  const { user } = useAuth(); // Fetching the logged in user using custom hook.

  const { userData } = useFetchCurrentUser(user?.id); // Fetching the details of logged in user from 'users' table using custom hook.

  const navigate = useNavigate();
  return (
    <div className=" flex flex-col items-center ">
      <div className=" flex flex-col items-center p-5">
        <div>
          <img
            src={userData?.dp_url ? userData?.dp_url : "./defaultDp.jpg"}
            alt="dp"
            className="w-56 h-56 rounded-full"
          />
        </div>
        <h3 className="text-3xl mt-2 text-cyan-300">
          {user?.user_metadata.name}
        </h3>
        <div className="flex text-gray-400 gap-3">
          <span>@{user?.user_metadata.username}</span>•
          <span>{user?.email}</span>
        </div>
        <div className="flex gap-3 mt-3">
          <span>
            {" "}
            <strong className="text-lg">{noOfFollowers}</strong> followers
          </span>
          •
          <span>
            {" "}
            <strong className="text-lg">{noOfPosts}</strong> posts
          </span>
          •
          <span>
            <strong className="text-lg">{noOfFollowing}</strong> following
          </span>
        </div>
      </div>

      <div className="flex  gap-5">
        <CreatePost />
        <button
          onClick={() => navigate("/feed")}
          className="bg-yellow-700 hover:bg-yellow-900 py-2 px-4 rounded-2xl flex items-center justify-center gap-1 transition-all duration-300"
        >
          <TiHomeOutline className="text-lg" /> Go to Feed
        </button>
      </div>
    </div>
  );
};

export default ProfileCard;
