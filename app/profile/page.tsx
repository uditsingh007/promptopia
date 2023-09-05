"use client";

import Profile from "@/components/Profile";
import { PromptState } from "@/types";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const MyProfile = () => {
  const { data: session } = useSession();
  const router = useRouter();
  const [prompts, setPrompts] = useState([]);
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
  const handleDelete = () => {};
  console.log(session, "session");
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
