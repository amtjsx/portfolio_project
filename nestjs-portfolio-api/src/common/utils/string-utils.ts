/**
 * Utility functions for string manipulation
 */

/**
 * Converts a string to a URL-friendly slug
 * @param text The string to convert to a slug
 * @returns A URL-friendly slug
 */
export function slugify(text: string): string {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-") // Replace spaces with -
    .replace(/&/g, "-and-") // Replace & with 'and'
    .replace(/[^\w-]+/g, "") // Remove all non-word characters
    .replace(/--+/g, "-") // Replace multiple - with single -
    .replace(/^-+/, "") // Trim - from start of text
    .replace(/-+$/, ""); // Trim - from end of text
}

/**
 * Truncates a string to a specified length and adds an ellipsis if truncated
 * @param text The string to truncate
 * @param length The maximum length of the string
 * @param suffix The suffix to add if truncated (default: '...')
 * @returns The truncated string
 */
export function truncate(text: string, length: number, suffix = "..."): string {
  if (text.length <= length) {
    return text;
  }
  return text.substring(0, length).trim() + suffix;
}

/**
 * Capitalizes the first letter of a string
 * @param text The string to capitalize
 * @returns The capitalized string
 */
export function capitalize(text: string): string {
  if (!text) return "";
  return text.charAt(0).toUpperCase() + text.slice(1);
}

/**
 * Converts a string to title case
 * @param text The string to convert to title case
 * @returns The title-cased string
 */
export function titleCase(text: string): string {
  if (!text) return "";
  return text
    .toLowerCase()
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

/**
 * Generates a random string of specified length
 * @param length The length of the random string
 * @param chars The characters to use (default: alphanumeric)
 * @returns A random string
 */
export function randomString(
  length: number,
  chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"
): string {
  let result = "";
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}

/**
 * Strips HTML tags from a string
 * @param html The HTML string to strip tags from
 * @returns The string without HTML tags
 */
export function stripHtml(html: string): string {
  return html.replace(/<[^>]*>?/gm, "");
}

/**
 * Escapes special characters in a string for use in a regular expression
 * @param text The string to escape
 * @returns The escaped string
 */
export function escapeRegExp(text: string): string {
  return text.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

/**
 * Formats a number as a currency string
 * @param amount The amount to format
 * @param currency The currency code (default: 'USD')
 * @param locale The locale (default: 'en-US')
 * @returns The formatted currency string
 */
export function formatCurrency(
  amount: number,
  currency = "USD",
  locale = "en-US"
): string {
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency,
  }).format(amount);
}

/**
 * Generates a URL-friendly version of a filename
 * @param filename The filename to sanitize
 * @returns A sanitized filename
 */
export function sanitizeFilename(filename: string): string {
  return filename
    .replace(/[^a-zA-Z0-9_.-]/g, "_")
    .replace(/_{2,}/g, "_")
    .toLowerCase();
}

/**
 * Normalizes a string by removing diacritics (accents)
 * @param text The string to normalize
 * @returns The normalized string
 */
export function removeDiacritics(text: string): string {
  return text.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}
