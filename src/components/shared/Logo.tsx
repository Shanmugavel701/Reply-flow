export function Logo({ className = "size-8" }: { className?: string }) {
  return (
    <span
      className={
        "grid place-items-center rounded-[9px] bg-primary text-primary-foreground " + className
      }
      aria-hidden="true"
    >
      <svg viewBox="0 0 24 24" className="size-[18px]" fill="none" stroke="currentColor">
        <path
          d="M4 7.5A3.5 3.5 0 0 1 7.5 4h9A3.5 3.5 0 0 1 20 7.5v5A3.5 3.5 0 0 1 16.5 16H10l-4.2 3.4A.5.5 0 0 1 5 19V16"
          strokeWidth="1.8"
          strokeLinejoin="round"
        />
        <path d="M9 10h6M9 12.6h3.5" strokeWidth="1.8" strokeLinecap="round" />
      </svg>
    </span>
  );
}
