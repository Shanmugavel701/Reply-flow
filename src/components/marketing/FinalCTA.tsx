import { Link } from "@tanstack/react-router";
import { Reveal } from "@/components/shared/Reveal";

export function FinalCTA() {
  return (
    <section className="bg-surface py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <Reveal>
          <div className="rounded-3xl border border-border bg-card px-7 py-14 text-center shadow-[var(--shadow-card)] sm:px-12">
            <h2 className="mx-auto max-w-2xl font-display text-[30px] font-bold leading-tight sm:text-[40px]">
              Answer every customer tonight, without being awake for it.
            </h2>
            <p className="mx-auto mt-4 max-w-lg text-[15.5px] text-muted-foreground">
              Connect Instagram and WhatsApp, switch on two templates and see what changes by
              morning.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <Link
                to="/onboarding"
                className="rounded-xl bg-primary px-6 py-3.5 text-[15px] font-semibold text-primary-foreground shadow-[var(--shadow-purple)] transition-all hover:bg-primary-soft active:scale-[0.98]"
              >
                Start Free
              </Link>
              <Link
                to="/features"
                className="rounded-xl border border-border bg-background px-6 py-3.5 text-[15px] font-medium transition-colors hover:border-primary hover:text-primary"
              >
                See How It Works
              </Link>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
