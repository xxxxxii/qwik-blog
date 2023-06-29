/*
 * @Description: 
 * @version: 0.0.1
 * @Author: yulinZ
 * @LastEditTime: 2023-06-29 16:08:26
 */
import { component$, useContext, useVisibleTask$ } from '@builder.io/qwik';
import { GlobalStore } from '~/context';
import { colorSchemeChangeListener, DARK_THEME, getColorPreference, LIGHT_THEME, setPreference } from './theme';

export const ThemeLoader = component$(() => {
  const globalStore: any = useContext(GlobalStore);

  useVisibleTask$(() => {
    globalStore.theme = getColorPreference();
    return colorSchemeChangeListener((isDark) => {
      globalStore.theme = isDark ? DARK_THEME : LIGHT_THEME;
      setPreference(globalStore.theme);
    });
  });

  return <div data-theme-loader></div>;
});
