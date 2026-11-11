import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Field } from "./Field";

describe("Field (LOOP-PRM-005)", () => {
  it("links the label to the control", () => {
    render(<Field label="E-mail" />);
    expect(screen.getByRole("textbox", { name: "E-mail" })).toBeInTheDocument();
  });
  it("shows the error as text, sets aria-invalid and describes the control", () => {
    render(<Field label="Nome" error="Preencha seu nome." />);
    const input = screen.getByRole("textbox", { name: "Nome" });
    expect(input).toHaveAttribute("aria-invalid", "true");
    expect(input).toHaveAccessibleDescription("Preencha seu nome.");
  });
  it("uses the hint as description when there is no error", () => {
    render(<Field label="Cargo" hint="Opcional" />);
    expect(screen.getByRole("textbox", { name: "Cargo" })).toHaveAccessibleDescription("Opcional");
    expect(screen.getByRole("textbox", { name: "Cargo" })).not.toHaveAttribute("aria-invalid");
  });
  it("renders a textarea when multiline", () => {
    render(<Field label="Mensagem" multiline />);
    expect(screen.getByRole("textbox", { name: "Mensagem" }).tagName).toBe("TEXTAREA");
  });
});
