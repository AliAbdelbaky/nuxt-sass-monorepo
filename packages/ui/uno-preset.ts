import {
  definePreset,
  presetAttributify,
  presetIcons,
  presetTypography,
  presetWebFonts,
  presetWind3,
} from 'unocss';

export default definePreset({
  name: 'ui-layer',
  variants: [
    {
      // nth-[]:class
      name: ':nth-child()',
      match: (matcher: string) => {
        const match = matcher.match(/^nth-\[(.+?):/);
        if (!match) return matcher;
        return {
          // slice `hover:` prefix and passed to the next variants and rules
          matcher: matcher.substring(match[0].length),
          selector: (s) => `${s}:nth-child(${match[1]})`,
        };
      },
      multiPass: true,
    },
  ],
  theme: {
    fontFamily: {
      montserrat: 'montserrat',
    },
    animation: {
      keyframes: {
        'spin-slow': '{from{transform:rotate(0deg)}to{transform:rotate(360deg)}}',
      },
      counts: {
        'spin-slow': 'infinite',
      },
      durations: {
        'spin-slow': '3s',
      },
    },
    colors: {
      app: 'blue', // get override by app/unocss.config.ts
      ui: 'green',
    },
  },
  presets: [
    presetWind3(),
    presetAttributify(),
    presetIcons({
      scale: 1.2,
      prefix: 'i-',
      mode: 'auto',
    }),
    presetTypography(),
    presetWebFonts({
      timeouts: {
        warning: 500, // time to print warning message
        failure: 10000, // time to fail the fetch
      },
      provider: 'google', // default
      fonts: {
        montserrat: [
          {
            name: 'Montserrat',
            weights: [100, 200, 300, 400, 500, 600, 700],
          },
        ],
      },
    }),
    // presetAnimations(),
    // presetShadcn(builtinColors.map((c) => ({color: c}))),
  ],
  preflights: [
    {
      getCSS: () => `
        :root {
          --sidebar-background: 0 0% 98%;
          --sidebar-foreground: 240 5.3% 26.1%;
          --sidebar-primary: 240 5.9% 10%;
          --sidebar-primary-foreground: 0 0% 98%;
          --sidebar-accent: 240 4.8% 95.9%;
          --sidebar-accent-foreground: 240 5.9% 10%;
          --sidebar-border: 220 13% 91%;
          --sidebar-ring: 217.2 91.2% 59.8%;
        }

        .dark {
          --sidebar-background: 240 5.9% 10%;
          --sidebar-foreground: 240 4.8% 95.9%;
          --sidebar-primary: 224.3 76.3% 48%;
          --sidebar-primary-foreground: 0 0% 100%;
          --sidebar-accent: 240 3.7% 15.9%;
          --sidebar-accent-foreground: 240 4.8% 95.9%;
          --sidebar-border: 240 3.7% 15.9%;
          --sidebar-ring: 217.2 91.2% 59.8%;
        }
      `,
    },
  ],
});
