import { SubmissionRequest, SubmissionResponse } from "./types";

const judge0_api_url = process.env.JUDGE0_API_URL;
const judge0_api_key = process.env.JUDGE0_API_KEY;
const judge0_api_host = process.env.JUDGE0_API_HOST;

const headers: HeadersInit = {
  "Content-Type": "application/json",
  "X-RapidAPI-Key": judge0_api_key!,
  "X-RapidAPI-Host": judge0_api_host!,
};

export const createSubmission = async ({
  code,
  languageId,
  stdin,
}: {
  code: string;
  languageId: string;
  stdin: string;
}): Promise<string> => {
  const response = await fetch(
    `${judge0_api_url}/submissions?base64_encoded=true&wait=false`,
    {
      method: "POST",
      headers,
      body: JSON.stringify({
        language_id: languageId,
        source_code: btoa(code),
        stdin: stdin,
      }),
    },
  );

  if (!response.ok) {
    console.log("Fetch error:", response.statusText);
    throw new Error("Internal server error. Please try again later.");
  }

  const data: { token: string } = (await response.json()) as { token: string };
  return data.token;
};

export const getSubmission = async (
  token: string,
): Promise<SubmissionResponse> => {
  const response = await fetch(
    `${judge0_api_url}/submissions/${token}?base64_encoded=true&wait=false`,
    {
      method: "GET",
      headers,
    },
  );

  if (!response.ok) {
    console.log("Fetch error:", response.statusText);
    throw new Error("Internal server error. Please try again later.");
  }

  return response.json() as Promise<SubmissionResponse>;
};

export const createBatchSubmission = async (
  submissions: SubmissionRequest[],
): Promise<{ token: string }[]> => {
  const response = await fetch(
    `${judge0_api_url}/submissions/batch?base64_encoded=true&wait=false`,
    {
      method: "POST",
      headers,
      body: JSON.stringify({ submissions }),
    },
  );

  if (!response.ok) {
    console.log("Fetch error:", response.statusText);
    throw new Error("Internal server error. Please try again later.");
  }

  return response.json() as Promise<{ token: string }[]>;
};

export const getBatchSubmissionFetch = async (tokens: { token: string }[]) => {
  const tokenString = tokens.map((token) => token.token).join(",");
  const response = await fetch(
    `${judge0_api_url}/submissions/batch?base64_encoded=true&wait=false&tokens=${tokenString}`,
    {
      method: "GET",
      headers,
      cache: "no-store",
    },
  );

  if (!response.ok) {
    console.log("Fetch error:", response.statusText);
    throw new Error("Internal server error. Please try again later.");
  }

  return response.json();
};
