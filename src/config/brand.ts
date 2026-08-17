/**
 * Single source of truth for product naming.
 * Rename the product here and it updates everywhere.
 */
export const brand = {
  name: "ReplyFlow",
  tagline: "Turn conversations into customers.",
  headline: "Your business keeps selling while you sleep.",
  description:
    "Automatically reply to Instagram comments, DMs and WhatsApp conversations, follow up with leads, recover abandoned carts and turn conversations into sales.",
  supportEmail: "hello@replyflow.app",
  domain: "replyflow.app",
} as const;

export const currency = (value: number) =>
  "₹" + value.toLocaleString("en-IN", { maximumFractionDigits: 0 });
