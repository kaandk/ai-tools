import { tool } from "ai";
import { z } from "zod";
import { lightApi } from "@/lib/light-api/client";

export const vendorTools = {
  listVendors: tool({
    description:
      "List vendors with pagination. Returns vendor information including name, email, and contact details.",
    inputSchema: z.object({
      limit: z.number().optional().describe("Number of items per page"),
      offset: z.number().optional().describe("Number of items to skip"),
    }),
    execute: async ({ limit, offset }) => {
      return lightApi.get("/v1/vendors", { limit, offset });
    },
  }),

  getVendor: tool({
    description: "Get a specific vendor by ID with full details.",
    inputSchema: z.object({
      vendorId: z.string().describe("The unique identifier of the vendor"),
    }),
    execute: async ({ vendorId }) => {
      return lightApi.get(`/v1/vendors/${vendorId}`);
    },
  }),
};
