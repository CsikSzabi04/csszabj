// Netlify edge rate limit in front of the page-fetch API. The rule is enforced at the edge,
// before the Next.js server function is invoked; requests over the limit get HTTP 429.
// Returning nothing lets allowed requests continue to the normal handler.
export default async function pageFetchRateLimit() {}

export const config = {
  path: "/api/page-fetch",
  rateLimit: {
    windowLimit: 20,
    windowSize: 60,
    aggregateBy: ["ip", "domain"],
  },
};
