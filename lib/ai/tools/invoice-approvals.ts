import { tool } from "ai";
import { z } from "zod";
import { lightApi } from "@/lib/light-api/client";

export const invoiceApprovalTools = {
  getInvoiceApprovals: tool({
    description:
      "Get approval records for specified invoice payables. Returns approval workflow status and history.",
    inputSchema: z.object({
      invoicePayableIds: z
        .string()
        .optional()
        .describe("Comma-separated list of invoice payable IDs to get approvals for"),
    }),
    execute: async ({ invoicePayableIds }) => {
      return lightApi.get("/v1/invoice-approval", { invoicePayableIds });
    },
  }),
};
