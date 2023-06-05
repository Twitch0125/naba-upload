// deno-lint-ignore-file
import transformerVariantGroup from "@unocss/transformer-variant-group";
import {
  defineConfig,
  presetUno,
  presetWebFonts,
  toEscapedSelector as e,
} from "unocss";
import { presetForms } from "@julr/unocss-preset-forms";
import presetIcons from "@unocss/preset-icons";

export default defineConfig({
  cli: {
    entry: {
      patterns: [
        "./routes/**/*.tsx",
        "./components/**/*.tsx",
        "./islands/**/*.tsx",
      ],
      outFile: "static/uno.css",
    },
  },
  theme: {
    colors: {
      surface: "white",
      "bg-base": "#f5f5f4",
      primary: "#1c1917",
      secondary: "#57534e",
    },
  },
  preflights: [
    {
      getCSS: ({ theme }) => `
    html {
      --flow-space: 2rem;
      --surface: white;
      --bg-base: ${theme.colors["bg-base"]};
      --text-secondary: ${theme.colors.secondary};
      --text-primary: ${theme.colors.primary};
      --border-primary: ${theme.colors.primary};  
      text-rendering: optimizeLegibility;
      font-family: ${theme.fontFamily.sans || "sans-serif"}, sans-serif;
    }
    `,
    },
  ],
  rules: [
    ["flow", { "--flow-space": "2rem" }],
    ["flow-sm", { "--flow-space": "1rem" }],
    ["flow-xs", { "--flow-space": "0.8125rem" }],
    ["ml", { "margin-left": "var(--flow-space)" }],
    ["mt", { "margin-top": "var(--flow-space)" }],
    ["mr", { "margin-right": "var(--flow-space)" }],
    ["mb", { "margin-bottom": "var(--flow-space)" }],
    ["pl", { "padding-left": "var(--flow-space)" }],
    ["pt", { "padding-top": "var(--flow-space)" }],
    ["pr", { "padding-right": "var(--flow-space)" }],
    ["pb", { "padding-bottom": "var(--flow-space)" }],
    ["gap", { gap: "var(--flow-space)" }],
    [
      /^flow-layout$/,
      (match, { rawSelector }) => {
        return `${e(rawSelector)} > * + * {
          margin-block-start: var(--flow-space);
        }`;
      },
    ],
    [
      /^flow-layout-recursive$/,
      (match, { rawSelector }) => {
        return `${e(rawSelector)} * + * {
          margin-block-start: var(--flow-space);
        }`;
      },
    ],
    [
      /^space-x$/,
      (match, { rawSelector }) => {
        return `${e(rawSelector)} > * ~ *{
        margin-left: var(--flow-space)
      }`;
      },
    ],
  ],
  shortcuts: {
    m: "mt mr mb ml",
    mx: "ml mr",
    my: "mb mt",
    p: "pt pr pb pl",
    px: "pl pr",
    py: "pb pt",
    "text-secondary": "text-stone-600",
    "text-primary": "text-stone-900",
    "base-grid": "grid gap grid-cols-1 lg:grid-cols-3",
    "card-bordered": "border rounded border-gray-900",
    card: "flow-sm bg-white p flow-layout flex flex-col [&_p]:text-secondary",
    "card-title": "text-xl font-bold",
    btn:
      "cursor-pointer inline-flex items-center flex-shrink-0 flex-wrap text-sm uppercase tracking-wider px-5 py-2 rounded gap flow-xs border border-transparent",
    "btn-primary": "bg-black border-transparent text-white",
    "btn-secondary": "border-primary bg-surface",
    "btn-tertiary": "",
    "input-bordered": "border rounded",
    "bg-surface": "bg-[var(--surface)]",
    "bg-base": "bg-[var(--bg-base)]",
    "border-primary":
      "border border-solid border-color-[var(--border-primary)]",
  },
  transformers: [transformerVariantGroup()],
  presets: [
    presetUno(),
    presetIcons(),
    presetForms(),
    presetWebFonts({
      fonts: {
        sans: "Rubik",
      },
    }),
  ],
});
