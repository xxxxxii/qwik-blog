/*
 * @Description:
 * @version: 0.0.1
 * @Author: yulinZ
 * @LastEditTime: 2023-06-20 17:06:51
 */
import { component$ } from "@builder.io/qwik";
import { useDocumentHead, useLocation } from "@builder.io/qwik-city";

/**
 * The RouterHead component is placed inside of the document `<head>` element.
 */
export const RouterHead = component$(() => {
  const head = useDocumentHead();
  const loc = useLocation();

  return (
    <>
      <title>{head.title}</title>

      <link rel="canonical" href={loc.url.href} />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta name="referrer" content="no-referrer" />
      <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
      <script src="https://code.iconify.design/iconify-icon/1.0.7/iconify-icon.min.js"></script>
      <script
        src="https://cdnjs.cloudflare.com/ajax/libs/markdown-it/13.0.1/markdown-it.min.js"
        integrity="sha512-SYfDUYPg5xspsG6OOpXU366G8SZsdHOhqk/icdrYJ2E/WKZxPxze7d2HD3AyXpT7U22PZ5y74xRpqZ6A2bJ+kQ=="
        crossorigin="anonymous"
        referrerpolicy="no-referrer"
      ></script>
      <link
        rel="stylesheet"
        href="//cdnjs.cloudflare.com/ajax/libs/highlight.js/9.11.0/styles/default.min.css"
      />
      <script src="//cdnjs.cloudflare.com/ajax/libs/highlight.js/9.11.0/highlight.min.js"></script>

      {head.meta.map((m) => (
        <meta key={m.key} {...m} />
      ))}

      {head.links.map((l) => (
        <link key={l.key} {...l} />
      ))}

      {head.styles.map((s) => (
        <style key={s.key} {...s.props} dangerouslySetInnerHTML={s.style} />
      ))}
    </>
  );
});
