import { tool } from "ai";
import { z } from "zod";
import { lightApi } from "@/lib/light-api/client";

export const invoiceReceivableTools = {
  listInvoiceReceivables: tool({
    description:
      "List invoice receivables (invoices sent to customers) with pagination. Returns invoice summaries including customer, amount, due date, and payment status.",
    inputSchema: z.object({
      limit: z.number().optional().describe("Number of items per page"),
      offset: z.number().optional().describe("Number of items to skip"),
      status: z
        .string()
        .optional()
        .describe("Filter by invoice status (e.g., draft, sent, paid)"),
      customerId: z.string().optional().describe("Filter by customer ID"),
    }),
    execute: async ({ limit, offset, status, customerId }) => {
      return lightApi.get("/v1/invoice-receivables", {
        limit,
        offset,
        status,
        customerId,
      });
    },
  }),

  getInvoiceReceivable: tool({
    description:
      "Get a specific invoice receivable by ID with full details including line items.",
    inputSchema: z.object({
      invoiceReceivableId: z
        .string()
        .describe("The unique identifier of the invoice receivable"),
    }),
    execute: async ({ invoiceReceivableId }) => {
      return lightApi.get(`/v1/invoice-receivables/${invoiceReceivableId}`);
    },
  }),

  getInvoiceReceivablePayments: tool({
    description:
      "Get a list of payments received for an invoice receivable. Shows payment history and amounts.",
    inputSchema: z.object({
      invoiceReceivableId: z
        .string()
        .describe("The unique identifier of the invoice receivable"),
    }),
    execute: async ({ invoiceReceivableId }) => {
      return lightApi.get(
        `/v1/invoice-receivables/${invoiceReceivableId}/payments`
      );
    },
  }),
};
