import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { AppShell, Panel } from "@/components/app/AppShell";
import { cn } from "@/lib/utils";
import { brand } from "@/config/brand";

export const Route = createFileRoute("/settings")({
  head: () => ({
    meta: [
      { title: "Settings — ReplyFlow" },
      {
        name: "description",
        content:
          "Manage your workspace profile, team, business hours, AI assistant tone and notifications.",
      },
      { property: "og:title", content: "Settings — ReplyFlow" },
      {
        property: "og:description",
        content: "Workspace, team, AI tone and notification preferences.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: SettingsPage,
});

const tabs = ["Profile", "Business", "Team", "AI assistant", "Notifications"] as const;

const team = [
  { name: "Shanmu K.", email: "shanmu@urbanthread.in", role: "Owner" },
  { name: "Meera K.", email: "meera@urbanthread.in", role: "Agent" },
  { name: "Arun P.", email: "arun@urbanthread.in", role: "Agent" },
  { name: "Divya R.", email: "divya@urbanthread.in", role: "Analyst" },
];

function Field({ label, value }: { label: string; value: string }) {
  return (
    <label className="block">
      <span className="text-[12.5px] text-muted-foreground">{label}</span>
      <input
        defaultValue={value}
        className="mt-1.5 w-full rounded-lg border border-border px-3 py-2 text-[13.5px] outline-none focus:border-primary"
      />
    </label>
  );
}

function Toggle({ label, desc, on }: { label: string; desc: string; on?: boolean }) {
  const [checked, setChecked] = useState(!!on);
  return (
    <div className="flex items-start justify-between gap-4 border-b border-border py-3.5 last:border-0">
      <div>
        <p className="text-[13.5px] font-medium">{label}</p>
        <p className="text-[12.5px] text-muted-foreground">{desc}</p>
      </div>
      <button
        role="switch"
        aria-checked={checked}
        aria-label={label}
        onClick={() => setChecked((v) => !v)}
        className={cn(
          "mt-0.5 h-6 w-11 shrink-0 rounded-full p-0.5 transition-colors",
          checked ? "bg-primary" : "bg-border",
        )}
      >
        <span
          className={cn(
            "block size-5 rounded-full bg-card transition-transform",
            checked && "translate-x-5",
          )}
        />
      </button>
    </div>
  );
}

function SettingsPage() {
  const [tab, setTab] = useState<(typeof tabs)[number]>("Profile");

  return (
    <AppShell title="Settings" subtitle={`Configure how ${brand.name} works for your business.`}>
      <div className="grid gap-5 lg:grid-cols-[200px_minmax(0,1fr)]">
        <nav className="flex gap-1 overflow-x-auto lg:flex-col">
          {tabs.map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={cn(
                "shrink-0 rounded-lg px-3 py-2 text-left text-[13.5px] transition-colors",
                tab === t
                  ? "bg-primary-tint font-medium text-primary-deep"
                  : "text-muted-foreground hover:text-foreground",
              )}
            >
              {t}
            </button>
          ))}
        </nav>

        <div className="space-y-5">
          {tab === "Profile" && (
            <Panel title="Your profile">
              <div className="grid gap-4 sm:grid-cols-2">
                <Field label="Full name" value="Shanmu Kumaran" />
                <Field label="Email" value="shanmu@urbanthread.in" />
                <Field label="Phone" value="+91 98400 11223" />
                <Field label="Time zone" value="Asia/Kolkata (GMT+5:30)" />
              </div>
              <button className="mt-5 rounded-lg bg-primary px-4 py-2 text-[13.5px] font-medium text-primary-foreground">
                Save changes
              </button>
            </Panel>
          )}

          {tab === "Business" && (
            <>
              <Panel title="Business details">
                <div className="grid gap-4 sm:grid-cols-2">
                  <Field label="Business name" value="Urban Thread" />
                  <Field label="Website" value="urbanthread.in" />
                  <Field label="Support email" value={brand.supportEmail} />
                  <Field label="Currency" value="INR (₹)" />
                </div>
              </Panel>
              <Panel title="Business hours">
                <div className="grid gap-4 sm:grid-cols-2">
                  <Field label="Opens at" value="09:30" />
                  <Field label="Closes at" value="19:00" />
                </div>
                <Toggle
                  label="Automate outside business hours"
                  desc="Let automations and AI handle everything when nobody is online."
                  on
                />
              </Panel>
            </>
          )}

          {tab === "Team" && (
            <Panel title="Team members">
              <table className="w-full text-left">
                <thead>
                  <tr className="border-b border-border text-[11.5px] uppercase tracking-wide text-muted-foreground">
                    <th className="px-2 py-3 font-medium">Name</th>
                    <th className="px-2 py-3 font-medium">Email</th>
                    <th className="px-2 py-3 font-medium">Role</th>
                  </tr>
                </thead>
                <tbody>
                  {team.map((m) => (
                    <tr key={m.email} className="border-b border-border last:border-0">
                      <td className="px-2 py-3 text-[13.5px]">{m.name}</td>
                      <td className="px-2 py-3 text-[13px] text-muted-foreground">{m.email}</td>
                      <td className="px-2 py-3 text-[13px]">{m.role}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <button className="mt-4 rounded-lg border border-border px-4 py-2 text-[13.5px]">
                Invite teammate
              </button>
            </Panel>
          )}

          {tab === "AI assistant" && (
            <Panel title="AI assistant">
              <label className="block">
                <span className="text-[12.5px] text-muted-foreground">Tone of voice</span>
                <select className="mt-1.5 w-full rounded-lg border border-border px-3 py-2 text-[13.5px]">
                  <option>Friendly and helpful</option>
                  <option>Professional</option>
                  <option>Playful</option>
                  <option>Concise</option>
                </select>
              </label>
              <label className="mt-4 block">
                <span className="text-[12.5px] text-muted-foreground">Knowledge base</span>
                <textarea
                  rows={5}
                  defaultValue="We ship pan-India in 3-5 days. Free shipping above ₹1,499. 7-day easy returns. COD available under ₹5,000."
                  className="mt-1.5 w-full resize-none rounded-lg border border-border px-3 py-2 text-[13.5px] outline-none focus:border-primary"
                />
              </label>
              <Toggle
                label="Handover to human on low confidence"
                desc="Assign the conversation to an agent when the AI isn't sure."
                on
              />
              <Toggle
                label="Let AI recommend products"
                desc="Uses your live WooCommerce catalogue and stock."
                on
              />
            </Panel>
          )}

          {tab === "Notifications" && (
            <Panel title="Notifications">
              <Toggle label="New lead captured" desc="Push notification on every new lead." on />
              <Toggle label="Automation failed" desc="Alert when a step can't complete." on />
              <Toggle label="Daily summary email" desc="Yesterday's conversations and revenue." on />
              <Toggle label="Weekly performance report" desc="Sent every Monday at 9 AM." />
            </Panel>
          )}
        </div>
      </div>
    </AppShell>
  );
}
