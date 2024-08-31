import { defineConfig } from "tsup";

// eslint-disable-next-line turbo/no-undeclared-env-vars
const isProduction = process.env.NODE_ENV === "production";

export default defineConfig({
    clean: true,
    dts: true,
    entry: ["src/index.ts"],
    format: ["esm", "cjs"],
    minify: isProduction,
    sourcemap: true,
    minifyIdentifiers:true,
    metafile:true,
    minifySyntax:true,
    minifyWhitespace:true
});
