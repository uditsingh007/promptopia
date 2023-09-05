"use client";

import Form from "@/components/Form";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { ChangeEvent, useState } from "react";

const CreatePrompt = () => {
  const [post, setPost] = useState({
    prompt: "",
    tag: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const { data: session } = useSession();
  const router = useRouter();
  const createPrompt = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const response: Response = await fetch("/api/prompt/new", {
        method: "POST",
        body: JSON.stringify({
          prompt: post.prompt,
          tag: post.tag,
          userId: session?.user.id,
        }),
      });
      if (response.ok) router.push("/");
    } catch (error) {
      console.log(error);
    } finally {
      setSubmitting(false);
    }
  };
  return (
    <Form
      type="Create"
      post={post}
      setPost={setPost}
      submitting={submitting}
      handleSubmit={createPrompt}
    />
  );
};

export default CreatePrompt;
