import { tool } from "ai";
import { z } from "zod";
import { lightApi } from "@/lib/light-api/client";

export const customPropertyTools = {
  listCustomPropertyGroups: tool({
    description:
      "List custom property groups with pagination. Custom properties allow extending entities with custom fields.",
    inputSchema: z.object({
      limit: z.number().optional().describe("Number of items per page"),
      offset: z.number().optional().describe("Number of items to skip"),
    }),
    execute: async ({ limit, offset }) => {
      return lightApi.get("/v1/custom-properties/groups", { limit, offset });
    },
  }),

  getCustomPropertyGroup: tool({
    description: "Get a specific custom property group by ID.",
    inputSchema: z.object({
      groupId: z
        .string()
        .describe("The unique identifier of the custom property group"),
    }),
    execute: async ({ groupId }) => {
      return lightApi.get(`/v1/custom-properties/groups/${groupId}`);
    },
  }),

  listCustomPropertyValues: tool({
    description: "List values for a specific custom property group with pagination.",
    inputSchema: z.object({
      groupId: z
        .string()
        .describe("The unique identifier of the custom property group"),
      limit: z.number().optional().describe("Number of items per page"),
      offset: z.number().optional().describe("Number of items to skip"),
    }),
    execute: async ({ groupId, limit, offset }) => {
      return lightApi.get(`/v1/custom-properties/groups/${groupId}/values`, {
        limit,
        offset,
      });
    },
  }),

  getCustomPropertyValue: tool({
    description: "Get a specific custom property value by ID.",
    inputSchema: z.object({
      groupId: z
        .string()
        .describe("The unique identifier of the custom property group"),
      valueId: z
        .string()
        .describe("The unique identifier of the custom property value"),
    }),
    execute: async ({ groupId, valueId }) => {
      return lightApi.get(
        `/v1/custom-properties/groups/${groupId}/values/${valueId}`
      );
    },
  }),
};
