"use client";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";

import { useEditorStore } from "~/hooks/use-editor-store";

export function SelectLanguage() {
  const { languages, selectedLanguage, setSelectedLanguage } = useEditorStore();

  return languages ? (
    <Select
      onValueChange={(value) => {
        setSelectedLanguage(
          languages.find((language) => language.id === value) ??
            selectedLanguage,
        );
      }}
    >
      <SelectTrigger className="w-[150px]">
        <SelectValue
          defaultValue={selectedLanguage.id}
          placeholder={selectedLanguage.name}
        />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Languages</SelectLabel>
          {languages.map((language) => (
            <SelectItem key={language.id} value={language.id}>
              {language.name}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  ) : (
    <div></div>
  );
}
