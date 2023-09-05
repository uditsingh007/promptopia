"use client";

import Form from "@/components/Form";
import { useSession } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";

const UpdatePrompt = () => {
  const [post, setPost] = useState({
    prompt: "",
    tag: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const searchParams = useSearchParams();
  const postId = searchParams.get("id");
  const { data: session } = useSession();
  const router = useRouter();
  useEffect(() => {
    const fetchPostById = async () => {
      const res = await fetch(`/api/prompt/${postId}`);
      const data = await res.json();
      setPost({
        prompt: data.prompt,
        tag: data.tag,
      });
    };
    if (postId) fetchPostById();
  }, [postId]);
  const updatePrompt = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitting(true);
    if (!postId) return alert("Prompt ID not found");
    try {
      const response: Response = await fetch(`/api/prompt/${postId}`, {
        method: "PATCH",
        body: JSON.stringify({
          prompt: post.prompt,
          tag: post.tag,
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
      type="Edit"
      post={post}
      setPost={setPost}
      submitting={submitting}
      handleSubmit={updatePrompt}
    />
  );
};

export default UpdatePrompt;
