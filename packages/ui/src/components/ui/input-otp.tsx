import * as React from "react"
import { cn } from "@/lib/utils"
import { MinusIcon } from "@radix-ui/react-icons"

type SlotState = { char: string; hasFakeCaret: boolean; isActive: boolean }

const LocalOTPContext = React.createContext<{ slots: SlotState[] } | null>(null)

function buildSlots(value: string, maxLength: number): SlotState[] {
  const chars = (value || "").split("")
  const slots: SlotState[] = []
  for (let i = 0; i < maxLength; i++) {
    const char = chars[i] || ""
    const isActive = i === Math.min(chars.length, maxLength - 1)
    const hasFakeCaret = isActive && char === ""
    slots.push({ char, hasFakeCaret, isActive })
  }
  return slots
}

const InputOTP = React.forwardRef<HTMLDivElement, {
  value: string
  onChange: (value: string) => void
  maxLength?: number
  className?: string
  containerClassName?: string
  inputMode?: React.HTMLAttributes<HTMLInputElement>["inputMode"]
  autoComplete?: string
  pattern?: string
  children?: React.ReactNode
}>(
  ({ value, onChange, maxLength = 6, className, containerClassName, inputMode, autoComplete, pattern, children }, ref) => {
    const slots = React.useMemo(() => buildSlots(value, maxLength), [value, maxLength])
    return (
      <div className={cn("flex items-center gap-2 has-[:disabled]:opacity-50", containerClassName)} ref={ref}>
        <LocalOTPContext.Provider value={{ slots }}>
          <div className={cn("disabled:cursor-not-allowed", className)} aria-hidden />
          {children}
        </LocalOTPContext.Provider>
        {/* Hidden input to capture typing/paste */}
        <input
          value={value}
          onChange={(e) => onChange(e.target.value)}
          inputMode={inputMode}
          autoComplete={autoComplete}
          pattern={pattern}
          maxLength={maxLength}
          className="sr-only"
          aria-label="One-time code"
        />
      </div>
    )
  }
)
InputOTP.displayName = "InputOTP"

const InputOTPGroup = React.forwardRef<
  React.ElementRef<"div">,
  React.ComponentPropsWithoutRef<"div">
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("flex items-center", className)} {...props} />
))
InputOTPGroup.displayName = "InputOTPGroup"

const InputOTPSlot = React.forwardRef<
  React.ElementRef<"div">,
  React.ComponentPropsWithoutRef<"div"> & { index: number }
>(({ index, className, ...props }, ref) => {
  const inputOTPContext = React.useContext(LocalOTPContext)
  const { char, hasFakeCaret, isActive } = (inputOTPContext?.slots?.[index]) || { char: "", hasFakeCaret: false, isActive: false }

  return (
    <div
      ref={ref}
      className={cn(
        "relative flex h-9 w-9 items-center justify-center border-y border-r border-input text-sm shadow-sm transition-all first:rounded-l-md first:border-l last:rounded-r-md",
        isActive && "z-10 ring-1 ring-ring",
        className
      )}
      {...props}
    >
      {char}
      {hasFakeCaret && (
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
          <div className="h-4 w-px animate-caret-blink bg-foreground duration-1000" />
        </div>
      )}
    </div>
  )
})
InputOTPSlot.displayName = "InputOTPSlot"

const InputOTPSeparator = React.forwardRef<
  React.ElementRef<"div">,
  React.ComponentPropsWithoutRef<"div">
>(({ ...props }, ref) => (
  <div ref={ref} role="separator" {...props}>
    <MinusIcon />
  </div>
))
InputOTPSeparator.displayName = "InputOTPSeparator"

export { InputOTP, InputOTPGroup, InputOTPSlot, InputOTPSeparator }
