"use client";

import { useState, useEffect } from "react";

import PromptCard from "./PromptCard";

const PromptCardList = ({ data, handleTagClick }) => {
  return (
    <div className="mt-16 prompt_layout">
      {data.map((post) => (
        <PromptCard
          key={post._id}
          post={post}
          handleTagClick={handleTagClick}
        />
      ))}
    </div>
  );
};

const Feed = () => {
  const [searchText, setSearchText] = useState("");
  const [posts, setPosts] = useState([]);

  const handleSearchChange = (e) => {
    const searchQuery = e.target.value;
    setSearchText(searchQuery);

    console.log(posts);
  };

  const filteredResults = posts.filter(
    (item) =>
      item.prompt.toLowerCase().includes(searchText.toLowerCase()) ||
      item.tag.toLowerCase().includes(searchText.toLowerCase()) ||
      item.creator.email.toLowerCase().includes(searchText.toLowerCase()) ||
      item.creator.username.toLowerCase().includes(searchText.toLowerCase())
  );

  const handleTagClick = (text) => {
    setSearchText(text);
  };

  useEffect(() => {
    const fetchPosts = async () => {
      const res = await fetch("/api/prompt");
      const data = await res.json();

      setPosts(data);
    };

    fetchPosts();
  }, []);

  return (
    <section className="feed">
      <form className="relative w-full flex-center">
        <input
          type="text"
          placeholder="Search for a tag or a username"
          value={searchText}
          onChange={handleSearchChange}
          className="search_input peer"
        />
      </form>

      <PromptCardList data={filteredResults} handleTagClick={handleTagClick} />
    </section>
  );
};

export default Feed;
