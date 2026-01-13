import { tool } from "ai";
import { z } from "zod";
import { lightApi } from "@/lib/light-api/client";

export const companyTools = {
  getCurrentCompany: tool({
    description:
      "Get the current company information including name, address, and settings.",
    inputSchema: z.object({}),
    execute: async () => {
      return lightApi.get("/v1/companies/current");
    },
  }),

  getCurrencyConfig: tool({
    description:
      "Get the currency configuration of the current company including base currency and supported currencies.",
    inputSchema: z.object({}),
    execute: async () => {
      return lightApi.get("/v1/companies/current/currency-config");
    },
  }),
};
