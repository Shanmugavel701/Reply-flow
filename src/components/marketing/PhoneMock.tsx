import { motion } from "motion/react";
import { Check, CheckCheck } from "lucide-react";
import type { ReactNode } from "react";

export function PhoneFrame({
  children,
  header,
  className = "",
}: {
  children: ReactNode;
  header?: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={
        "relative w-[292px] rounded-[38px] border-[10px] border-foreground/90 bg-background shadow-[var(--shadow-lift)] sm:w-[320px] " +
        className
      }
    >
      <div className="absolute left-1/2 top-0 z-10 h-5 w-28 -translate-x-1/2 rounded-b-2xl bg-foreground/90" />
      <div className="overflow-hidden rounded-[28px]">
        {header}
        <div className="min-h-[380px] bg-surface px-3.5 py-4">{children}</div>
      </div>
    </div>
  );
}

export function ChatHeader({
  name,
  handle,
  channel,
}: {
  name: string;
  handle: string;
  channel: "Instagram" | "WhatsApp";
}) {
  return (
    <div className="flex items-center gap-3 border-b border-border bg-background px-4 pb-3 pt-7">
      <div className="grid size-9 place-items-center rounded-full bg-primary-tint text-[13px] font-semibold text-primary-deep">
        {name
          .split(" ")
          .map((n) => n[0])
          .join("")}
      </div>
      <div className="min-w-0">
        <p className="truncate text-[13px] font-semibold leading-tight">{name}</p>
        <p className="truncate text-[11px] text-muted-foreground">
          {handle} · {channel}
        </p>
      </div>
      <span className="ml-auto flex items-center gap-1.5 rounded-full bg-primary-tint px-2 py-1 text-[10px] font-semibold uppercase tracking-wide text-primary-deep">
        <span className="size-1.5 rounded-full bg-primary pulse-ring" />
        Automated
      </span>
    </div>
  );
}

export function Bubble({
  side,
  children,
  time,
  delay = 0,
  delivered,
}: {
  side: "in" | "out";
  children: ReactNode;
  time?: string;
  delay?: number;
  delivered?: boolean;
}) {
  const out = side === "out";
  return (
    <motion.div
      initial={{ opacity: 0, y: 10, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.35, delay, ease: [0.22, 1, 0.36, 1] }}
      className={"flex " + (out ? "justify-end" : "justify-start")}
    >
      <div
        className={
          "mt-2 max-w-[85%] rounded-2xl px-3.5 py-2.5 text-[12.5px] leading-relaxed " +
          (out
            ? "rounded-br-md bg-primary text-primary-foreground"
            : "rounded-bl-md border border-border bg-card text-card-foreground")
        }
      >
        {children}
        {time && (
          <span
            className={
              "mt-1 flex items-center justify-end gap-1 text-[10px] " +
              (out ? "text-primary-foreground/70" : "text-muted-foreground")
            }
          >
            {time}
            {out && (delivered ? <CheckCheck className="size-3" /> : <Check className="size-3" />)}
          </span>
        )}
      </div>
    </motion.div>
  );
}

export function TypingBubble({ delay = 0 }: { delay?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay }}
      className="mt-2 flex"
    >
      <div className="flex items-center gap-1 rounded-2xl rounded-bl-md border border-border bg-card px-3 py-2.5">
        {[0, 1, 2].map((i) => (
          <span
            key={i}
            className="typing-dot size-1.5 rounded-full bg-muted-foreground"
            style={{ animationDelay: i * 0.15 + "s" }}
          />
        ))}
      </div>
    </motion.div>
  );
}
