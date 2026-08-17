import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowRight, Filter } from "lucide-react";
import { AppShell } from "@/components/app/AppShell";
import { channelIcon } from "@/components/app/channel";
import { leadStages, leads as seedLeads, type Lead } from "@/lib/mock-data";
import { currency } from "@/config/brand";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/leads")({
  head: () => ({
    meta: [
      { title: "Lead Pipeline — ReplyFlow" },
      {
        name: "description",
        content:
          "A kanban pipeline of leads captured from Instagram, WhatsApp and your website, with value per stage.",
      },
      { property: "og:title", content: "Lead Pipeline — ReplyFlow" },
      {
        property: "og:description",
        content: "Track every lead from first message to closed sale.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: LeadsPage,
});

function LeadsPage() {
  const [leads, setLeads] = useState<Lead[]>(seedLeads);
  const [owner, setOwner] = useState("All owners");
  const owners = ["All owners", ...Array.from(new Set(seedLeads.map((l) => l.owner)))];

  const visible = owner === "All owners" ? leads : leads.filter((l) => l.owner === owner);

  const advance = (lead: Lead) => {
    const i = leadStages.indexOf(lead.stage);
    const next = leadStages[Math.min(i + 1, leadStages.length - 2)]!;
    setLeads((prev) => prev.map((l) => (l.id === lead.id ? { ...l, stage: next } : l)));
  };

  return (
    <AppShell
      title="Leads"
      subtitle="Every conversation that showed buying intent."
      actions={
        <div className="inline-flex items-center gap-2 rounded-lg border border-border bg-card px-3 py-2 text-[13px]">
          <Filter className="size-4 text-muted-foreground" />
          <select
            value={owner}
            onChange={(e) => setOwner(e.target.value)}
            className="bg-transparent outline-none"
          >
            {owners.map((o) => (
              <option key={o}>{o}</option>
            ))}
          </select>
        </div>
      }
    >
      <div className="flex gap-4 overflow-x-auto pb-4">
        {leadStages.map((stage) => {
          const items = visible.filter((l) => l.stage === stage);
          const total = items.reduce((s, l) => s + l.value, 0);
          return (
            <div key={stage} className="w-[262px] shrink-0">
              <div className="flex items-center justify-between px-1 pb-2.5">
                <p className="text-[13px] font-semibold">
                  {stage}
                  <span className="ml-2 rounded bg-surface px-1.5 py-0.5 text-[11px] font-medium text-muted-foreground">
                    {items.length}
                  </span>
                </p>
                <p className="text-[12px] text-muted-foreground">{currency(total)}</p>
              </div>
              <div className="min-h-[160px] space-y-2.5 rounded-xl border border-border bg-surface p-2.5">
                {items.map((l) => {
                  const Icon = channelIcon[l.source];
                  return (
                    <article
                      key={l.id}
                      className="rounded-lg border border-border bg-card p-3 shadow-[var(--shadow-card)]"
                    >
                      <div className="flex items-center gap-2">
                        <Icon className="size-4 text-primary" />
                        <p className="text-[13.5px] font-medium">{l.name}</p>
                      </div>
                      <p className="mt-1.5 text-[12.5px] text-muted-foreground">{l.product}</p>
                      <div className="mt-2.5 flex items-center justify-between">
                        <span className="text-[13px] font-semibold">{currency(l.value)}</span>
                        <span className="text-[11.5px] text-muted-foreground">{l.last}</span>
                      </div>
                      <div className="mt-2.5 flex items-center justify-between border-t border-border pt-2.5">
                        <span
                          className={cn(
                            "text-[11.5px]",
                            l.owner === "Automation"
                              ? "font-medium text-primary"
                              : "text-muted-foreground",
                          )}
                        >
                          {l.owner}
                        </span>
                        {stage !== "Converted" && stage !== "Lost" && (
                          <button
                            onClick={() => advance(l)}
                            className="inline-flex items-center gap-1 text-[11.5px] font-medium text-primary hover:underline"
                          >
                            Move <ArrowRight className="size-3" />
                          </button>
                        )}
                      </div>
                    </article>
                  );
                })}
                {items.length === 0 && (
                  <p className="px-2 py-6 text-center text-[12px] text-muted-foreground">
                    Nothing here yet.
                  </p>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </AppShell>
  );
}
