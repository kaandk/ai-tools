# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

AI-powered chat interface for querying Light API financial data. Built with Next.js 16, AI SDK 6, and TypeScript.

## Commands

```bash
pnpm install    # Install dependencies
pnpm dev        # Development server (http://localhost:3000)
pnpm build      # Production build
pnpm start      # Start production server
pnpm lint       # Lint code
```

## Environment Variables

Copy `.env.local` and set:
- `LIGHT_API_KEY` - Your Light API key
- `LIGHT_API_BASE_URL` - Light API base URL (default: https://api.light.inc)
- `OPENAI_API_KEY` - Your OpenAI API key
- `OPENAI_MODEL` - OpenAI model to use (default: gpt-4o)

## Architecture

### Core Stack
- **Next.js 16** App Router with React 19
- **AI SDK 6** (`ai`, `@ai-sdk/react`, `@ai-sdk/openai`)
- **Tailwind CSS v4** for styling
- **Zod** for tool input validation

### Key Directories
- `app/api/chat/route.ts` - Chat API endpoint using `streamText`
- `components/chat.tsx` - Chat UI using `useChat` hook
- `lib/ai/tools/` - 22 tool files covering all Light API GET endpoints
- `lib/ai/provider.ts` - OpenAI provider configuration
- `lib/light-api/client.ts` - Light API HTTP client

### Tool Structure
Each tool file in `lib/ai/tools/` exports tools for a category:
```typescript
export const customerTools = {
  listCustomers: tool({
    description: "...",
    inputSchema: z.object({ ... }),
    execute: async (params) => lightApi.get("/v1/customers", params),
  }),
};
```

Tools are aggregated in `lib/ai/tools/index.ts` and passed to `streamText`.

### Light API Categories
The 50 tools cover: accounting, attachments, bank-accounts, cards, companies, contracts, credit-notes, custom-properties, customer-credits, customers, entities, exchange, expenses, invoice-approvals, invoice-payables, invoice-receivables, ledger, products, purchase-orders, user-comments, users, vendors.
