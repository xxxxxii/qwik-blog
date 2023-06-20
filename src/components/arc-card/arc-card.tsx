/*
 * @Author: yulinZ 1973329248@qq.com
 * @Date: 2023-06-20 01:48:27
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2023-06-20 10:40:10
 * @FilePath: \qwik-app\src\components\arc-card\arc-card.tsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { component$, useStylesScoped$ } from "@builder.io/qwik";
// import { QwikLogo } from '../icons/qwik';
import styles from "./crad.css?inline";

interface propsDto {
  title: string;
  isTop?: boolean;
  content: string;
  dateTime?: string;
  group?: any;
  labels?: [];
  onClick$: (event: any) => void;
}

export default component$((props: propsDto) => {
  useStylesScoped$(styles);
  return (
    <div class="card">
      {props?.isTop ? <span class="is-top"></span> : ""}
      <h3 class="card__title cp" onClick$={props?.onClick$}>
        {props.title}
      </h3>
      <p class="card__content">{props?.content}</p>
      <div class="card__date">
        {props?.dateTime}
        <span> {props?.group?.name}</span>
      </div>
      <div class="card-labels">
        {props?.labels &&
          props?.labels.map((item: any) => {
            return (
              <span style="margin-right:4px" class="cp" key={item?.id}>
                {item?.name}
              </span>
            );
          })}
      </div>

      <div class="card__arrow cp" onClick$={props?.onClick$}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          height="15"
          width="15"
        >
          <path
            fill="#fff"
            d="M13.4697 17.9697C13.1768 18.2626 13.1768 18.7374 13.4697 19.0303C13.7626 19.3232 14.2374 19.3232 14.5303 19.0303L20.3232 13.2374C21.0066 12.554 21.0066 11.446 20.3232 10.7626L14.5303 4.96967C14.2374 4.67678 13.7626 4.67678 13.4697 4.96967C13.1768 5.26256 13.1768 5.73744 13.4697 6.03033L18.6893 11.25H4C3.58579 11.25 3.25 11.5858 3.25 12C3.25 12.4142 3.58579 12.75 4 12.75H18.6893L13.4697 17.9697Z"
          ></path>
        </svg>
      </div>
    </div>
  );
});
