import { tool } from "ai";
import { z } from "zod";
import { lightApi } from "@/lib/light-api/client";

export const customerCreditTools = {
  listCustomerCredits: tool({
    description:
      "List customer credits with pagination. Returns credit balances and history for customers.",
    inputSchema: z.object({
      limit: z.number().optional().describe("Number of items per page"),
      offset: z.number().optional().describe("Number of items to skip"),
    }),
    execute: async ({ limit, offset }) => {
      return lightApi.get("/v1/customer-credits", { limit, offset });
    },
  }),

  getCustomerCredit: tool({
    description: "Get a specific customer credit by ID with full details.",
    inputSchema: z.object({
      customerCreditId: z
        .string()
        .describe("The unique identifier of the customer credit"),
    }),
    execute: async ({ customerCreditId }) => {
      return lightApi.get(`/v1/customer-credits/${customerCreditId}`);
    },
  }),
};
