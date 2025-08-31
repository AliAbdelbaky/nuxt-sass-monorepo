// ~/middleware/auth.ts
import { tokenCookieName } from '~/constants/authentication';
import { mwLog } from '~/utils/helpers';
import { useCookie } from '#imports';
import { invitationCookieName } from '~/constants/shared';

type LayoutMeta = { layout?: string };

export default defineNuxtRouteMiddleware((to) => {
  // Use the deepest matched route's meta for a reliable layout value
  const layout =
    (to.matched?.[to.matched.length - 1]?.meta as LayoutMeta | undefined)?.layout ?? 'default';

  const localePath = useLocalePath();
  const lp = (p: string) => localePath(p);

  // Normalize cookie to a boolean flag
  const tokenRaw = useCookie<string | undefined>(tokenCookieName).value;
  const loggedIn = !!tokenRaw && tokenRaw.trim().length > 0;

  // Targets
  const DASHBOARD = lp('/dashboard');
  const LOGIN = lp('/auth/login');

  // Navigate only if we're not already on the target (prevents loops)
  const go = (target: string) => (to.path === target ? false : navigateTo(target));

  if (import.meta.dev && import.meta.client) {
    mwLog('[auth mw]', {
      path: to.fullPath,
      layout,
      loggedIn,
    });
  }
  if (to.query?.agent_invite_code && to.query?.agent_invite_method) {
    useCookie(invitationCookieName).value = JSON.stringify({
      code: to.query.agent_invite_code as string,
      method: to.query.agent_invite_method as string,
    });
  }

  // Logged-in users should not see auth pages
  if (layout === 'auth' && loggedIn) {
    return go(DASHBOARD);
  }

  // Guests should not access non-auth pages
  if (layout !== 'auth' && !loggedIn) {
    return go(LOGIN);
  }

  // Otherwise, allow
  return true;
});
