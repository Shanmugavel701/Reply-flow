import { createFileRoute } from "@tanstack/react-router";
import { brand } from "@/config/brand";
import { SiteNav } from "@/components/marketing/SiteNav";
import { Hero } from "@/components/marketing/Hero";
import { LiveAutomation } from "@/components/marketing/LiveAutomation";
import { Channels } from "@/components/marketing/Channels";
import { ProblemSolution } from "@/components/marketing/ProblemSolution";
import { InstagramSection } from "@/components/marketing/InstagramSection";
import { WhatsAppSection } from "@/components/marketing/WhatsAppSection";
import { EcommerceSection } from "@/components/marketing/EcommerceSection";
import { RevenueRecovery } from "@/components/marketing/RevenueRecovery";
import { AIAssistant } from "@/components/marketing/AIAssistant";
import { DashboardPreview } from "@/components/marketing/DashboardPreview";
import { SleepSection } from "@/components/marketing/SleepSection";
import { SocialProof } from "@/components/marketing/SocialProof";
import { PricingPlans } from "@/components/marketing/PricingPlans";
import { FAQ } from "@/components/marketing/FAQ";
import { FinalCTA } from "@/components/marketing/FinalCTA";
import { SiteFooter } from "@/components/marketing/SiteFooter";

const title = `${brand.name} — ${brand.tagline}`;
const description =
  "Reply to Instagram comments and DMs, follow up on WhatsApp, recover abandoned carts and turn customer conversations into sales — automatically.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Landing,
});

function Landing() {
  return (
    <div className="min-h-screen bg-background">
      <SiteNav />
      <main>
        <Hero />
        <LiveAutomation />
        <Channels />
        <ProblemSolution productName={brand.name} />
        <InstagramSection />
        <WhatsAppSection />
        <EcommerceSection />
        <RevenueRecovery />
        <AIAssistant />
        <DashboardPreview />
        <SleepSection productName={brand.name} />
        <SocialProof />
        <PricingPlans />
        <FAQ />
        <FinalCTA />
      </main>
      <SiteFooter />
    </div>
  );
}
