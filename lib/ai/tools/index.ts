import { contractTools } from "./contracts";
import { creditNoteTools } from "./credit-notes";
import { customerTools } from "./customers";
import { expenseTools } from "./expenses";
import { invoicePayableTools } from "./invoice-payables";
import { invoiceReceivableTools } from "./invoice-receivables";
import { productTools } from "./products";
import { purchaseOrderTools } from "./purchase-orders";
import { vendorTools } from "./vendors";

// Core tools - only the essential ones to reduce context usage
// Removed: accounting, attachments, bank-accounts, cards, companies,
// custom-properties, entities, exchange, customer-credits, invoice-approvals,
// ledger, users, user-comments
export const allTools = {
  // Customers & Vendors
  ...customerTools,
  ...vendorTools,

  // Invoices
  ...invoicePayableTools,
  ...invoiceReceivableTools,
  ...creditNoteTools,

  // Expenses & Purchases
  ...expenseTools,
  ...purchaseOrderTools,
  ...contractTools,

  // Products
  ...productTools,
};
