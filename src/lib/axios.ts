import axios, { AxiosError } from "axios";
import { SubmissionRequest, SubmissionResponse } from "./types";

const judge0_api_url = process.env.JUDGE0_API_URL;
const judge0_api_key = process.env.JUDGE0_API_KEY;
const judge0_api_host = process.env.JUDGE0_API_HOST;

export const axiosInstance = axios.create({
  baseURL: judge0_api_url,
});

axiosInstance.interceptors.request.use(async (config) => {
  try {
    config.headers["X-RapidAPI-Key"] = judge0_api_key;
    config.headers["X-RapidAPI-Host"] = judge0_api_host;
  } catch (error) {
    console.log(error);
  }
  return config;
});

export const createSubmission = async ({
  code,
  languageId,
  stdin,
}: {
  code: string;
  languageId: string;
  stdin: string;
}) => {
  const response = await axiosInstance
    .post<{ token: string }>(
      `/submissions`,
      {
        language_id: languageId,
        source_code: btoa(code),
        stdin: stdin,
      },
      {
        params: {
          base64_encoded: "true",
          wait: "false",
        },
      },
    )
    .catch((error) => {
      console.log("Axios error:", error);
      if (error instanceof AxiosError) {
        throw error;
      }
      throw new Error("Internal server error. Please try again later.");
    });
  return response.data.token;
};

export const getSubmission = async (token: string) => {
  const response = await axiosInstance
    .get<SubmissionResponse>(`/submissions/${token}`, {
      params: {
        base64_encoded: "true",
        wait: "false",
      },
    })
    .catch((error) => {
      console.log("Axios error:", error);
      if (error instanceof AxiosError) {
        throw error;
      }
      throw new Error("Internal server error. Please try again later.");
    });
  return response.data;
};

export const createBatchSubmission = async (
  submissions: SubmissionRequest[],
) => {
  const response = await axiosInstance
    .post<{ token: string }[]>(
      `/submissions/batch`,
      {
        submissions,
      },
      {
        params: {
          base64_encoded: "true",
          wait: "false",
        },
      },
    )
    .catch((error) => {
      console.log("Axios error:", error);
      if (error instanceof AxiosError) {
        throw error;
      }
      throw new Error("Internal server error. Please try again later.");
    });
  return response.data;
};

export const getBatchSubmission = async (tokens: { token: string }[]) => {
  const response = await axiosInstance
    .get<{ submissions: SubmissionResponse[] }>(`/submissions/batch`, {
      params: {
        tokens: tokens.map((token) => token.token).join(","),
        base64_encoded: "true",
        wait: "false",
      },
    })
    .catch((error) => {
      console.log("Axios error:", error);
      if (error instanceof AxiosError) {
        throw error;
      }
      throw new Error("Internal server error. Please try again later.");
    });
  return response.data;
};
