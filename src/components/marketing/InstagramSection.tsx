import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { Check, Heart, Instagram, MessageCircle, Send } from "lucide-react";
import { Reveal } from "@/components/shared/Reveal";
import { Bubble, ChatHeader, PhoneFrame } from "./PhoneMock";

const features = [
  "Comment Auto Reply",
  "Comment-to-DM",
  "DM Automation",
  "Story Reply Automation",
  "Keyword Triggers",
  "Mention Triggers",
  "Lead Capture",
  "Follow-up Automation",
  "Product Link Sharing",
  "FAQ Automation",
];

const sequence = [
  "Keyword detected",
  "Customer identified",
  "Automation triggered",
  "DM sent",
];

export function InstagramSection() {
  const [step, setStep] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setStep((s) => (s + 1) % 6), 1100);
    return () => clearInterval(t);
  }, []);

  return (
    <section className="bg-surface py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <div className="grid gap-14 lg:grid-cols-2 lg:items-center">
          <div>
            <Reveal>
              <span className="inline-flex items-center gap-2 rounded-full border border-border bg-background px-3 py-1.5 text-[12.5px] text-muted-foreground">
                <Instagram className="size-3.5 text-primary" />
                Instagram automation
              </span>
              <h2 className="mt-5 max-w-xl font-display text-[32px] font-bold leading-tight sm:text-[42px]">
                Turn Instagram conversations into customers.
              </h2>
              <p className="mt-4 max-w-lg text-[15.5px] text-muted-foreground">
                Reply to every comment, move the conversation into DMs and send the product link
                before the customer scrolls away.
              </p>
            </Reveal>

            <div className="mt-8 flex flex-wrap gap-2">
              {features.map((f, i) => (
                <Reveal key={f} delay={i * 0.03}>
                  <span className="rounded-lg border border-border bg-card px-3 py-2 text-[13px]">
                    {f}
                  </span>
                </Reveal>
              ))}
            </div>

            <Reveal delay={0.1}>
              <div className="mt-10 rounded-2xl border border-border bg-card p-5">
                <p className="text-[13px] font-semibold">
                  Post caption: “Comment SHOP to get the link.”
                </p>
                <div className="mt-4 space-y-2.5">
                  {sequence.map((s, i) => (
                    <div key={s} className="flex items-center gap-2.5 text-[13.5px]">
                      <span
                        className={
                          "grid size-5 place-items-center rounded-full transition-colors " +
                          (step > i ? "bg-success text-primary-foreground" : "bg-muted text-muted-foreground")
                        }
                      >
                        <Check className="size-3" />
                      </span>
                      <span className={step > i ? "text-foreground" : "text-muted-foreground"}>
                        {s}
                      </span>
                    </div>
                  ))}
                </div>
                {step >= 5 && (
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-4 rounded-xl bg-primary-tint p-3.5"
                  >
                    <p className="text-[13px] text-primary-deep">
                      “Hey! 👋 Here&apos;s the collection you asked for.”
                    </p>
                    <button className="mt-3 rounded-lg bg-primary px-3.5 py-2 text-[12.5px] font-semibold text-primary-foreground transition-colors hover:bg-primary-soft">
                      View Collection
                    </button>
                  </motion.div>
                )}
              </div>
            </Reveal>
          </div>

          <Reveal delay={0.08} className="flex justify-center">
            <div className="space-y-4">
              <div className="w-[292px] overflow-hidden rounded-2xl border border-border bg-card shadow-[var(--shadow-card)] sm:w-[320px]">
                <div className="flex items-center gap-2.5 border-b border-border px-4 py-3">
                  <span className="size-7 rounded-full bg-primary-tint" />
                  <span className="text-[13px] font-semibold">@urbanthread.co</span>
                </div>
                <div className="grid h-40 place-items-center bg-primary-tint/70 font-display text-[20px] font-bold text-primary-deep">
                  New Collection 🔥
                </div>
                <div className="flex items-center gap-4 px-4 py-3 text-muted-foreground">
                  <Heart className="size-4" />
                  <MessageCircle className="size-4" />
                  <Send className="size-4" />
                  <span className="ml-auto text-[12px]">1,284 likes</span>
                </div>
                <div className="space-y-2 border-t border-border px-4 py-3 text-[12.5px]">
                  <p>
                    <span className="font-semibold">@sarah.jordan</span> Price?
                  </p>
                  <motion.p
                    key={step}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-primary-deep"
                  >
                    <span className="font-semibold">@urbanthread.co</span> Sending you the details in
                    DM 👋
                  </motion.p>
                </div>
              </div>

              <PhoneFrame
                className="scale-95"
                header={
                  <ChatHeader name="Sarah Jordan" handle="@sarah.jordan" channel="Instagram" />
                }
              >
                <Bubble side="out" time="10:43" delivered>
                  Hey Sarah! 👋 Here&apos;s the piece you asked about — Linen Summer Dress, ₹1,899.
                </Bubble>
                <Bubble side="out" time="10:43" delay={0.4} delivered>
                  Free delivery across India on orders above ₹999.
                </Bubble>
                <Bubble side="in" time="10:48" delay={0.9}>
                  Ordering now 🙌
                </Bubble>
              </PhoneFrame>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
