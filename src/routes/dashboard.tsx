import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { ArrowUpRight, Instagram, Mail, MessageCircle, Globe, ShoppingCart } from "lucide-react";
import { AppShell, Panel } from "@/components/app/AppShell";
import { Counter } from "@/components/shared/Counter";
import {
  automationActivity,
  conversationSources,
  conversations,
  leadsGenerated,
  messageOverview,
  revenueRecovered,
  topAutomations,
  type Channel,
} from "@/lib/mock-data";
import { currency } from "@/config/brand";

export const Route = createFileRoute("/dashboard")({
  head: () => ({
    meta: [
      { title: "Dashboard — ReplyFlow" },
      {
        name: "description",
        content:
          "Conversations, leads, recovered revenue and automation activity for your workspace.",
      },
      { property: "og:title", content: "Dashboard — ReplyFlow" },
      {
        property: "og:description",
        content: "Track conversations, leads and revenue recovered by automation.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Dashboard,
});

const ranges = ["Today", "Last 7 Days", "Last 30 Days", "Custom"];

const metrics = [
  { label: "Total Conversations", value: 12842, delta: "+18.4%", prefix: "" },
  { label: "Replies Sent", value: 9724, delta: "+22.1%", prefix: "" },
  { label: "New Leads", value: 2345, delta: "+15.7%", prefix: "" },
  { label: "Conversion Rate", value: 8.24, delta: "+11.7%", prefix: "", suffix: "%", decimals: 2 },
  { label: "Recovered Revenue", value: 38400, delta: "+9.2%", prefix: "₹" },
  { label: "Repeat Customers", value: 412, delta: "+6.5%", prefix: "" },
];

const channelIcon: Record<Channel, typeof Instagram> = {
  instagram: Instagram,
  whatsapp: MessageCircle,
  website: Globe,
  email: Mail,
  woocommerce: ShoppingCart,
};

const pieColors = [
  "var(--color-chart-1)",
  "var(--color-chart-2)",
  "var(--color-chart-3)",
  "var(--color-chart-4)",
];

function Dashboard() {
  const [range, setRange] = useState("Last 7 Days");

  return (
    <AppShell
      title="Good morning, Shanmu 👋"
      subtitle="Here's what's happening with your business."
      actions={
        <div className="flex rounded-lg border border-border bg-card p-1">
          {ranges.map((r) => (
            <button
              key={r}
              onClick={() => setRange(r)}
              className={
                "rounded-md px-3 py-1.5 text-[12.5px] transition-colors " +
                (range === r
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:text-foreground")
              }
            >
              {r}
            </button>
          ))}
        </div>
      }
    >
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-6">
        {metrics.map((m) => (
          <div
            key={m.label}
            className="rounded-xl border border-border bg-card p-5 transition-shadow hover:shadow-[var(--shadow-card)]"
          >
            <p className="text-[12.5px] text-muted-foreground">{m.label}</p>
            <p className="mt-2 font-display text-[24px] font-bold">
              <Counter
                to={m.value}
                prefix={m.prefix}
                suffix={m.suffix ?? ""}
                decimals={m.decimals ?? 0}
              />
            </p>
            <p className="mt-1 inline-flex items-center gap-1 text-[12px] font-medium text-success">
              <ArrowUpRight className="size-3.5" />
              {m.delta}
            </p>
          </div>
        ))}
      </div>

      <div className="mt-5 grid gap-5 lg:grid-cols-3">
        <Panel title="Message overview" className="lg:col-span-2">
          <ResponsiveContainer width="100%" height={260}>
            <LineChart data={messageOverview}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" vertical={false} />
              <XAxis dataKey="day" tickLine={false} axisLine={false} fontSize={12} />
              <YAxis tickLine={false} axisLine={false} fontSize={12} width={40} />
              <Tooltip
                contentStyle={{
                  borderRadius: 10,
                  border: "1px solid var(--color-border)",
                  fontSize: 12,
                }}
              />
              <Line
                type="monotone"
                dataKey="received"
                stroke="var(--color-chart-5)"
                strokeWidth={2}
                dot={false}
              />
              <Line
                type="monotone"
                dataKey="sent"
                stroke="var(--color-primary)"
                strokeWidth={2.5}
                dot={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </Panel>

        <Panel title="Conversation sources">
          <ResponsiveContainer width="100%" height={260}>
            <PieChart>
              <Pie
                data={conversationSources}
                dataKey="value"
                nameKey="name"
                innerRadius={62}
                outerRadius={95}
                paddingAngle={3}
              >
                {conversationSources.map((_, i) => (
                  <Cell key={i} fill={pieColors[i % pieColors.length]} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  borderRadius: 10,
                  border: "1px solid var(--color-border)",
                  fontSize: 12,
                }}
              />
            </PieChart>
          </ResponsiveContainer>
          <ul className="mt-3 grid grid-cols-2 gap-2">
            {conversationSources.map((s, i) => (
              <li key={s.name} className="flex items-center gap-2 text-[12.5px]">
                <span
                  className="size-2.5 rounded-full"
                  style={{ background: pieColors[i % pieColors.length] }}
                />
                {s.name}
                <span className="ml-auto text-muted-foreground">
                  {s.value.toLocaleString("en-IN")}
                </span>
              </li>
            ))}
          </ul>
        </Panel>
      </div>

      <div className="mt-5 grid gap-5 lg:grid-cols-2">
        <Panel title="Leads generated">
          <ResponsiveContainer width="100%" height={220}>
            <AreaChart data={leadsGenerated}>
              <defs>
                <linearGradient id="leadFill" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="var(--color-primary)" stopOpacity={0.35} />
                  <stop offset="100%" stopColor="var(--color-primary)" stopOpacity={0.02} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" vertical={false} />
              <XAxis dataKey="day" tickLine={false} axisLine={false} fontSize={12} />
              <YAxis tickLine={false} axisLine={false} fontSize={12} width={36} />
              <Tooltip
                contentStyle={{
                  borderRadius: 10,
                  border: "1px solid var(--color-border)",
                  fontSize: 12,
                }}
              />
              <Area
                type="monotone"
                dataKey="leads"
                stroke="var(--color-primary)"
                strokeWidth={2}
                fill="url(#leadFill)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </Panel>

        <Panel title="Revenue recovered">
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={revenueRecovered}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" vertical={false} />
              <XAxis dataKey="day" tickLine={false} axisLine={false} fontSize={12} />
              <YAxis tickLine={false} axisLine={false} fontSize={12} width={48} />
              <Tooltip
                formatter={(v: number) => currency(v)}
                contentStyle={{
                  borderRadius: 10,
                  border: "1px solid var(--color-border)",
                  fontSize: 12,
                }}
              />
              <Bar dataKey="amount" fill="var(--color-primary)" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </Panel>
      </div>

      <div className="mt-5 grid gap-5 lg:grid-cols-3">
        <Panel title="Top automations">
          <ul className="space-y-3.5">
            {topAutomations.map((a) => (
              <li key={a.name} className="group">
                <div className="flex items-center justify-between gap-3">
                  <span className="truncate text-[13.5px]">{a.name}</span>
                  <span className="shrink-0 text-[12.5px] font-medium text-primary">
                    {a.runs.toLocaleString("en-IN")}
                  </span>
                </div>
                <p className="mt-1 hidden text-[11.5px] text-muted-foreground group-hover:block">
                  {a.runs.toLocaleString("en-IN")} customers entered this automation
                  {a.revenue > 0 && ` · ${currency(a.revenue)} attributed`}
                </p>
              </li>
            ))}
          </ul>
        </Panel>

        <Panel title="Recent conversations">
          <ul className="space-y-3.5">
            {conversations.slice(0, 5).map((c) => {
              const Icon = channelIcon[c.channel];
              return (
                <li key={c.id} className="flex items-center gap-3">
                  <span className="grid size-8 shrink-0 place-items-center rounded-lg bg-primary-tint text-primary-deep">
                    <Icon className="size-4" />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="flex items-center gap-2">
                      <span className="truncate text-[13.5px] font-medium">{c.name}</span>
                      {c.automated && (
                        <span className="rounded bg-accent px-1.5 py-0.5 text-[10px] font-semibold text-accent-foreground">
                          AUTO
                        </span>
                      )}
                    </span>
                    <span className="block truncate text-[12.5px] text-muted-foreground">
                      {c.preview}
                    </span>
                  </span>
                  <span className="shrink-0 text-[11.5px] text-muted-foreground">{c.time}</span>
                </li>
              );
            })}
          </ul>
        </Panel>

        <Panel title="Automation activity">
          <ol className="space-y-4">
            {automationActivity.map((a) => (
              <li key={a.time} className="flex gap-3">
                <span className="w-11 shrink-0 text-[11.5px] text-muted-foreground">{a.time}</span>
                <span>
                  <span
                    className={
                      "mb-1 inline-flex items-center gap-1.5 rounded px-1.5 py-0.5 text-[10.5px] font-semibold uppercase " +
                      (a.state === "running"
                        ? "bg-primary-tint text-primary-deep"
                        : a.state === "waiting"
                          ? "bg-warning/15 text-warning-foreground"
                          : "bg-success/12 text-success")
                    }
                  >
                    {a.state === "running" ? "● Running" : a.state === "waiting" ? "Waiting" : "✓ Completed"}
                  </span>
                  <span className="block text-[13px] leading-snug">{a.text}</span>
                </span>
              </li>
            ))}
          </ol>
        </Panel>
      </div>
    </AppShell>
  );
}
