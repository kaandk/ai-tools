import { tool } from "ai";
import { z } from "zod";
import { lightApi } from "@/lib/light-api/client";

export const creditNoteTools = {
  listCreditNotes: tool({
    description:
      "List credit notes with pagination. Returns credit note summaries including amounts and status.",
    inputSchema: z.object({
      limit: z.number().optional().describe("Number of items per page"),
      offset: z.number().optional().describe("Number of items to skip"),
    }),
    execute: async ({ limit, offset }) => {
      return lightApi.get("/v1/credit-notes", { limit, offset });
    },
  }),

  getCreditNote: tool({
    description: "Get a specific credit note by ID with full details.",
    inputSchema: z.object({
      creditNoteId: z.string().describe("The unique identifier of the credit note"),
    }),
    execute: async ({ creditNoteId }) => {
      return lightApi.get(`/v1/credit-notes/${creditNoteId}`);
    },
  }),

  getCreditNoteDocument: tool({
    description:
      "Get the attached PDF document for a credit note. Returns document metadata.",
    inputSchema: z.object({
      creditNoteId: z.string().describe("The unique identifier of the credit note"),
    }),
    execute: async ({ creditNoteId }) => {
      return lightApi.get(`/v1/credit-notes/${creditNoteId}/document`);
    },
  }),

  getCreditNoteInvoicePayables: tool({
    description:
      "Get all invoice payables linked to a credit note. Shows which invoices the credit was applied to.",
    inputSchema: z.object({
      creditNoteId: z.string().describe("The unique identifier of the credit note"),
    }),
    execute: async ({ creditNoteId }) => {
      return lightApi.get(`/v1/credit-notes/${creditNoteId}/invoice-payables`);
    },
  }),
};
