/*
 * @Author: yulinZ 1973329248@qq.com
 * @Date: 2023-06-19 19:47:36
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2023-06-20 18:04:21
 * @FilePath: \qwik-app\src\routes\test\index.tsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import {
  component$,
  useVisibleTask$,
  useStore,
  useStylesScoped$,
  useResource$,
  Resource,
  noSerialize,
  useSignal,
  useTask$,
} from "@builder.io/qwik";
import {
  type DocumentHead,
  useLocation,
  routeLoader$,
} from "@builder.io/qwik-city";
import { getArticleDetils } from "~/api";
import styles from "./index.css?inline";
import markdownIt from "markdown-it";

const useData = routeLoader$(async (requestEvent) => {
  let response: any = null;
  const arcId = requestEvent.params.id;
  if (arcId) response = await getArticleDetils(arcId);

  return (await response.json()) as {
    data: [];
    code: string;
    total: number;
  };
});

export default component$(() => {
  const loc = useLocation();
  useStylesScoped$(styles);
  const dataList: any = useData();
  const article = dataList.value.data[0];

  const markdownRef = useSignal<HTMLElement>();
  const md = new markdownIt();
  const htmlStr = useSignal();

  htmlStr.value = md.render(article?.content);

  // useTask$(() => {
  //   markdownRef.value = htmlStr.value;
  //   console.log(markdownRef.value);
  // });
  // handleShortener(state)
  // useVisibleTask$(async ({ cleanup }) => {
  //   const timeout = setTimeout(() => (state.count = 1), 500);
  //   cleanup(() => clearTimeout(timeout));

  //   const internal = setInterval(() => state.count++, 7000);
  //   cleanup(() => clearInterval(internal));
  // });

  return (
    <div>
      <article>
        <h1>{article?.title}</h1>
        <div class="arc-bf">{article?.bf}</div>

        <textarea id="mark"></textarea>
        <div id="preview" ref={markdownRef}></div>
      </article>
    </div>
  );
});

export const head: DocumentHead = ({ resolveValue }) => {
  const data: any = resolveValue(useData);
  const article = data?.data[0];
  return {
    title: article?.title,
    meta: [
      {
        name: "description",
        content: article?.bf,
      },
      {
        name: "keywords",
        content:
          article?.title +
          " " +
          "" +
          article.group?.name +
          " " +
          "" +
          article?.labels.map((item: any) => item?.name).join(" "),
      },
    ],
  };
};
