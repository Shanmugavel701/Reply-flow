import { Link } from "@tanstack/react-router";
import { motion } from "motion/react";
import { Check, Moon, PlayCircle, Sparkles } from "lucide-react";
import { brand } from "@/config/brand";
import { Bubble, ChatHeader, PhoneFrame, TypingBubble } from "./PhoneMock";

const trust = ["No credit card required", "5-minute setup", "Cancel anytime"];

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-surface">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[520px] surface-grid opacity-40" />
      <div className="relative mx-auto grid max-w-7xl gap-14 px-5 pb-20 pt-16 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:gap-10 lg:px-8 lg:pb-28 lg:pt-24">
        <div>
          <motion.span
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="inline-flex items-center gap-2 rounded-full border border-border bg-background px-3 py-1.5 text-[12.5px] text-muted-foreground"
          >
            <Sparkles className="size-3.5 text-primary" />
            Instagram · WhatsApp · Website · WooCommerce
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.05 }}
            className="mt-6 max-w-[15ch] font-display text-[40px] font-bold leading-[1.05] tracking-tight sm:text-[56px] lg:text-[62px]"
          >
            Your business keeps selling{" "}
            <span className="relative whitespace-nowrap text-primary">
              while you sleep
              <svg
                className="absolute -bottom-2 left-0 w-full text-primary/30"
                viewBox="0 0 300 12"
                fill="none"
                aria-hidden="true"
              >
                <path
                  d="M2 9C60 3 150 2 298 6"
                  stroke="currentColor"
                  strokeWidth="4"
                  strokeLinecap="round"
                />
              </svg>
            </span>
            .
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.12 }}
            className="mt-7 max-w-xl text-[16px] leading-relaxed text-muted-foreground"
          >
            {brand.description}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.18 }}
            className="mt-8 flex flex-wrap items-center gap-3"
          >
            <Link
              to="/onboarding"
              className="rounded-xl bg-primary px-6 py-3.5 text-[15px] font-semibold text-primary-foreground shadow-[var(--shadow-purple)] transition-all hover:bg-primary-soft active:scale-[0.98]"
            >
              Start Free
            </Link>
            <a
              href="#live-automation"
              className="inline-flex items-center gap-2 rounded-xl border border-border bg-background px-5 py-3.5 text-[15px] font-medium transition-colors hover:border-primary hover:text-primary"
            >
              <PlayCircle className="size-4.5" />
              Watch Demo
            </a>
          </motion.div>

          <ul className="mt-7 flex flex-wrap gap-x-6 gap-y-2">
            {trust.map((t) => (
              <li key={t} className="flex items-center gap-2 text-[13.5px] text-muted-foreground">
                <Check className="size-4 text-success" />
                {t}
              </li>
            ))}
          </ul>
        </div>

        <div className="relative flex justify-center lg:justify-end">
          <div className="absolute -left-4 top-6 hidden items-center gap-2 rounded-xl border border-border bg-background px-3.5 py-2.5 shadow-[var(--shadow-card)] sm:flex">
            <Moon className="size-4 text-primary" />
            <span className="text-[13px] font-medium">While you sleep</span>
            <span className="flex gap-1" aria-hidden="true">
              {[0, 1, 2].map((i) => (
                <motion.span
                  key={i}
                  className="size-1 rounded-full bg-primary"
                  animate={{ opacity: [0.2, 1, 0.2] }}
                  transition={{ duration: 2.2, repeat: Infinity, delay: i * 0.4 }}
                />
              ))}
            </span>
          </div>

          <div className="float-slow">
            <PhoneFrame
              header={<ChatHeader name="Sarah Jordan" handle="@sarah.jordan" channel="Instagram" />}
            >
              <Bubble side="in" time="11:48 PM" delay={0.3}>
                How much is this?
              </Bubble>
              <TypingBubble delay={0.8} />
              <Bubble side="out" time="11:48 PM" delay={1.4} delivered>
                Hey Sarah! 👋 Thanks for asking. The product is ₹1,499. Here&apos;s the link.
              </Bubble>
              <Bubble side="in" time="11:52 PM" delay={2.1}>
                Do you ship to Chennai?
              </Bubble>
              <Bubble side="out" time="11:52 PM" delay={2.7} delivered>
                Yes! We deliver across India 🚚
              </Bubble>
            </PhoneFrame>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 3, duration: 0.4 }}
            className="absolute -bottom-4 right-0 rounded-xl border border-border bg-background px-4 py-3 shadow-[var(--shadow-card)]"
          >
            <p className="text-[11px] uppercase tracking-wide text-muted-foreground">
              Replied automatically
            </p>
            <p className="font-display text-[19px] font-bold text-primary">128 conversations</p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
