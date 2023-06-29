/*
 * @Author: yulinZ 1973329248@qq.com
 * @Date: 2023-06-19 19:15:56
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2023-06-29 11:55:36
 * @FilePath: \qwik-app\src\components\starter\header\header.tsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { component$, useStylesScoped$ } from "@builder.io/qwik";
import { QwikLogo } from "../icons/qwik";
import styles from "./header.css?inline";
// import { ThemeSwitcher } from "../theme/theme1";
import Theme from "../theme/theme";

export default component$(() => {
  useStylesScoped$(styles);

  return (
    <header>
      <div class={["nav-header", "wrapper"]}>
        <div class="logo">
          <a href="/" title="qwik">
            <QwikLogo height={50} width={100} />
          </a>
        </div>
        <ul>
          <li>
            <a href="/zui" target="_blank">
              ZUI文档
            </a>
          </li>
          <li>
            <a
              href="https://qwik.builder.io/examples/introduction/hello-world/"
              target="_blank"
            >
              About Me
            </a>
          </li>
          <li>
            <a
              href="https://qwik.builder.io/tutorial/welcome/overview/"
              target="_blank"
            >
              Tutorials
            </a>
          </li>
          <Theme />
          {/* <ThemeSwitcher /> */}
        </ul>
      </div>
    </header>
  );
});
