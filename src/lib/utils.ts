import { createCn } from "cn/config";

/**
 * Class merger aware of Loop tokens. Without this, tailwind-merge reads `text-step-3` as a colour
 * and drops it when a text colour (e.g. `text-foreground`) is in the same list.
 */
export const cn = createCn({
  extend: {
    classGroups: {
      "font-size": [{ text: ["step-m2", "step-m1", "step-0", "step-1", "step-2", "step-3", "step-4", "step-5", "step-6", "step-7", "step-8", "step-9", "step-10"] }],
    },
  },
});
