import { z } from "zod";
import { auth } from "@/auth";
import { generateFormFromUserPrompt } from "@/services/chat";

const promptSchema = z.object({
  prompt: z.string().min(1),
});

export const POST = auth(async function POST(req) {
  if (!req.auth) {
    return new Response("Unauthorized", { status: 401 });
  }

  const { prompt } = await req.json();
  const { prompt: validatedPrompt } = promptSchema.parse({ prompt });
  const result = await generateFormFromUserPrompt(validatedPrompt);

  return Response.json(result) ?? null;
}) as any;
