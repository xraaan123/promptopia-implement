"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Profile from "@components/Profile";

const OtherProfile = () => {
  const [posts, setPosts] = useState([]);
  const [user, setUser] = useState([]);

  const { id } = useParams();

  useEffect(() => {
    const fetchPosts = async () => {
      const res1 = await fetch(`/api/users/${id}/posts`);
      const data1 = await res1.json();

      const getUsername = [
        ...new Set(data1.map((item) => item.creator.username)),
      ];

      setUser(getUsername);
      setPosts(data1);
    };

    fetchPosts();
  }, []);

  return (
    <Profile
      name={user}
      desc={`Welcome to ${user}'s personalization profile page`}
      data={posts}
    />
  );
};

export default OtherProfile;
