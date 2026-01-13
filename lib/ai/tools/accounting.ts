import { tool } from "ai";
import { z } from "zod";
import { lightApi } from "@/lib/light-api/client";

export const accountingTools = {
  listAccountingDocuments: tool({
    description:
      "List accounting documents with optional pagination. Returns a paginated list of accounting documents.",
    inputSchema: z.object({
      limit: z.number().optional().describe("Number of items per page"),
      offset: z.number().optional().describe("Number of items to skip"),
      cursor: z.string().optional().describe("Cursor for pagination"),
      sort: z.string().optional().describe("Sort field and direction"),
      filter: z.string().optional().describe("Filter expression"),
    }),
    execute: async ({ limit, offset, cursor, sort, filter }) => {
      return lightApi.get("/v1/accounting-documents/accounting-documents", {
        limit,
        offset,
        cursor,
        sort,
        filter,
      });
    },
  }),
};
