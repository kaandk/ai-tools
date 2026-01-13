import { tool } from "ai";
import { z } from "zod";
import { lightApi } from "@/lib/light-api/client";

export const contractTools = {
  listContracts: tool({
    description:
      "List contracts with pagination. Returns contract summaries including vendor, dates, and status.",
    inputSchema: z.object({
      limit: z.number().optional().describe("Number of items per page"),
      offset: z.number().optional().describe("Number of items to skip"),
    }),
    execute: async ({ limit, offset }) => {
      return lightApi.get("/v1/contracts", { limit, offset });
    },
  }),

  getContract: tool({
    description: "Get a specific contract by ID with full details.",
    inputSchema: z.object({
      contractId: z.string().describe("The unique identifier of the contract"),
    }),
    execute: async ({ contractId }) => {
      return lightApi.get(`/v1/contracts/${contractId}`);
    },
  }),
};
