"use client";

import { PromptCardListProps, PromptState } from "@/types";
import { ChangeEvent, useEffect, useState } from "react";
import PromptCard from "./PromptCard";

const PromptCardList = ({ data, handleTagClick }: PromptCardListProps) => (
  <div className="mt-16 prompt_layout">
    {data.map((post) => (
      <PromptCard
        key={post.prompt}
        prompt={post}
        handleTagClick={handleTagClick}
      />
    ))}
  </div>
);

const Feed = () => {
  const [prompts, setPrompts] = useState<PromptState[]>([]);
  // Search states
  const [searchText, setSearchText] = useState("");
  const [searchTimeout, setSearchTimeout] = useState<any>(null);
  const [searchedResults, setSearchedResults] = useState<PromptState[]>([]);

  const filterPosts = (search: string) => {
    const regex = new RegExp(search, "i");
    return prompts.filter(
      (p) =>
        regex.test(p.prompt) ||
        regex.test(p.creator!?.username) ||
        regex.test(p.tag)
    );
  };

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    clearTimeout(searchTimeout);
    setSearchText(e.target.value);
    setSearchTimeout(
      setTimeout(() => {
        setSearchedResults(filterPosts(e.target.value));
      }, 500)
    );
  };

  const handleTagClick = (tag: string) => {
    setSearchText(tag);
    const searchResult = filterPosts(tag);
    setSearchedResults(searchResult);
  };

  const fetchPrompts = async () => {
    const res = await fetch("/api/prompt");
    const data = await res.json();
    setPrompts(data);
  };

  useEffect(() => {
    fetchPrompts();
  }, []);

  return (
    <section className="feed">
      <form className="relative w-full flex-center">
        <input
          type="text"
          placeholder="Search for a tag or a username"
          value={searchText}
          onChange={handleSearchChange}
          required
          className="search_input peer"
        />
      </form>
      <PromptCardList
        data={searchText ? searchedResults : prompts}
        handleTagClick={handleTagClick}
      />
    </section>
  );
};

export default Feed;
