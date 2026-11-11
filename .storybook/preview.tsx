import type { Preview } from "@storybook/nextjs-vite";
import { withThemeByClassName } from "@storybook/addon-themes";
import { Providers } from "../src/app/providers";
import "../src/app/globals.css";

const preview: Preview = {
  parameters: {
    layout: "padded",
    nextjs: { appDirectory: true, navigation: { pathname: "/solucoes" } },
    a11y: { test: "error" }, // axe violations fail the story test
    controls: { expanded: true },
  },
  decorators: [
    withThemeByClassName({ themes: { light: "light", dark: "dark" }, defaultTheme: "light" }),
    (Story) => (
      <Providers>
        <div className="bg-background text-foreground">
          <Story />
        </div>
      </Providers>
    ),
  ],
};
export default preview;
