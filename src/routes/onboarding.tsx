import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowLeft, ArrowRight, Check, Instagram, MessageCircle, ShoppingCart } from "lucide-react";
import { Logo } from "@/components/shared/Logo";
import { brand } from "@/config/brand";
import { automationTemplates } from "@/lib/mock-data";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/onboarding")({
  head: () => ({
    meta: [
      { title: "Get started — ReplyFlow" },
      {
        name: "description",
        content:
          "Connect your channels, pick your first automations and go live in under ten minutes.",
      },
      { property: "og:title", content: "Get started — ReplyFlow" },
      {
        property: "og:description",
        content: "Set up Instagram, WhatsApp and WooCommerce automation in minutes.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: OnboardingPage,
});

const steps = ["Business", "Channels", "Store", "Automations", "Done"];

const channels = [
  { key: "instagram", label: "Instagram", icon: Instagram, desc: "Comments, DMs, story replies" },
  { key: "whatsapp", label: "WhatsApp Business", icon: MessageCircle, desc: "Order updates and follow-ups" },
  { key: "woocommerce", label: "WooCommerce", icon: ShoppingCart, desc: "Products, orders, customers" },
];

function OnboardingPage() {
  const [step, setStep] = useState(0);
  const [connected, setConnected] = useState<string[]>([]);
  const [picked, setPicked] = useState<string[]>([
    "Instagram Comment → DM",
    "Abandoned Cart Recovery",
  ]);
  const navigate = useNavigate();

  const toggle = (list: string[], set: (v: string[]) => void, v: string) =>
    set(list.includes(v) ? list.filter((i) => i !== v) : [...list, v]);

  return (
    <div className="min-h-screen bg-surface">
      <header className="border-b border-border bg-background">
        <div className="mx-auto flex h-16 max-w-3xl items-center gap-2.5 px-5">
          <Logo />
          <span className="font-display text-[16px] font-bold">{brand.name}</span>
          <span className="ml-auto text-[12.5px] text-muted-foreground">
            Step {Math.min(step + 1, steps.length)} of {steps.length}
          </span>
        </div>
      </header>

      <main className="mx-auto max-w-3xl px-5 py-10">
        <ol className="flex items-center gap-2">
          {steps.map((s, i) => (
            <li key={s} className="flex flex-1 items-center gap-2">
              <span
                className={cn(
                  "grid size-7 shrink-0 place-items-center rounded-full text-[12px] font-semibold",
                  i <= step
                    ? "bg-primary text-primary-foreground"
                    : "bg-border text-muted-foreground",
                )}
              >
                {i < step ? <Check className="size-3.5" /> : i + 1}
              </span>
              {i < steps.length - 1 && (
                <span className={cn("h-px flex-1", i < step ? "bg-primary" : "bg-border")} />
              )}
            </li>
          ))}
        </ol>

        <section className="mt-8 rounded-2xl border border-border bg-card p-7">
          {step === 0 && (
            <>
              <h1 className="font-display text-[24px] font-bold">Tell us about your business</h1>
              <div className="mt-6 space-y-4">
                <label className="block">
                  <span className="text-[12.5px] text-muted-foreground">Business name</span>
                  <input
                    placeholder="Urban Thread"
                    className="mt-1.5 w-full rounded-lg border border-border px-3 py-2.5 text-[14px] outline-none focus:border-primary"
                  />
                </label>
                <label className="block">
                  <span className="text-[12.5px] text-muted-foreground">What do you sell?</span>
                  <select className="mt-1.5 w-full rounded-lg border border-border px-3 py-2.5 text-[14px]">
                    <option>Fashion &amp; apparel</option>
                    <option>Beauty &amp; skincare</option>
                    <option>Electronics</option>
                    <option>Home &amp; living</option>
                    <option>Services</option>
                  </select>
                </label>
                <label className="block">
                  <span className="text-[12.5px] text-muted-foreground">
                    Messages you get per week
                  </span>
                  <select className="mt-1.5 w-full rounded-lg border border-border px-3 py-2.5 text-[14px]">
                    <option>Under 200</option>
                    <option>200 – 1,000</option>
                    <option>1,000 – 5,000</option>
                    <option>5,000+</option>
                  </select>
                </label>
              </div>
            </>
          )}

          {step === 1 && (
            <>
              <h1 className="font-display text-[24px] font-bold">Connect your channels</h1>
              <p className="mt-2 text-[14px] text-muted-foreground">
                You can add more later. Start with where your customers already message you.
              </p>
              <ul className="mt-6 space-y-3">
                {channels.slice(0, 2).map((c) => (
                  <li key={c.key}>
                    <button
                      onClick={() => toggle(connected, setConnected, c.key)}
                      className={cn(
                        "flex w-full items-center gap-3 rounded-xl border p-4 text-left transition-colors",
                        connected.includes(c.key)
                          ? "border-primary bg-primary-tint"
                          : "border-border hover:border-primary/50",
                      )}
                    >
                      <c.icon className="size-5 text-primary" />
                      <span>
                        <span className="block text-[14px] font-medium">{c.label}</span>
                        <span className="block text-[12.5px] text-muted-foreground">{c.desc}</span>
                      </span>
                      <span className="ml-auto text-[12.5px] font-medium text-primary">
                        {connected.includes(c.key) ? "Connected" : "Connect"}
                      </span>
                    </button>
                  </li>
                ))}
              </ul>
            </>
          )}

          {step === 2 && (
            <>
              <h1 className="font-display text-[24px] font-bold">Connect your store</h1>
              <p className="mt-2 text-[14px] text-muted-foreground">
                We'll sync products, orders and customers so every reply knows the context.
              </p>
              <button
                onClick={() => toggle(connected, setConnected, "woocommerce")}
                className={cn(
                  "mt-6 flex w-full items-center gap-3 rounded-xl border p-4 text-left transition-colors",
                  connected.includes("woocommerce")
                    ? "border-primary bg-primary-tint"
                    : "border-border hover:border-primary/50",
                )}
              >
                <ShoppingCart className="size-5 text-primary" />
                <span>
                  <span className="block text-[14px] font-medium">WooCommerce</span>
                  <span className="block text-[12.5px] text-muted-foreground">
                    Paste your store URL and API keys
                  </span>
                </span>
                <span className="ml-auto text-[12.5px] font-medium text-primary">
                  {connected.includes("woocommerce") ? "Connected" : "Connect"}
                </span>
              </button>
              <input
                placeholder="https://yourstore.com"
                className="mt-4 w-full rounded-lg border border-border px-3 py-2.5 text-[14px] outline-none focus:border-primary"
              />
            </>
          )}

          {step === 3 && (
            <>
              <h1 className="font-display text-[24px] font-bold">Turn on your first automations</h1>
              <p className="mt-2 text-[14px] text-muted-foreground">
                These three cover most of the revenue for stores like yours.
              </p>
              <ul className="mt-6 space-y-3">
                {automationTemplates.slice(0, 5).map((t) => (
                  <li key={t.name}>
                    <button
                      onClick={() => toggle(picked, setPicked, t.name)}
                      className={cn(
                        "flex w-full items-start gap-3 rounded-xl border p-4 text-left transition-colors",
                        picked.includes(t.name)
                          ? "border-primary bg-primary-tint"
                          : "border-border hover:border-primary/50",
                      )}
                    >
                      <span
                        className={cn(
                          "mt-0.5 grid size-5 shrink-0 place-items-center rounded border",
                          picked.includes(t.name)
                            ? "border-primary bg-primary text-primary-foreground"
                            : "border-border",
                        )}
                      >
                        {picked.includes(t.name) && <Check className="size-3" />}
                      </span>
                      <span>
                        <span className="block text-[14px] font-medium">{t.name}</span>
                        <span className="block text-[12.5px] text-muted-foreground">
                          {t.outcome}
                        </span>
                      </span>
                    </button>
                  </li>
                ))}
              </ul>
            </>
          )}

          {step === 4 && (
            <div className="py-6 text-center">
              <span className="mx-auto grid size-14 place-items-center rounded-full bg-primary-tint text-primary-deep">
                <Check className="size-7" />
              </span>
              <h1 className="mt-5 font-display text-[26px] font-bold">You're live.</h1>
              <p className="mt-2 text-[14.5px] text-muted-foreground">
                {picked.length} automations are running across {Math.max(connected.length, 1)}{" "}
                connected channels. The next comment gets answered automatically.
              </p>
              <button
                onClick={() => navigate({ to: "/dashboard" })}
                className="mt-7 inline-flex items-center gap-2 rounded-xl bg-primary px-6 py-3 text-[14.5px] font-semibold text-primary-foreground hover:bg-primary-soft"
              >
                Go to dashboard <ArrowRight className="size-4" />
              </button>
            </div>
          )}

          {step < 4 && (
            <div className="mt-8 flex items-center justify-between">
              <button
                onClick={() => setStep((s) => Math.max(0, s - 1))}
                disabled={step === 0}
                className="inline-flex items-center gap-1.5 text-[13.5px] text-muted-foreground disabled:opacity-40"
              >
                <ArrowLeft className="size-4" /> Back
              </button>
              <button
                onClick={() => setStep((s) => s + 1)}
                className="inline-flex items-center gap-2 rounded-lg bg-primary px-5 py-2.5 text-[13.5px] font-semibold text-primary-foreground hover:bg-primary-soft"
              >
                Continue <ArrowRight className="size-4" />
              </button>
            </div>
          )}
        </section>
      </main>
    </div>
  );
}
