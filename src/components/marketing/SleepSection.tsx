import { motion } from "motion/react";
import { Moon } from "lucide-react";
import { Counter } from "@/components/shared/Counter";

const events = [
  { time: "11:48 PM", text: "Instagram comment received" },
  { time: "11:49 PM", text: "DM sent" },
  { time: "12:04 AM", text: "Customer clicked product" },
  { time: "12:16 AM", text: "WhatsApp follow-up" },
  { time: "1:02 AM", text: "Order received" },
  { time: "3:14 AM", text: "Customer support question answered" },
  { time: "6:42 AM", text: "New lead created" },
];

export function SleepSection({ productName }: { productName: string }) {
  return (
    <section className="relative overflow-hidden bg-[var(--primary-deep)] py-20 text-primary-foreground lg:py-28">
      <div className="pointer-events-none absolute inset-0 dot-grid opacity-60" />
      <div className="relative mx-auto max-w-7xl px-5 lg:px-8">
        <div className="grid gap-14 lg:grid-cols-2 lg:items-center">
          <div>
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="inline-flex size-16 items-center justify-center rounded-2xl bg-primary-foreground/10"
            >
              <Moon className="size-8" />
            </motion.div>
            <h2 className="mt-7 max-w-lg font-display text-[34px] font-bold leading-tight sm:text-[46px]">
              You sleep. {productName} works.
            </h2>
            <p className="mt-4 max-w-md text-[15.5px] text-primary-foreground/70">
              Here&apos;s a single night at an online store running four automations.
            </p>

            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 1.4, duration: 0.6 }}
              className="mt-10 rounded-2xl border border-primary-foreground/15 bg-primary-foreground/5 p-6"
            >
              <p className="font-display text-[17px] font-semibold">Good morning.</p>
              <p className="text-[14px] text-primary-foreground/70">
                Your business was still working.
              </p>
              <p className="mt-4 font-display text-[40px] font-bold">
                <Counter to={24800} prefix="₹" duration={2200} />
              </p>
              <p className="text-[13px] text-primary-foreground/70">
                Revenue generated while you were offline.
              </p>
              <p className="mt-3 inline-block rounded-md bg-primary-foreground/10 px-2.5 py-1 text-[11.5px] text-primary-foreground/80">
                Example automation result
              </p>
            </motion.div>
          </div>

          <ol className="relative border-l border-primary-foreground/20 pl-6">
            {events.map((e, i) => (
              <motion.li
                key={e.time}
                initial={{ opacity: 0, x: -12 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.18, duration: 0.45 }}
                className="relative pb-7 last:pb-0"
              >
                <span className="absolute -left-[31px] top-1.5 size-2.5 rounded-full bg-primary-foreground shadow-[0_0_0_4px_oklch(1_0_0_/_0.12)]" />
                <p className="text-[12.5px] uppercase tracking-wide text-primary-foreground/60">
                  {e.time}
                </p>
                <p className="mt-1 text-[15.5px] font-medium">{e.text}</p>
              </motion.li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
