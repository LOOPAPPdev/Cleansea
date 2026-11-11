import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { Button, ButtonLink } from "./Button";

describe("Button (LOOP-PRM-001)", () => {
  it("calls onClick", async () => {
    const onClick = vi.fn();
    render(<Button onClick={onClick}>Salvar</Button>);
    await userEvent.click(screen.getByRole("button", { name: "Salvar" }));
    expect(onClick).toHaveBeenCalledOnce();
  });
  it("loading disables the button and sets aria-busy", async () => {
    const onClick = vi.fn();
    render(<Button loading onClick={onClick}>Enviar</Button>);
    const btn = screen.getByRole("button", { name: "Enviar" });
    expect(btn).toBeDisabled();
    expect(btn).toHaveAttribute("aria-busy", "true");
    await userEvent.click(btn);
    expect(onClick).not.toHaveBeenCalled();
  });
  it("defaults to type=button so it never submits a form by accident", () => {
    render(<Button>Ok</Button>);
    expect(screen.getByRole("button")).toHaveAttribute("type", "button");
  });
  it("uses the 44px height class", () => {
    render(<Button>Ok</Button>);
    expect(screen.getByRole("button").className).toContain("h-11");
  });
});

describe("ButtonLink (LOOP-PRM-002)", () => {
  it("renders a link with href", () => {
    render(<ButtonLink href="/contato">Fale com vendas</ButtonLink>);
    expect(screen.getByRole("link", { name: "Fale com vendas" })).toHaveAttribute("href", "/contato");
  });
});
