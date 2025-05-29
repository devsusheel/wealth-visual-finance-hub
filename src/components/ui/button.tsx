
import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "bg-[#678E19] text-white hover:bg-green-700 hover:shadow-lg transform hover:scale-[1.02]",
        destructive:
          "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline:
          "border-2 border-[#678E19] bg-transparent text-[#678E19] hover:bg-[#678E19] hover:text-white hover:shadow-lg transform hover:scale-[1.02]",
        secondary:
          "bg-[#EDA208] text-black hover:bg-yellow-600 hover:shadow-lg transform hover:scale-[1.02]",
        ghost: "hover:bg-[#678E19]/10 hover:text-[#678E19]",
        link: "text-[#678E19] underline-offset-4 hover:underline hover:text-green-700",
        "outline-white": "border-2 border-white bg-transparent text-white hover:bg-white hover:text-[#678E19] hover:shadow-lg transform hover:scale-[1.02]",
        "outline-dark": "border-2 border-gray-800 bg-transparent text-gray-800 hover:bg-gray-800 hover:text-white hover:shadow-lg transform hover:scale-[1.02]",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
