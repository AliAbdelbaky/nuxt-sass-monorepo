// ~/modules/auto-attach-middleware.ts
import { defineNuxtModule, addTemplate, addPlugin } from '@nuxt/kit';

export interface AutoAttachMiddlewareRule {
  layouts: string[];
  middlewares: string[];
}
export interface AutoAttachMiddlewareOptions {
  rules: AutoAttachMiddlewareRule[];
}

function unique<T>(arr: T[]): T[] {
  const out: T[] = [];
  const seen = new Set<T>();
  for (const v of arr) {
    if (!seen.has(v)) {
      seen.add(v);
      out.push(v);
    }
  }
  return out;
}

export default defineNuxtModule<AutoAttachMiddlewareOptions>({
  meta: {
    name: 'auto-attach-middleware',
    configKey: 'autoAttachMiddleware',
  },
  setup(options, nuxt) {
    const rules = Array.isArray(options?.rules) ? options.rules : [];
    if (rules.length === 0) {
      if (nuxt.options.dev) {
        // eslint-disable-next-line no-console
        console.warn('[auto-attach-middleware] No rules provided; nothing to do.');
      }
      return;
    }

    // Build layout → middlewares (dedup, preserve order)
    const layoutConfig: Record<string, { middlewares: string[] }> = {};
    for (const rule of rules) {
      const mids = rule.middlewares.map((m) => m.trim()).filter(Boolean);
      for (const layout of rule.layouts) {
        const key = String(layout);
        if (!layoutConfig[key]) layoutConfig[key] = { middlewares: [] };
        layoutConfig[key].middlewares = unique([...layoutConfig[key].middlewares, ...mids]);
      }
    }

    // Emit mapping used by the plugin
    const mapTpl = addTemplate({
      filename: 'auto-attach-mw.map.mjs',
      getContents: () => `export const layoutConfig = ${JSON.stringify(layoutConfig, null, 2)};`,
    });

    // Dispatcher plugin: resolve layout at runtime, then dynamic-import middlewares lazily
    // inside ~/modules/auto-attach-middleware.ts (only this template changed)
    const pluginTpl = addTemplate({
      filename: 'auto-attach-mw.plugin.ts',
      getContents: () => `
import { defineNuxtPlugin, addRouteMiddleware, callWithNuxt, useNuxtApp } from '#app'
import { layoutConfig } from '#build/${mapTpl.filename}'

type MWFn = (to: unknown, from: unknown) => unknown | Promise<unknown>

// Lazy loader per middleware name (client+server safe)
async function loadMiddleware(name: string): Promise<MWFn | undefined> {
  switch (name) {
    ${unique(Object.values(layoutConfig).flatMap((c) => c.middlewares))
      .map(
        (n) =>
          `case ${JSON.stringify(n)}: { const mod = await import('~/middleware/${n}'); return (mod as { default?: MWFn }).default }`
      )
      .join('\n    ')}
    default:
      return undefined
  }
}

export default defineNuxtPlugin(() => {
  addRouteMiddleware('auto-attach-mw-dispatch', async (to, from) => {
    const pageMeta = to.matched?.[to.matched.length - 1]?.meta as { layout?: string } | undefined
    const layout = typeof pageMeta?.layout === 'string' ? pageMeta.layout : undefined
    if (!layout) return

    const cfg = layoutConfig[layout]
    if (!cfg || cfg.middlewares.length === 0) return

    if (process.dev) {
      // eslint-disable-next-line no-console
      console.log('[auto-attach-middleware] layout:', layout, '→', cfg.middlewares)
    }

    const nuxtApp = useNuxtApp()

    for (const name of cfg.middlewares) {
      const fn = await loadMiddleware(name)
      if (typeof fn !== 'function') continue

      // IMPORTANT: run the middleware with Nuxt context
      // eslint-disable-next-line no-await-in-loop
      const res = await callWithNuxt(nuxtApp, fn as (to: any, from: any) => any, [to, from])

      if (res === false) {
        if (process.dev) console.log('[auto-attach-middleware]', name, 'returned false → stopping')
        return
      }
      if (res === true) {
        if (process.dev) console.log('[auto-attach-middleware]', name, 'returned true → continuing')
        continue
      }
      if (res) {
        if (process.dev) console.log('[auto-attach-middleware]', name, 'returned navigation → stopping')
        return res
      }
      // undefined → continue
    }
  }, { global: true })
})
`,
    });
    addPlugin({ src: pluginTpl.dst });
  },
});
