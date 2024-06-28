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

const attachLibraryAndDriver = ({
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

const importCommonLibraryCpp = (code: string) => {
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
  const mainFunction = `int main(){
return 0;
}`;
  return `${defaultIncludes}\n${code}\n${mainFunction}`;
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

export const jsonToStdin = (testcases: TestCase[]) => {
  const stdin_array = testcases.map((testcase) => {
    const { input } = testcase;
    return Object.values(input)
      .map((item: unknown) => {
        if (typeof item === "number") {
          return item.toString();
        }
        if (typeof item === "string") {
          return item;
        }
        if (typeof item === "object" && Array.isArray(item)) {
          return item.join(" ");
        }
        return "";
      })
      .join("\n");
  });
  return stdin_array;
};

export const jsonToExpectedOutput = (testcases: TestCase[]) => {
  const expected_output_array = testcases.map((testcase) => {
    const { expected_output } = testcase;
    if (typeof expected_output === "number") {
      return expected_output as unknown as string;
    }
    if (typeof expected_output === "string") {
      return expected_output;
    }
    if (typeof expected_output === "object" && Array.isArray(expected_output)) {
      return expected_output.join(" ");
    }
    return "";
  });
  return expected_output_array;
};

export const preparePreSubmissionData = ({
  userCode,
  languageId,
}: {
  userCode: string;
  languageId: string;
}) => {
  let code = "";
  switch (languageId) {
    case "54": {
      code = importCommonLibraryCpp(userCode);
    }
  }
  return code;
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
  testcases: TestCase[];
}) => {
  let code = "";
  let stdin_array: string[] = [];
  let expected_output_array: string[] = [];
  switch (languageId) {
    case "54":
      code = attachLibraryAndDriver({ userCode, driverCode });
      stdin_array = jsonToStdin(testcases);
      expected_output_array = jsonToExpectedOutput(testcases);
      break;

    default:
      break;
  }
  return { code, stdin_array, expected_output_array };
};

export function unknownToString(value: unknown): string {
  if (typeof value === "string") {
    return value;
  } else if (typeof value === "number") {
    return value.toString();
  } else if (Array.isArray(value)) {
    return `[${value.map(unknownToString).join(", ")}]`;
  } else if (typeof value === "object") {
    return JSON.stringify(value);
  } else {
    return value?.toString() ?? "null";
  }
}

export function stringToData(value: string, expectedType: string) {
  if (
    expectedType === "number" ||
    expectedType === "string" ||
    expectedType === "boolean"
  ) {
    return value.toLowerCase();
  } else if (expectedType === "object") {
    return `[${value.split(" ").join(", ")}]`;
  } else {
    return value;
  }
}
