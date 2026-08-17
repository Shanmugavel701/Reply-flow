import { Link } from "@tanstack/react-router";
import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { brand } from "@/config/brand";
import { Logo } from "@/components/shared/Logo";
import { cn } from "@/lib/utils";

const links = [
  { label: "Product", to: "/features" as const },
  { label: "Features", to: "/features" as const },
  { label: "Automations", to: "/automations" as const },
  { label: "Integrations", to: "/integrations" as const },
  { label: "Pricing", to: "/pricing" as const },
  { label: "Resources", to: "/resources" as const },
];

export function SiteNav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 transition-all duration-300",
        scrolled
          ? "border-b border-border bg-background/80 shadow-[0_1px_12px_-6px_rgba(0,0,0,0.2)] backdrop-blur-md"
          : "border-b border-transparent bg-background",
      )}
    >
      <nav
        aria-label="Main"
        className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 lg:px-8"
      >
        <Link to="/" className="flex items-center gap-2.5" aria-label={brand.name + " home"}>
          <Logo />
          <span className="font-display text-[17px] font-bold tracking-tight">{brand.name}</span>
        </Link>

        <ul className="hidden items-center gap-1 lg:flex">
          {links.map((l) => (
            <li key={l.label}>
              <Link
                to={l.to}
                className="rounded-md px-3 py-2 text-[14px] text-muted-foreground transition-colors hover:bg-accent hover:text-primary"
                activeProps={{ className: "text-primary bg-accent" }}
              >
                {l.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="hidden items-center gap-2 lg:flex">
          <Link
            to="/login"
            className="rounded-md px-3 py-2 text-[14px] font-medium text-foreground transition-colors hover:text-primary"
          >
            Log in
          </Link>
          <Link
            to="/onboarding"
            className="rounded-lg bg-primary px-4 py-2.5 text-[14px] font-semibold text-primary-foreground shadow-[var(--shadow-purple)] transition-all hover:bg-primary-soft active:scale-[0.98]"
          >
            Start Free
          </Link>
        </div>

        <button
          className="rounded-md p-2 text-foreground lg:hidden"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X className="size-5" /> : <Menu className="size-5" />}
        </button>
      </nav>

      {open && (
        <div className="border-t border-border bg-background px-5 py-4 lg:hidden">
          <ul className="grid gap-1">
            {links.map((l) => (
              <li key={l.label}>
                <Link
                  to={l.to}
                  onClick={() => setOpen(false)}
                  className="block rounded-md px-3 py-2.5 text-[15px] text-foreground hover:bg-accent"
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
          <div className="mt-3 grid gap-2">
            <Link
              to="/login"
              onClick={() => setOpen(false)}
              className="rounded-lg border border-border px-4 py-2.5 text-center text-[15px] font-medium"
            >
              Log in
            </Link>
            <Link
              to="/onboarding"
              onClick={() => setOpen(false)}
              className="rounded-lg bg-primary px-4 py-2.5 text-center text-[15px] font-semibold text-primary-foreground"
            >
              Start Free
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
