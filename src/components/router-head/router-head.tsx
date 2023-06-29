/*
 * @Description:
 * @version: 0.0.1
 * @Author: yulinZ
 * @LastEditTime: 2023-06-29 16:37:41
 */
import { component$ } from '@builder.io/qwik';
import { useDocumentHead, useLocation } from '@builder.io/qwik-city';
import { ThemeScript } from './theme-script';

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
      <meta name="color-scheme" content="dark light" />
      <meta name="referrer" content="no-referrer" />
      <meta http-equiv="Cache-Control" content="no-cache, no-store, must-revalidate" />
      <meta http-equiv="Pragma" content="no-cache" />
      <meta http-equiv="Expires" content="0" />
      <link rel="icon" type="image/svg+xml" href="/logo.png" />

      <script src="https://code.iconify.design/iconify-icon/1.0.7/iconify-icon.min.js"></script>

      {/* <link rel="preconnect" href="https://fonts.googleapis.com" /> */}
      {/* <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" /> */}
      {/* <link href="https://fonts.googleapis.com/css2?family=Poppins&amp;display=swap" rel="stylesheet" /> */}
      <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css"
        integrity="sha512-c42qTSw/wPZ3/5LBzD+Bw5f7bSF2oxou6wEb+I/lqeaKV5FDIfMvvRp772y4jcJLKuGUOpbJMdg/BTl50fJYAw=="
        crossOrigin="anonymous"
        referrerPolicy="no-referrer"
      />
      <script async defer src="https://buttons.github.io/buttons.js"></script>

      {head.meta.map((m) => (
        <meta {...m} />
      ))}

      {head.links.map((l) => (
        <link {...l} />
      ))}

      {head.styles.map((s) => (
        <style {...s.props} dangerouslySetInnerHTML={s.style} />
      ))}
      <ThemeScript />
    </>
  );
});
