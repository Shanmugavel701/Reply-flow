import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import {
  Bot,
  Clock,
  GitBranch,
  MessageSquare,
  Play,
  Plus,
  Tag,
  Trash2,
  Users,
  Zap,
} from "lucide-react";
import { AppShell, Panel } from "@/components/app/AppShell";
import { automationTemplates, topAutomations } from "@/lib/mock-data";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/automations")({
  head: () => ({
    meta: [
      { title: "Automation Builder — ReplyFlow" },
      {
        name: "description",
        content:
          "Build visual automations: triggers, conditions, delays, AI replies and actions across Instagram, WhatsApp and your store.",
      },
      { property: "og:title", content: "Automation Builder — ReplyFlow" },
      {
        property: "og:description",
        content: "Drag-free visual builder for conversation and sales automations.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: AutomationsPage,
});

type StepKind = "trigger" | "condition" | "delay" | "message" | "ai" | "tag" | "assign";

type Step = { id: string; kind: StepKind; label: string };

const palette: { kind: StepKind; label: string; icon: typeof Zap; hint: string }[] = [
  { kind: "trigger", label: "Trigger", icon: Zap, hint: "Comment, DM, order, cart" },
  { kind: "condition", label: "Condition", icon: GitBranch, hint: "If keyword / value / tag" },
  { kind: "delay", label: "Delay", icon: Clock, hint: "Wait minutes, hours or days" },
  { kind: "message", label: "Send message", icon: MessageSquare, hint: "DM, WhatsApp or email" },
  { kind: "ai", label: "AI reply", icon: Bot, hint: "Product-aware AI response" },
  { kind: "tag", label: "Add tag", icon: Tag, hint: "Segment the contact" },
  { kind: "assign", label: "Assign", icon: Users, hint: "Handover to a teammate" },
];

const initial: Step[] = [
  { id: "s1", kind: "trigger", label: "Instagram comment contains “price”" },
  { id: "s2", kind: "condition", label: "First-time commenter?" },
  { id: "s3", kind: "message", label: "Send DM with product link" },
  { id: "s4", kind: "delay", label: "Wait 30 minutes" },
  { id: "s5", kind: "ai", label: "AI answers follow-up questions" },
  { id: "s6", kind: "tag", label: "Tag as “Instagram Lead”" },
];

const kindStyles: Record<StepKind, string> = {
  trigger: "border-primary bg-primary-tint text-primary-deep",
  condition: "border-warning/50 bg-warning/10",
  delay: "border-border bg-surface",
  message: "border-success/40 bg-success/10",
  ai: "border-primary/40 bg-primary-tint/60",
  tag: "border-border bg-surface",
  assign: "border-border bg-surface",
};

function AutomationsPage() {
  const [tab, setTab] = useState<"builder" | "templates" | "active">("builder");
  const [steps, setSteps] = useState<Step[]>(initial);
  const [selected, setSelected] = useState<string | null>("s1");

  const addStep = (kind: StepKind, label: string) => {
    const id = `s${Date.now()}`;
    setSteps((p) => [...p, { id, kind, label }]);
    setSelected(id);
  };

  const active = steps.find((s) => s.id === selected);

  return (
    <AppShell
      title="Automations"
      subtitle="Design the conversations your business has on autopilot."
      actions={
        <>
          <button className="inline-flex items-center gap-1.5 rounded-lg border border-border bg-card px-3 py-2 text-[13px]">
            <Play className="size-4" /> Test run
          </button>
          <button className="inline-flex items-center gap-1.5 rounded-lg bg-primary px-3 py-2 text-[13px] font-medium text-primary-foreground hover:bg-primary-soft">
            <Plus className="size-4" /> New automation
          </button>
        </>
      }
    >
      <div className="mb-5 flex gap-1 rounded-lg border border-border bg-card p-1 sm:w-fit">
        {(["builder", "templates", "active"] as const).map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={cn(
              "flex-1 rounded-md px-4 py-1.5 text-[13px] capitalize transition-colors sm:flex-none",
              tab === t ? "bg-primary text-primary-foreground" : "text-muted-foreground",
            )}
          >
            {t === "active" ? "Active automations" : t}
          </button>
        ))}
      </div>

      {tab === "builder" && (
        <div className="grid gap-4 lg:grid-cols-[220px_minmax(0,1fr)_280px]">
          <Panel title="Blocks">
            <ul className="space-y-2">
              {palette.map((p) => (
                <li key={p.kind}>
                  <button
                    onClick={() => addStep(p.kind, p.label)}
                    className="w-full rounded-lg border border-border p-3 text-left transition-colors hover:border-primary hover:bg-primary-tint/40"
                  >
                    <span className="flex items-center gap-2 text-[13px] font-medium">
                      <p.icon className="size-4 text-primary" />
                      {p.label}
                    </span>
                    <span className="mt-1 block text-[11.5px] text-muted-foreground">
                      {p.hint}
                    </span>
                  </button>
                </li>
              ))}
            </ul>
          </Panel>

          <Panel title="Instagram Comment → DM">
            <div
              className="rounded-xl p-5"
              style={{
                backgroundImage:
                  "radial-gradient(color-mix(in oklab, var(--color-border) 90%, transparent) 1px, transparent 1px)",
                backgroundSize: "18px 18px",
              }}
            >
              <ol className="mx-auto flex max-w-md flex-col items-stretch">
                {steps.map((s, i) => {
                  const meta = palette.find((p) => p.kind === s.kind)!;
                  return (
                    <li key={s.id}>
                      <button
                        onClick={() => setSelected(s.id)}
                        className={cn(
                          "w-full rounded-xl border-2 px-4 py-3 text-left transition-shadow",
                          kindStyles[s.kind],
                          selected === s.id && "shadow-[var(--shadow-glow)]",
                        )}
                      >
                        <span className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-wide opacity-70">
                          <meta.icon className="size-3.5" />
                          {meta.label}
                        </span>
                        <span className="mt-1 block text-[13.5px] font-medium">{s.label}</span>
                      </button>
                      {i < steps.length - 1 && (
                        <div className="mx-auto h-6 w-px bg-border" aria-hidden />
                      )}
                    </li>
                  );
                })}
              </ol>
            </div>
          </Panel>

          <Panel title="Step settings">
            {active ? (
              <div className="space-y-4">
                <div>
                  <label className="text-[12px] text-muted-foreground">Label</label>
                  <input
                    value={active.label}
                    onChange={(e) =>
                      setSteps((p) =>
                        p.map((s) => (s.id === active.id ? { ...s, label: e.target.value } : s)),
                      )
                    }
                    className="mt-1.5 w-full rounded-lg border border-border px-3 py-2 text-[13px] outline-none focus:border-primary"
                  />
                </div>
                <div>
                  <label className="text-[12px] text-muted-foreground">Channel</label>
                  <select className="mt-1.5 w-full rounded-lg border border-border px-3 py-2 text-[13px] outline-none">
                    <option>Instagram</option>
                    <option>WhatsApp</option>
                    <option>Email</option>
                  </select>
                </div>
                <div>
                  <label className="text-[12px] text-muted-foreground">Notes</label>
                  <textarea
                    rows={4}
                    placeholder="What should this step do?"
                    className="mt-1.5 w-full resize-none rounded-lg border border-border px-3 py-2 text-[13px] outline-none focus:border-primary"
                  />
                </div>
                <button
                  onClick={() => {
                    setSteps((p) => p.filter((s) => s.id !== active.id));
                    setSelected(null);
                  }}
                  className="inline-flex items-center gap-1.5 text-[12.5px] text-destructive hover:underline"
                >
                  <Trash2 className="size-3.5" /> Remove step
                </button>
              </div>
            ) : (
              <p className="text-[13px] text-muted-foreground">
                Select a step in the canvas to configure it.
              </p>
            )}
          </Panel>
        </div>
      )}

      {tab === "templates" && (
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {automationTemplates.map((t) => (
            <article
              key={t.name}
              className="rounded-xl border border-border bg-card p-5 transition-shadow hover:shadow-[var(--shadow-card)]"
            >
              <h3 className="text-[15px] font-semibold">{t.name}</h3>
              <p className="mt-2 text-[12.5px] text-muted-foreground">Trigger: {t.trigger}</p>
              <ul className="mt-3 flex flex-wrap gap-1.5">
                {t.actions.map((a) => (
                  <li
                    key={a}
                    className="rounded-md bg-surface px-2 py-1 text-[11.5px] text-muted-foreground"
                  >
                    {a}
                  </li>
                ))}
              </ul>
              <p className="mt-3 text-[13px]">{t.outcome}</p>
              <button
                onClick={() => setTab("builder")}
                className="mt-4 w-full rounded-lg border border-border py-2 text-[13px] font-medium transition-colors hover:border-primary hover:text-primary"
              >
                Use template
              </button>
            </article>
          ))}
        </div>
      )}

      {tab === "active" && (
        <Panel>
          <table className="w-full min-w-[640px] text-left">
            <thead>
              <tr className="border-b border-border text-[11.5px] uppercase tracking-wide text-muted-foreground">
                <th className="px-3 py-3 font-medium">Automation</th>
                <th className="px-3 py-3 font-medium">Status</th>
                <th className="px-3 py-3 font-medium">Runs</th>
                <th className="px-3 py-3 font-medium">Revenue</th>
              </tr>
            </thead>
            <tbody>
              {topAutomations.map((a, i) => (
                <tr key={a.name} className="border-b border-border last:border-0">
                  <td className="px-3 py-3 text-[13.5px]">{a.name}</td>
                  <td className="px-3 py-3">
                    <span
                      className={cn(
                        "rounded px-2 py-0.5 text-[11.5px] font-medium",
                        i % 4 === 3
                          ? "bg-surface text-muted-foreground"
                          : "bg-success/12 text-success",
                      )}
                    >
                      {i % 4 === 3 ? "Paused" : "Active"}
                    </span>
                  </td>
                  <td className="px-3 py-3 text-[13px]">{a.runs.toLocaleString("en-IN")}</td>
                  <td className="px-3 py-3 text-[13px] font-medium">
                    {a.revenue > 0 ? `₹${a.revenue.toLocaleString("en-IN")}` : "—"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </Panel>
      )}
    </AppShell>
  );
}
