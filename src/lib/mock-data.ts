export type Channel = "instagram" | "whatsapp" | "website" | "email" | "woocommerce";

export type Contact = {
  id: string;
  name: string;
  email: string;
  phone: string;
  source: Channel;
  instagram?: string;
  tags: string[];
  orders: number;
  totalSpent: number;
  lastActivity: string;
  status: "Active" | "Lead" | "Customer" | "Churned";
};

export const contacts: Contact[] = [
  {
    id: "CT-1042",
    name: "Sarah Jordan",
    email: "sarah.jordan@gmail.com",
    phone: "+91 98407 21134",
    source: "instagram",
    instagram: "@sarah.jordan",
    tags: ["VIP", "Repeat"],
    orders: 6,
    totalSpent: 18450,
    lastActivity: "8 min ago",
    status: "Customer",
  },
  {
    id: "CT-1043",
    name: "Rahul Sharma",
    email: "rahul.sharma@outlook.com",
    phone: "+91 99620 44810",
    source: "whatsapp",
    instagram: "@rahul.shrma",
    tags: ["Order #1042"],
    orders: 2,
    totalSpent: 4998,
    lastActivity: "24 min ago",
    status: "Customer",
  },
  {
    id: "CT-1044",
    name: "Emily Clark",
    email: "emily.clark@gmail.com",
    phone: "+91 98860 12093",
    source: "website",
    tags: ["Abandoned cart"],
    orders: 0,
    totalSpent: 0,
    lastActivity: "1 hr ago",
    status: "Lead",
  },
  {
    id: "CT-1045",
    name: "Alex Morgan",
    email: "alex.morgan@gmail.com",
    phone: "+91 90031 55217",
    source: "instagram",
    instagram: "@alexmorgan.co",
    tags: ["Story reply"],
    orders: 1,
    totalSpent: 1299,
    lastActivity: "3 hrs ago",
    status: "Customer",
  },
  {
    id: "CT-1046",
    name: "John Mathews",
    email: "john.mathews@yahoo.com",
    phone: "+91 87540 90126",
    source: "email",
    tags: ["Newsletter"],
    orders: 0,
    totalSpent: 0,
    lastActivity: "Yesterday",
    status: "Lead",
  },
  {
    id: "CT-1047",
    name: "Divya Nair",
    email: "divya.nair@gmail.com",
    phone: "+91 98450 77321",
    source: "woocommerce",
    tags: ["Repeat", "Chennai"],
    orders: 4,
    totalSpent: 9860,
    lastActivity: "2 days ago",
    status: "Customer",
  },
  {
    id: "CT-1048",
    name: "Karthik Rao",
    email: "karthik.rao@gmail.com",
    phone: "+91 96770 11458",
    source: "instagram",
    instagram: "@karthik.rao",
    tags: ["Price enquiry"],
    orders: 0,
    totalSpent: 0,
    lastActivity: "2 days ago",
    status: "Lead",
  },
  {
    id: "CT-1049",
    name: "Priya Venkatesh",
    email: "priya.v@gmail.com",
    phone: "+91 93800 34119",
    source: "whatsapp",
    tags: ["Review pending"],
    orders: 3,
    totalSpent: 7420,
    lastActivity: "4 days ago",
    status: "Active",
  },
];

export const products = [
  { name: "Premium Cotton Formal Shirt", price: 1299, sku: "SHRT-001" },
  { name: "Everyday Running Shoes", price: 2499, sku: "SHOE-114" },
  { name: "Leather Laptop Backpack", price: 3499, sku: "BAG-220" },
  { name: "Linen Summer Dress", price: 1899, sku: "DRS-078" },
  { name: "Wireless Earbuds Pro", price: 2999, sku: "AUD-045" },
];

export type Conversation = {
  id: string;
  name: string;
  channel: Channel;
  preview: string;
  time: string;
  unread: number;
  assigned: string;
  automated: boolean;
};

export const conversations: Conversation[] = [
  {
    id: "CV-9001",
    name: "Sarah Jordan",
    channel: "instagram",
    preview: "Do you ship to Chennai?",
    time: "10:42",
    unread: 2,
    assigned: "Automation",
    automated: true,
  },
  {
    id: "CV-9002",
    name: "Rahul Sharma",
    channel: "whatsapp",
    preview: "Where is my order?",
    time: "10:18",
    unread: 0,
    assigned: "Meera K.",
    automated: false,
  },
  {
    id: "CV-9003",
    name: "Emily Clark",
    channel: "website",
    preview: "Is the linen dress in stock in M?",
    time: "09:56",
    unread: 1,
    assigned: "Automation",
    automated: true,
  },
  {
    id: "CV-9004",
    name: "Alex Morgan",
    channel: "instagram",
    preview: "Sent a story reply 🔥",
    time: "09:31",
    unread: 0,
    assigned: "Automation",
    automated: true,
  },
  {
    id: "CV-9005",
    name: "John Mathews",
    channel: "email",
    preview: "Can I get a GST invoice?",
    time: "Yesterday",
    unread: 0,
    assigned: "Arun P.",
    automated: false,
  },
  {
    id: "CV-9006",
    name: "Divya Nair",
    channel: "woocommerce",
    preview: "Order #1088 placed — ₹3,499",
    time: "Yesterday",
    unread: 0,
    assigned: "Automation",
    automated: true,
  },
];

export const messageOverview = [
  { day: "Mon", received: 820, sent: 740 },
  { day: "Tue", received: 960, sent: 905 },
  { day: "Wed", received: 1120, sent: 1042 },
  { day: "Thu", received: 1015, sent: 970 },
  { day: "Fri", received: 1340, sent: 1265 },
  { day: "Sat", received: 1580, sent: 1490 },
  { day: "Sun", received: 1210, sent: 1148 },
];

export const leadsGenerated = [
  { day: "Mon", leads: 184 },
  { day: "Tue", leads: 232 },
  { day: "Wed", leads: 301 },
  { day: "Thu", leads: 278 },
  { day: "Fri", leads: 366 },
  { day: "Sat", leads: 452 },
  { day: "Sun", leads: 332 },
];

export const revenueRecovered = [
  { day: "Mon", amount: 4200 },
  { day: "Tue", amount: 5100 },
  { day: "Wed", amount: 6800 },
  { day: "Thu", amount: 4400 },
  { day: "Fri", amount: 8900 },
  { day: "Sat", amount: 11200 },
  { day: "Sun", amount: 7600 },
];

export const conversationSources = [
  { name: "Instagram", value: 5820 },
  { name: "WhatsApp", value: 4110 },
  { name: "Website", value: 1840 },
  { name: "Email", value: 1072 },
];

export const topAutomations = [
  { name: "Comment → DM (New Collection)", runs: 3421, revenue: 42800, rate: "12.4%" },
  { name: "Abandoned Cart Recovery", runs: 1284, revenue: 38400, rate: "18.1%" },
  { name: "Order Confirmation (WhatsApp)", runs: 2140, revenue: 0, rate: "—" },
  { name: "Review Request (3 days after delivery)", runs: 986, revenue: 6200, rate: "9.8%" },
  { name: "Repeat Purchase Nudge", runs: 612, revenue: 18200, rate: "14.2%" },
];

export const automationActivity = [
  { time: "11:42", text: "Abandoned Cart Recovery sent WhatsApp reminder to Emily Clark", state: "running" },
  { time: "11:28", text: "Comment → DM replied to 14 comments on “New Collection 🔥”", state: "done" },
  { time: "11:04", text: "Order #1088 confirmation delivered to Divya Nair", state: "done" },
  { time: "10:47", text: "Lead created from Instagram comment — Karthik Rao", state: "done" },
  { time: "10:12", text: "Review Request queued for 6 delivered orders", state: "waiting" },
];

export const revenueByAutomation = [
  { label: "Abandoned Cart", amount: 38400 },
  { label: "Repeat Purchase", amount: 18200 },
  { label: "Instagram Leads", amount: 11300 },
  { label: "WhatsApp Campaigns", amount: 14500 },
  { label: "Upsells", amount: 8400 },
];

export type Lead = {
  id: string;
  name: string;
  source: Channel;
  product: string;
  value: number;
  last: string;
  owner: string;
  stage: string;
};

export const leadStages = [
  "New",
  "Contacted",
  "Qualified",
  "Interested",
  "Negotiation",
  "Converted",
  "Lost",
];

export const leads: Lead[] = [
  { id: "LD-01", name: "Karthik Rao", source: "instagram", product: "Wireless Earbuds Pro", value: 2999, last: "12 min ago", owner: "Meera K.", stage: "New" },
  { id: "LD-02", name: "Emily Clark", source: "website", product: "Linen Summer Dress", value: 1899, last: "1 hr ago", owner: "Automation", stage: "New" },
  { id: "LD-03", name: "Nikhil Menon", source: "instagram", product: "Leather Laptop Backpack", value: 3499, last: "3 hrs ago", owner: "Arun P.", stage: "Contacted" },
  { id: "LD-04", name: "Anita Desai", source: "whatsapp", product: "Premium Cotton Formal Shirt", value: 1299, last: "5 hrs ago", owner: "Meera K.", stage: "Qualified" },
  { id: "LD-05", name: "Sneha Iyer", source: "instagram", product: "Everyday Running Shoes", value: 2499, last: "Yesterday", owner: "Arun P.", stage: "Interested" },
  { id: "LD-06", name: "Vikram Singh", source: "website", product: "Leather Laptop Backpack", value: 3499, last: "Yesterday", owner: "Meera K.", stage: "Negotiation" },
  { id: "LD-07", name: "Divya Nair", source: "woocommerce", product: "Leather Laptop Backpack", value: 3499, last: "2 days ago", owner: "Automation", stage: "Converted" },
  { id: "LD-08", name: "Rohit Bansal", source: "email", product: "Wireless Earbuds Pro", value: 2999, last: "4 days ago", owner: "Arun P.", stage: "Lost" },
];

export const integrations = [
  { key: "instagram", name: "Instagram", desc: "Comments, DMs and story replies.", status: "connected", synced: "2 min ago" },
  { key: "whatsapp", name: "WhatsApp Business", desc: "Order updates and follow-ups.", status: "connected", synced: "6 min ago" },
  { key: "woocommerce", name: "WooCommerce", desc: "Products, orders and customers.", status: "connected", synced: "18 min ago" },
  { key: "website", name: "Website", desc: "Track visitors, forms and carts.", status: "connected", synced: "just now" },
  { key: "email", name: "Email", desc: "Transactional and campaign email.", status: "available", synced: "—" },
  { key: "sheets", name: "Google Sheets", desc: "Export leads and orders.", status: "available", synced: "—" },
  { key: "ga", name: "Google Analytics", desc: "Attribute conversations to traffic.", status: "available", synced: "—" },
  { key: "shopify", name: "Shopify", desc: "Store sync for Shopify merchants.", status: "planned", synced: "—" },
  { key: "stripe", name: "Stripe", desc: "Payment and subscription events.", status: "available", synced: "—" },
  { key: "razorpay", name: "Razorpay", desc: "Payment links and order events.", status: "available", synced: "—" },
];

export const automationTemplates = [
  { name: "Instagram Comment → DM", trigger: "Instagram comment matches keyword", actions: ["Send DM", "Create lead", "Add tag"], outcome: "Turn public comments into private conversations." },
  { name: "Abandoned Cart Recovery", trigger: "Cart abandoned", actions: ["Wait 30 min", "WhatsApp reminder", "Wait 12 hrs", "Send offer"], outcome: "Recover carts that would have gone cold." },
  { name: "New Order WhatsApp", trigger: "Order created", actions: ["Send WhatsApp confirmation", "Update customer"], outcome: "Fewer “where is my order?” messages." },
  { name: "Delivery Follow-up", trigger: "Order delivered", actions: ["Wait 1 day", "Send WhatsApp check-in"], outcome: "Catch delivery issues before reviews do." },
  { name: "Review Request", trigger: "Order delivered", actions: ["Wait 3 days", "Send review request"], outcome: "More reviews without manual chasing." },
  { name: "Repeat Purchase", trigger: "Order paid", actions: ["Wait 30 days", "Recommend product"], outcome: "Bring buyers back on schedule." },
  { name: "Lead Follow-up", trigger: "Lead created", actions: ["Wait 10 min", "Send DM", "Notify team"], outcome: "No lead sits untouched." },
  { name: "Instagram Lead → CRM", trigger: "Instagram DM received", actions: ["Create contact", "Add tag", "Assign owner"], outcome: "Every DM becomes a CRM record." },
  { name: "VIP Customer", trigger: "Total spend above ₹15,000", actions: ["Add VIP tag", "Notify team", "Send perk"], outcome: "Treat best customers differently." },
  { name: "Product Recommendation", trigger: "Product viewed", actions: ["Wait 2 hrs", "AI product recommendation"], outcome: "Nudge browsers toward a decision." },
  { name: "AI Customer Support", trigger: "Message received", actions: ["AI intent", "AI reply", "Handover to human"], outcome: "Answer FAQs instantly, escalate the rest." },
  { name: "Welcome Message", trigger: "Customer created", actions: ["Send welcome DM", "Add tag"], outcome: "Start every relationship the same way." },
];
