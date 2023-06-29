/*
 * @Description:
 * @version: 0.0.1
 * @Author: yulinZ
 * @LastEditTime: 2023-06-29 17:23:11
 */
import { component$, Slot, useStyles$ } from '@builder.io/qwik';
import { routeLoader$ } from '@builder.io/qwik-city';
import jwt_decode from 'jwt-decode';
import { ACCESS_COOKIE_NAME, refreshTokens, REFRESH_COOKIE_NAME, setTokensAsCookies } from '../shared/auth.service';
import { Navbar } from '../components/navbar/navbar';
import Footer from '~/components/starter/footer/footer';
import { VerifyAlert } from '../components/verify-alert/verify-alert';
import { ACCEPT_COOKIES_COOKIE_NAME, UseCookiesAlert } from '../components/use-cookies-alert/use-cookies-alert';
import NextSteps from '~/components/starter/next-steps/next-steps';
import { getClass, getLabels } from '~/api';
import styles from './styles.css?inline';
import dayjs from 'dayjs';
export enum Role {
  ADMIN = 'ADMIN',
  USER = 'USER',
}
export interface UserCtx {
  id: string;
  name: string;
  email: string;
  role: Role;
  verified: boolean;
}

export const useGetCurrentUser = routeLoader$<UserCtx | null>(async ({ cookie }) => {
  const accessCookie = cookie.get(ACCESS_COOKIE_NAME)?.value;
  const refreshCookie = cookie.get(REFRESH_COOKIE_NAME)?.value;

  if (accessCookie) {
    return jwt_decode(accessCookie);
  } else if (refreshCookie) {
    const { accessToken, refreshToken } = await refreshTokens(refreshCookie);

    setTokensAsCookies(accessToken, refreshToken, cookie);
    return jwt_decode(accessToken);
  }

  return null;
});

export const useData: any = routeLoader$(async () => {
  const response: any = await getClass();

  // console.log(await response.json());
  return (await response.json()) as {
    data: [];
    code: string;
    total: number;
  };
});

export const useLabelsList = routeLoader$(async () => {
  const response: any = await getLabels();

  return (await response.json()) as {
    data: [];
    code: string;
    total: number;
  };
});

export const useServerTimeLoader = routeLoader$(() => {
  return {
    date: dayjs(new Date().toISOString()).format('YYYY-MM-DD'),
  };
});
export const useAcceptCookies = routeLoader$(({ cookie }) => cookie.get(ACCEPT_COOKIES_COOKIE_NAME)?.value);

export default component$(() => {
  useStyles$(styles);
  const groupList: any = useData();
  const labelList: any = useLabelsList();
  const userCtx = useGetCurrentUser().value;
  const acceptedCookies = useAcceptCookies().value === 'true';
  return (
    <>
      <Navbar user={userCtx} />
      {userCtx?.verified === false ? <VerifyAlert /> : ''}

      <NextSteps />
      <div class="container">
        <main class="app-main">
          <div class="app-main-left">
            <Slot />
          </div>
          <div class="app-main-right fixed-app-right">
            <div class="app-main-right-card">
              <h2 class="module-title">
                <iconify-icon class="z-icon" icon="uil:layer-group" width="22"></iconify-icon>
                分类
              </h2>
              <div class="app-main-right-body">
                {groupList.value?.data.map((item: any, index: number) => {
                  return (
                    <div class="cp" key={item?.id || index}>
                      <iconify-icon class="app-main-class-icon" icon={item?.icon}></iconify-icon>
                      {item?.name}
                    </div>
                  );
                })}
              </div>
            </div>

            <div class="app-main-right-card">
              <h2 class="module-title">
                <iconify-icon class="z-icon" icon="mdi:label-multiple" width="22"></iconify-icon>
                标签
              </h2>
              <div class="app-main-right-body">
                {/* {labelList.value} */}
                {labelList.value?.data.map((item: any, index: number) => {
                  return (
                    <div class="cp" key={item?.id || index} style={{ background: item?.color }}>
                      {item?.name}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </main>
      </div>
      <UseCookiesAlert visible={!acceptedCookies} />
      <Footer />
    </>
  );
});
