// This file contains the code for the Follow Cards shown in feed to let user follow/ unfollow other users.

import React, { useState } from "react";
import { FullUser } from "../../types/types";
import { SlUserFollow } from "react-icons/sl";
import { useAuth } from "../../hooks/useAuth";
import { useMutation } from "@apollo/client";
import {
  FOLLOW_USER_MUTATION,
  UNFOLLOW_USER_MUTATION,
} from "../../graphql/mutations/mutations";

interface FollowCardProps {
  person: FullUser;
}

const FollowCard: React.FC<FollowCardProps> = ({ person }) => {
  const { user } = useAuth();

  const [followUser] = useMutation(FOLLOW_USER_MUTATION); // The mutation to create a follow relationship between logged in user and selected user.
  const [unfollowUser] = useMutation(UNFOLLOW_USER_MUTATION); // The mutation to remove the existing follow relationship between logged in user and selected user.

  const [following, setFollowing] = useState<boolean>(false);

  const handleFollow = () => {
    followUser({
      variables: { follower_id: user?.id, following_id: person.uid },
    }); // Calling the FOLLOW_USER_MUTATION.

    setFollowing(true);
  };

  const handleUnfollow = () => {
    unfollowUser({
      variables: { follower_id: user?.id, following_id: person.uid },
    }); // Calling the UNFOLLOW_USER_MUTATION

    setFollowing(false);
  };

  return (
    <div className="flex items-center px-3 py-4 justify-between mb-4 border  border-white border-opacity-20 bg-gray-950  rounded-xl">
      <div className="flex">
        <img
          src={person.dp_url ? person.dp_url : "./defaultDp.jpg"}
          alt=""
          className="w-16 h-16 rounded-full"
        />
        <div className="ml-2">
          <p className="text-sky-200 text-lg">{person.name}</p>
          <p className="text-gray-400 text-sm">@{person.username}</p>
        </div>
      </div>
      <div>
        {!following ? (
          <button
            className="flex items-center  bg-purple-900 hover:bg-purple-950 px-4 py-2 rounded text-sm transition-all duration-300"
            onClick={handleFollow}
          >
            <SlUserFollow /> &nbsp; Follow
          </button>
        ) : (
          <button
            className="flex items-center  bg-gray-700 hover:bg-gray-800 px-4 py-2 rounded-lg text-sm transition-all duration-300"
            onClick={handleUnfollow}
          >
            <SlUserFollow /> &nbsp; Unfollow
          </button>
        )}
      </div>
    </div>
  );
};

export default FollowCard;
