import nextPlugin from "eslint-config-next";

const eslintConfig = [
  {
    files: ["**/*.{js,jsx,ts,tsx}"],
    ...nextPlugin,
  },
  {
    ignores: [".next/**", "out/**", "build/**", "next-env.d.ts"],
  },
];

export default eslintConfig;
