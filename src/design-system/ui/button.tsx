import { Button as ButtonPrimitive } from "@base-ui/react/button"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "group/button inline-flex shrink-0 items-center justify-center border border-transparent bg-clip-padding font-medium whitespace-nowrap transition-all outline-none select-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring active:not-aria-[haspopup]:translate-y-px disabled:pointer-events-none disabled:opacity-45 data-[loading]:cursor-progress aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20 dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary-hover",
        primary: "bg-primary text-primary-foreground hover:bg-primary-hover",
        ink: "bg-foreground text-background hover:bg-foreground/85",
        secondary: "bg-surface text-foreground hover:bg-surface-sunken aria-expanded:bg-surface-sunken",
        outline: "border-border-strong bg-background text-foreground hover:bg-surface aria-expanded:bg-surface",
        ghost: "text-foreground hover:bg-surface aria-expanded:bg-surface",
        destructive: "bg-destructive text-background hover:bg-destructive/90",
        link: "text-primary-strong underline-offset-4 hover:underline",
      },
      size: {
        default: "h-11 gap-2 rounded-pill px-6 text-base",
        sm: "h-11 gap-1.5 rounded-pill px-4 text-sm",
        lg: "h-13 gap-2 rounded-pill px-8 text-base",
        icon: "size-11 rounded-pill",
        "icon-sm": "size-9 rounded-pill after:absolute after:-inset-1 relative",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

function Button({
  className,
  variant = "default",
  size = "default",
  ...props
}: ButtonPrimitive.Props & VariantProps<typeof buttonVariants>) {
  return (
    <ButtonPrimitive
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  )
}

export { Button, buttonVariants }
