import { Clock, MessageCircle, Star } from "lucide-react";
import { Reveal } from "@/components/shared/Reveal";
import { Bubble, ChatHeader, PhoneFrame } from "./PhoneMock";

const timeline = [
  { time: "Order delivered", label: "12 Aug, 2:14 PM" },
  { time: "Wait 3 days", label: "Automation pauses" },
  { time: "“How was your experience?”", label: "15 Aug, 11:00 AM" },
  { time: "Review submitted", label: "15 Aug, 11:06 AM · ★★★★★" },
];

export function WhatsAppSection() {
  return (
    <section className="bg-background py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <div className="grid gap-14 lg:grid-cols-2 lg:items-center">
          <Reveal className="order-2 flex justify-center lg:order-1">
            <PhoneFrame
              header={<ChatHeader name="Rahul Sharma" handle="+91 99620 44810" channel="WhatsApp" />}
            >
              <Bubble side="in" time="9:12 AM">
                Where is my order?
              </Bubble>
              <Bubble side="out" time="9:12 AM" delay={0.5} delivered>
                Hi Rahul 👋 Your order #1042 has been shipped and is expected tomorrow.
              </Bubble>
              <Bubble side="out" time="9:12 AM" delay={0.9} delivered>
                Track it here: urbanthread.co/track/1042
              </Bubble>
              <Bubble side="in" time="9:14 AM" delay={1.3}>
                Perfect, thanks!
              </Bubble>
              <Bubble side="out" time="15 Aug, 11:00 AM" delay={1.8} delivered>
                How was your experience with the Running Shoes? ⭐
              </Bubble>
            </PhoneFrame>
          </Reveal>

          <div className="order-1 lg:order-2">
            <Reveal>
              <span className="inline-flex items-center gap-2 rounded-full border border-border bg-surface px-3 py-1.5 text-[12.5px] text-muted-foreground">
                <MessageCircle className="size-3.5 text-primary" />
                WhatsApp automation
              </span>
              <h2 className="mt-5 max-w-xl font-display text-[32px] font-bold leading-tight sm:text-[42px]">
                WhatsApp follow-ups without manual follow-ups.
              </h2>
              <p className="mt-4 max-w-lg text-[15.5px] text-muted-foreground">
                Order confirmations, shipping updates, delivery checks and review requests go out on
                schedule — with the right details filled in.
              </p>
            </Reveal>

            <ol className="mt-9 space-y-0">
              {timeline.map((t, i) => (
                <Reveal key={t.time} delay={i * 0.06}>
                  <li className="relative flex gap-4 pb-7 last:pb-0">
                    <span className="relative flex flex-col items-center">
                      <span className="grid size-8 place-items-center rounded-full border border-primary/30 bg-primary-tint text-primary-deep">
                        {i === 1 ? <Clock className="size-4" /> : i === 3 ? <Star className="size-4" /> : <MessageCircle className="size-4" />}
                      </span>
                      {i < timeline.length - 1 && (
                        <span className="absolute top-8 h-full w-px bg-border" />
                      )}
                    </span>
                    <span>
                      <p className="text-[14.5px] font-medium">{t.time}</p>
                      <p className="text-[13px] text-muted-foreground">{t.label}</p>
                    </span>
                  </li>
                </Reveal>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
}
