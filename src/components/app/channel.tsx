import { Globe, Instagram, Mail, MessageCircle, ShoppingCart } from "lucide-react";
import type { Channel } from "@/lib/mock-data";

export const channelIcon: Record<Channel, typeof Instagram> = {
  instagram: Instagram,
  whatsapp: MessageCircle,
  website: Globe,
  email: Mail,
  woocommerce: ShoppingCart,
};

export const channelLabel: Record<Channel, string> = {
  instagram: "Instagram",
  whatsapp: "WhatsApp",
  website: "Website",
  email: "Email",
  woocommerce: "WooCommerce",
};

export function ChannelBadge({ channel }: { channel: Channel }) {
  const Icon = channelIcon[channel];
  return (
    <span className="inline-flex items-center gap-1.5 rounded-md bg-surface px-2 py-1 text-[11.5px] font-medium text-muted-foreground">
      <Icon className="size-3.5" />
      {channelLabel[channel]}
    </span>
  );
}
