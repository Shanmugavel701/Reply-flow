import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Funnel,
  FunnelChart,
  LabelList,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { AppShell, Panel } from "@/components/app/AppShell";
import {
  conversationSources,
  leadsGenerated,
  messageOverview,
  revenueByAutomation,
  revenueRecovered,
} from "@/lib/mock-data";
import { currency } from "@/config/brand";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/analytics")({
  head: () => ({
    meta: [
      { title: "Analytics — ReplyFlow" },
      {
        name: "description",
        content:
          "Response times, conversion funnels, revenue by automation and channel performance for your customer conversations.",
      },
      { property: "og:title", content: "Analytics — ReplyFlow" },
      {
        property: "og:description",
        content: "Understand which conversations and automations create revenue.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: AnalyticsPage,
});

const funnel = [
  { name: "Conversations", value: 12842, fill: "var(--color-chart-1)" },
  { name: "Engaged", value: 8420, fill: "var(--color-chart-2)" },
  { name: "Leads", value: 2345, fill: "var(--color-chart-3)" },
  { name: "Checkout started", value: 1180, fill: "var(--color-chart-4)" },
  { name: "Purchased", value: 1058, fill: "var(--color-chart-5)" },
];

const responseTimes = [
  { day: "Mon", human: 18, automated: 0.4 },
  { day: "Tue", human: 22, automated: 0.3 },
  { day: "Wed", human: 16, automated: 0.4 },
  { day: "Thu", human: 25, automated: 0.5 },
  { day: "Fri", human: 19, automated: 0.3 },
  { day: "Sat", human: 31, automated: 0.4 },
  { day: "Sun", human: 28, automated: 0.3 },
];

const ranges = ["7 days", "30 days", "90 days"];
const pieColors = [
  "var(--color-chart-1)",
  "var(--color-chart-2)",
  "var(--color-chart-3)",
  "var(--color-chart-4)",
];

function AnalyticsPage() {
  const [range, setRange] = useState("7 days");

  return (
    <AppShell
      title="Analytics"
      subtitle="Where conversations turn into money — and where they leak."
      actions={
        <div className="flex rounded-lg border border-border bg-card p-1">
          {ranges.map((r) => (
            <button
              key={r}
              onClick={() => setRange(r)}
              className={cn(
                "rounded-md px-3 py-1.5 text-[12.5px]",
                range === r ? "bg-primary text-primary-foreground" : "text-muted-foreground",
              )}
            >
              {r}
            </button>
          ))}
        </div>
      }
    >
      <div className="grid gap-5 lg:grid-cols-2">
        <Panel title="Conversion funnel">
          <ResponsiveContainer width="100%" height={280}>
            <FunnelChart>
              <Tooltip
                contentStyle={{
                  borderRadius: 10,
                  border: "1px solid var(--color-border)",
                  fontSize: 12,
                }}
              />
              <Funnel dataKey="value" data={funnel} isAnimationActive>
                <LabelList position="right" dataKey="name" fill="var(--color-foreground)" fontSize={12} />
              </Funnel>
            </FunnelChart>
          </ResponsiveContainer>
        </Panel>

        <Panel title="Response time (minutes)">
          <ResponsiveContainer width="100%" height={280}>
            <LineChart data={responseTimes}>
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
              <Line dataKey="human" stroke="var(--color-chart-5)" strokeWidth={2} dot={false} />
              <Line dataKey="automated" stroke="var(--color-primary)" strokeWidth={2.5} dot={false} />
            </LineChart>
          </ResponsiveContainer>
          <p className="mt-2 text-[12.5px] text-muted-foreground">
            Automated replies land in under 30 seconds, every day of the week.
          </p>
        </Panel>

        <Panel title="Revenue by automation">
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={revenueByAutomation} layout="vertical" margin={{ left: 24 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" horizontal={false} />
              <XAxis type="number" tickLine={false} axisLine={false} fontSize={12} />
              <YAxis
                type="category"
                dataKey="label"
                tickLine={false}
                axisLine={false}
                fontSize={12}
                width={120}
              />
              <Tooltip
                formatter={(v: number) => currency(v)}
                contentStyle={{
                  borderRadius: 10,
                  border: "1px solid var(--color-border)",
                  fontSize: 12,
                }}
              />
              <Bar dataKey="amount" fill="var(--color-primary)" radius={[0, 6, 6, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </Panel>

        <Panel title="Channel performance">
          <ResponsiveContainer width="100%" height={280}>
            <PieChart>
              <Pie
                data={conversationSources}
                dataKey="value"
                nameKey="name"
                outerRadius={100}
                paddingAngle={2}
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
        </Panel>

        <Panel title="Messages sent vs received">
          <ResponsiveContainer width="100%" height={240}>
            <BarChart data={messageOverview}>
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
              <Bar dataKey="received" fill="var(--color-chart-3)" radius={[5, 5, 0, 0]} />
              <Bar dataKey="sent" fill="var(--color-primary)" radius={[5, 5, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </Panel>

        <Panel title="Leads & recovered revenue">
          <ResponsiveContainer width="100%" height={240}>
            <LineChart
              data={leadsGenerated.map((l, i) => ({
                ...l,
                amount: revenueRecovered[i]?.amount ?? 0,
              }))}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" vertical={false} />
              <XAxis dataKey="day" tickLine={false} axisLine={false} fontSize={12} />
              <YAxis tickLine={false} axisLine={false} fontSize={12} width={48} />
              <Tooltip
                contentStyle={{
                  borderRadius: 10,
                  border: "1px solid var(--color-border)",
                  fontSize: 12,
                }}
              />
              <Line dataKey="leads" stroke="var(--color-chart-2)" strokeWidth={2} dot={false} />
              <Line dataKey="amount" stroke="var(--color-primary)" strokeWidth={2} dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </Panel>
      </div>
    </AppShell>
  );
}
