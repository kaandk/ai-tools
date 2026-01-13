import { tool } from "ai";
import { z } from "zod";
import { lightApi } from "@/lib/light-api/client";

export const attachmentTools = {
  listAttachments: tool({
    description:
      "List attachments associated with a specific resource. Returns attachment metadata.",
    inputSchema: z.object({
      resourceType: z
        .string()
        .optional()
        .describe("Type of resource to get attachments for"),
      resourceId: z
        .string()
        .optional()
        .describe("ID of the resource to get attachments for"),
    }),
    execute: async ({ resourceType, resourceId }) => {
      return lightApi.get("/v1/attachments", { resourceType, resourceId });
    },
  }),

  getAttachmentDocument: tool({
    description:
      "Get the document file for a specific attachment. Returns document metadata and download information.",
    inputSchema: z.object({
      attachmentId: z.string().describe("The unique identifier of the attachment"),
    }),
    execute: async ({ attachmentId }) => {
      return lightApi.get(`/v1/attachments/${attachmentId}/document`);
    },
  }),
};
