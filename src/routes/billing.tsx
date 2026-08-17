import { createFileRoute } from "@tanstack/react-router";
import { CreditCard, Download } from "lucide-react";
import { AppShell, Panel } from "@/components/app/AppShell";

export const Route = createFileRoute("/billing")({
  head: () => ({
    meta: [
      { title: "Billing & Usage — ReplyFlow" },
      {
        name: "description",
        content: "Track plan usage, conversation limits, invoices and payment methods.",
      },
      { property: "og:title", content: "Billing & Usage — ReplyFlow" },
      {
        property: "og:description",
        content: "Plan usage, invoices and payment details for your workspace.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: BillingPage,
});

const usage = [
  { label: "Conversations", used: 4120, limit: 25000 },
  { label: "Automation runs", used: 18940, limit: 100000 },
  { label: "AI replies", used: 2310, limit: 10000 },
  { label: "Team seats", used: 4, limit: 10 },
];

const invoices = [
  { id: "INV-2026-004", date: "1 Apr 2026", amount: "₹6,999", status: "Paid" },
  { id: "INV-2026-003", date: "1 Mar 2026", amount: "₹6,999", status: "Paid" },
  { id: "INV-2026-002", date: "1 Feb 2026", amount: "₹2,999", status: "Paid" },
  { id: "INV-2026-001", date: "1 Jan 2026", amount: "₹2,999", status: "Paid" },
];

function BillingPage() {
  return (
    <AppShell title="Billing" subtitle="Your plan, usage and invoices.">
      <div className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_340px]">
        <div className="space-y-5">
          <Panel title="Usage this cycle">
            <ul className="space-y-5">
              {usage.map((u) => (
                <li key={u.label}>
                  <div className="flex items-center justify-between text-[13px]">
                    <span>{u.label}</span>
                    <span className="text-muted-foreground">
                      {u.used.toLocaleString("en-IN")} / {u.limit.toLocaleString("en-IN")}
                    </span>
                  </div>
                  <div className="mt-2 h-2 overflow-hidden rounded-full bg-surface">
                    <div
                      className="h-full rounded-full bg-primary"
                      style={{ width: `${Math.min(100, (u.used / u.limit) * 100)}%` }}
                    />
                  </div>
                </li>
              ))}
            </ul>
          </Panel>

          <Panel title="Invoices">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-border text-[11.5px] uppercase tracking-wide text-muted-foreground">
                  <th className="px-2 py-3 font-medium">Invoice</th>
                  <th className="px-2 py-3 font-medium">Date</th>
                  <th className="px-2 py-3 font-medium">Amount</th>
                  <th className="px-2 py-3 font-medium">Status</th>
                  <th />
                </tr>
              </thead>
              <tbody>
                {invoices.map((i) => (
                  <tr key={i.id} className="border-b border-border last:border-0">
                    <td className="px-2 py-3 text-[13px]">{i.id}</td>
                    <td className="px-2 py-3 text-[13px] text-muted-foreground">{i.date}</td>
                    <td className="px-2 py-3 text-[13px] font-medium">{i.amount}</td>
                    <td className="px-2 py-3">
                      <span className="rounded bg-success/12 px-2 py-0.5 text-[11.5px] font-medium text-success">
                        {i.status}
                      </span>
                    </td>
                    <td className="px-2 py-3 text-right">
                      <button
                        className="inline-flex items-center gap-1 text-[12.5px] text-primary hover:underline"
                        aria-label={`Download ${i.id}`}
                      >
                        <Download className="size-3.5" /> PDF
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Panel>
        </div>

        <div className="space-y-5">
          <Panel title="Current plan">
            <p className="font-display text-[24px] font-bold">Growth</p>
            <p className="mt-1 text-[13px] text-muted-foreground">
              ₹6,999 / month · renews 1 May 2026
            </p>
            <ul className="mt-4 space-y-2 text-[13px] text-muted-foreground">
              <li>25,000 conversations / month</li>
              <li>Unlimited automations</li>
              <li>AI assistant included</li>
              <li>10 team seats</li>
            </ul>
            <button className="mt-5 w-full rounded-lg bg-primary py-2.5 text-[13.5px] font-medium text-primary-foreground hover:bg-primary-soft">
              Upgrade to Scale
            </button>
            <button className="mt-2 w-full rounded-lg border border-border py-2.5 text-[13.5px]">
              Change plan
            </button>
          </Panel>

          <Panel title="Payment method">
            <div className="flex items-center gap-3 rounded-lg border border-border p-3">
              <CreditCard className="size-5 text-primary" />
              <div>
                <p className="text-[13.5px] font-medium">Visa ending 4421</p>
                <p className="text-[12px] text-muted-foreground">Expires 09/28</p>
              </div>
            </div>
            <button className="mt-3 w-full rounded-lg border border-border py-2 text-[13px]">
              Update card
            </button>
          </Panel>
        </div>
      </div>
    </AppShell>
  );
}
