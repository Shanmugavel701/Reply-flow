import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowRight, Instagram, MessageCircle, ShoppingCart } from "lucide-react";
import { Logo } from "@/components/shared/Logo";
import { brand } from "@/config/brand";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/login")({
  head: () => ({
    meta: [
      { title: "Sign in — ReplyFlow" },
      {
        name: "description",
        content: "Sign in to your ReplyFlow workspace to manage conversations and automations.",
      },
      { property: "og:title", content: "Sign in — ReplyFlow" },
      { property: "og:description", content: "Access your ReplyFlow workspace." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: LoginPage,
});

function LoginPage() {
  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const navigate = useNavigate();

  return (
    <div className="grid min-h-screen lg:grid-cols-2">
      <div className="flex flex-col justify-center px-6 py-14 sm:px-14">
        <Link to="/" className="flex items-center gap-2.5">
          <Logo />
          <span className="font-display text-[17px] font-bold">{brand.name}</span>
        </Link>

        <div className="mx-auto w-full max-w-sm py-12">
          <h1 className="font-display text-[30px] font-bold">
            {mode === "signin" ? "Welcome back" : "Create your workspace"}
          </h1>
          <p className="mt-2 text-[14px] text-muted-foreground">
            {mode === "signin"
              ? "Sign in to pick up where your automations left off."
              : "14-day free trial. No credit card required."}
          </p>

          <div className="mt-6 flex rounded-lg border border-border p-1">
            {(["signin", "signup"] as const).map((m) => (
              <button
                key={m}
                onClick={() => setMode(m)}
                className={cn(
                  "flex-1 rounded-md py-1.5 text-[13px] transition-colors",
                  mode === m ? "bg-primary text-primary-foreground" : "text-muted-foreground",
                )}
              >
                {m === "signin" ? "Sign in" : "Sign up"}
              </button>
            ))}
          </div>

          <form
            className="mt-6 space-y-4"
            onSubmit={(e) => {
              e.preventDefault();
              navigate({ to: mode === "signup" ? "/onboarding" : "/dashboard" });
            }}
          >
            {mode === "signup" && (
              <label className="block">
                <span className="text-[12.5px] text-muted-foreground">Business name</span>
                <input
                  required
                  placeholder="Urban Thread"
                  className="mt-1.5 w-full rounded-lg border border-border px-3 py-2.5 text-[14px] outline-none focus:border-primary"
                />
              </label>
            )}
            <label className="block">
              <span className="text-[12.5px] text-muted-foreground">Work email</span>
              <input
                required
                type="email"
                placeholder="you@yourstore.com"
                className="mt-1.5 w-full rounded-lg border border-border px-3 py-2.5 text-[14px] outline-none focus:border-primary"
              />
            </label>
            <label className="block">
              <span className="text-[12.5px] text-muted-foreground">Password</span>
              <input
                required
                type="password"
                placeholder="••••••••"
                className="mt-1.5 w-full rounded-lg border border-border px-3 py-2.5 text-[14px] outline-none focus:border-primary"
              />
            </label>
            <button
              type="submit"
              className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-primary py-2.5 text-[14px] font-semibold text-primary-foreground hover:bg-primary-soft"
            >
              {mode === "signin" ? "Sign in" : "Start free trial"}
              <ArrowRight className="size-4" />
            </button>
          </form>

          <p className="mt-6 text-center text-[12.5px] text-muted-foreground">
            By continuing you agree to our terms and privacy policy.
          </p>
        </div>
      </div>

      <aside className="hidden flex-col justify-center bg-primary-deep px-14 text-primary-foreground lg:flex">
        <p className="font-display text-[30px] font-bold leading-snug">
          “We replied to 4,000 Instagram comments last month. I touched none of them.”
        </p>
        <p className="mt-5 text-[14px] opacity-80">
          Nisha Menon · Founder, Urban Thread — ₹38,400 recovered in week one.
        </p>
        <ul className="mt-10 space-y-3 text-[14px] opacity-90">
          {[
            { icon: Instagram, text: "Instagram comments and DMs answered in seconds" },
            { icon: MessageCircle, text: "WhatsApp follow-ups that recover carts" },
            { icon: ShoppingCart, text: "WooCommerce orders synced both ways" },
          ].map((i) => (
            <li key={i.text} className="flex items-center gap-3">
              <i.icon className="size-4.5" />
              {i.text}
            </li>
          ))}
        </ul>
      </aside>
    </div>
  );
}
