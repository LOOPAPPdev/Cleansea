import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

// eslint-config-next 16 ships flat configs; FlatCompat is no longer needed.
export default defineConfig([
	...nextVitals,
	...nextTs,
	// `{ node, ...props }` drops react-markdown's AST prop before spreading props onto DOM elements.
	{ rules: { "@typescript-eslint/no-unused-vars": ["warn", { ignoreRestSiblings: true, argsIgnorePattern: "^_" }] } },
	globalIgnores(["vendor/**", ".next/**", ".open-next/**", "storybook-static/**", "test-results/**", "playwright-report/**", "node_modules/**", "next-env.d.ts", "cloudflare-env.d.ts", "env.d.ts"]),
]);
