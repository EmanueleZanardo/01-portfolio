// Minimal ESLint flat config: Next.js core-web-vitals + TypeScript rules.
// Added so `npm run lint` performs real checks instead of no-op
// (the repo previously shipped without any ESLint config).
import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [...compat.extends("next/core-web-vitals", "next/typescript")];

export default eslintConfig;
