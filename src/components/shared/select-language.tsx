"use client";

import { useEffect } from "react";
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
import { DEFAULT_LANGUAGE } from "~/routes";
import { api } from "~/trpc/react";

export function SelectLanguage() {
  const { languages, setLanguages, selectedLanguage, setSelectedLanguage } =
    useEditorStore();

  const { data } = api.language.all.useQuery(undefined, {
    enabled: !languages,
  });

  useEffect(() => {
    if (data?.length) {
      setLanguages(data);
      setSelectedLanguage(
        data.find((language) => language.name === DEFAULT_LANGUAGE) ?? data[0]!,
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  return (
    languages && (
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
    )
  );
}
