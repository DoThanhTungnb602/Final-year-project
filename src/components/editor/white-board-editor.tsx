"use client";

import { useTheme } from "next-themes";
import { Tldraw, TLComponents } from "tldraw";

const components: TLComponents = {
  ContextMenu: null,
  ActionsMenu: null,
  HelpMenu: null,
  ZoomMenu: null,
  MainMenu: null,
  Minimap: null,
  StylePanel: null,
  PageMenu: null,
  NavigationPanel: null,
  KeyboardShortcutsDialog: null,
  QuickActions: null,
  HelperButtons: null,
  DebugMenu: null,
  SharePanel: null,
  MenuPanel: null,
  TopPanel: null,
};

export default function WhiteboardEditor() {
  const { theme } = useTheme();

  return (
    <div className="h-full w-full">
      <Tldraw inferDarkMode={theme === "dark"} components={components} />
    </div>
  );
}
