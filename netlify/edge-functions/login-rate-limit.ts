// Netlify edge rate limit in front of the owner login. Enforced at the edge on top of the in-app
// per-IP lockout (which lives in one function instance's memory only); over the limit gets HTTP 429.
export default async function loginRateLimit() {}

export const config = {
  path: "/api/auth/login",
  rateLimit: {
    windowLimit: 10,
    windowSize: 60,
    aggregateBy: ["ip", "domain"],
  },
};
