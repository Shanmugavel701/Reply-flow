import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { CalendarClock, Plus, Send, Users } from "lucide-react";
import { AppShell, Panel } from "@/components/app/AppShell";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/campaigns")({
  head: () => ({
    meta: [
      { title: "Broadcast Campaigns — ReplyFlow" },
      {
        name: "description",
        content:
          "Send WhatsApp and Instagram broadcasts to targeted customer segments and measure replies and revenue.",
      },
      { property: "og:title", content: "Broadcast Campaigns — ReplyFlow" },
      {
        property: "og:description",
        content: "Segment customers and broadcast offers that actually get replies.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: CampaignsPage,
});

const campaigns = [
  { name: "Diwali Flash Sale", channel: "WhatsApp", audience: 3120, sent: 3120, opened: 2704, replied: 612, revenue: 184500, status: "Completed" },
  { name: "New Arrivals — Linen", channel: "Instagram", audience: 1840, sent: 1840, opened: 1490, replied: 268, revenue: 96200, status: "Completed" },
  { name: "VIP Early Access", channel: "WhatsApp", audience: 412, sent: 412, opened: 388, replied: 141, revenue: 132400, status: "Running" },
  { name: "Back in Stock: Earbuds", channel: "WhatsApp", audience: 960, sent: 0, opened: 0, replied: 0, revenue: 0, status: "Scheduled" },
  { name: "Win-back — 90 days inactive", channel: "Email", audience: 2140, sent: 0, opened: 0, replied: 0, revenue: 0, status: "Draft" },
];

const segments = [
  { name: "VIP customers", size: 412 },
  { name: "Abandoned cart (7 days)", size: 268 },
  { name: "Instagram leads", size: 1840 },
  { name: "Repeat buyers", size: 934 },
];

function CampaignsPage() {
  const [composer, setComposer] = useState(false);
  const [message, setMessage] = useState(
    "Hi {{first_name}} 👋 New linen arrivals just dropped — 15% off for the next 24 hours.",
  );

  return (
    <AppShell
      title="Campaigns"
      subtitle="Broadcast to the right customers, on the channel they actually read."
      actions={
        <button
          onClick={() => setComposer((v) => !v)}
          className="inline-flex items-center gap-1.5 rounded-lg bg-primary px-3 py-2 text-[13px] font-medium text-primary-foreground hover:bg-primary-soft"
        >
          <Plus className="size-4" /> New campaign
        </button>
      }
    >
      <div className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_320px]">
        <Panel title="All campaigns">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[780px] text-left">
              <thead>
                <tr className="border-b border-border text-[11.5px] uppercase tracking-wide text-muted-foreground">
                  <th className="px-3 py-3 font-medium">Campaign</th>
                  <th className="px-3 py-3 font-medium">Channel</th>
                  <th className="px-3 py-3 font-medium">Audience</th>
                  <th className="px-3 py-3 font-medium">Replies</th>
                  <th className="px-3 py-3 font-medium">Revenue</th>
                  <th className="px-3 py-3 font-medium">Status</th>
                </tr>
              </thead>
              <tbody>
                {campaigns.map((c) => (
                  <tr key={c.name} className="border-b border-border last:border-0">
                    <td className="px-3 py-3 text-[13.5px] font-medium">{c.name}</td>
                    <td className="px-3 py-3 text-[13px] text-muted-foreground">{c.channel}</td>
                    <td className="px-3 py-3 text-[13px]">{c.audience.toLocaleString("en-IN")}</td>
                    <td className="px-3 py-3 text-[13px]">{c.replied.toLocaleString("en-IN")}</td>
                    <td className="px-3 py-3 text-[13px] font-medium">
                      {c.revenue ? `₹${c.revenue.toLocaleString("en-IN")}` : "—"}
                    </td>
                    <td className="px-3 py-3">
                      <span
                        className={cn(
                          "rounded px-2 py-0.5 text-[11.5px] font-medium",
                          c.status === "Completed" && "bg-success/12 text-success",
                          c.status === "Running" && "bg-primary-tint text-primary-deep",
                          c.status === "Scheduled" && "bg-warning/15 text-warning-foreground",
                          c.status === "Draft" && "bg-surface text-muted-foreground",
                        )}
                      >
                        {c.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Panel>

        <div className="space-y-5">
          <Panel title="Segments">
            <ul className="space-y-3">
              {segments.map((s) => (
                <li key={s.name} className="flex items-center justify-between text-[13px]">
                  <span className="inline-flex items-center gap-2">
                    <Users className="size-4 text-primary" />
                    {s.name}
                  </span>
                  <span className="text-muted-foreground">{s.size.toLocaleString("en-IN")}</span>
                </li>
              ))}
            </ul>
          </Panel>

          {composer && (
            <Panel title="Compose broadcast">
              <select className="w-full rounded-lg border border-border px-3 py-2 text-[13px]">
                {segments.map((s) => (
                  <option key={s.name}>
                    {s.name} · {s.size}
                  </option>
                ))}
              </select>
              <textarea
                rows={5}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="mt-3 w-full resize-none rounded-lg border border-border px-3 py-2 text-[13px] outline-none focus:border-primary"
              />
              <p className="mt-2 text-[11.5px] text-muted-foreground">
                Variables: {"{{first_name}}"}, {"{{last_order}}"}, {"{{cart_link}}"}
              </p>
              <div className="mt-3 flex gap-2">
                <button className="inline-flex flex-1 items-center justify-center gap-1.5 rounded-lg bg-primary px-3 py-2 text-[13px] font-medium text-primary-foreground">
                  <Send className="size-4" /> Send now
                </button>
                <button className="inline-flex items-center gap-1.5 rounded-lg border border-border px-3 py-2 text-[13px]">
                  <CalendarClock className="size-4" /> Schedule
                </button>
              </div>
            </Panel>
          )}
        </div>
      </div>
    </AppShell>
  );
}
