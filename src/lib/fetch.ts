import { SubmissionRequest, SubmissionResponse } from "./types";

// const judge0_api_url = process.env.JUDGE0_API_URL;
const judge0_api_url = "https://judge0-ce.p.rapidapi.com";
const judge0_api_key = "65358de5c5msh85f235df7606377p107923jsna1c601409a6a";
const judge0_api_host = "judge0-ce.p.rapidapi.com";
// JUDGE0_API_KEY=65358de5c5msh85f235df7606377p107923jsna1c601409a6a
// JUDGE0_API_URL=https://judge0-ce.p.rapidapi.com
// JUDGE0_API_HOST=judge0-ce.p.rapidapi.com

const headers: HeadersInit = {
  "Content-Type": "application/json",
  "X-RapidAPI-Key": judge0_api_key,
  "X-RapidAPI-Host": judge0_api_host,
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

export const createBatchSubmissionFetch = async (
  submissions: SubmissionRequest[],
): Promise<{ token: string }[]> => {
  const url =
    "https://judge0-ce.p.rapidapi.com/submissions/batch?base64_encoded=true";
  const options = {
    method: "POST",
    headers: {
      "x-rapidapi-key": "65358de5c5msh85f235df7606377p107923jsna1c601409a6a",
      "x-rapidapi-host": "judge0-ce.p.rapidapi.com",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      submissions: [
        {
          language_id: 46,
          source_code: "ZWNobyBoZWxsbyBmcm9tIEJhc2gK",
        },
        {
          language_id: 71,
          source_code: "cHJpbnQoImhlbGxvIGZyb20gUHl0aG9uIikK",
        },
        {
          language_id: 72,
          source_code: "cHV0cygiaGVsbG8gZnJvbSBSdWJ5IikK",
        },
      ],
    }),
  };

  try {
    const response = await fetch(url, options);
    const result = (await response.json()) as Promise<{ token: string }[]>;
    return result;
  } catch (error) {
    console.error(error);
  }

  return [];

  // if (!response.ok) {
  //   console.log("Fetch error create:", response);
  //   throw new Error("Internal server error. Please try again later.");
  // }
  //
  // return response.json() as Promise<{ token: string }[]>;
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
