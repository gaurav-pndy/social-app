// This file contains the code for the Post Card component to display contents of a post.

import React from "react";
import { Post } from "../types/types";

interface PostCardProps {
  post: Post;
}

const PostCard: React.FC<PostCardProps> = ({ post }) => {
  return (
    <div className=" py-3 px-4 mb-10 rounded-xl shadow-[1px_1px_10px_1px_rgba(255,255,255,0.1)]  bg-[#100d1c] w-[95%]">
      <div className="flex items-center gap-3 mb-4">
        <img
          src={post.users?.dp_url ? post.users?.dp_url : "./defaultDp.jpg"}
          alt="dp"
          className="w-12 h-12 rounded-full"
        />
        <div>
          <p className="font-semibold text-xl text-blue-200">
            {post.users?.name}
          </p>
          <p className="text-sm text-gray-400">@{post.username}</p>
        </div>
      </div>
      <div className="flex justify-between">
        <p className="px-1 text-lg">{post.post_text}</p>
      </div>

      {post.post_img_url && (
        <img
          src={post.post_img_url}
          alt="Post image"
          className="mt-2 w-full max-h-80 rounded-xl"
        />
      )}
      <div className="flex items-end justify-end  flex-wrap gap-2 mt-2">
        {post.tags.length > 0 &&
          post.tags.map((tag, index) => (
            <span
              key={index}
              className="bg-gray-800 text-xs text-blue-400 rounded-full px-2 py-1 cursor-pointer hover:bg-blue-500 h-fit hover:text-white transition-all duration-200"
            >
              @{tag}
            </span>
          ))}
      </div>
    </div>
  );
};

export default PostCard;
