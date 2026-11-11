import { z } from "zod";

/** Contact form schema (shared by client validation and a future API route). */
export const contactSchema = z.object({
  nome: z.string().trim().min(1, "Preencha seu nome."),
  email: z.string().trim().min(1, "Preencha seu e-mail.").email("Use um e-mail no formato nome@empresa.com."),
  empresa: z.string().trim().min(1, "Preencha o nome da empresa."),
  cargo: z.string().trim().optional(),
  mensagem: z.string().trim().max(2000, "Use até 2.000 caracteres.").optional(),
});
export type ContactInput = z.infer<typeof contactSchema>;

/** Prototype submit: validates and resolves; nothing is sent yet. Replace with a fetch to an API route. */
export async function submitContact(data: ContactInput): Promise<{ ok: true }> {
  contactSchema.parse(data);
  await new Promise((r) => setTimeout(r, 600));
  return { ok: true };
}
