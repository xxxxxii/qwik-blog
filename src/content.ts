import { createContextId } from "@builder.io/qwik";
// import { ThemePreference } from './components/theme-switcher/theme-switcher';

export interface SiteStore {
  theme: "light" | "auto";
  // ThemePreference
}

export const GlobalStore = createContextId<SiteStore>("site-store");
