import { tool } from "ai";
import { z } from "zod";
import { lightApi } from "@/lib/light-api/client";

export const purchaseOrderTools = {
  listPurchaseOrders: tool({
    description:
      "List purchase orders with pagination. Returns PO summaries including vendor, amount, status, and dates.",
    inputSchema: z.object({
      limit: z.number().optional().describe("Number of items per page"),
      offset: z.number().optional().describe("Number of items to skip"),
      status: z
        .string()
        .optional()
        .describe("Filter by PO status (e.g., draft, sent, received)"),
      vendorId: z.string().optional().describe("Filter by vendor ID"),
    }),
    execute: async ({ limit, offset, status, vendorId }) => {
      return lightApi.get("/v1/purchase-orders", {
        limit,
        offset,
        status,
        vendorId,
      });
    },
  }),

  getPurchaseOrder: tool({
    description:
      "Get a specific purchase order by ID with full details including line items.",
    inputSchema: z.object({
      purchaseOrderId: z
        .string()
        .describe("The unique identifier of the purchase order"),
    }),
    execute: async ({ purchaseOrderId }) => {
      return lightApi.get(`/v1/purchase-orders/${purchaseOrderId}`);
    },
  }),
};
