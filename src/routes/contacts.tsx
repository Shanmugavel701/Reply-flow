import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Download, Filter, Plus, Search, X } from "lucide-react";
import { AppShell } from "@/components/app/AppShell";
import { ChannelBadge } from "@/components/app/channel";
import { contacts, type Contact } from "@/lib/mock-data";
import { currency } from "@/config/brand";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/contacts")({
  head: () => ({
    meta: [
      { title: "Contacts CRM — ReplyFlow" },
      {
        name: "description",
        content:
          "A CRM built from conversations: tags, order history, lifetime value and channel source for every customer.",
      },
      { property: "og:title", content: "Contacts CRM — ReplyFlow" },
      {
        property: "og:description",
        content: "Every customer, tagged and enriched from real conversations.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ContactsPage,
});

const statuses = ["All", "Customer", "Lead", "Active", "Churned"] as const;

function ContactsPage() {
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState<(typeof statuses)[number]>("All");
  const [selected, setSelected] = useState<Contact | null>(null);
  const [page, setPage] = useState(0);
  const perPage = 8;

  const filtered = useMemo(
    () =>
      contacts.filter((c) => {
        if (status !== "All" && c.status !== status) return false;
        if (
          query &&
          !`${c.name} ${c.email} ${c.phone} ${c.tags.join(" ")}`
            .toLowerCase()
            .includes(query.toLowerCase())
        )
          return false;
        return true;
      }),
    [query, status],
  );

  const pages = Math.max(1, Math.ceil(filtered.length / perPage));
  const current = Math.min(page, pages - 1);
  const rows = filtered.slice(current * perPage, current * perPage + perPage);

  return (
    <AppShell
      title="Contacts"
      subtitle={`${contacts.length} people who have talked to your business.`}
      actions={
        <>
          <button className="inline-flex items-center gap-1.5 rounded-lg border border-border bg-card px-3 py-2 text-[13px]">
            <Download className="size-4" /> Export CSV
          </button>
          <button className="inline-flex items-center gap-1.5 rounded-lg bg-primary px-3 py-2 text-[13px] font-medium text-primary-foreground hover:bg-primary-soft">
            <Plus className="size-4" /> Add contact
          </button>
        </>
      }
    >
      <div className="rounded-xl border border-border bg-card">
        <div className="flex flex-wrap items-center gap-3 border-b border-border p-4">
          <div className="flex h-9 min-w-[220px] flex-1 items-center gap-2 rounded-lg border border-border px-2.5">
            <Search className="size-4 text-muted-foreground" />
            <input
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                setPage(0);
              }}
              placeholder="Search name, email, phone or tag"
              className="w-full bg-transparent text-[13px] outline-none"
            />
          </div>
          <div className="flex items-center gap-1">
            <Filter className="mr-1 size-4 text-muted-foreground" />
            {statuses.map((s) => (
              <button
                key={s}
                onClick={() => {
                  setStatus(s);
                  setPage(0);
                }}
                className={cn(
                  "rounded-md px-2.5 py-1.5 text-[12.5px] transition-colors",
                  status === s
                    ? "bg-primary-tint font-medium text-primary-deep"
                    : "text-muted-foreground hover:text-foreground",
                )}
              >
                {s}
              </button>
            ))}
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[880px] text-left">
            <thead>
              <tr className="border-b border-border text-[11.5px] uppercase tracking-wide text-muted-foreground">
                <th className="px-4 py-3 font-medium">Name</th>
                <th className="px-4 py-3 font-medium">Contact</th>
                <th className="px-4 py-3 font-medium">Source</th>
                <th className="px-4 py-3 font-medium">Tags</th>
                <th className="px-4 py-3 font-medium">Orders</th>
                <th className="px-4 py-3 font-medium">Spent</th>
                <th className="px-4 py-3 font-medium">Last activity</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((c) => (
                <tr
                  key={c.id}
                  onClick={() => setSelected(c)}
                  className="cursor-pointer border-b border-border transition-colors last:border-0 hover:bg-surface"
                >
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2.5">
                      <span className="grid size-8 place-items-center rounded-full bg-primary-tint text-[11.5px] font-semibold text-primary-deep">
                        {c.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </span>
                      <div>
                        <p className="text-[13.5px] font-medium">{c.name}</p>
                        <p className="text-[11.5px] text-muted-foreground">{c.status}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-[12.5px] text-muted-foreground">
                    <p>{c.email}</p>
                    <p>{c.phone}</p>
                  </td>
                  <td className="px-4 py-3">
                    <ChannelBadge channel={c.source} />
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex flex-wrap gap-1">
                      {c.tags.map((t) => (
                        <span
                          key={t}
                          className="rounded bg-surface px-1.5 py-0.5 text-[11px] text-muted-foreground"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td className="px-4 py-3 text-[13px]">{c.orders}</td>
                  <td className="px-4 py-3 text-[13px] font-medium">{currency(c.totalSpent)}</td>
                  <td className="px-4 py-3 text-[12.5px] text-muted-foreground">
                    {c.lastActivity}
                  </td>
                </tr>
              ))}
              {rows.length === 0 && (
                <tr>
                  <td colSpan={7} className="px-4 py-10 text-center text-[13px] text-muted-foreground">
                    No contacts match your filters.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="flex items-center justify-between border-t border-border px-4 py-3 text-[12.5px] text-muted-foreground">
          <span>
            Showing {rows.length} of {filtered.length}
          </span>
          <div className="flex gap-2">
            <button
              onClick={() => setPage((p) => Math.max(0, p - 1))}
              disabled={current === 0}
              className="rounded-md border border-border px-2.5 py-1 disabled:opacity-40"
            >
              Previous
            </button>
            <button
              onClick={() => setPage((p) => Math.min(pages - 1, p + 1))}
              disabled={current >= pages - 1}
              className="rounded-md border border-border px-2.5 py-1 disabled:opacity-40"
            >
              Next
            </button>
          </div>
        </div>
      </div>

      {selected && (
        <div className="fixed inset-0 z-50 flex justify-end bg-foreground/25">
          <div className="h-full w-full max-w-md overflow-y-auto border-l border-border bg-card p-6">
            <div className="flex items-start justify-between">
              <div>
                <p className="font-display text-[20px] font-bold">{selected.name}</p>
                <p className="text-[13px] text-muted-foreground">{selected.status} · {selected.id}</p>
              </div>
              <button
                onClick={() => setSelected(null)}
                aria-label="Close"
                className="rounded-md p-1.5 text-muted-foreground hover:text-foreground"
              >
                <X className="size-4.5" />
              </button>
            </div>

            <div className="mt-5 grid grid-cols-2 gap-3">
              <div className="rounded-lg border border-border p-3">
                <p className="text-[11.5px] text-muted-foreground">Orders</p>
                <p className="mt-1 font-display text-[20px] font-bold">{selected.orders}</p>
              </div>
              <div className="rounded-lg border border-border p-3">
                <p className="text-[11.5px] text-muted-foreground">Lifetime value</p>
                <p className="mt-1 font-display text-[20px] font-bold">
                  {currency(selected.totalSpent)}
                </p>
              </div>
            </div>

            <dl className="mt-5 space-y-3 text-[13px]">
              <div className="flex justify-between gap-4">
                <dt className="text-muted-foreground">Email</dt>
                <dd>{selected.email}</dd>
              </div>
              <div className="flex justify-between gap-4">
                <dt className="text-muted-foreground">Phone</dt>
                <dd>{selected.phone}</dd>
              </div>
              <div className="flex justify-between gap-4">
                <dt className="text-muted-foreground">Instagram</dt>
                <dd>{selected.instagram ?? "—"}</dd>
              </div>
              <div className="flex justify-between gap-4">
                <dt className="text-muted-foreground">Source</dt>
                <dd>
                  <ChannelBadge channel={selected.source} />
                </dd>
              </div>
              <div className="flex justify-between gap-4">
                <dt className="text-muted-foreground">Last activity</dt>
                <dd>{selected.lastActivity}</dd>
              </div>
            </dl>

            <p className="mt-6 text-[13px] font-semibold">Timeline</p>
            <ol className="mt-3 space-y-3 border-l border-border pl-4 text-[12.5px] text-muted-foreground">
              <li>Replied to Instagram DM — {selected.lastActivity}</li>
              <li>Entered automation “Abandoned Cart Recovery”</li>
              <li>Placed order via WooCommerce</li>
              <li>Created from Instagram comment keyword “price”</li>
            </ol>
          </div>
        </div>
      )}
    </AppShell>
  );
}
