"use client";

import Profile from "@/components/Profile";
import { PromptState } from "@/types";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const MyProfile = () => {
  const { data: session } = useSession();
  const router = useRouter();
  const [prompts, setPrompts] = useState<PromptState[]>([]);
  useEffect(() => {
    const fetchPrompts = async () => {
      const res = await fetch(`/api/users/${session?.user.id}/posts`);
      const data = await res.json();
      setPrompts(data);
    };
    if (session?.user.id) fetchPrompts();
  }, [session?.user.id]);
  const handleEdit = (post: PromptState) => {
    router.push(`update-prompt/?id=${post._id}`);
  };
  const handleDelete = async (post: PromptState) => {
    console.log(post._id?.toString(), "post");
    const hasConfirmed = confirm(
      "Are you sure you want to delete the prompt ?"
    );
    if (hasConfirmed) {
      try {
        await fetch(`/api/prompt/${post._id}`, {
          method: "DELETE",
        });
        const filteredPosts = prompts.filter(
          (i: PromptState) => i._id !== post._id
        );
        setPrompts(filteredPosts);
      } catch (error) {
        console.log(error);
      }
    }
  };
  return (
    <Profile
      name="My"
      desc="Welcome to your personalised profile page"
      data={prompts}
      handleEdit={handleEdit}
      handleDelete={handleDelete}
    />
  );
};

export default MyProfile;
