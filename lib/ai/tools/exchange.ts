import { tool } from "ai";
import { z } from "zod";
import { lightApi } from "@/lib/light-api/client";

export const exchangeTools = {
  getExchangeRates: tool({
    description:
      "Get exchange rates for a given currency against all available currencies. Useful for currency conversion.",
    inputSchema: z.object({
      currency: z
        .string()
        .describe("The base currency code (e.g., USD, EUR, GBP)"),
    }),
    execute: async ({ currency }) => {
      return lightApi.get(`/v1/exchange/rates/${currency}`);
    },
  }),

  getExchangeRate: tool({
    description:
      "Get the exchange rate between two specific currencies for a given date.",
    inputSchema: z.object({
      base: z.string().describe("The base currency code (e.g., USD)"),
      target: z.string().describe("The target currency code (e.g., EUR)"),
      date: z
        .string()
        .optional()
        .describe("Date for the rate in ISO format (YYYY-MM-DD)"),
    }),
    execute: async ({ base, target, date }) => {
      return lightApi.get(`/v1/exchange/rates/${base}/${target}`, { date });
    },
  }),
};
