import { useNavigate } from "@tanstack/react-router";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { contacts } from "@/lib/mock-data";

const actions = [
  { label: "Open inbox", to: "/inbox" as const },
  { label: "Create automation", to: "/automations" as const },
  { label: "View analytics", to: "/analytics" as const },
  { label: "Connect Instagram", to: "/integrations" as const },
  { label: "Connect WhatsApp", to: "/integrations" as const },
  { label: "Create campaign", to: "/campaigns" as const },
  { label: "Open settings", to: "/settings" as const },
];

export function CommandMenu({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (v: boolean) => void;
}) {
  const navigate = useNavigate();

  const go = (to: string) => {
    onOpenChange(false);
    navigate({ to });
  };

  return (
    <CommandDialog open={open} onOpenChange={onOpenChange}>
      <CommandInput placeholder="Search customers, automations or jump to a page…" />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        <CommandGroup heading="Actions">
          {actions.map((a) => (
            <CommandItem key={a.label} onSelect={() => go(a.to)}>
              {a.label}
            </CommandItem>
          ))}
        </CommandGroup>
        <CommandGroup heading="Customers">
          {contacts.slice(0, 5).map((c) => (
            <CommandItem key={c.id} onSelect={() => go("/contacts")}>
              {c.name}
              <span className="ml-auto text-[12px] text-muted-foreground">{c.phone}</span>
            </CommandItem>
          ))}
        </CommandGroup>
      </CommandList>
    </CommandDialog>
  );
}
