import { tool } from "ai";
import { z } from "zod";
import { lightApi } from "@/lib/light-api/client";

export const productTools = {
  listProducts: tool({
    description:
      "List products in the catalog. Returns product information including name, SKU, price, and description.",
    inputSchema: z.object({
      limit: z.number().optional().describe("Number of items per page"),
      offset: z.number().optional().describe("Number of items to skip"),
    }),
    execute: async ({ limit, offset }) => {
      return lightApi.get("/v1/products", { limit, offset });
    },
  }),

  getProduct: tool({
    description: "Get a specific product by ID with full details.",
    inputSchema: z.object({
      productId: z.string().describe("The unique identifier of the product"),
    }),
    execute: async ({ productId }) => {
      return lightApi.get(`/v1/products/${productId}`);
    },
  }),
};
