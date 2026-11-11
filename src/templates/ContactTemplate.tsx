"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { contactSchema, submitContact, type ContactInput } from "@/content/contact";
import { Button, Container, Field } from "@/design-system/primitives";
import { Hero } from "@/design-system/composites";

/**
 * Contact (template). react-hook-form + Zod for validation, TanStack Query mutation for submit.
 * WHEN the visitor submits with errors, THEN each field shows its error as text
 * AND focus moves to the first invalid field (shouldFocusError). Prototype: nothing is sent.
 */
export function ContactTemplate() {
  const { register, handleSubmit, formState: { errors } } = useForm<ContactInput>({
    resolver: zodResolver(contactSchema),
    shouldFocusError: true,
    mode: "onSubmit",
  });
  const mutation = useMutation({ mutationFn: submitContact });

  return (
    <>
      <Hero align="start" title="Fale com a Loop" subtitle="Lorem ipsum dolor sit amet. Respondemos em até [A DEFINIR] dias úteis." />
      <Container>
        <form className="grid max-w-[560px] gap-4" noValidate onSubmit={handleSubmit((d) => mutation.mutate(d))}>
          <Field label="Nome" autoComplete="name" required error={errors.nome?.message} {...register("nome")} />
          <Field label="E-mail corporativo" type="email" autoComplete="email" required error={errors.email?.message} {...register("email")} />
          <Field label="Empresa" autoComplete="organization" required error={errors.empresa?.message} {...register("empresa")} />
          <Field label="Cargo" autoComplete="organization-title" hint="Opcional" {...register("cargo")} />
          <Field label="Qual é o desafio?" multiline hint="Opcional" error={errors.mensagem?.message} {...register("mensagem")} />
          <Button type="submit" loading={mutation.isPending} className="justify-self-start">
            {mutation.isPending ? "Enviando…" : "Enviar mensagem"}
          </Button>
          <div role="status" aria-live="polite">
            {mutation.isSuccess ? <p className="rounded-md bg-success p-4 text-success-foreground">Mensagem pronta. Neste protótipo nada foi enviado.</p> : null}
            {mutation.isError ? <p className="rounded-md bg-destructive/10 p-4 text-destructive">Não foi possível enviar. Tente de novo.</p> : null}
          </div>
        </form>
        <p className="mt-6 mb-16 text-sm text-muted-foreground">Protótipo: o formulário ainda não envia dados.</p>
      </Container>
    </>
  );
}
