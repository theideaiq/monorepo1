import { cn } from '@repo/utils';

/**
 * Placeholder component for loading states.
 * Renders a pulsing gray box.
 */
function Skeleton({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn('animate-pulse rounded-md bg-zinc-800/50', className)}
      {...props}
    />
  );
}

export { Skeleton };
