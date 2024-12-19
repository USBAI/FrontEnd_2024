/**
 * Handles external redirects by opening them in a new tab
 */
export const handleExternalRedirect = (url: string) => {
  // Open in new tab with security attributes
  const newWindow = window.open(
    url,
    '_blank',
    'noopener,noreferrer'
  );

  // Focus the new window if possible
  if (newWindow) {
    newWindow.focus();
  }

  // Return true if redirect was handled
  return true;
};

/**
 * Checks if a URL is external to the current domain
 */
export const isExternalUrl = (url: string): boolean => {
  try {
    const currentDomain = window.location.hostname;
    const urlDomain = new URL(url).hostname;
    return currentDomain !== urlDomain;
  } catch {
    return false;
  }
};