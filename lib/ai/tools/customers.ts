import { tool } from "ai";
import { z } from "zod";
import { lightApi } from "@/lib/light-api/client";

export const customerTools = {
  listCustomers: tool({
    description:
      "List customers with pagination. Returns customer information including name, email, and contact details.",
    inputSchema: z.object({
      limit: z.number().optional().describe("Number of items per page"),
      offset: z.number().optional().describe("Number of items to skip"),
    }),
    execute: async ({ limit, offset }) => {
      console.log("=== TOOL EXECUTE: listCustomers ===");
      console.log("Input:", { limit, offset });
      try {
        const result = await lightApi.get("/v1/customers", { limit, offset });
        console.log("Result:", JSON.stringify(result, null, 2));
        return result;
      } catch (error) {
        console.error("Tool error:", error);
        throw error;
      }
    },
  }),

  getCustomer: tool({
    description: "Get a specific customer by ID with full details.",
    inputSchema: z.object({
      customerId: z.string().describe("The unique identifier of the customer"),
    }),
    execute: async ({ customerId }) => {
      return lightApi.get(`/v1/customers/${customerId}`);
    },
  }),
};
