"use client";

import { Ban, Check } from "lucide-react";
import { Button } from "~/components/ui/button";

import { useProblemTestcaseDriverStore } from "~/hooks/use-problem-testcase-driver-store";
import { cn } from "~/lib/utils";

export function LanguageSelector() {
  const { languages, selectedLanguage, setSelectedLanguage, codeMap } =
    useProblemTestcaseDriverStore();

  return (
    languages && (
      <div className="flex">
        {languages.map((language) => {
          const isSelected = selectedLanguage.id === language.id;
          const code = codeMap.get(language.name);
          const isCodeEmpty = !code || code.trim() === "";
          return (
            <Button
              type="button"
              variant="outline"
              key={language.id}
              className={cn(
                "rounded-none border-none bg-transparent transition-all",
                isSelected &&
                  "bg-white hover:bg-white dark:bg-[#1E1E1E] dark:hover:bg-[#1E1E1E]",
              )}
              onClick={() => setSelectedLanguage(language)}
            >
              <div className="flex w-full items-center justify-between gap-2">
                <span>{language.name}</span>
                {isCodeEmpty ? (
                  <Ban className="size-4 text-destructive" />
                ) : (
                  <Check className="size-4 text-green-500" />
                )}
              </div>
            </Button>
          );
        })}
      </div>
    )
  );
}
