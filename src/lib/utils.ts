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
