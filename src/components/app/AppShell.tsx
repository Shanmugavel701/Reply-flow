import { Link, useRouterState } from "@tanstack/react-router";
import {
  BarChart3,
  Bell,
  ChevronDown,
  CreditCard,
  Inbox,
  LayoutDashboard,
  LifeBuoy,
  Megaphone,
  Menu,
  Package,
  Plug,
  Search,
  Settings,
  Sparkles,
  Users,
  Workflow,
  X,
} from "lucide-react";
import { useEffect, useState, type ReactNode } from "react";
import { brand } from "@/config/brand";
import { Logo } from "@/components/shared/Logo";
import { CommandMenu } from "./CommandMenu";
import { cn } from "@/lib/utils";

const nav = [
  { label: "Dashboard", to: "/dashboard" as const, icon: LayoutDashboard },
  { label: "Inbox", to: "/inbox" as const, icon: Inbox },
  { label: "Contacts", to: "/contacts" as const, icon: Users },
  { label: "Leads", to: "/leads" as const, icon: Sparkles },
  { label: "Automations", to: "/automations" as const, icon: Workflow },
  { label: "Campaigns", to: "/campaigns" as const, icon: Megaphone },
  { label: "Analytics", to: "/analytics" as const, icon: BarChart3 },
  { label: "Integrations", to: "/integrations" as const, icon: Plug },
  { label: "Billing", to: "/billing" as const, icon: CreditCard },
  { label: "Settings", to: "/settings" as const, icon: Settings },
];

export function AppShell({
  title,
  subtitle,
  actions,
  children,
}: {
  title: string;
  subtitle?: string;
  actions?: ReactNode;
  children: ReactNode;
}) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [cmdOpen, setCmdOpen] = useState(false);
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  useEffect(() => setMobileOpen(false), [pathname]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setCmdOpen((v) => !v);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <div className="min-h-screen bg-surface">
      <CommandMenu open={cmdOpen} onOpenChange={setCmdOpen} />

      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-50 flex w-64 flex-col border-r border-sidebar-border bg-sidebar transition-transform duration-300 lg:translate-x-0",
          mobileOpen ? "translate-x-0" : "-translate-x-full",
        )}
      >
        <div className="flex h-16 items-center justify-between px-4">
          <Link to="/" className="flex items-center gap-2.5">
            <Logo />
            <span className="font-display text-[16px] font-bold">{brand.name}</span>
          </Link>
          <button
            className="rounded-md p-1.5 text-muted-foreground lg:hidden"
            onClick={() => setMobileOpen(false)}
            aria-label="Close navigation"
          >
            <X className="size-4.5" />
          </button>
        </div>

        <nav aria-label="Sidebar" className="flex-1 space-y-0.5 overflow-y-auto px-3 py-2">
          {nav.map((n) => (
            <Link
              key={n.label}
              to={n.to}
              className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-[13.5px] text-sidebar-foreground/75 transition-colors hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
              activeProps={{
                className: "bg-sidebar-accent font-medium text-sidebar-accent-foreground",
              }}
            >
              <n.icon className="size-4.5" />
              {n.label}
            </Link>
          ))}
        </nav>

        <div className="border-t border-sidebar-border p-3">
          <Link
            to="/resources"
            className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-[13.5px] text-sidebar-foreground/75 hover:bg-sidebar-accent"
          >
            <LifeBuoy className="size-4.5" />
            Help &amp; Support
          </Link>
          <div className="mt-2 rounded-xl bg-primary-tint p-4">
            <p className="text-[13px] font-semibold text-primary-deep">Growth plan trial</p>
            <p className="mt-1 text-[12px] text-primary-deep/70">9 days left · 4,120 of 25,000 conversations used</p>
            <Link
              to="/billing"
              className="mt-3 block rounded-lg bg-primary px-3 py-2 text-center text-[12.5px] font-semibold text-primary-foreground hover:bg-primary-soft"
            >
              Upgrade
            </Link>
          </div>
        </div>
      </aside>

      {mobileOpen && (
        <div
          className="fixed inset-0 z-40 bg-foreground/30 lg:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      <div className="lg:pl-64">
        <header className="sticky top-0 z-30 border-b border-border bg-background/85 backdrop-blur-md">
          <div className="flex h-16 items-center gap-3 px-4 sm:px-6">
            <button
              className="rounded-md p-2 lg:hidden"
              onClick={() => setMobileOpen(true)}
              aria-label="Open navigation"
            >
              <Menu className="size-5" />
            </button>

            <button
              onClick={() => setCmdOpen(true)}
              className="flex h-9 flex-1 items-center gap-2 rounded-lg border border-border bg-surface px-3 text-[13px] text-muted-foreground transition-colors hover:border-primary/40 sm:max-w-sm"
            >
              <Search className="size-4" />
              Search customers, orders, automations…
              <kbd className="ml-auto hidden rounded border border-border bg-background px-1.5 py-0.5 text-[11px] sm:inline">
                ⌘K
              </kbd>
            </button>

            <div className="ml-auto flex items-center gap-2">
              <button
                className="relative rounded-lg border border-border p-2 text-muted-foreground transition-colors hover:text-primary"
                aria-label="Notifications"
              >
                <Bell className="size-4.5" />
                <span className="absolute -right-1 -top-1 grid size-4 place-items-center rounded-full bg-primary text-[10px] font-semibold text-primary-foreground">
                  3
                </span>
              </button>
              <button className="hidden items-center gap-2 rounded-lg border border-border px-3 py-2 text-[13px] sm:flex">
                <span className="grid size-5 place-items-center rounded bg-primary-tint text-[10px] font-bold text-primary-deep">
                  UT
                </span>
                Urban Thread
                <ChevronDown className="size-3.5 text-muted-foreground" />
              </button>
              <button
                className="grid size-9 place-items-center rounded-full bg-primary-tint text-[12.5px] font-semibold text-primary-deep"
                aria-label="Your profile"
              >
                SK
              </button>
            </div>
          </div>
        </header>

        <main className="px-4 py-7 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-[1400px]">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div>
                <h1 className="font-display text-[26px] font-bold tracking-tight">{title}</h1>
                {subtitle && (
                  <p className="mt-1.5 text-[14px] text-muted-foreground">{subtitle}</p>
                )}
              </div>
              {actions && <div className="flex flex-wrap items-center gap-2">{actions}</div>}
            </div>
            <div className="mt-7 pb-16">{children}</div>
          </div>
        </main>
      </div>

      <nav
        aria-label="Mobile"
        className="fixed inset-x-0 bottom-0 z-30 flex border-t border-border bg-background/95 backdrop-blur lg:hidden"
      >
        {nav.slice(0, 5).map((n) => (
          <Link
            key={n.label}
            to={n.to}
            className="flex flex-1 flex-col items-center gap-1 py-2.5 text-[10.5px] text-muted-foreground"
            activeProps={{ className: "text-primary" }}
          >
            <n.icon className="size-4.5" />
            {n.label}
          </Link>
        ))}
      </nav>
      <div className="h-16 lg:hidden" />
    </div>
  );
}

export function Panel({
  title,
  action,
  children,
  className,
}: {
  title?: string;
  action?: ReactNode;
  children: ReactNode;
  className?: string;
}) {
  return (
    <section className={cn("rounded-xl border border-border bg-card p-5", className)}>
      {(title || action) && (
        <div className="mb-5 flex items-center justify-between gap-3">
          {title && <h2 className="text-[14.5px] font-semibold">{title}</h2>}
          {action}
        </div>
      )}
      {children}
    </section>
  );
}
