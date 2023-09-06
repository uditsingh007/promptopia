import Prompt from "@/models/model";
import { connectToDB } from "@/utils/database";

export const GET = async (
  req: Request,
  { params }: { params: { id: string } }
) => {
  try {
    await connectToDB();
    const prompt = await Prompt.findById(params.id).populate("creator");
    if (!prompt) return new Response("Prompt not found", { status: 404 });
    return new Response(JSON.stringify(prompt), { status: 200 });
  } catch (error) {
    return new Response("Prompt not found", { status: 404 });
  }
};

export const PATCH = async (
  req: Request,
  { params }: { params: { id: string } }
) => {
  const { prompt, tag } = await req.json();
  try {
    await connectToDB();
    const existingPrompt = await Prompt.findById(params.id);
    if (!existingPrompt)
      return new Response("Prompt not found", { status: 404 });
    existingPrompt.prompt = prompt;
    existingPrompt.tag = tag;
    await existingPrompt.save();
    return new Response(JSON.stringify(existingPrompt), { status: 200 });
  } catch (error) {
    return new Response("Failed to uodate prompt", { status: 500 });
  }
};

export const DELETE = async (
  req: Request,
  { params }: { params: { id: string } }
) => {
  console.log(params, "params");
  try {
    await connectToDB();
    await Prompt.findByIdAndRemove(params.id);
    return new Response("Prompt deleted successfuly");
  } catch (error) {
    console.log(error);
    return new Response("Failed to delete prompt", { status: 500 });
  }
};
