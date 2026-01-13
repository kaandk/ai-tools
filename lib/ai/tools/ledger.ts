import { tool } from "ai";
import { z } from "zod";
import { lightApi } from "@/lib/light-api/client";

export const ledgerTools = {
  listLedgerAccounts: tool({
    description:
      "List ledger accounts (chart of accounts) with pagination. Returns account codes, names, types, and balances.",
    inputSchema: z.object({
      limit: z.number().optional().describe("Number of items per page"),
      offset: z.number().optional().describe("Number of items to skip"),
      type: z
        .string()
        .optional()
        .describe("Filter by account type (e.g., asset, liability, expense)"),
    }),
    execute: async ({ limit, offset, type }) => {
      return lightApi.get("/v1/ledger-accounts", { limit, offset, type });
    },
  }),

  listLedgerTransactionLines: tool({
    description:
      "List ledger transaction lines with pagination. Returns individual debit/credit entries in the general ledger.",
    inputSchema: z.object({
      limit: z.number().optional().describe("Number of items per page"),
      offset: z.number().optional().describe("Number of items to skip"),
      accountId: z.string().optional().describe("Filter by ledger account ID"),
      dateFrom: z
        .string()
        .optional()
        .describe("Filter from date (ISO format YYYY-MM-DD)"),
      dateTo: z
        .string()
        .optional()
        .describe("Filter to date (ISO format YYYY-MM-DD)"),
    }),
    execute: async ({ limit, offset, accountId, dateFrom, dateTo }) => {
      return lightApi.get("/v1/ledger-transaction-lines", {
        limit,
        offset,
        accountId,
        dateFrom,
        dateTo,
      });
    },
  }),
};
