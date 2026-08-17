import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Reveal } from "@/components/shared/Reveal";

const faqs = [
  {
    q: "Do I need a developer to set this up?",
    a: "No. Connect your accounts, pick a template and turn it on. The website connector gives you a WordPress plugin or a single script tag to paste.",
  },
  {
    q: "Will replies sound like a bot?",
    a: "You write the replies. Automated messages use the customer's name, product and order details, and anything unusual is handed to your team.",
  },
  {
    q: "What happens when someone asks something unexpected?",
    a: "The conversation is assigned to a team member with the full history attached, so nobody starts from scratch.",
  },
  {
    q: "Does it work with WooCommerce?",
    a: "Yes. Connect your store with API keys and sync products, orders, customers and cart events. Shopify support is on the roadmap.",
  },
  {
    q: "How is revenue attributed to an automation?",
    a: "Every automation run is logged. When an order is created for a customer who went through a run, that order is linked to the automation.",
  },
  {
    q: "Can I cancel anytime?",
    a: "Yes. Plans are monthly, and you keep access to your data on the Free plan after cancelling.",
  },
];

export function FAQ() {
  return (
    <section className="bg-background py-20 lg:py-28">
      <div className="mx-auto grid max-w-7xl gap-12 px-5 lg:grid-cols-[0.8fr_1.2fr] lg:px-8">
        <Reveal>
          <h2 className="font-display text-[32px] font-bold leading-tight sm:text-[40px]">
            Questions we get asked before signup.
          </h2>
          <p className="mt-4 text-[15px] text-muted-foreground">
            Something else on your mind? Write to us and a human replies.
          </p>
        </Reveal>
        <Reveal delay={0.06}>
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((f) => (
              <AccordionItem key={f.q} value={f.q}>
                <AccordionTrigger className="text-left text-[15.5px] font-medium">
                  {f.q}
                </AccordionTrigger>
                <AccordionContent className="text-[14px] leading-relaxed text-muted-foreground">
                  {f.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </Reveal>
      </div>
    </section>
  );
}
