import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cn } from "@/lib/utils"

// Use a type alias instead of an empty interface
export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return <Comp ref={ref} className={cn(className)} {...props} />
  }
)

Button.displayName = "Button"

export { Button }

