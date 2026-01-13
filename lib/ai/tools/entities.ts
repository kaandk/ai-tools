import { tool } from "ai";
import { z } from "zod";
import { lightApi } from "@/lib/light-api/client";

export const entityTools = {
  listEntities: tool({
    description:
      "List company entities with pagination. Entities represent different legal entities or subsidiaries within the organization.",
    inputSchema: z.object({
      limit: z.number().optional().describe("Number of items per page"),
      offset: z.number().optional().describe("Number of items to skip"),
    }),
    execute: async ({ limit, offset }) => {
      return lightApi.get("/v1/entities", { limit, offset });
    },
  }),
};
