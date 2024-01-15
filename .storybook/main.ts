import type { StorybookConfig } from "@storybook/react-vite";
import { mergeConfig } from "vite";

const config: StorybookConfig = {
  stories: ["../src/**/*.mdx", "../src/**/*.stories.@(js|jsx|mjs|ts|tsx)"],
  addons: [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/addon-onboarding",
    "@storybook/addon-interactions",
  ],
  framework: {
    name: "@storybook/react-vite",
    options: {},
  },
  docs: {
    autodocs: "tag",
  },
  async viteFinal(config, { configType }) {
    return mergeConfig(config, {
      base: process.env.BASE_URL + "/storybook",
      optimizeDeps: {
        include: [
          // "@storybook/addon-a11y/preview.js",
          // "@storybook/addon-actions/preview.js",
          // "@storybook/addon-backgrounds/preview.js",
          // "babel-plugin-open-source/script.js",
          // "chromatic/isChromatic",
          // "storybook-dark-mode",
          // "@storybook/addon-links",
          // "@storybook/addon-essentials",
          // "@storybook/addon-onboarding",
          // "@storybook/addon-interactions",
        ],
      },
    });
  },
};

export default config;
