import { tool } from "ai";
import { z } from "zod";
import { lightApi } from "@/lib/light-api/client";

export const expenseTools = {
  listExpenses: tool({
    description:
      "List expenses with pagination. Returns expense summaries including vendor, amount, date, and status.",
    inputSchema: z.object({
      limit: z.number().optional().describe("Number of items per page"),
      offset: z.number().optional().describe("Number of items to skip"),
      status: z
        .string()
        .optional()
        .describe("Filter by expense status (e.g., draft, pending, approved)"),
      vendorId: z.string().optional().describe("Filter by vendor ID"),
    }),
    execute: async ({ limit, offset, status, vendorId }) => {
      return lightApi.get("/v1/expenses", { limit, offset, status, vendorId });
    },
  }),

  getExpense: tool({
    description:
      "Get a specific expense by ID including all line items and metadata.",
    inputSchema: z.object({
      expenseId: z.string().describe("The unique identifier of the expense"),
    }),
    execute: async ({ expenseId }) => {
      return lightApi.get(`/v1/expenses/${expenseId}`);
    },
  }),

  getExpenseDocument: tool({
    description:
      "Get the attached receipt document for an expense. Returns document metadata and download information.",
    inputSchema: z.object({
      expenseId: z.string().describe("The unique identifier of the expense"),
    }),
    execute: async ({ expenseId }) => {
      return lightApi.get(`/v1/expenses/${expenseId}/document`);
    },
  }),
};
