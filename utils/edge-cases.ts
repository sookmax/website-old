export function isLinkedInApp(userAgent: string | null) {
  if (!userAgent) return false;

  return /LinkedInApp/.test(userAgent);
}
