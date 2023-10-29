import type { Config } from "tailwindcss";

export default {
  content: ["./app/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        "texture-1": "url('app/assets/textures/texture-1.png')",
        "texture-2": "url('app/assets/textures/texture-2.png')",
        "texture-3": "url('app/assets/textures/texture-3.png')",
      },
    },
  },
  plugins: [],
} satisfies Config;
