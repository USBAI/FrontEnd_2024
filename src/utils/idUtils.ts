/**
 * Generates a random ID for session tracking
 * @returns A random string ID
 */
export const generateRandomId = (): string => {
  const timestamp = Date.now().toString(36);
  const randomStr = Math.random().toString(36).substring(2, 8);
  return `${timestamp}-${randomStr}`;
};