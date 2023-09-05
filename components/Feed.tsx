"use client";

import { PromptCardListProps } from "@/types";
import { ChangeEvent, useEffect, useState } from "react";
import PromptCard from "./PromptCard";

const PromptCardList = ({ data, handleTagClick }: PromptCardListProps) => (
  <div className="mt-16 prompt_layout">
    {data.map((prompt) => (
      <PromptCard
        key={prompt.prompt}
        prompt={prompt}
        handleTagClick={handleTagClick}
      />
    ))}
  </div>
);

const Feed = () => {
  const [searchText, setSearchText] = useState("");
  const [prompts, setPrompts] = useState([]);
  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {};
  const handleTagClick = (tag: string) => {};
  useEffect(() => {
    const fetchPrompts = async () => {
      const res = await fetch("/api/prompt");
      const data = await res.json();
      setPrompts(data);
    };
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
      <PromptCardList data={prompts} handleTagClick={handleTagClick} />
    </section>
  );
};

export default Feed;
