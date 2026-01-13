import { streamText, convertToModelMessages, stepCountIs, type UIMessage } from "ai";
import { getModel } from "@/lib/ai/provider";
import { allTools } from "@/lib/ai/tools";
import { systemPrompt } from "@/lib/ai/system-prompt";

export const maxDuration = 60;

export async function POST(req: Request) {
  const { messages } = await req.json() as { messages: UIMessage[] };

  console.log("=== INCOMING REQUEST ===");
  console.log("Raw messages:", JSON.stringify(messages, null, 2));

  const modelMessages = await convertToModelMessages(messages);
  console.log("Converted model messages:", JSON.stringify(modelMessages, null, 2));

  const result = streamText({
    model: getModel(),
    system: systemPrompt,
    messages: modelMessages,
    tools: allTools,
    stopWhen: stepCountIs(10),
    onStepFinish: ({ stepType, text, toolCalls, toolResults }) => {
      console.log("=== STEP FINISHED ===");
      console.log("Step type:", stepType);
      console.log("Text:", text);
      console.log("Tool calls:", JSON.stringify(toolCalls, null, 2));
      console.log("Tool results:", JSON.stringify(toolResults, null, 2));
    },
    onFinish: ({ text, finishReason, usage }) => {
      console.log("=== STREAM FINISHED ===");
      console.log("Finish reason:", finishReason);
      console.log("Final text:", text);
      console.log("Usage:", usage);
    },
    onError: ({ error }) => {
      console.error("=== STREAM ERROR ===");
      console.error("Error:", error);
    },
  });

  return result.toUIMessageStreamResponse();
}
