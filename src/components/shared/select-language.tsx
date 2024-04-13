"use client";

import * as React from "react";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";

import { languages } from "~/lib/types";
import { useEditorStore } from "~/lib/stores";

export function SelectLanguage() {
  const language = useEditorStore((state) => state.language);
  const setLanguage = useEditorStore((state) => state.setLanguage);

  const handleLanguageChange = (value: string) => {
    const selectedLanguage = languages.find(
      (lang) => lang.id === parseInt(value)
    );
    if (selectedLanguage) {
      setLanguage(selectedLanguage);
    }
  };

  return (
    <Select onValueChange={handleLanguageChange}>
      <SelectTrigger className="w-[150px]">
        <SelectValue defaultValue={language.id} placeholder={language.name} />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {" "}
          <SelectLabel>Languages</SelectLabel>
          {languages.map((language) => (
            <SelectItem key={language.id} value={language.id.toString()}>
              {language.name}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
