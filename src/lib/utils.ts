import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

import { remark } from "remark";
import html from "remark-html";
import { TestCase } from "./types";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export async function convertMdToHtml(md: string) {
  const processedContent = await remark().use(html).process(md);
  const contentHtml = processedContent.toString();

  return contentHtml;
}

export async function getUploadthingFile(fileKey: string) {
  const response = await fetch(`https://utfs.io/f/${fileKey}`);
  const data = await response.text();
  return data;
}

export const insertDefaultIncludesForCpp = ({
  userCode,
  driverCode,
}: {
  userCode: string;
  driverCode: string;
}) => {
  const defaultIncludes = `#include <algorithm>
#include <array>
#include <bitset>
#include <deque>
#include <iostream>
#include <iterator>
#include <list>
#include <map>
#include <queue>
#include <set>
#include <stack>
#include <string>
#include <tuple>
#include <unordered_map>
#include <unordered_set>
#include <utility>
#include <vector>
#include <cmath>
using namespace std;
`;
  return `${defaultIncludes}\n${userCode}\n${driverCode}`;
};

export const getPublicTestcases = (testcasesJson: string) => {
  try {
    const testcases = JSON.parse(testcasesJson) as TestCase[];
    return JSON.stringify(testcases.slice(0, 2));
  } catch (error) {
    console.log(error);
    return "";
  }
};

export const jsonToStdin = (testcasesJson: string) => {
  const testcases = JSON.parse(testcasesJson) as TestCase[];
  const stdin = testcases
    .map((testcase) => {
      const { input } = testcase;
      return Object.values(input)
        .map((item: unknown) => {
          if (typeof item === "number") {
            return item;
          }
          if (typeof item === "string") {
            return item;
          }
          if (typeof item === "object" && Array.isArray(item)) {
            return item.join(" ");
          }
        })
        .join("\n");
    })
    .join("\n");
  return stdin;
};

export const jsonToInput = (testcasesJson: string) => {
  const testcases = JSON.parse(testcasesJson) as TestCase[];
  const inputs = testcases.map((testcase) => {
    const { input } = testcase;
  });
  return inputs;
};

export const prepareSubmissionData = ({
  userCode,
  driverCode,
  languageId,
  testcases,
}: {
  userCode: string;
  driverCode: string;
  languageId: string;
  testcases: string;
}) => {
  let code = "";
  let stdin = "";
  switch (languageId) {
    case "54":
      code = insertDefaultIncludesForCpp({ userCode, driverCode });
      stdin = jsonToStdin(testcases);
      break;

    default:
      break;
  }
  return { code, stdin };
};
