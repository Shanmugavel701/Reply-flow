import { Link } from "@tanstack/react-router";
import { Github, Instagram, Linkedin, Twitter } from "lucide-react";
import { brand } from "@/config/brand";
import { Logo } from "@/components/shared/Logo";

const columns = [
  {
    title: "Product",
    links: [
      { label: "Features", to: "/features" as const },
      { label: "Automations", to: "/automations" as const },
      { label: "Integrations", to: "/integrations" as const },
      { label: "Pricing", to: "/pricing" as const },
    ],
  },
  {
    title: "Resources",
    links: [
      { label: "Blog", to: "/resources" as const },
      { label: "Help Center", to: "/resources" as const },
      { label: "API Docs", to: "/resources" as const },
      { label: "Use Cases", to: "/resources" as const },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About", to: "/resources" as const },
      { label: "Contact", to: "/resources" as const },
      { label: "Security", to: "/settings" as const },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Privacy", to: "/resources" as const },
      { label: "Terms", to: "/resources" as const },
    ],
  },
];

export function SiteFooter() {
  return (
    <footer className="border-t border-border bg-background">
      <div className="mx-auto grid max-w-7xl gap-10 px-5 py-14 lg:grid-cols-[1.4fr_repeat(4,1fr)] lg:px-8">
        <div>
          <Link to="/" className="flex items-center gap-2.5">
            <Logo />
            <span className="font-display text-[17px] font-bold">{brand.name}</span>
          </Link>
          <p className="mt-4 max-w-xs text-[13.5px] leading-relaxed text-muted-foreground">
            {brand.tagline} Conversation and sales automation across Instagram, WhatsApp, your
            website and your store.
          </p>
          <div className="mt-5 flex gap-2">
            {[Instagram, Twitter, Linkedin, Github].map((Icon, i) => (
              <span
                key={i}
                className="grid size-9 place-items-center rounded-lg border border-border text-muted-foreground transition-colors hover:border-primary hover:text-primary"
              >
                <Icon className="size-4" />
              </span>
            ))}
          </div>
        </div>

        {columns.map((c) => (
          <div key={c.title}>
            <p className="text-[13px] font-semibold uppercase tracking-[0.1em] text-muted-foreground">
              {c.title}
            </p>
            <ul className="mt-4 space-y-2.5">
              {c.links.map((l) => (
                <li key={l.label}>
                  <Link
                    to={l.to}
                    className="text-[14px] text-foreground/80 transition-colors hover:text-primary"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="border-t border-border">
        <div className="mx-auto flex max-w-7xl flex-col gap-2 px-5 py-5 text-[12.5px] text-muted-foreground sm:flex-row sm:items-center sm:justify-between lg:px-8">
          <p>
            © {new Date().getFullYear()} {brand.name}. All rights reserved.
          </p>
          <p>Built for businesses that reply fast.</p>
        </div>
      </div>
    </footer>
  );
}
