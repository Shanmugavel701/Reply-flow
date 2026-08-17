import { createFileRoute } from "@tanstack/react-router";
import { SiteNav } from "@/components/marketing/SiteNav";
import { SiteFooter } from "@/components/marketing/SiteFooter";
import { PricingPlans } from "@/components/marketing/PricingPlans";
import { FAQ } from "@/components/marketing/FAQ";
import { FinalCTA } from "@/components/marketing/FinalCTA";

export const Route = createFileRoute("/pricing")({
  head: () => ({
    meta: [
      { title: "Pricing — ReplyFlow" },
      {
        name: "description",
        content:
          "Simple monthly pricing for Instagram and WhatsApp automation, unified inbox and AI replies. Start free, upgrade when it pays for itself.",
      },
      { property: "og:title", content: "Pricing — ReplyFlow" },
      {
        property: "og:description",
        content: "Plans for solo sellers up to high-volume commerce teams.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: PricingPage,
});

function PricingPage() {
  return (
    <div className="min-h-screen bg-background">
      <SiteNav />
      <main>
        <section className="border-b border-border bg-surface py-16 lg:py-20">
          <div className="mx-auto max-w-3xl px-5 text-center lg:px-8">
            <h1 className="font-display text-[36px] font-bold leading-tight sm:text-[48px]">
              Pricing that pays for itself in recovered carts.
            </h1>
            <p className="mt-5 text-[16px] text-muted-foreground">
              14-day free trial on every plan. No credit card, no setup fee, cancel anytime.
            </p>
          </div>
        </section>
        <PricingPlans />
        <FAQ />
        <FinalCTA />
      </main>
      <SiteFooter />
    </div>
  );
}
