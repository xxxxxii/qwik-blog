/*
 * @Author: yulinZ 1973329248@qq.com
 * @Date: 2023-06-26 22:07:46
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2023-06-27 17:22:48
 * @FilePath: \qwik-app\src\routes\index.tsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
/*
 * @Author: yulinZ 1973329248@qq.com
 * @Date: 2023-06-19 19:15:56
 * @LastEditors: yulinZ 1973329248@qq.com
 * @LastEditTime: 2023-06-27 00:19:33
 * @FilePath: \qwik-app\src\routes\index.tsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { component$, useStore } from "@builder.io/qwik";
import { type DocumentHead, routeLoader$ } from "@builder.io/qwik-city";

import ArcCard from "~/components/arc-card/arc-card";
import dayjs from "dayjs";
import { getData } from "~/api";

export const useData = routeLoader$(async () => {
  const response: any = await getData();
  return (await response.json()) as {
    data: [];
    code: string;
    total: number;
  };
});

// 下一页
const handlerNextPage = (state: any) => {
  state.pageInfo.page += 1;
  updateList(state);
};

// update list
const updateList = async (state: any) => {
  const result = await getData(state.pageInfo);
  const res = (await result.json()) as {
    data: [];
    code: string;
    total: number;
  };
  state.list.value = res;
};

// 上一页
const handlerPrePage = (state: any) => {
  state.pageInfo.page -= 1;
  updateList(state);
};

export default component$(() => {
  const store = useStore({
    list: useData(),
    pageInfo: {
      total: 10,
      pageSize: 10,
      page: 1,
    },
  });
  return (
    <>
      <div class="">
        {store.list.value?.data.map((item: any, index: number) => {
          return (
            <div class="arc-card-box" key={item?.id || index}>
              <ArcCard
                key={item?.id || index}
                title={item.title}
                content={item?.bf}
                wordsCount={item?.content.length}
                isTop={item?.type == 5}
                img={item?.img}
                dateTime={dayjs(item?.createdAt).format("YYYY-MM-DD")}
                updateTime={dayjs(item?.updateAt).format("YYYY-MM-DD")}
                group={item?.group}
                labels={item?.labels}
                onClick$={() => {
                  window.location.href = "./article/" + item?.id;
                }}
              />
            </div>
          );
        })}

        <div class="pagination-bar">
          共 {store.list.value.total} 篇，
          <button
            disabled={store.pageInfo.page > 1 ? false : true}
            class={["page-type", store.pageInfo.page > 1 ? "" : "no-drop"]}
            onClick$={() => handlerPrePage(store)}
          >
            上一页
          </button>
          当前 {store.pageInfo.page} 页
          <button
            disabled={
              store.pageInfo.page <
              store.list.value.total / store.pageInfo.pageSize
                ? false
                : true
            }
            class={[
              "page-type",
              store.pageInfo.page <
              store.list.value.total / store.pageInfo.pageSize
                ? ""
                : "no-drop",
            ]}
            onClick$={() => handlerNextPage(store)}
          >
            下一页
          </button>
        </div>
      </div>
    </>
  );
});

export const head: DocumentHead = {
  title: "Welcome to yulinZ blogs",
  meta: [
    {
      name: "description",
      content: "该博客主要记录日常开发问题及解决方法，",
    },
    {
      name: "keywords",
      content: "yulinZ web 前后端 blog ",
    },
  ],
};
