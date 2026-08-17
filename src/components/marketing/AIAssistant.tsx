import { Reveal } from "@/components/shared/Reveal";
import { Bubble } from "./PhoneMock";

export function AIAssistant() {
  return (
    <section className="bg-surface py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
          <Reveal>
            <h2 className="max-w-lg font-display text-[32px] font-bold leading-tight sm:text-[42px]">
              Your sales assistant works at 2 AM too.
            </h2>
            <p className="mt-4 max-w-lg text-[15.5px] text-muted-foreground">
              It answers product questions with your real catalogue, prices and shipping rules — and
              hands the conversation to your team the moment it should.
            </p>
            <ul className="mt-7 space-y-3">
              {[
                "Answers from your product catalogue, not guesses",
                "Knows stock, sizes, price and delivery rules",
                "Escalates to a human when the question is unusual",
                "Every reply is logged in the customer timeline",
              ].map((t) => (
                <li key={t} className="flex items-start gap-2.5 text-[14.5px]">
                  <span className="mt-2 size-1.5 shrink-0 rounded-full bg-primary" />
                  {t}
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal delay={0.08}>
            <div className="rounded-2xl border border-border bg-card p-5 shadow-[var(--shadow-card)] sm:p-6">
              <div className="flex items-center justify-between border-b border-border pb-4">
                <div>
                  <p className="text-[14px] font-semibold">Urban Thread support</p>
                  <p className="text-[12px] text-success">Online · replies instantly</p>
                </div>
                <span className="rounded-full bg-primary-tint px-2.5 py-1 text-[11px] font-semibold text-primary-deep">
                  Assistant
                </span>
              </div>

              <div className="pt-2">
                <Bubble side="in" time="1:58 AM">
                  Which shirt is best for office?
                </Bubble>
                <Bubble side="out" time="1:58 AM" delay={0.4} delivered>
                  For office wear, I&apos;d recommend our Premium Cotton Formal Shirt. It&apos;s
                  ₹1,299 and available in 5 sizes.
                </Bubble>
                <Bubble side="in" time="2:01 AM" delay={0.8}>
                  Does it have free shipping?
                </Bubble>
                <Bubble side="out" time="2:01 AM" delay={1.2} delivered>
                  Yes. Orders above ₹999 qualify for free shipping.
                </Bubble>
              </div>

              <div className="mt-5 flex flex-wrap gap-2">
                <button className="rounded-lg bg-primary px-4 py-2.5 text-[13px] font-semibold text-primary-foreground transition-colors hover:bg-primary-soft">
                  View Product
                </button>
                <button className="rounded-lg border border-border px-4 py-2.5 text-[13px] font-medium transition-colors hover:border-primary hover:text-primary">
                  Talk to Human
                </button>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
