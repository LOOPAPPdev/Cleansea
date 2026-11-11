import "@testing-library/jest-dom/vitest";
import { cleanup } from "@testing-library/react";
import { afterEach, vi } from "vitest";

afterEach(() => cleanup());

// next/navigation is only available inside the Next.js runtime.
vi.mock("next/navigation", () => ({ usePathname: () => "/solucoes", useRouter: () => ({ push: vi.fn() }) }));
