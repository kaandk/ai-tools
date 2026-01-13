import { tool } from "ai";
import { z } from "zod";
import { lightApi } from "@/lib/light-api/client";

export const bankAccountTools = {
  listBankAccounts: tool({
    description:
      "List all bank accounts of the company. Returns bank account details including account numbers, balances, and status.",
    inputSchema: z.object({}),
    execute: async () => {
      return lightApi.get("/v1/bank-accounts");
    },
  }),
};
