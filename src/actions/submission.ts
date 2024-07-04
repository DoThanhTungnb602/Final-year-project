"use server";

import { getBatchSubmission } from "~/lib/axios";

export async function run() {
  const tokens = [
    { token: "5c82312d-645d-45da-af87-e32ce21ca7bb" },
    { token: "e2d1e388-7d92-4a3b-bd88-8fe269fa778a" },
  ];

  const submissionResponse = await getBatchSubmission(tokens);
  return submissionResponse;
}
