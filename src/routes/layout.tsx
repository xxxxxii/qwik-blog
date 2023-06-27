import { component$, Slot, useStyles$ } from "@builder.io/qwik";
import { routeLoader$ } from "@builder.io/qwik-city";
import type { RequestHandler } from "@builder.io/qwik-city";

import Header from "~/components/starter/header/header";
import Footer from "~/components/starter/footer/footer";
import NextSteps from "~/components/starter/next-steps/next-steps";
import { getClass, getLabels } from "~/api";
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

const useLabelsList = routeLoader$(async () => {
  const response: any = await getLabels();

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
  const labelList: any = useLabelsList();
  return (
    <>
      <Header />
      <NextSteps />
      <div class="container">
        <main class="app-main">
          <div class="app-main-left">
            <Slot />
          </div>
          {/* <div class="app-main-right"></div> */}
          <div class="app-main-right fixed-app-right">
            <div class="app-main-right-card">
              <h2 class="module-title">
                <iconify-icon
                  class="z-icon"
                  icon="uil:layer-group"
                  width="22"
                ></iconify-icon>
                分类
              </h2>
              <div class="app-main-right-body">
                {groupList.value?.data.map((item: any, index: number) => {
                  return (
                    <div class="cp" key={item?.id || index}>
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

            <div class="app-main-right-card">
              <h2 class="module-title">
                <iconify-icon
                  class="z-icon"
                  icon="mdi:label-multiple"
                  width="22"
                ></iconify-icon>
                标签
              </h2>
              <div class="app-main-right-body">
                {/* {labelList.value} */}
                {labelList.value?.data.map((item: any, index: number) => {
                  return (
                    <div
                      class="cp"
                      key={item?.id || index}
                      style={{ background: item?.color }}
                    >
                      {item?.name}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </main>
      </div>
      <Footer />
    </>
  );
});
