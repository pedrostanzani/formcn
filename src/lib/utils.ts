import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

import type { Plugin } from "prettier";
import * as prettier from "prettier/standalone";
import * as parserTypeScript from "prettier/parser-typescript";
import * as prettierPluginEstree from "prettier/plugins/estree";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export async function formatTypeScriptCode(code: string) {
  return await prettier.format(code, {
    parser: "typescript",
    /* eslint-disable  @typescript-eslint/no-explicit-any */
    plugins: [parserTypeScript, prettierPluginEstree as Plugin<any>],
    singleQuote: false,
    semi: true,
  });
};
