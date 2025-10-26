import { cn } from "@/utils/index"

function Skeleton({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "rounded-md bg-[hsl(var(--foreground)/0.08)] animate-pulse motion-reduce:animate-none",
        className
      )}
      {...props}
    />
  )
}

export { Skeleton }
