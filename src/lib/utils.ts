import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

import { remark } from "remark";
import html from "remark-html";

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

const extractIncludes = (code: string) => {
  const includeRegex = /^\s*#include\s*<[^>]+>\s*\n/gm;
  const includes = new Set();
  let match;
  while ((match = includeRegex.exec(code)) !== null) {
    includes.add(match[0].trim().replaceAll(" ", ""));
  }
  const strippedCode = code.replace(includeRegex, "");
  return { includes: Array.from(includes), strippedCode };
};

export const consolidateIncludes = (userCode: string, judgeCode: string) => {
  const userIncludes = extractIncludes(userCode);
  const judgeIncludes = extractIncludes(judgeCode);

  const combinedIncludes = new Set([
    ...userIncludes.includes,
    ...judgeIncludes.includes,
  ]);

  return {
    includes: Array.from(combinedIncludes),
    userStrippedCode: userIncludes.strippedCode,
    judgeStrippedCode: judgeIncludes.strippedCode,
  };
};

export const jsonToStdin = (input: any) => {
  const stdin = Object.values(input)
    .map((item: any) => {
      if (typeof item === "number") {
        return item;
      }
      if (typeof item === "string") {
        return item;
      }
      if (typeof item === "object") {
        return item.join(" ");
      }
    })
    .join("\n");
  return stdin;
};

