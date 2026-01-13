import { tool } from "ai";
import { z } from "zod";
import { lightApi } from "@/lib/light-api/client";

export const userTools = {
  listUsers: tool({
    description:
      "List users in the organization with pagination. Returns user information including name, email, and role.",
    inputSchema: z.object({
      limit: z.number().optional().describe("Number of items per page"),
      offset: z.number().optional().describe("Number of items to skip"),
    }),
    execute: async ({ limit, offset }) => {
      return lightApi.get("/v1/users", { limit, offset });
    },
  }),

  getUserReimbursementConfig: tool({
    description:
      "Get the reimbursement configuration for a specific user. Returns settings for expense reimbursements.",
    inputSchema: z.object({
      userId: z.string().describe("The unique identifier of the user"),
    }),
    execute: async ({ userId }) => {
      return lightApi.get(`/v1/users/${userId}/reimbursement-config`);
    },
  }),

  getUserLatestReimbursement: tool({
    description:
      "Get the most recent reimbursement for a specific user. Returns the latest reimbursement details.",
    inputSchema: z.object({
      userId: z.string().describe("The unique identifier of the user"),
    }),
    execute: async ({ userId }) => {
      return lightApi.get(`/v1/users/${userId}/reimbursements/latest`);
    },
  }),
};
