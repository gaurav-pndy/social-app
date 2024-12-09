// This file contains the code for the Sidebar component in the feed.

import { useEffect, useState } from "react";
import { useAuth } from "../../hooks/useAuth";
import { supabase } from "../../services/supaBaseClient";
import { useFetchCurrentUser } from "../../hooks/useFetchCurrentUser";

import CurrentUserCard from "./CurrentUserCard";
import { FullUser } from "../../types/types";
import FollowCard from "./FollowCard";

interface SidebarProps {
  followingIds: string[];
}

const Sidebar: React.FC<SidebarProps> = ({ followingIds }) => {
  const { user } = useAuth(); // Fetching logged in user using custom hook.

  const [allUsersData, setAllUsersData] = useState<FullUser[]>([]);

  const { userData } = useFetchCurrentUser(user?.id); // Fetching the details of logged in user from 'users' table in database using custom hook.

  useEffect(() => {
    // The function to fetch the details of all users except logged in user from 'users' table in database.
    const fetchAllUsers = async () => {
      const { data: userData, error: userError } = await supabase
        .from("users")
        .select("*")
        .neq("uid", user?.id);

      if (userError) {
        console.log(userError);
      } else {
        setAllUsersData(userData);
      }
    };

    fetchAllUsers();
  }, [user, followingIds]);

  return (
    <div className=" px-3 py-5 my-2 w-[35%]">
      <CurrentUserCard userDp={userData?.dp_url} user={user} />

      <div className="my-10">
        <h2 className="text-xl text-gray-400 mb-4">Follow more users</h2>
        {allUsersData.map(
          (person) =>
            !followingIds.includes(person.uid) && (
              <FollowCard key={person.id} person={person} />
            )
        )}
      </div>
    </div>
  );
};

export default Sidebar;
