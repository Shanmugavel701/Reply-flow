import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { CheckCircle2, Plug, RefreshCw } from "lucide-react";
import { AppShell, Panel } from "@/components/app/AppShell";
import { integrations } from "@/lib/mock-data";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/integrations")({
  head: () => ({
    meta: [
      { title: "Integrations — ReplyFlow" },
      {
        name: "description",
        content:
          "Connect Instagram, WhatsApp Business, WooCommerce, your website and more in a few clicks.",
      },
      { property: "og:title", content: "Integrations — ReplyFlow" },
      {
        property: "og:description",
        content: "Instagram, WhatsApp, WooCommerce and website — connected in minutes.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: IntegrationsPage,
});

const tabs = ["All", "connected", "available", "planned"] as const;

function IntegrationsPage() {
  const [tab, setTab] = useState<(typeof tabs)[number]>("All");
  const list = tab === "All" ? integrations : integrations.filter((i) => i.status === tab);

  return (
    <AppShell
      title="Integrations"
      subtitle="Your channels and your store, talking to each other."
      actions={
        <div className="flex rounded-lg border border-border bg-card p-1">
          {tabs.map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={cn(
                "rounded-md px-3 py-1.5 text-[12.5px] capitalize",
                tab === t ? "bg-primary text-primary-foreground" : "text-muted-foreground",
              )}
            >
              {t}
            </button>
          ))}
        </div>
      }
    >
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {list.map((i) => (
          <article
            key={i.key}
            className="rounded-xl border border-border bg-card p-5 transition-shadow hover:shadow-[var(--shadow-card)]"
          >
            <div className="flex items-start justify-between">
              <span className="grid size-10 place-items-center rounded-lg bg-primary-tint text-primary-deep">
                <Plug className="size-5" />
              </span>
              <span
                className={cn(
                  "rounded px-2 py-0.5 text-[11.5px] font-medium capitalize",
                  i.status === "connected" && "bg-success/12 text-success",
                  i.status === "available" && "bg-surface text-muted-foreground",
                  i.status === "planned" && "bg-warning/15 text-warning-foreground",
                )}
              >
                {i.status === "planned" ? "Coming soon" : i.status}
              </span>
            </div>
            <h3 className="mt-4 text-[15px] font-semibold">{i.name}</h3>
            <p className="mt-1.5 text-[13px] text-muted-foreground">{i.desc}</p>
            <div className="mt-4 flex items-center justify-between">
              {i.status === "connected" ? (
                <span className="inline-flex items-center gap-1.5 text-[12px] text-muted-foreground">
                  <RefreshCw className="size-3.5" /> Synced {i.synced}
                </span>
              ) : (
                <span className="text-[12px] text-muted-foreground">Not connected</span>
              )}
              <button
                disabled={i.status === "planned"}
                className={cn(
                  "rounded-lg px-3 py-1.5 text-[12.5px] font-medium transition-colors",
                  i.status === "connected"
                    ? "border border-border hover:border-primary hover:text-primary"
                    : "bg-primary text-primary-foreground hover:bg-primary-soft",
                  i.status === "planned" && "cursor-not-allowed opacity-50",
                )}
              >
                {i.status === "connected" ? "Manage" : "Connect"}
              </button>
            </div>
          </article>
        ))}
      </div>

      <Panel title="What connecting unlocks" className="mt-5">
        <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {[
            "Reply to comments and DMs automatically",
            "Send order and shipping updates on WhatsApp",
            "Recover abandoned carts with real product data",
            "Sync customers and orders into the CRM",
          ].map((t) => (
            <li key={t} className="flex gap-2 text-[13px]">
              <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-success" />
              {t}
            </li>
          ))}
        </ul>
      </Panel>
    </AppShell>
  );
}
