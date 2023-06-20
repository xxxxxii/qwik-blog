/*
 * @Author: yulinZ 1973329248@qq.com
 * @Date: 2023-06-19 19:15:56
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2023-06-20 13:57:05
 * @FilePath: \qwik-app\src\routes\index.tsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { component$ } from "@builder.io/qwik";
import { DocumentHead, routeLoader$ } from "@builder.io/qwik-city";

import Counter from "~/components/starter/counter/counter";
import Hero from "~/components/starter/hero/hero";
import Infobox from "~/components/starter/infobox/infobox";
import Starter from "~/components/starter/next-steps/next-steps";
import ArcCard from "~/components/arc-card/arc-card";
import dayjs from "dayjs";
import { getData } from "~/api";

const useData = routeLoader$(async () => {
  const response: any = await getData();

  return (await response.json()) as {
    data: [];
    code: string;
    total: number;
  };
});

export default component$(() => {
  const dataList: any = useData();
  return (
    <>
      <div class="">
        {dataList.value?.data.map((item: any, index: number) => {
          return (
            <div class="arc-card-box" key={item?.id || index}>
              <ArcCard
                key={item?.id || index}
                title={item.title}
                content={item?.bf}
                isTop={item?.type == 5}
                dateTime={dayjs(item?.createdAt).format("YYYY-MM-DD HH:mm")}
                group={item?.group}
                labels={item?.labels}
                onClick$={() => {
                  window.location.href = "./article/" + item?.id;
                }}
              />
            </div>
          );
        })}
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
