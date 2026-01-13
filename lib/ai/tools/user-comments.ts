import { tool } from "ai";
import { z } from "zod";
import { lightApi } from "@/lib/light-api/client";

export const userCommentTools = {
  listUserComments: tool({
    description:
      "List user comments for a given resource. Returns comments including author, content, and timestamps.",
    inputSchema: z.object({
      resourceType: z
        .string()
        .describe("Type of resource to get comments for (e.g., invoice, expense)"),
      resourceId: z.string().describe("ID of the resource to get comments for"),
    }),
    execute: async ({ resourceType, resourceId }) => {
      return lightApi.get("/v1/user-comments", { resourceType, resourceId });
    },
  }),
};
