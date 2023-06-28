/*
 * @Author: yulinZ 1973329248@qq.com
 * @Date: 2023-06-19 19:15:56
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2023-06-28 16:59:08
 * @FilePath: \qwik-app\src\components\starter\header\header.tsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import {
  component$,
  useStylesScoped$,
  useOnDocument,
  $,
  useSignal,
  useTask$,
  useStore,
  useContext,
} from "@builder.io/qwik";
import styles from "./theme.css?inline";
import { GlobalStore } from "~/content";

const themeChange = (store: any) => {
  const htmlClassList: DOMTokenList = (
    document.querySelector("html") as HTMLElement
  )?.classList;
  if (htmlClassList?.contains("dark")) {
    htmlClassList.remove("dark");
    sessionStorage.setItem("theme", "light");
    store.isDark = false;
  } else {
    htmlClassList.add("dark");
    sessionStorage.setItem("theme", "dark");
    store.isDark = true;
  }
};

export default component$(() => {
  useStylesScoped$(styles);
  const state = useContext(GlobalStore);

  //   useTask$(({ track }) => {
  //     track = () => isDark.value;
  //   });
  useOnDocument(
    "DOMContentLoaded",
    $(() => {
      const themeCach = sessionStorage.getItem("theme");
      const htmlClassList: DOMTokenList = (
        document.querySelector("html") as HTMLElement
      )?.classList;
      if (themeCach === "dark") {
        // theme.isDark = true;
        htmlClassList.add("dark");
      } else {
        // theme.isDark = false;
        htmlClassList.remove("dark");
      }
    })
  );
  return (
    <label class="switch">
      <input
        type="checkbox"
        // checked={state.theme === 'dark'}
        onChange$={() => themeChange(state)}
      />
      <span class="slider"></span>
    </label>
  );
});
