/**
 * Replaces sensitive field values with [FIELD NAME] placeholder tags.
 * Raw sensitive data never leaves the browser when Confidential Mode is ON.
 */
export function applyConfidentialMode(
  formData: Record<string, unknown>,
  sensitiveFields: string[]
): Record<string, unknown> {
  const result = structuredClone(formData);
  for (const field of sensitiveFields) {
    if (result[field]) {
      const label = field
        .replace(/([A-Z])/g, ' $1')
        .toUpperCase()
        .trim();
      result[field] = `[${label}]`;
    }
  }
  return result;
}
