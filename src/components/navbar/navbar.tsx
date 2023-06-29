import { component$, useContext, useStylesScoped$ } from '@builder.io/qwik';
import { Link, useLocation } from '@builder.io/qwik-city';
import { GlobalStore } from '../../context';
import { UserCtx } from '../../routes/layout';
import { DARK_THEME, LIGHT_THEME, setPreference, ThemeSwitcher } from '../theme-switcher/theme-switcher';
import { BurgerButton } from './burger-button/burger-button';
import { GithubButton } from './github-button/github-button';
import styles from './navbar.css?inline';
import { Profile } from './profile/profile';
import {} from '~/context';

interface NavbarProps {
  user: UserCtx | null;
}

export const Navbar = component$(({ user }: NavbarProps) => {
  useStylesScoped$(styles);

  const globalStore = useContext(GlobalStore);
  const location = useLocation();

  return (
    <div class="navbar bg-base-100 drop-shadow-md  fixed" style={{ zIndex: 100 }}>
      <div class="flex-1">
        {location.url.pathname.includes('/dashboard') && ( // Only show the left 3 bars button on the dashboard page
          <>
            <label for="drawer" class="btn btn-ghost btn-circle lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                class="w-6 h-6"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
              </svg>
            </label>
          </>
        )}
        <a href="/" class="btn btn-ghost normal-case text-xl">
          <img width="105" height="35" src="/logo.png"></img>
        </a>
      </div>
      <div class="block sm:hidden dropdown dropdown-end">
        <BurgerButton buttonTitle="Open" />
        <ul tabIndex={0} class="menu dropdown-content shadow bg-base-100 rounded-box w-52 mt-4 p-2">
          <li>
            <a href="https://github.com/xxxxxii/qwik-blog" target="_blank" title="ZUI" class="btn-ghost">
              ZUI
            </a>
          </li>
          <li class={user ? 'px-4 py-2' : ''}>
            {user ? (
              `Welcome ${user.name}!`
            ) : (
              <Link href="/login" class="btn-ghost">
                Login
              </Link>
            )}
          </li>
          {user && (
            <>
              <li class="pr-2 border-black"></li>
              <li>
                <Link href="/dashboard" class="btn-ghost py-2 text-sm justify-between">
                  Dashboard
                  <span class="badge">New</span>
                </Link>
                <Link href="/logout" class="btn-ghost py-2 text-sm">
                  Logout
                </Link>
              </li>
              <li class="pr-2 border-black"></li>
            </>
          )}
          <li>
            <a href="https://github.com/origranot/reduced.to" target="_blank" title="GitHub" class="btn-ghost">
              Github
            </a>
          </li>

          <li>
            <a
              class="btn-ghost"
              onClick$={() => {
                globalStore.theme = globalStore.theme === 'light' ? DARK_THEME : LIGHT_THEME;
                setPreference(globalStore.theme);
              }}
            >
              {globalStore.theme === 'light' ? 'Dark' : 'Light'} theme
            </a>
          </li>
        </ul>
      </div>
      <div class="sm:flex hidden">
        <div class="grid flex-grow place-items-center">
          <Link href="/zui" class="primary">
            ZUI
          </Link>
        </div>
        <div class="divider divider-horizontal"></div>
        {user ? (
          <Profile name={user.name} />
        ) : (
          <Link href="/login" class="btn btn-primary btn-sm">
            Login
          </Link>
        )}
        <div class="divider divider-horizontal"></div>
        <div class="grid flex-grow place-items-center">
          <GithubButton />
        </div>
        <div class="divider divider-horizontal"></div>
        <div class="grid flex-grow place-items-center">
          <ThemeSwitcher />
        </div>
      </div>
    </div>
  );
});
