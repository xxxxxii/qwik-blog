/*
 * @Author: yulinZ 1973329248@qq.com
 * @Date: 2023-06-19 19:47:36
 * @LastEditors: yulinZ 1973329248@qq.com
 * @LastEditTime: 2023-06-20 22:10:16
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

  
} from "@builder.io/qwik";
import {
  type DocumentHead,
  useLocation,
  routeLoader$,
} from "@builder.io/qwik-city";
import { getArticleDetils } from "~/api";
import styles from "./index.css?inline";
import markdownIt from "markdown-it";
import hljs from "highlight.js"
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
  useStylesScoped$(styles);
  const dataList: any = useData();
  const article = dataList.value.data[0];

  const markdownRef = useSignal<Element>();

  const md = new markdownIt({
    html: true,
    linkify: true,
    typographer: true,
    highlight: function (str, lang) {
      // 此处判断是否有添加代码语言
      if (lang && hljs.getLanguage(lang)) {
        try {
          // 得到经过highlight.js之后的html代码
          const preCode = hljs.highlight(lang, str, true).value
          // 以换行进行分割
          const lines = preCode.split(/\n/).slice(0, -1)
          // 添加自定义行号
          let html = lines.map((item, index) => {
            return '<li><span class="line-num" data-line="' + (index + 1) + '"></span>' + item + '</li>'
          }).join('')
          html = '<ol style="overflow-x: auto">' + html + '</ol>'
          // 添加代码语言
          if (lines.length) {
            html += '<b class="name">' + lang + '</b>'
          }
          return '<pre class="highlight" ><code>' +
            html +
            '</code></pre>'
        } catch (__) {}
      }
    // 未添加代码语言，此处与上面同理
      const preCode = md.utils.escapeHtml(str)
      const lines = preCode.split(/\n/).slice(0, -1)
      let html = lines.map((item, index) => {
        return '<li><span class="line-num" data-line="' + (index + 1) + '"></span>' + item + '</li>'
      }).join('')
      html = '<ol style="overflow-x: auto">' + html + '</ol>'
      return '<pre class="highlight"><code>' +
        html +
        '</code></pre>'
    }
  });
  
 const htmlStr:any  =  md.render(article?.content);



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
        <div id="preview" ref={markdownRef} dangerouslySetInnerHTML={htmlStr}>
        </div>
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
