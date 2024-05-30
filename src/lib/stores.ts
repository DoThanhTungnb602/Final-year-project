import { create } from "zustand";
import { Language, Theme, languages } from "./types";

interface UserPreferencesStore {
  theme: Theme;
  toggleTheme: () => void;
}

interface EditorStore {
  language: Language;
  setLanguage: (language: Language) => void;
  languageCode: Map<Language["name"], string>;
  setLanguageCode: (language: Language["name"], code: string) => void;
}

const defaultLanguageCode = new Map<Language["name"], string>();
languages.forEach((language) => {
  defaultLanguageCode.set(language.name, "");
});
defaultLanguageCode.set(
  "C++",
  `class Solution {
  public:
    vector<int> twoSum(vector<int>& nums, int target) {
        std::unordered_map<int, int> hash;
        for (int i = 0; i < nums.size(); ++i) {
            int x = target - nums[i];
            if (hash.find(x) != hash.end()) {
                return {i, hash[x]};
            }
            hash[nums[i]] = i;
        }
        return {};
    }
  };`,
);

export const useUserPreferencesStore = create<UserPreferencesStore>((set) => ({
  theme: "dark",
  toggleTheme: () =>
    set((state) => ({ theme: state.theme === "dark" ? "light" : "dark" })),
}));

export const useEditorStore = create<EditorStore>((set) => ({
  language: { id: 76, name: "C++", editorValue: "cpp" },
  setLanguage: (language) => set({ language }),
  languageCode: defaultLanguageCode,
  setLanguageCode: (language, code) => {
    set((state) => {
      state.languageCode.set(language, code);
      return state;
    });
  },
}));
