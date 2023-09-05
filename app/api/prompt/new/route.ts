import Prompt from "@/models/model";
import { connectToDB } from "@/utils/database";

export const POST = async (req: Request) => {
  const { prompt, tag, userId } = await req.json();
  try {
    await connectToDB();
    const newPrompt = new Prompt({
      creator: userId,
      prompt,
      tag,
    });
    await newPrompt.save();
    return new Response(JSON.stringify(newPrompt), { status: 201 });
  } catch (error) {
    console.log(error);
    return new Response("Failed to create prompt", { status: 500 });
  }
};
