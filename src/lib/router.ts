/* ------------------------------------------------------------------ *
 * TINY ROUTER — clean path-based routing via the History API. The home
 * page is '/', the blog is '/blog'. We push real history entries and
 * broadcast a custom event so every subscriber re-renders.
 *
 * Direct loads / refreshes of '/blog' are made to work by a rewrite in
 * vercel.json (serve index.html for non-file paths); Vite's dev server
 * and `vite preview` already fall back to index.html for unknown paths.
 * ------------------------------------------------------------------ */

import { useEffect, useState } from 'react';

const NAV_EVENT = 'app:navigate';

const currentRoute = () => window.location.pathname || '/';

/** Navigate to an in-app route ('/' for home, '/blog' for the blog) and
 *  scroll to the top. No-ops if already on that route. */
export function navigate(to: string) {
  const path = to.startsWith('/') ? to : `/${to}`;
  if (path === currentRoute()) return;

  window.history.pushState(null, '', path + window.location.search);
  window.dispatchEvent(new Event(NAV_EVENT));
  window.scrollTo({ top: 0, behavior: 'auto' });
}

/** Subscribe to the current route ('/' or '/blog'), updating on in-app
 *  navigation and on browser back/forward. */
export function useRoute(): string {
  const [route, setRoute] = useState(currentRoute);

  useEffect(() => {
    const update = () => setRoute(currentRoute());
    window.addEventListener(NAV_EVENT, update);
    window.addEventListener('popstate', update);
    return () => {
      window.removeEventListener(NAV_EVENT, update);
      window.removeEventListener('popstate', update);
    };
  }, []);

  return route;
}
