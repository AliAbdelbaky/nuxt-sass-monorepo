import { defineConfig, transformerDirectives, transformerVariantGroup } from 'unocss';

import uiPreset from '@pkgs/ui/uno-preset';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';
import presetAnimations from 'unocss-preset-animations';
import { builtinColors, presetShadcn } from 'unocss-preset-shadcn';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// absolute path to the workspace package (source)
const UI_SRC = resolve(__dirname, '../../packages/ui');

// if you publish/use from node_modules, include that too
const UI_NODE = 'node_modules/@pkgs/ui';

export default defineConfig({
  presets: [uiPreset, presetAnimations(), presetShadcn(builtinColors.map((c) => ({ color: c })))],
  transformers: [transformerDirectives(), transformerVariantGroup({ separators: [':'] })],
  theme: {
    colors: {
      app: 'red',
    },
  },
  content: {
    pipeline: {
      include: [
        // the default
        /\.(vue|svelte|[jt]sx|mdx?|astro|elm|php|phtml|html)($|\?)/,
        // include js/ts files
        '../../packages/ui/**/*.{vue,js,ts,mjs,cjs}',
        'components/ui/**/*.{js,ts}',
        `${UI_SRC}/**/*.{vue,js,ts,mjs,cjs}`,
        `${UI_NODE}/**/*.{vue,js,ts,mjs,cjs}`,
      ],
    },
  },
  preflights: [
    {
      getCSS: () => `
          :root {
         --primary-foreground:240 5.9% 10%;
         --primary:224.3 76.3% 48%;
         --radius: 0.5rem;
          }
        `,
    },
  ],
});
