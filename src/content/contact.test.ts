import { describe, expect, it } from "vitest";
import { contactSchema } from "./contact";

describe("contactSchema", () => {
  it("requires name, e-mail and company", () => {
    const r = contactSchema.safeParse({ nome: "", email: "", empresa: "" });
    expect(r.success).toBe(false);
    const msgs = r.success ? [] : r.error.issues.map((i) => i.message);
    expect(msgs).toEqual(expect.arrayContaining(["Preencha seu nome.", "Preencha seu e-mail.", "Preencha o nome da empresa."]));
  });
  it("rejects a malformed e-mail with an actionable message", () => {
    const r = contactSchema.safeParse({ nome: "Ana", email: "ana@", empresa: "X" });
    expect(r.success ? "" : r.error.issues[0].message).toBe("Use um e-mail no formato nome@empresa.com.");
  });
  it("accepts valid data and trims spaces", () => {
    const r = contactSchema.parse({ nome: " Ana ", email: "ana@empresa.com", empresa: "X" });
    expect(r.nome).toBe("Ana");
  });
});
