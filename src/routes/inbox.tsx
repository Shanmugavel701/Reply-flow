import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Bot, Paperclip, Search, Send, Sparkles, Tag, UserCheck, Zap } from "lucide-react";
import { AppShell } from "@/components/app/AppShell";
import { channelIcon, channelLabel } from "@/components/app/channel";
import { contacts, conversations, type Channel } from "@/lib/mock-data";
import { currency } from "@/config/brand";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/inbox")({
  head: () => ({
    meta: [
      { title: "Unified Inbox — ReplyFlow" },
      {
        name: "description",
        content:
          "Every Instagram, WhatsApp, website and email conversation in one thread-level inbox.",
      },
      { property: "og:title", content: "Unified Inbox — ReplyFlow" },
      {
        property: "og:description",
        content: "Handle Instagram, WhatsApp, website and email conversations in one place.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: InboxPage,
});

type Msg = { from: "them" | "us"; text: string; time: string; auto?: boolean };

const threads: Record<string, Msg[]> = {
  "CV-9001": [
    { from: "them", text: "Hi! Loved the earbuds on your last post 😍", time: "10:32" },
    {
      from: "us",
      text: "Hey Sarah! The Wireless Earbuds Pro are ₹2,999 with a 1-year warranty. Want the link?",
      time: "10:32",
      auto: true,
    },
    { from: "them", text: "Yes please. Do you ship to Chennai?", time: "10:42" },
  ],
  "CV-9002": [
    { from: "them", text: "Where is my order?", time: "10:15" },
    {
      from: "us",
      text: "Order #1084 is out for delivery and arrives today by 7 PM. Track: rflw.co/t/1084",
      time: "10:16",
      auto: true,
    },
    { from: "them", text: "Perfect, thanks!", time: "10:18" },
  ],
  "CV-9003": [
    { from: "them", text: "Is the linen dress in stock in M?", time: "09:56" },
    {
      from: "us",
      text: "Yes — Medium is in stock (7 left). Shall I hold one for you for 24 hours?",
      time: "09:56",
      auto: true,
    },
  ],
  "CV-9004": [
    { from: "them", text: "Sent a story reply 🔥", time: "09:31" },
    { from: "us", text: "Thank you! Here's 10% off your first order: WELCOME10", time: "09:31", auto: true },
  ],
  "CV-9005": [
    { from: "them", text: "Can I get a GST invoice for order #1071?", time: "Yesterday" },
    { from: "us", text: "Sure — sending it to your registered email in a moment.", time: "Yesterday" },
  ],
  "CV-9006": [
    { from: "them", text: "Order #1088 placed — ₹3,499", time: "Yesterday" },
    { from: "us", text: "Order confirmed! We'll ship it within 24 hours.", time: "Yesterday", auto: true },
  ],
};

const filters = ["All", "Unread", "Assigned", "Automated"] as const;
const channels: (Channel | "all")[] = ["all", "instagram", "whatsapp", "website", "email"];

const quickReplies = [
  "Yes, we ship pan-India in 3–5 days.",
  "Here's the product link 👉",
  "Your order is out for delivery.",
  "Use WELCOME10 for 10% off.",
];

function InboxPage() {
  const [activeId, setActiveId] = useState(conversations[0].id);
  const [filter, setFilter] = useState<(typeof filters)[number]>("All");
  const [channel, setChannel] = useState<Channel | "all">("all");
  const [query, setQuery] = useState("");
  const [draft, setDraft] = useState("");
  const [extra, setExtra] = useState<Record<string, Msg[]>>({});
  const [aiMode, setAiMode] = useState(true);

  const list = useMemo(
    () =>
      conversations.filter((c) => {
        if (channel !== "all" && c.channel !== channel) return false;
        if (filter === "Unread" && c.unread === 0) return false;
        if (filter === "Assigned" && c.assigned === "Automation") return false;
        if (filter === "Automated" && !c.automated) return false;
        if (query && !`${c.name} ${c.preview}`.toLowerCase().includes(query.toLowerCase()))
          return false;
        return true;
      }),
    [filter, channel, query],
  );

  const active = conversations.find((c) => c.id === activeId)!;
  const contact = contacts.find((c) => c.name === active.name);
  const msgs = [...(threads[active.id] ?? []), ...(extra[active.id] ?? [])];

  const send = (text: string) => {
    const value = text.trim();
    if (!value) return;
    setExtra((p) => ({
      ...p,
      [active.id]: [
        ...(p[active.id] ?? []),
        { from: "us", text: value, time: "now", auto: aiMode },
      ],
    }));
    setDraft("");
  };

  return (
    <AppShell title="Inbox" subtitle="Every conversation from every channel, in one place.">
      <div className="grid gap-4 lg:grid-cols-[300px_minmax(0,1fr)] xl:grid-cols-[300px_minmax(0,1fr)_290px]">
        {/* list */}
        <div className="flex max-h-[720px] flex-col rounded-xl border border-border bg-card">
          <div className="border-b border-border p-3">
            <div className="flex h-9 items-center gap-2 rounded-lg border border-border px-2.5">
              <Search className="size-4 text-muted-foreground" />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search conversations"
                className="w-full bg-transparent text-[13px] outline-none placeholder:text-muted-foreground"
              />
            </div>
            <div className="mt-2.5 flex gap-1">
              {filters.map((f) => (
                <button
                  key={f}
                  onClick={() => setFilter(f)}
                  className={cn(
                    "rounded-md px-2 py-1 text-[12px] transition-colors",
                    filter === f
                      ? "bg-primary-tint font-medium text-primary-deep"
                      : "text-muted-foreground hover:text-foreground",
                  )}
                >
                  {f}
                </button>
              ))}
            </div>
            <div className="mt-2 flex gap-1 overflow-x-auto">
              {channels.map((c) => (
                <button
                  key={c}
                  onClick={() => setChannel(c)}
                  className={cn(
                    "shrink-0 rounded-md border px-2 py-1 text-[11.5px] capitalize transition-colors",
                    channel === c
                      ? "border-primary text-primary"
                      : "border-border text-muted-foreground",
                  )}
                >
                  {c === "all" ? "All channels" : channelLabel[c]}
                </button>
              ))}
            </div>
          </div>

          <ul className="flex-1 overflow-y-auto">
            {list.map((c) => {
              const Icon = channelIcon[c.channel];
              return (
                <li key={c.id}>
                  <button
                    onClick={() => setActiveId(c.id)}
                    className={cn(
                      "flex w-full gap-3 border-b border-border px-3 py-3 text-left transition-colors hover:bg-surface",
                      c.id === activeId && "bg-primary-tint/60",
                    )}
                  >
                    <span className="grid size-9 shrink-0 place-items-center rounded-full bg-surface text-primary">
                      <Icon className="size-4" />
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="flex items-center justify-between gap-2">
                        <span className="truncate text-[13.5px] font-medium">{c.name}</span>
                        <span className="shrink-0 text-[11px] text-muted-foreground">{c.time}</span>
                      </span>
                      <span className="mt-0.5 flex items-center gap-2">
                        <span className="truncate text-[12.5px] text-muted-foreground">
                          {c.preview}
                        </span>
                        {c.unread > 0 && (
                          <span className="ml-auto grid size-4.5 shrink-0 place-items-center rounded-full bg-primary text-[10px] font-semibold text-primary-foreground">
                            {c.unread}
                          </span>
                        )}
                      </span>
                    </span>
                  </button>
                </li>
              );
            })}
            {list.length === 0 && (
              <li className="p-6 text-center text-[13px] text-muted-foreground">
                No conversations match these filters.
              </li>
            )}
          </ul>
        </div>

        {/* thread */}
        <div className="flex max-h-[720px] flex-col rounded-xl border border-border bg-card">
          <div className="flex flex-wrap items-center gap-3 border-b border-border p-4">
            <span className="grid size-10 place-items-center rounded-full bg-primary-tint text-[13px] font-semibold text-primary-deep">
              {active.name
                .split(" ")
                .map((n) => n[0])
                .join("")}
            </span>
            <div>
              <p className="text-[14.5px] font-semibold">{active.name}</p>
              <p className="text-[12px] text-muted-foreground">
                {channelLabel[active.channel]} · Assigned to {active.assigned}
              </p>
            </div>
            <div className="ml-auto flex gap-2">
              <button
                onClick={() => setAiMode((v) => !v)}
                className={cn(
                  "inline-flex items-center gap-1.5 rounded-lg border px-2.5 py-1.5 text-[12.5px] transition-colors",
                  aiMode ? "border-primary bg-primary-tint text-primary-deep" : "border-border",
                )}
              >
                <Bot className="size-4" />
                AI replies {aiMode ? "on" : "off"}
              </button>
              <button className="inline-flex items-center gap-1.5 rounded-lg border border-border px-2.5 py-1.5 text-[12.5px]">
                <UserCheck className="size-4" />
                Assign
              </button>
            </div>
          </div>

          <div className="flex-1 space-y-3 overflow-y-auto bg-surface p-5">
            {msgs.map((m, i) => (
              <div
                key={i}
                className={cn("flex", m.from === "us" ? "justify-end" : "justify-start")}
              >
                <div
                  className={cn(
                    "max-w-[78%] rounded-2xl px-3.5 py-2.5 text-[13.5px] leading-relaxed",
                    m.from === "us"
                      ? "rounded-br-md bg-primary text-primary-foreground"
                      : "rounded-bl-md border border-border bg-card",
                  )}
                >
                  {m.text}
                  <span
                    className={cn(
                      "mt-1 block text-[10.5px]",
                      m.from === "us" ? "text-primary-foreground/70" : "text-muted-foreground",
                    )}
                  >
                    {m.time}
                    {m.auto && " · sent by automation"}
                  </span>
                </div>
              </div>
            ))}
          </div>

          <div className="border-t border-border p-3">
            <div className="mb-2 flex flex-wrap gap-1.5">
              {quickReplies.map((q) => (
                <button
                  key={q}
                  onClick={() => setDraft(q)}
                  className="rounded-full border border-border px-2.5 py-1 text-[11.5px] text-muted-foreground transition-colors hover:border-primary hover:text-primary"
                >
                  {q}
                </button>
              ))}
            </div>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                send(draft);
              }}
              className="flex items-center gap-2 rounded-xl border border-border px-3 py-2"
            >
              <Paperclip className="size-4 text-muted-foreground" />
              <input
                value={draft}
                onChange={(e) => setDraft(e.target.value)}
                placeholder={`Reply to ${active.name} on ${channelLabel[active.channel]}…`}
                className="min-w-0 flex-1 bg-transparent text-[13.5px] outline-none placeholder:text-muted-foreground"
              />
              <button
                type="submit"
                className="inline-flex items-center gap-1.5 rounded-lg bg-primary px-3 py-1.5 text-[12.5px] font-medium text-primary-foreground transition-colors hover:bg-primary-soft"
              >
                <Send className="size-3.5" />
                Send
              </button>
            </form>
          </div>
        </div>

        {/* context */}
        <div className="hidden max-h-[720px] flex-col gap-4 overflow-y-auto rounded-xl border border-border bg-card p-5 xl:flex">
          <div>
            <p className="text-[14px] font-semibold">Customer</p>
            <p className="mt-2 text-[13.5px]">{active.name}</p>
            <p className="text-[12.5px] text-muted-foreground">{contact?.email ?? "—"}</p>
            <p className="text-[12.5px] text-muted-foreground">{contact?.phone ?? "—"}</p>
          </div>
          <div className="flex flex-wrap gap-1.5">
            {(contact?.tags ?? ["New"]).map((t) => (
              <span
                key={t}
                className="inline-flex items-center gap-1 rounded-md bg-primary-tint px-2 py-0.5 text-[11.5px] font-medium text-primary-deep"
              >
                <Tag className="size-3" />
                {t}
              </span>
            ))}
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div className="rounded-lg border border-border p-3">
              <p className="text-[11.5px] text-muted-foreground">Orders</p>
              <p className="mt-1 font-display text-[18px] font-bold">{contact?.orders ?? 0}</p>
            </div>
            <div className="rounded-lg border border-border p-3">
              <p className="text-[11.5px] text-muted-foreground">Lifetime value</p>
              <p className="mt-1 font-display text-[18px] font-bold">
                {currency(contact?.totalSpent ?? 0)}
              </p>
            </div>
          </div>
          <div className="rounded-lg border border-border p-3">
            <p className="inline-flex items-center gap-1.5 text-[13px] font-semibold">
              <Sparkles className="size-4 text-primary" />
              AI suggestion
            </p>
            <p className="mt-2 text-[12.5px] leading-relaxed text-muted-foreground">
              Offer free shipping — this customer has bought {contact?.orders ?? 1} times and
              responds fastest within 10 minutes.
            </p>
            <button
              onClick={() => setDraft("Good news — shipping is on us for this order 🎁")}
              className="mt-3 w-full rounded-lg bg-primary px-3 py-2 text-[12.5px] font-medium text-primary-foreground"
            >
              Use suggestion
            </button>
          </div>
          <div className="rounded-lg border border-border p-3">
            <p className="inline-flex items-center gap-1.5 text-[13px] font-semibold">
              <Zap className="size-4 text-primary" />
              Active automations
            </p>
            <ul className="mt-2 space-y-1.5 text-[12.5px] text-muted-foreground">
              <li>Instagram Comment → DM</li>
              <li>Abandoned Cart Recovery</li>
              <li>Review Request (scheduled)</li>
            </ul>
          </div>
        </div>
      </div>
    </AppShell>
  );
}
