/*
 * @Author: yulinZ 1973329248@qq.com
 * @Date: 2023-06-26 22:07:46
 * @LastEditors: yulinZ 1973329248@qq.com
 * @LastEditTime: 2023-06-27 08:02:53
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
import { component$, useSignal, useStore } from "@builder.io/qwik";
import { DocumentHead, routeLoader$ } from "@builder.io/qwik-city";

import Counter from "~/components/starter/counter/counter";
import Hero from "~/components/starter/hero/hero";
import Infobox from "~/components/starter/infobox/infobox";
import Starter from "~/components/starter/next-steps/next-steps";
import ArcCard from "~/components/arc-card/arc-card";
import dayjs from "dayjs";
import { getData } from "~/api";
import { ApiBase } from "~/api/config";

const useData = routeLoader$(async () => {
  const response: any = await getData();
  return (await response.json()) as {
    data: [];
    code: string;
    total: number;
  };
});

const handlerNextPage = async (state:any,dataList) =>{
  state.page += 1
  const result =  await getData(state);

  const res  = await result.json() as {
    data: [];
    code: string;
    total: number;
  }
  dataList = res.data
  state.total= res.total 
  console.log(res)
  // return result.json()
}


export default component$(() => {
  let dataList: any = useStore();
  dataList  = useData()
  const pageInfo = useStore({
    total:null,
    pageSize:10,
    page:1
  })
  pageInfo.total = dataList.total



  return (
    <>
      <div class="">
        {dataList?.data.map((item: any, index: number) => {
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

        <div>
        共 {pageInfo.total } 篇，当前 {pageInfo.page} 页  <button onClick$={()=>handlerNextPage(pageInfo,dataList)}> 下一页</button>
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
