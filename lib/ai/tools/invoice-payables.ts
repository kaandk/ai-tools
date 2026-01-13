import { tool } from "ai";
import { z } from "zod";
import { lightApi } from "@/lib/light-api/client";

export const invoicePayableTools = {
  listInvoicePayables: tool({
    description:
      "List invoice payables (bills from vendors) with pagination. Returns invoice summaries including vendor, amount, due date, and payment status.",
    inputSchema: z.object({
      limit: z.number().optional().describe("Number of items per page"),
      offset: z.number().optional().describe("Number of items to skip"),
      status: z
        .string()
        .optional()
        .describe("Filter by invoice status (e.g., draft, pending, paid)"),
      vendorId: z.string().optional().describe("Filter by vendor ID"),
    }),
    execute: async ({ limit, offset, status, vendorId }) => {
      return lightApi.get("/v1/bff/invoice-payables", {
        limit,
        offset,
        status,
        vendorId,
      });
    },
  }),

  getInvoicePayable: tool({
    description:
      "Get a specific invoice payable by ID with full details including line items.",
    inputSchema: z.object({
      invoicePayableId: z
        .string()
        .describe("The unique identifier of the invoice payable"),
    }),
    execute: async ({ invoicePayableId }) => {
      return lightApi.get(`/v1/invoice-payables/${invoicePayableId}`);
    },
  }),

  getInvoicePayableDocument: tool({
    description:
      "Get the attached document for an invoice payable. Returns document metadata and download information.",
    inputSchema: z.object({
      invoicePayableId: z
        .string()
        .describe("The unique identifier of the invoice payable"),
    }),
    execute: async ({ invoicePayableId }) => {
      return lightApi.get(`/v1/invoice-payables/${invoicePayableId}/document`);
    },
  }),

  getInvoicePayableCreditNotes: tool({
    description:
      "Get all credit notes linked to an invoice payable. Shows credits applied to reduce the invoice amount.",
    inputSchema: z.object({
      invoicePayableId: z
        .string()
        .describe("The unique identifier of the invoice payable"),
    }),
    execute: async ({ invoicePayableId }) => {
      return lightApi.get(`/v1/invoice-payables/${invoicePayableId}/credit-notes`);
    },
  }),

  getInvoicePayableLineItem: tool({
    description:
      "Get a specific line item from an invoice payable with full details.",
    inputSchema: z.object({
      invoicePayableId: z
        .string()
        .describe("The unique identifier of the invoice payable"),
      lineItemId: z.string().describe("The unique identifier of the line item"),
    }),
    execute: async ({ invoicePayableId, lineItemId }) => {
      return lightApi.get(
        `/v1/invoice-payables/${invoicePayableId}/line-items/${lineItemId}`
      );
    },
  }),
};
