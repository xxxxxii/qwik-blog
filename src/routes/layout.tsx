/*
 * @Author: yulinZ 1973329248@qq.com
 * @Date: 2023-06-19 19:15:56
 * @LastEditors: yulinZ 1973329248@qq.com
 * @LastEditTime: 2023-06-22 01:28:12
 * @FilePath: \qwik-app\src\routes\layout.tsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { component$, Slot, useStyles$ } from "@builder.io/qwik";
import { routeLoader$ } from "@builder.io/qwik-city";
import type { RequestHandler } from "@builder.io/qwik-city";

import Header from "~/components/starter/header/header";
import Footer from "~/components/starter/footer/footer";
import Counter from "~/components/starter/counter/counter";
import Hero from "~/components/starter/hero/hero";
import NextSteps from "~/components/starter/next-steps/next-steps";
import { getClass } from "~/api";
import styles from "./styles.css?inline";

const useData = routeLoader$(async () => {
  const response: any = await getClass();

  // console.log(await response.json());
  return (await response.json()) as {
    data: [];
    code: string;
    total: number;
  };
});

export const onGet: RequestHandler = async ({ cacheControl }) => {
  // Control caching for this request for best performance and to reduce hosting costs:
  // https://qwik.builder.io/docs/caching/
  cacheControl({
    // Always serve a cached response by default, up to a week stale
    staleWhileRevalidate: 60 * 60 * 24 * 7,
    // Max once every 5 seconds, revalidate on the server to get a fresh version of this page
    maxAge: 5,
  });
};

export const useServerTimeLoader = routeLoader$(() => {
  return {
    date: new Date().toISOString(),
  };
});

export default component$(() => {
  useStyles$(styles);

  const groupList: any = useData();
  return (
    <>
      <Header />
     {/* <Counter />
     <Hero /> */}
     <NextSteps />
      <div class="container">
        <main class="app-main">
          <div class="app-main-left">
            <Slot />
          </div>
          <div class="app-main-right">
            <h2 class="module-title">
              <iconify-icon class="z-icon" icon="logos:vue"></iconify-icon> 分类
            </h2>

            <div class="app-main-right-body">
              {groupList.value?.data.map((item: any, index: number) => {
                return (
                  <div key={item?.id || index}>
                    <iconify-icon
                      class="app-main-class-icon"
                      icon={item?.icon}
                    ></iconify-icon>
                    {item?.name}
                  </div>
                );
              })}
            </div>
          </div>
        </main>
      </div>
      <Footer />
    </>
  );
});
