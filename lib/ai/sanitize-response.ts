// Fields to always remove from API responses to save context
const FIELDS_TO_REMOVE = new Set([
  // Metadata
  'customProperties',
  'createdAt',
  'updatedAt',
  'deletedAt',
  'providerMetadata',
  'metadata',

  // Address/location details
  'address',
  'billingAddress',
  'shippingAddress',
  'street',
  'zipcode',
  'city',
  'country',
  'state',

  // Visual/display
  'logoUrl',
  'imageUrl',
  'thumbnailUrl',
  'avatar',

  // Internal IDs and references
  'groupId',
  'groupInternalName',
  'companyId',
  'internalName',
  'externalId',
  'sourceId',
  'parentId',

  // Verbose text
  'description',
  'notes',
  'comments',
  'terms',
  'termsAndConditions',

  // Attachments/files
  'attachments',
  'documents',
  'files',

  // Audit fields
  'createdBy',
  'updatedBy',
  'approvedBy',
  'rejectedBy',

  // Line items (usually too detailed)
  'lineItems',
  'items',
  'lines',

  // Other verbose fields
  'customFields',
  'tags',
  'labels',
  'categories',
  'domain',
  'website',
  'phone',
  'fax',
]);

export function sanitizeForAI<T>(data: T): T {
  if (data === null || data === undefined) {
    return data;
  }

  if (Array.isArray(data)) {
    return data.map(item => sanitizeForAI(item)) as T;
  }

  if (typeof data === 'object') {
    const sanitized: Record<string, unknown> = {};

    for (const [key, value] of Object.entries(data as Record<string, unknown>)) {
      // Skip fields we want to remove
      if (FIELDS_TO_REMOVE.has(key)) {
        continue;
      }

      // Recursively sanitize nested objects
      sanitized[key] = sanitizeForAI(value);
    }

    return sanitized as T;
  }

  return data;
}
