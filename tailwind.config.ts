import type { Config } from "tailwindcss";
import { fontFamily } from "tailwindcss/defaultTheme";
import daisyui from "daisyui";

export default {
  content: ["./src/**/*.{html,js,svelte,ts}"],

  theme: {
    extend: {
      fontFamily: {
        sans: ['"Minecraft"', ...fontFamily.sans],
      },
    },
  },
  daisyui: {
    themes: ["winter"],
  },

  plugins: [daisyui],
} satisfies Config;
