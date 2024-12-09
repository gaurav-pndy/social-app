// This file contains the code for the Profile page of logged in user.

import { useQuery } from "@apollo/client";
import { useAuth } from "../hooks/useAuth";
import { FetchPostsData, Post } from "../types/types";
import {
  FETCH_FOLLOWERS,
  FETCH_FOLLOWING_USERS,
  FETCH_POSTS_BY_USER_QUERY,
} from "../graphql/queries/queries";
import NavBar from "@/comps/NavBar";

import PostCard from "@/comps/PostCard";
import { LuLoader } from "react-icons/lu";
import ProfileCard from "@/comps/ProfileComponents/ProfileCard";

const Profile = () => {
  const { user } = useAuth(); // Fetching current user using custom hook.

  const { data: followingData } = useQuery(FETCH_FOLLOWING_USERS, {
    variables: { follower_id: user?.id },
    skip: !user,
  }); // Fetching the user ids of the users being followed by logged in user.

  const { data: followersData } = useQuery(FETCH_FOLLOWERS, {
    variables: { following_id: user?.id },
    skip: !user,
  }); // Fetching the user ids of followers of the logged in user.

  const noOfFollowing: number =
    followingData?.follow_infoCollection.edges.length;

  const noOfFollowers: number =
    followersData?.follow_infoCollection.edges.length;

  const { data, loading, error } = useQuery<FetchPostsData>(
    FETCH_POSTS_BY_USER_QUERY,
    {
      variables: { userId: user?.id },
      skip: !user?.id,
    }
  ); // Fetching the posts created by logged in user to show on his profile.

  const noOfPosts: number | undefined = data?.postsCollection?.edges.length;

  const postData: Post[] =
    data?.postsCollection?.edges
      .map((edge) => ({
        id: edge.node.id,
        post_text: edge.node.post_text,
        post_img_url: edge.node.post_img_url || null,
        user_id: edge.node.user_id,
        username: edge.node.username,
        tags: edge.node.tags ? JSON.parse(edge.node.tags) : [],
        created_at: new Date(edge.node.created_at),
        users: {
          name: edge.node.users?.name,
          dp_url: edge.node.users?.dp_url || null,
        },
      }))
      .sort((a, b) => b.created_at.getTime() - a.created_at.getTime()) || []; // Destructuring the posts received after fetch query using custom type for type safety.

  if (error) return <p>Error fetching posts: {error.message}</p>;

  return (
    <div className="bg-[#120f21] p-5">
      {loading ? (
        <div className="h-[100vh] flex items-center w-full">
          <LuLoader className="text-6xl text-gray-700 animate-spin m-auto" />
        </div>
      ) : (
        <div>
          <NavBar /> {/* Navigation Bar Component. */}
          {/* Profile Card component to display user information. */}
          <ProfileCard
            noOfFollowers={noOfFollowers}
            noOfFollowing={noOfFollowing}
            noOfPosts={noOfPosts}
          />
          {/* PostCard component to display the posts created by user. */}
          <div className="  mt-3">
            <h1 className="text-gray-500 text-2xl">Your Posts: </h1>
            <div className="grid grid-cols-2  mt-5 ml-6">
              {postData.map((post) => (
                <PostCard key={post?.id} post={post} />
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;
