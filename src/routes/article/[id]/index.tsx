/*
 * @Author: yulinZ 1973329248@qq.com
 * @Date: 2023-06-19 19:47:36
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2023-06-25 09:00:54
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
  createElement,
  useStyles$,
  useOnWindow,
  $,
  useOnDocument,
} from "@builder.io/qwik";
import {
  type DocumentHead,
  useLocation,
  routeLoader$,
} from "@builder.io/qwik-city";
import { getArticleDetils } from "~/api";
import styles from "./index.css?inline";
import markdownIt from "markdown-it";
import hljs from "highlight.js";
import toc from "markdown-it-toc-done-right";
import anchor from "markdown-it-anchor";

// import "highlight.js/scss"

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
  useStyles$(styles);
  const dataList: any = useData();
  const article = dataList.value.data[0];

  const markdownRef = useSignal<Element>();

  useOnDocument(
    "click",
    $((event: Event) => {
      const target = event.target as HTMLElement;
      const copyId: any = target.getAttribute("data-clipboard-target");

      const element = document.querySelector(copyId);
      element.select();
      element.setSelectionRange(0, element.value.length);
      document.execCommand("copy");

      // 修改copy btn 的提示 2s 后还原
      target.innerText = "copied";
      setTimeout(() => {
        target.innerText = "copy";
      }, 2000);
    })
  );

  const md = new markdownIt({
    html: true,
    linkify: true,
    typographer: true,
    highlight: function (str: string, lang: string) {
      //生成随机id 标识 用于复制功能
      const codeIndex =
        parseInt(Date.now() as any) + Math.floor(Math.random() * 10000000);
      if (lang && hljs.getLanguage(lang)) {
        try {
          // 得到经过highlight.js之后的html代码
          const preCode = hljs.highlight(str, {
            language: lang,
            ignoreIllegals: true,
          }).value;
          console.log(preCode);
          // 以换行进行分割
          const lines = preCode.split(/\n/).slice(0, -1);
          // 添加自定义行号
          let html = lines
            .map((item, index) => {
              return (
                '<li><span class="line-num" data-line="' +
                (index + 1) +
                '"></span>' +
                item +
                "</li>"
              );
            })
            .join("");
          html = '<ol style="overflow-x: auto;margin:0">' + html + "</ol>";

          // 添加代码语言
          if (lines.length) {
            html =
              '<b class="code-type"><span>Type:</span>' + lang + "</b>" + html;
          }
          // 添加复制标签
          html =
            `<div class="code-copy"  data-clipboard-action="copy" data-clipboard-target="#copy${codeIndex}"> copy</div>` +
            html;
          return (
            '<pre class="hljs article-pre" ><code style="padding:6px">' +
            html +
            `</code></pre><textarea style="position: absolute;top: -9999px;left: -9999px;z-index: -9999;" id="copy${codeIndex}">${str.replace(
              /<\/textarea>/g,
              "&lt;/textarea>"
            )}</textarea>`
          );
        } catch (__) {
          console.log(__);
        }
      }
      // 未添加代码语言，此处与上面同理
      const preCode = md.utils.escapeHtml(str);
      const lines = preCode.split(/\n/).slice(0, -1);
      let html = lines
        .map((item: any, index: number) => {
          return (
            '<li><span class="line-num" data-line="' +
            (index + 1) +
            '"></span>' +
            item +
            "</li>"
          );
        })
        .join("");
      html = '<ol style="overflow-x: auto;margin:0">' + html + "</ol>";
      return (
        '<pre class="hljs"><code style="padding:6px">' +
        html +
        `</code></pre><textarea style="position: absolute;top: -9999px;left: -9999px;z-index: -9999;" id="copy${codeIndex}">${str.replace(
          /<\/textarea>/g,
          "&lt;/textarea>"
        )}</textarea>`
      );
    },
  })
    .use(anchor, {
      level: 1,
      // slugify: string => string,
      permalink: true,
      // renderPermalink: (slug, opts, state, permalink) => {},
      permalinkClass: "header-anchor",
      permalinkSymbol: "¶",
      permalinkBefore: true,
    })
    .use(toc, { listType: "ul", itemClass: "toc-item" });

  // const tocRender: any = md.render("\n\n${toc}\n" + article?.content);
  const htmlStr: any = md.render("\n\n${toc}\n" + article?.content);

  return (
    <div class="article-main">
      {/* <div class="arc-toc"></div> */}
      <article>
        <h1 class="arc-title">{article?.title}</h1>
        <div class="arc-bf">{article?.bf}</div>
        <div
          id="preview"
          ref={markdownRef}
          dangerouslySetInnerHTML={htmlStr}
        ></div>
      </article>
    </div>
  );
});

// 设置页面的head
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
    links: [
      {
        rel: "stylesheet",
        name: "",
        href: "https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.8.0/styles/tokyo-night-dark.min.css",
        integrity:
          "sha512-dSQLLtgaq2iGigmy9xowRshaMzUHeiIUTvJW/SkUpb1J+ImXOPNGAI7ZC8V5/PiN/XN83B8uIk4qET7AMhdC5Q==",
        referrerpolicy: "no-referrer",
        crossorigin: "anonymous",
        // <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.8.0/styles/tokyo-night-dark.min.css" integrity="sha512-dSQLLtgaq2iGigmy9xowRshaMzUHeiIUTvJW/SkUpb1J+ImXOPNGAI7ZC8V5/PiN/XN83B8uIk4qET7AMhdC5Q==" crossorigin="anonymous" referrerpolicy="no-referrer" />
      },
    ],
  };
};
