import { http, HttpResponse } from "msw";

export const handlers = [
  http.get("/api/stats", () => {
    return HttpResponse.json([{ date: "2025-08-10", steps: 5000 }], {
      status: 200,
    });
  }),
];
