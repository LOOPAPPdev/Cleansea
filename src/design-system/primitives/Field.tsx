"use client";
import { useId, type ComponentProps } from "react";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Label } from "../ui/label";
import { cn } from "@/lib/utils";

type Base = { label: string; hint?: string; error?: string };

/** Label + control + hint/error. The error is text, linked with aria-describedby; aria-invalid drives the red border. */
export function Field({ label, hint, error, id, multiline, className, ...rest }: Base & { multiline?: boolean } & ComponentProps<"input"> & ComponentProps<"textarea">) {
  const auto = useId();
  const fid = id ?? auto;
  const msgId = `${fid}-msg`;
  const message = error ?? hint;
  const a11y = { id: fid, "aria-invalid": error ? true : undefined, "aria-describedby": message ? msgId : undefined };
  return (
    <div className={cn("flex flex-col gap-1.5", className)}>
      <Label htmlFor={fid} className="text-sm font-medium">{label}</Label>
      {multiline ? <Textarea {...a11y} {...(rest as ComponentProps<"textarea">)} /> : <Input {...a11y} {...(rest as ComponentProps<"input">)} />}
      {message ? <span id={msgId} className={cn("text-sm", error ? "text-destructive" : "text-muted-foreground")}>{message}</span> : null}
    </div>
  );
}
