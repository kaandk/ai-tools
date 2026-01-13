import { tool } from "ai";
import { z } from "zod";
import { lightApi } from "@/lib/light-api/client";

export const cardTools = {
  getCardCustomerPublicKey: tool({
    description:
      "Get the public key for the cards integration service. Used for card encryption.",
    inputSchema: z.object({}),
    execute: async () => {
      return lightApi.get("/v1/card-customers/public-key");
    },
  }),

  listCardTransactions: tool({
    description:
      "List card transactions with pagination. Returns transaction details including amount, merchant, and status.",
    inputSchema: z.object({
      limit: z.number().optional().describe("Number of items per page"),
      offset: z.number().optional().describe("Number of items to skip"),
      cardId: z.string().optional().describe("Filter by card ID"),
    }),
    execute: async ({ limit, offset, cardId }) => {
      return lightApi.get("/v1/card-transactions", { limit, offset, cardId });
    },
  }),

  getCardTransaction: tool({
    description: "Get a specific card transaction by ID with full details.",
    inputSchema: z.object({
      cardTransactionId: z
        .string()
        .describe("The unique identifier of the card transaction"),
    }),
    execute: async ({ cardTransactionId }) => {
      return lightApi.get(`/v1/card-transactions/${cardTransactionId}`);
    },
  }),

  getCardTransactionReceipt: tool({
    description:
      "Get the attached receipt document for a card transaction. Returns receipt metadata.",
    inputSchema: z.object({
      transactionId: z
        .string()
        .describe("The unique identifier of the card transaction"),
    }),
    execute: async ({ transactionId }) => {
      return lightApi.get(`/v1/card-transactions/${transactionId}/receipt`);
    },
  }),

  listCards: tool({
    description:
      "List all cards with pagination. Returns card details including cardholder, status, and limits.",
    inputSchema: z.object({
      limit: z.number().optional().describe("Number of items per page"),
      offset: z.number().optional().describe("Number of items to skip"),
    }),
    execute: async ({ limit, offset }) => {
      return lightApi.get("/v1/cards", { limit, offset });
    },
  }),

  getCard: tool({
    description: "Get a specific card by ID with full details.",
    inputSchema: z.object({
      cardId: z.string().describe("The unique identifier of the card"),
    }),
    execute: async ({ cardId }) => {
      return lightApi.get(`/v1/cards/${cardId}`);
    },
  }),
};
