import { Reveal } from "@/components/shared/Reveal";

const flows = [
  {
    title: "Abandoned Cart",
    steps: ["Cart abandoned", "Wait 30 minutes", "WhatsApp reminder", "Wait 12 hours", "Send offer", "Purchase"],
  },
  {
    title: "Order Automation",
    steps: ["Order placed", "WhatsApp confirmation", "Shipping update", "Delivery notification"],
  },
  {
    title: "Repeat Purchase",
    steps: ["Purchase", "Wait 30 days", "Product recommendation", "WhatsApp"],
  },
  {
    title: "Review Automation",
    steps: ["Delivered", "Wait 3 days", "Feedback request", "Review"],
  },
];

export function EcommerceSection() {
  return (
    <section className="bg-surface py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <Reveal>
          <h2 className="max-w-2xl font-display text-[32px] font-bold leading-tight sm:text-[42px]">
            Your store, your chats and your CRM finally talk to each other.
          </h2>
          <p className="mt-4 max-w-xl text-[15.5px] text-muted-foreground">
            Connect WooCommerce and your website, and every order event becomes something the
            customer actually hears about.
          </p>
        </Reveal>

        <div className="mt-12 grid gap-4 md:grid-cols-2">
          {flows.map((f, i) => (
            <Reveal key={f.title} delay={i * 0.05}>
              <div className="h-full rounded-2xl border border-border bg-card p-6">
                <p className="font-display text-[19px] font-bold">{f.title}</p>
                <ol className="mt-5 space-y-0">
                  {f.steps.map((s, j) => (
                    <li key={s} className="relative flex items-center gap-3 pb-5 last:pb-0">
                      <span className="relative flex flex-col items-center self-stretch">
                        <span className="mt-1 size-2.5 shrink-0 rounded-full border-2 border-primary bg-background" />
                        {j < f.steps.length - 1 && (
                          <span className="absolute top-3 h-full w-px bg-border" />
                        )}
                      </span>
                      <span className="text-[14px]">{s}</span>
                    </li>
                  ))}
                </ol>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
