import { SubmissionRequest, SubmissionResponse } from "./types";

const judge0_api_url = process.env.JUDGE0_API_URL;
const judge0_api_key = process.env.JUDGE0_API_KEY;
const judge0_api_host = process.env.JUDGE0_API_HOST;

const headers: HeadersInit = {
  "Content-Type": "application/json",
  "x-rapidapi-key": judge0_api_key!,
  "x-rapidapi-host": judge0_api_host!,
};

export const createSubmissionFetch = async ({
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

export const getSubmissionFetch = async (
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

export const createBatchSubmissionFetch = async (
  submissions: SubmissionRequest[],
): Promise<{ token: string }[] | null> => {
  const url = `${judge0_api_url}/submissions/batch?base64_encoded=true`;
  const options = {
    method: "POST",
    headers,
    body: JSON.stringify({ submissions }),
  };

  try {
    const response = await fetch(url, options);
    const result = (await response.json()) as Promise<{ token: string }[]>;
    return result;
  } catch (error) {
    console.error(error);
  }

  return null;
};

export const getBatchSubmissionFetch = async (
  tokens: { token: string }[],
): Promise<{ submissions: SubmissionResponse[] }> => {
  const tokenString = tokens.map((token) => token.token).join(",");
  const response = await fetch(
    `${judge0_api_url}/submissions/batch?base64_encoded=true&wait=false&tokens=${tokenString}`,
    {
      method: "GET",
      headers,
    },
  );

  if (!response.ok) {
    console.log("Fetch error get:", response);
    throw new Error("Internal server error. Please try again later.");
  }

  return response.json() as Promise<{ submissions: SubmissionResponse[] }>;
};
