import {
    defineConfig,
    transformerDirectives, transformerVariantGroup
} from 'unocss';

import uiPreset from './uno-preset';
import presetAnimations from 'unocss-preset-animations'
import {builtinColors, presetShadcn} from 'unocss-preset-shadcn'

export default defineConfig({
    presets: [uiPreset, presetAnimations(),
        presetShadcn(builtinColors.map((c) => ({color: c}))),],
    transformers: [transformerDirectives(),transformerVariantGroup({ separators: [':'] })],
    content: {
        // filesystem:[
        //     './**/*.{vue,js,ts,jsx,tsx}',
        //     'components/ui/**/*.{js,ts}'
        //     // '../../packages/ui/**/*.{vue,js,ts,mjs,cjs}',       // path to UI source in workspace
        //     // 'node_modules/@pkgs/ui/**/*.{vue,js,ts,mjs,cjs}'
        // ],
        pipeline: {
            include: [
                // the default
                /\.(vue|svelte|[jt]sx|mdx?|astro|elm|php|phtml|html)($|\?)/,
                // include js/ts files
                'components/ui/**/*.{js,ts}',
            ],
        },
    },
    preflights: [
        {
            layer: 'base',
            getCSS: () => `
          :root {
         --primary-foreground:240 5.9% 10%;
         --primary:224.3 76.3% 48%;
         --radius: 0.5rem;
          }
        `
        }
    ]
});