"use client";

import Profile from "@/components/Profile";
import { PromptState } from "@/types";
import { useSession } from "next-auth/react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

const MyProfile = ({ params }: { params: { id: string } }) => {
  const searchParams = useSearchParams();
  const name = searchParams.get("name");
  const [prompts, setPrompts] = useState<PromptState[]>([]);
  useEffect(() => {
    const fetchPrompts = async () => {
      const res = await fetch(`/api/users/${params.id}/posts`);
      const data = await res.json();
      setPrompts(data);
    };
    if (params.id) fetchPrompts();
  }, [params.id]);
  return (
    <Profile
      name={`${name!}'s`}
      desc="Welcome to your personalised profile page"
      data={prompts}
    />
  );
};

export default MyProfile;
