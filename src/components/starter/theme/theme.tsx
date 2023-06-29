import { $, component$, useContext, useStylesScoped$, useVisibleTask$ } from '@builder.io/qwik';
import { GlobalStore } from '~/context';
import { themeStorageKey } from '../../router-head/theme-script';
import styles from './theme.css?inline';

export const DARK_THEME = 'dark';
export const LIGHT_THEME = 'light';
export type ThemePreference = typeof DARK_THEME | typeof LIGHT_THEME;

export const colorSchemeChangeListener = (onColorSchemeChange: (isDark: boolean) => void) => {
  const listener = ({ matches: isDark }: MediaQueryListEvent) => {
    onColorSchemeChange(isDark);
  };
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (event) => listener(event));

  return () => window.matchMedia('(prefers-color-scheme: dark)').removeEventListener('change', listener);
};

export const setPreference = (theme: ThemePreference) => {
  localStorage.setItem(themeStorageKey, theme);
  reflectPreference(theme);
};

export const reflectPreference = (theme: ThemePreference) => {
  document.firstElementChild?.setAttribute('data-theme', theme);
  document.firstElementChild?.classList.toggle('dark', theme === DARK_THEME);
};

export const getColorPreference = (): ThemePreference => {
  if (localStorage.getItem(themeStorageKey)) {
    console.log(localStorage.getItem(themeStorageKey));
    return localStorage.getItem(themeStorageKey) as ThemePreference;
  } else {
    console.log(window.matchMedia('(prefers-color-scheme: dark)').matches ? DARK_THEME : LIGHT_THEME);
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? DARK_THEME : LIGHT_THEME;
  }
};

export default component$(() => {
  useStylesScoped$(styles);
  const state: any = useContext(GlobalStore);

  useVisibleTask$(() => {
    state.theme = localStorage.getItem('theme-preference');
  });
  const onClick$ = $(() => {
    state.theme = state.theme === LIGHT_THEME ? DARK_THEME : LIGHT_THEME;
    setPreference(state.theme);
  });
  return (
    <div onClick$={onClick$}>
      {state.theme}
      {/* <label class="switch">
        <input id="theme-switch" type="checkbox" onChange$={onClick$} />
        <span class="slider"></span>
      </label> */}
    </div>
  );
});
