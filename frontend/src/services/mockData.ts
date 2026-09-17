export const USE_MOCK_DATA = import.meta.env.VITE_USE_MOCK_DATA !== "false"

export interface Customer {
  id: number
  name: string
  email: string
  avatar?: string
  status: "active" | "inactive"
  segments: string[]
  interests: string[]
  totalPurchases: number
  lifetimeValue: number
  lastActive: string
  joinDate: string
  timeline: TimelineEvent[]
}

export interface TimelineEvent {
  id: string
  type: "purchase" | "signup" | "view" | "click" | "campaign"
  title: string
  description: string
  timestamp: string
}

export interface Event {
  id: string
  name: string
  type: "pageview" | "purchase" | "signup" | "click" | "view" | "add_to_cart"
  user: string
  userEmail: string
  product?: string
  productId?: number
  timestamp: string
  properties: Record<string, string | number>
}

export interface Product {
  id: number
  name: string
  category: string
  price: number
  image?: string
  inStock: boolean
  rating: number
  sales: number
  description: string
  tags: string[]
}

export interface SegmentRule {
  id: string
  field: string
  operator: string
  value: string
}

export interface Segment {
  id: string
  name: string
  description: string
  rules: SegmentRule[]
  logic: "AND" | "OR"
  size: number
  createdAt: string
  status: "active" | "draft"
}

export interface Campaign {
  id: string
  name: string
  description: string
  status: "active" | "paused" | "draft" | "completed"
  targetSegment: string
  channel: string
  startDate: string
  endDate?: string
  impressions: number
  clicks: number
  conversions: number
  createdAt: string
}

export interface ExperimentVariant {
  id: string
  name: string
  traffic: number
  conversions: number
  visitors: number
  conversionRate: number
}

export interface Experiment {
  id: string
  name: string
  description: string
  status: "running" | "paused" | "completed"
  variants: ExperimentVariant[]
  startDate: string
  endDate?: string
  confidence?: number
  winner?: string
}

export interface DashboardStats {
  totalUsers: number
  activeUsers: number
  eventsToday: number
  conversions: number
  revenue: number
  activeCampaigns: number
  userGrowth: { date: string; value: number }[]
  recentActivity: { id: string; action: string; user: string; timestamp: string }[]
  topProducts: { name: string; sales: number; revenue: number }[]
}

export interface AnalyticsData {
  conversionFunnel: { stage: string; count: number }[]
  revenueOverTime: { date: string; revenue: number }[]
  campaignPerformance: { name: string; impressions: number; conversions: number }[]
  recommendationPerformance: { algorithm: string; clicks: number; conversions: number }[]
  topProductsByEngagement: { name: string; engagement: number }[]
}

export interface Recommendation {
  id: string
  name: string
  description: string
  algorithm: string
  enabled: boolean
  priority: number
}

export const mockCustomers: Customer[] = [
  {
    id: 1,
    name: "Alice Johnson",
    email: "alice@example.com",
    status: "active",
    segments: ["VIP Customers", "Tech Enthusiasts"],
    interests: ["electronics", "gaming", "AI"],
    totalPurchases: 42,
    lifetimeValue: 3890,
    lastActive: "2026-09-17T10:23:00Z",
    joinDate: "2024-03-15T00:00:00Z",
    timeline: [
      { id: "t1", type: "signup", title: "Account Created", description: "Joined via referral link", timestamp: "2024-03-15T00:00:00Z" },
      { id: "t2", type: "view", title: "Viewed Gaming Laptop", description: "Browsed for 15 minutes", timestamp: "2026-09-10T14:30:00Z" },
      { id: "t3", type: "purchase", title: "Purchased Gaming Laptop", description: "Order #12345", timestamp: "2026-09-11T09:15:00Z" },
      { id: "t4", type: "click", title: "Clicked AI Tools Campaign", description: "Opened promotional email", timestamp: "2026-09-17T10:23:00Z" },
    ],
  },
  {
    id: 2,
    name: "Bob Smith",
    email: "bob@example.com",
    status: "active",
    segments: ["Frequent Shoppers"],
    interests: ["fashion", "sports"],
    totalPurchases: 18,
    lifetimeValue: 1240,
    lastActive: "2026-09-16T18:45:00Z",
    joinDate: "2025-01-08T00:00:00Z",
    timeline: [
      { id: "t1", type: "signup", title: "Account Created", description: "Organic signup", timestamp: "2025-01-08T00:00:00Z" },
      { id: "t2", type: "purchase", title: "Purchased Running Shoes", description: "Order #11002", timestamp: "2026-09-16T18:45:00Z" },
    ],
  },
  {
    id: 3,
    name: "Carol Williams",
    email: "carol@example.com",
    status: "inactive",
    segments: ["VIP Customers"],
    interests: ["books", "education"],
    totalPurchases: 67,
    lifetimeValue: 5200,
    lastActive: "2026-08-20T11:00:00Z",
    joinDate: "2023-11-20T00:00:00Z",
    timeline: [
      { id: "t1", type: "signup", title: "Account Created", description: "Invited by friend", timestamp: "2023-11-20T00:00:00Z" },
      { id: "t2", type: "purchase", title: "Purchased Book Bundle", description: "Order #8901", timestamp: "2026-08-19T16:20:00Z" },
    ],
  },
  {
    id: 4,
    name: "David Brown",
    email: "david@example.com",
    status: "active",
    segments: ["Tech Enthusiasts", "New Users"],
    interests: ["electronics", "software"],
    totalPurchases: 5,
    lifetimeValue: 890,
    lastActive: "2026-09-17T08:12:00Z",
    joinDate: "2026-04-01T00:00:00Z",
    timeline: [
      { id: "t1", type: "signup", title: "Account Created", description: "Google OAuth", timestamp: "2026-04-01T00:00:00Z" },
      { id: "t2", type: "view", title: "Viewed Mechanical Keyboard", description: "Browsed for 8 minutes", timestamp: "2026-09-17T08:12:00Z" },
    ],
  },
  {
    id: 5,
    name: "Eva Martinez",
    email: "eva@example.com",
    status: "active",
    segments: ["Frequent Shoppers", "Fashion Lovers"],
    interests: ["fashion", "beauty", "home"],
    totalPurchases: 31,
    lifetimeValue: 2100,
    lastActive: "2026-09-15T20:30:00Z",
    joinDate: "2025-02-14T00:00:00Z",
    timeline: [
      { id: "t1", type: "signup", title: "Account Created", description: "Newsletter signup", timestamp: "2025-02-14T00:00:00Z" },
      { id: "t2", type: "purchase", title: "Purchased Summer Dress", description: "Order #10500", timestamp: "2026-09-15T20:30:00Z" },
    ],
  },
  {
    id: 6,
    name: "Frank Lee",
    email: "frank@example.com",
    status: "active",
    segments: ["Tech Enthusiasts"],
    interests: ["electronics", "gaming", "DIY"],
    totalPurchases: 22,
    lifetimeValue: 3400,
    lastActive: "2026-09-17T14:00:00Z",
    joinDate: "2024-08-10T00:00:00Z",
    timeline: [
      { id: "t1", type: "signup", title: "Account Created", description: "Direct signup", timestamp: "2024-08-10T00:00:00Z" },
      { id: "t2", type: "campaign", title: "Engaged with Flash Sale", description: "Clicked banner ad", timestamp: "2026-09-17T14:00:00Z" },
    ],
  },
  {
    id: 7,
    name: "Grace Kim",
    email: "grace@example.com",
    status: "inactive",
    segments: ["New Users"],
    interests: ["beauty", "wellness"],
    totalPurchases: 2,
    lifetimeValue: 180,
    lastActive: "2026-07-05T09:00:00Z",
    joinDate: "2026-06-01T00:00:00Z",
    timeline: [
      { id: "t1", type: "signup", title: "Account Created", description: "App download", timestamp: "2026-06-01T00:00:00Z" },
    ],
  },
  {
    id: 8,
    name: "Henry Wilson",
    email: "henry@example.com",
    status: "active",
    segments: ["VIP Customers", "Sports Fans"],
    interests: ["sports", "outdoors", "fitness"],
    totalPurchases: 55,
    lifetimeValue: 4800,
    lastActive: "2026-09-17T07:30:00Z",
    joinDate: "2023-09-01T00:00:00Z",
    timeline: [
      { id: "t1", type: "signup", title: "Account Created", description: "Event registration", timestamp: "2023-09-01T00:00:00Z" },
      { id: "t2", type: "purchase", title: "Purchased Fitness Tracker", description: "Order #7600", timestamp: "2026-09-17T07:30:00Z" },
    ],
  },
  {
    id: 9,
    name: "Irene Davis",
    email: "irene@example.com",
    status: "active",
    segments: ["Fashion Lovers", "Frequent Shoppers"],
    interests: ["fashion", "jewelry", "gifts"],
    totalPurchases: 28,
    lifetimeValue: 1950,
    lastActive: "2026-09-14T16:00:00Z",
    joinDate: "2025-05-20T00:00:00Z",
    timeline: [
      { id: "t1", type: "signup", title: "Account Created", description: "In-store signup", timestamp: "2025-05-20T00:00:00Z" },
      { id: "t2", type: "purchase", title: "Purchased Necklace", description: "Order #9800", timestamp: "2026-09-14T16:00:00Z" },
    ],
  },
  {
    id: 10,
    name: "Jack Taylor",
    email: "jack@example.com",
    status: "active",
    segments: ["New Users"],
    interests: ["electronics", "music"],
    totalPurchases: 3,
    lifetimeValue: 420,
    lastActive: "2026-09-12T11:20:00Z",
    joinDate: "2026-07-15T00:00:00Z",
    timeline: [
      { id: "t1", type: "signup", title: "Account Created", description: "Friend referral", timestamp: "2026-07-15T00:00:00Z" },
    ],
  },
  {
    id: 11,
    name: "Karen White",
    email: "karen@example.com",
    status: "active",
    segments: ["VIP Customers", "Home & Living"],
    interests: ["home", "gardening", "cooking"],
    totalPurchases: 39,
    lifetimeValue: 3100,
    lastActive: "2026-09-16T19:00:00Z",
    joinDate: "2024-01-10T00:00:00Z",
    timeline: [
      { id: "t1", type: "signup", title: "Account Created", description: "Catalog request", timestamp: "2024-01-10T00:00:00Z" },
      { id: "t2", type: "purchase", title: "Purchased Kitchen Set", description: "Order #9200", timestamp: "2026-09-16T19:00:00Z" },
    ],
  },
  {
    id: 12,
    name: "Leo Anderson",
    email: "leo@example.com",
    status: "active",
    segments: ["Tech Enthusiasts"],
    interests: ["electronics", "AI", "coding"],
    totalPurchases: 15,
    lifetimeValue: 2200,
    lastActive: "2026-09-17T12:00:00Z",
    joinDate: "2025-03-01T00:00:00Z",
    timeline: [
      { id: "t1", type: "signup", title: "Account Created", description: "Tech forum signup", timestamp: "2025-03-01T00:00:00Z" },
      { id: "t2", type: "click", title: "Clicked AI Newsletter", description: "Opened in-app notification", timestamp: "2026-09-17T12:00:00Z" },
    ],
  },
  {
    id: 13,
    name: "Maria Garcia",
    email: "maria@example.com",
    status: "inactive",
    segments: ["Frequent Shoppers"],
    interests: ["fashion", "travel"],
    totalPurchases: 20,
    lifetimeValue: 1400,
    lastActive: "2026-06-30T22:00:00Z",
    joinDate: "2025-07-01T00:00:00Z",
    timeline: [
      { id: "t1", type: "signup", title: "Account Created", description: "Travel promotion", timestamp: "2025-07-01T00:00:00Z" },
    ],
  },
  {
    id: 14,
    name: "Noah Thompson",
    email: "noah@example.com",
    status: "active",
    segments: ["Sports Fans", "New Users"],
    interests: ["sports", "outdoors"],
    totalPurchases: 7,
    lifetimeValue: 680,
    lastActive: "2026-09-13T15:30:00Z",
    joinDate: "2026-03-01T00:00:00Z",
    timeline: [
      { id: "t1", type: "signup", title: "Account Created", description: "Sports app signup", timestamp: "2026-03-01T00:00:00Z" },
      { id: "t2", type: "purchase", title: "Purchased Camping Tent", description: "Order #10200", timestamp: "2026-09-13T15:30:00Z" },
    ],
  },
]

export const mockEvents: Event[] = [
  { id: "e1", name: "Homepage Viewed", type: "pageview", user: "Alice Johnson", userEmail: "alice@example.com", timestamp: "2026-09-17T16:50:00Z", properties: { page: "/", device: "desktop" } },
  { id: "e2", name: "Product Clicked", type: "click", user: "Bob Smith", userEmail: "bob@example.com", product: "Running Shoes", productId: 2, timestamp: "2026-09-17T16:48:00Z", properties: { category: "sports", position: 3 } },
  { id: "e3", name: "Added to Cart", type: "add_to_cart", user: "Carol Williams", userEmail: "carol@example.com", product: "Wireless Headphones", productId: 1, timestamp: "2026-09-17T16:45:00Z", properties: { quantity: 1, price: 149 } },
  { id: "e4", name: "Purchase Completed", type: "purchase", user: "David Brown", userEmail: "david@example.com", product: "Mechanical Keyboard", productId: 5, timestamp: "2026-09-17T16:40:00Z", properties: { orderId: "ORD-7890", revenue: 89 } },
  { id: "e5", name: "User Signed Up", type: "signup", user: "Eva Martinez", userEmail: "eva@example.com", timestamp: "2026-09-17T16:35:00Z", properties: { method: "google", source: "landing" } },
  { id: "e6", name: "Campaign Clicked", type: "click", user: "Frank Lee", userEmail: "frank@example.com", product: "Gaming Monitor", productId: 3, timestamp: "2026-09-17T16:30:00Z", properties: { campaign: "flash_sale", variant: "A" } },
  { id: "e7", name: "Product Viewed", type: "view", user: "Grace Kim", userEmail: "grace@example.com", product: "Yoga Mat", productId: 8, timestamp: "2026-09-17T16:25:00Z", properties: { duration: 45 } },
  { id: "e8", name: "Homepage Viewed", type: "pageview", user: "Henry Wilson", userEmail: "henry@example.com", timestamp: "2026-09-17T16:20:00Z", properties: { page: "/", device: "mobile" } },
  { id: "e9", name: "Added to Cart", type: "add_to_cart", user: "Irene Davis", userEmail: "irene@example.com", product: "Silk Scarf", productId: 9, timestamp: "2026-09-17T16:15:00Z", properties: { quantity: 2, price: 45 } },
  { id: "e10", name: "Purchase Completed", type: "purchase", user: "Jack Taylor", userEmail: "jack@example.com", product: "Bluetooth Speaker", productId: 6, timestamp: "2026-09-17T16:10:00Z", properties: { orderId: "ORD-7885", revenue: 59 } },
  { id: "e11", name: "User Signed Up", type: "signup", user: "Karen White", userEmail: "karen@example.com", timestamp: "2026-09-17T16:05:00Z", properties: { method: "email", source: "referral" } },
  { id: "e12", name: "Product Clicked", type: "click", user: "Leo Anderson", userEmail: "leo@example.com", product: "Laptop Stand", productId: 7, timestamp: "2026-09-17T16:00:00Z", properties: { category: "electronics", position: 1 } },
  { id: "e13", name: "Product Viewed", type: "view", user: "Maria Garcia", userEmail: "maria@example.com", product: "Smart Watch", productId: 4, timestamp: "2026-09-17T15:55:00Z", properties: { duration: 120 } },
  { id: "e14", name: "Campaign Clicked", type: "click", user: "Noah Thompson", userEmail: "noah@example.com", product: "Fitness Tracker", productId: 10, timestamp: "2026-09-17T15:50:00Z", properties: { campaign: "sports_promo", variant: "B" } },
  { id: "e15", name: "Homepage Viewed", type: "pageview", user: "Alice Johnson", userEmail: "alice@example.com", timestamp: "2026-09-17T15:45:00Z", properties: { page: "/", device: "desktop" } },
  { id: "e16", name: "Added to Cart", type: "add_to_cart", user: "Bob Smith", userEmail: "bob@example.com", product: "Cotton T-Shirt", productId: 11, timestamp: "2026-09-17T15:40:00Z", properties: { quantity: 3, price: 25 } },
  { id: "e17", name: "Purchase Completed", type: "purchase", user: "Carol Williams", userEmail: "carol@example.com", product: "Coffee Table Book", productId: 12, timestamp: "2026-09-17T15:35:00Z", properties: { orderId: "ORD-7880", revenue: 35 } },
  { id: "e18", name: "Product Viewed", type: "view", user: "David Brown", userEmail: "david@example.com", product: "USB-C Hub", productId: 13, timestamp: "2026-09-17T15:30:00Z", properties: { duration: 60 } },
  { id: "e19", name: "User Signed Up", type: "signup", user: "Eva Martinez", userEmail: "eva@example.com", timestamp: "2026-09-17T15:25:00Z", properties: { method: "facebook", source: "ad" } },
  { id: "e20", name: "Campaign Clicked", type: "click", user: "Frank Lee", userEmail: "frank@example.com", product: "LED Strip Lights", productId: 14, timestamp: "2026-09-17T15:20:00Z", properties: { campaign: "home_automation", variant: "A" } },
  { id: "e21", name: "Product Clicked", type: "click", user: "Grace Kim", userEmail: "grace@example.com", product: "Face Cream", productId: 15, timestamp: "2026-09-17T15:15:00Z", properties: { category: "beauty", position: 2 } },
  { id: "e22", name: "Homepage Viewed", type: "pageview", user: "Henry Wilson", userEmail: "henry@example.com", timestamp: "2026-09-17T15:10:00Z", properties: { page: "/", device: "tablet" } },
  { id: "e23", name: "Added to Cart", type: "add_to_cart", user: "Irene Davis", userEmail: "irene@example.com", product: "Gold Earrings", productId: 9, timestamp: "2026-09-17T15:05:00Z", properties: { quantity: 1, price: 79 } },
  { id: "e24", name: "Purchase Completed", type: "purchase", user: "Jack Taylor", userEmail: "jack@example.com", product: "Phone Case", productId: 16, timestamp: "2026-09-17T15:00:00Z", properties: { orderId: "ORD-7875", revenue: 29 } },
]

export const mockProducts: Product[] = [
  { id: 1, name: "Wireless Headphones", category: "Electronics", price: 149, inStock: true, rating: 4.5, sales: 342, description: "Premium noise-cancelling wireless headphones with 30-hour battery life.", tags: ["audio", "wireless", "premium"] },
  { id: 2, name: "Running Shoes", category: "Sports", price: 129, inStock: true, rating: 4.7, sales: 521, description: "Lightweight running shoes with responsive cushioning.", tags: ["running", "sports", "comfortable"] },
  { id: 3, name: "Gaming Monitor", category: "Electronics", price: 499, inStock: true, rating: 4.8, sales: 189, description: "27-inch 4K gaming monitor with 144Hz refresh rate.", tags: ["gaming", "4k", "high-refresh"] },
  { id: 4, name: "Smart Watch", category: "Electronics", price: 299, inStock: true, rating: 4.4, sales: 410, description: "Fitness and health tracking smartwatch with GPS.", tags: ["wearable", "fitness", "smart"] },
  { id: 5, name: "Mechanical Keyboard", category: "Electronics", price: 89, inStock: true, rating: 4.6, sales: 278, description: "RGB mechanical keyboard with Cherry MX switches.", tags: ["gaming", "typing", "rgb"] },
  { id: 6, name: "Bluetooth Speaker", category: "Electronics", price: 59, inStock: true, rating: 4.3, sales: 612, description: "Portable waterproof Bluetooth speaker with rich bass.", tags: ["audio", "portable", "outdoor"] },
  { id: 7, name: "Laptop Stand", category: "Accessories", price: 45, inStock: true, rating: 4.2, sales: 445, description: "Ergonomic aluminum laptop stand for better posture.", tags: ["ergonomic", "desk", "aluminum"] },
  { id: 8, name: "Yoga Mat", category: "Sports", price: 35, inStock: true, rating: 4.6, sales: 389, description: "Non-slip yoga mat with carrying strap.", tags: ["yoga", "fitness", "eco-friendly"] },
  { id: 9, name: "Silk Scarf", category: "Fashion", price: 55, inStock: true, rating: 4.4, sales: 167, description: "100% silk scarf with hand-painted floral design.", tags: ["luxury", "accessories", "silk"] },
  { id: 10, name: "Fitness Tracker", category: "Electronics", price: 79, inStock: false, rating: 4.1, sales: 530, description: "Slim fitness tracker with heart rate monitor.", tags: ["fitness", "wearable", "budget"] },
  { id: 11, name: "Cotton T-Shirt", category: "Fashion", price: 25, inStock: true, rating: 4.0, sales: 890, description: "Soft organic cotton crew neck t-shirt.", tags: ["casual", "organic", "basics"] },
  { id: 12, name: "Coffee Table Book", category: "Books", price: 35, inStock: true, rating: 4.8, sales: 120, description: "Beautifully illustrated photography coffee table book.", tags: ["art", "photography", "gift"] },
  { id: 13, name: "USB-C Hub", category: "Electronics", price: 39, inStock: true, rating: 4.3, sales: 334, description: "7-in-1 USB-C hub with HDMI and SD card reader.", tags: ["accessories", "usb-c", "productivity"] },
  { id: 14, name: "LED Strip Lights", category: "Home", price: 22, inStock: true, rating: 4.5, sales: 720, description: "RGB LED strip lights with app control.", tags: ["lighting", "smart-home", "decor"] },
  { id: 15, name: "Face Cream", category: "Beauty", price: 48, inStock: true, rating: 4.6, sales: 290, description: "Hydrating face cream with hyaluronic acid.", tags: ["skincare", "hydration", "natural"] },
]

export const mockSegments: Segment[] = [
  {
    id: "seg-1",
    name: "VIP Customers",
    description: "High-value customers with lifetime value over $2000",
    logic: "AND",
    rules: [
      { id: "r1", field: "lifetime_value", operator: ">", value: "2000" },
      { id: "r2", field: "total_purchases", operator: ">=", value: "20" },
    ],
    size: 4,
    createdAt: "2026-01-15T00:00:00Z",
    status: "active",
  },
  {
    id: "seg-2",
    name: "Tech Enthusiasts",
    description: "Users interested in electronics and technology",
    logic: "OR",
    rules: [
      { id: "r1", field: "interests", operator: "contains", value: "electronics" },
      { id: "r2", field: "interests", operator: "contains", value: "AI" },
      { id: "r3", field: "interests", operator: "contains", value: "gaming" },
    ],
    size: 4,
    createdAt: "2026-02-01T00:00:00Z",
    status: "active",
  },
  {
    id: "seg-3",
    name: "Frequent Shoppers",
    description: "Users who have made 15 or more purchases",
    logic: "AND",
    rules: [
      { id: "r1", field: "total_purchases", operator: ">=", value: "15" },
    ],
    size: 5,
    createdAt: "2026-02-10T00:00:00Z",
    status: "active",
  },
  {
    id: "seg-4",
    name: "New Users",
    description: "Users who joined in the last 6 months",
    logic: "AND",
    rules: [
      { id: "r1", field: "join_date", operator: ">=", value: "2026-03-01" },
      { id: "r2", field: "status", operator: "==", value: "active" },
    ],
    size: 6,
    createdAt: "2026-03-01T00:00:00Z",
    status: "active",
  },
  {
    id: "seg-5",
    name: "Fashion Lovers",
    description: "Users with fashion and beauty interests",
    logic: "OR",
    rules: [
      { id: "r1", field: "interests", operator: "contains", value: "fashion" },
      { id: "r2", field: "interests", operator: "contains", value: "beauty" },
    ],
    size: 3,
    createdAt: "2026-04-05T00:00:00Z",
    status: "active",
  },
  {
    id: "seg-6",
    name: "Inactive Users",
    description: "Users who have not been active in the last 30 days",
    logic: "AND",
    rules: [
      { id: "r1", field: "last_active", operator: "<", value: "2026-08-17" },
    ],
    size: 3,
    createdAt: "2026-05-01T00:00:00Z",
    status: "draft",
  },
]

export const mockCampaigns: Campaign[] = [
  {
    id: "camp-1",
    name: "Summer Sale 2026",
    description: "Annual summer promotion across all channels",
    status: "active",
    targetSegment: "Frequent Shoppers",
    channel: "Email + Web",
    startDate: "2026-06-01T00:00:00Z",
    endDate: "2026-09-30T00:00:00Z",
    impressions: 45000,
    clicks: 3200,
    conversions: 480,
    createdAt: "2026-05-20T00:00:00Z",
  },
  {
    id: "camp-2",
    name: "Tech Week Launch",
    description: "Promote new electronics arrivals",
    status: "active",
    targetSegment: "Tech Enthusiasts",
    channel: "In-App + Email",
    startDate: "2026-09-10T00:00:00Z",
    endDate: "2026-09-24T00:00:00Z",
    impressions: 28000,
    clicks: 2100,
    conversions: 310,
    createdAt: "2026-09-05T00:00:00Z",
  },
  {
    id: "camp-3",
    name: "Welcome Series",
    description: "Onboarding campaign for new users",
    status: "active",
    targetSegment: "New Users",
    channel: "Email",
    startDate: "2026-08-01T00:00:00Z",
    impressions: 12000,
    clicks: 890,
    conversions: 210,
    createdAt: "2026-07-25T00:00:00Z",
  },
  {
    id: "camp-4",
    name: "VIP Exclusive Offers",
    description: "Exclusive deals for top-tier customers",
    status: "paused",
    targetSegment: "VIP Customers",
    channel: "Email + SMS",
    startDate: "2026-09-01T00:00:00Z",
    impressions: 5000,
    clicks: 420,
    conversions: 85,
    createdAt: "2026-08-20T00:00:00Z",
  },
  {
    id: "camp-5",
    name: "Back to School",
    description: "Student-focused promotion for notebooks and accessories",
    status: "completed",
    targetSegment: "New Users",
    channel: "Web + Social",
    startDate: "2026-08-15T00:00:00Z",
    endDate: "2026-09-05T00:00:00Z",
    impressions: 35000,
    clicks: 2800,
    conversions: 390,
    createdAt: "2026-08-10T00:00:00Z",
  },
]

export const mockExperiments: Experiment[] = [
  {
    id: "exp-1",
    name: "Homepage Hero CTA",
    description: "Testing different call-to-action buttons on the homepage hero section",
    status: "running",
    startDate: "2026-09-01T00:00:00Z",
    variants: [
      { id: "v1", name: "Control", traffic: 50, conversions: 1200, visitors: 15000, conversionRate: 8.0 },
      { id: "v2", name: "Variant A", traffic: 50, conversions: 1350, visitors: 15000, conversionRate: 9.0 },
    ],
    confidence: 85,
  },
  {
    id: "exp-2",
    name: "Product Page Layout",
    description: "Comparing grid vs list view for product catalog pages",
    status: "running",
    startDate: "2026-09-05T00:00:00Z",
    variants: [
      { id: "v1", name: "Grid View", traffic: 50, conversions: 980, visitors: 12000, conversionRate: 8.17 },
      { id: "v2", name: "List View", traffic: 50, conversions: 1050, visitors: 12000, conversionRate: 8.75 },
    ],
    confidence: 72,
  },
  {
    id: "exp-3",
    name: "Checkout Flow Simplification",
    description: "Testing one-page checkout vs multi-step checkout",
    status: "completed",
    startDate: "2026-08-01T00:00:00Z",
    endDate: "2026-08-31T00:00:00Z",
    variants: [
      { id: "v1", name: "Multi-step", traffic: 50, conversions: 1500, visitors: 20000, conversionRate: 7.5 },
      { id: "v2", name: "One-page", traffic: 50, conversions: 1680, visitors: 20000, conversionRate: 8.4 },
    ],
    confidence: 95,
    winner: "v2",
  },
  {
    id: "exp-4",
    name: "Email Subject Lines",
    description: "Testing personalized vs generic email subject lines",
    status: "paused",
    startDate: "2026-09-12T00:00:00Z",
    variants: [
      { id: "v1", name: "Personalized", traffic: 50, conversions: 320, visitors: 8000, conversionRate: 4.0 },
      { id: "v2", name: "Generic", traffic: 50, conversions: 290, visitors: 8000, conversionRate: 3.63 },
    ],
  },
]

export const mockRecommendations: Recommendation[] = [
  {
    id: "rec-1",
    name: "Homepage Recommendations",
    description: "Personalized product recommendations on the homepage",
    algorithm: "hybrid",
    enabled: true,
    priority: 1,
  },
  {
    id: "rec-2",
    name: "Product Detail Recommendations",
    description: "Similar and complementary products on product pages",
    algorithm: "content-based",
    enabled: true,
    priority: 2,
  },
  {
    id: "rec-3",
    name: "Cart Recommendations",
    description: "Frequently bought together items in cart",
    algorithm: "collaborative",
    enabled: true,
    priority: 3,
  },
  {
    id: "rec-4",
    name: "Category Page Recommendations",
    description: "Popular items within the same category",
    algorithm: "popularity",
    enabled: false,
    priority: 4,
  },
  {
    id: "rec-5",
    name: "Post-Purchase Recommendations",
    description: "Items customers may like after a purchase",
    algorithm: "contextual",
    enabled: true,
    priority: 5,
  },
  {
    id: "rec-6",
    name: "Email Recommendations",
    description: "Personalized picks for email campaigns",
    algorithm: "collaborative",
    enabled: true,
    priority: 6,
  },
  {
    id: "rec-7",
    name: "Search Recommendations",
    description: "Auto-suggest and trending searches",
    algorithm: "popularity",
    enabled: true,
    priority: 7,
  },
  {
    id: "rec-8",
    name: "Fallback Recommendations",
    description: "Default recommendations when insufficient data",
    algorithm: "popularity",
    enabled: true,
    priority: 99,
  },
]

export const mockDashboardStats: DashboardStats = {
  totalUsers: 12480,
  activeUsers: 3842,
  eventsToday: 28450,
  conversions: 1567,
  revenue: 89420,
  activeCampaigns: 3,
  userGrowth: [
    { date: "Mon", value: 320 },
    { date: "Tue", value: 380 },
    { date: "Wed", value: 350 },
    { date: "Thu", value: 420 },
    { date: "Fri", value: 460 },
    { date: "Sat", value: 510 },
    { date: "Sun", value: 480 },
  ],
  recentActivity: [
    { id: "a1", action: "New user signup", user: "Karen White", timestamp: "2026-09-17T16:05:00Z" },
    { id: "a2", action: "Purchase completed", user: "Jack Taylor", timestamp: "2026-09-17T16:10:00Z" },
    { id: "a3", action: "Campaign launched", user: "Admin", timestamp: "2026-09-17T15:00:00Z" },
    { id: "a4", action: "Segment updated", user: "Admin", timestamp: "2026-09-17T14:30:00Z" },
    { id: "a5", action: "Experiment started", user: "Admin", timestamp: "2026-09-17T14:00:00Z" },
  ],
  topProducts: [
    { name: "Wireless Headphones", sales: 342, revenue: 50958 },
    { name: "Smart Watch", sales: 410, revenue: 122590 },
    { name: "LED Strip Lights", sales: 720, revenue: 15840 },
    { name: "Fitness Tracker", sales: 530, revenue: 41870 },
    { name: "Cotton T-Shirt", sales: 890, revenue: 22250 },
  ],
}

export const mockAnalyticsData: AnalyticsData = {
  conversionFunnel: [
    { stage: "Visitors", count: 50000 },
    { stage: "Product Views", count: 32000 },
    { stage: "Add to Cart", count: 18000 },
    { stage: "Checkout", count: 9000 },
    { stage: "Purchase", count: 4500 },
  ],
  revenueOverTime: [
    { date: "Mon", revenue: 12000 },
    { date: "Tue", revenue: 15000 },
    { date: "Wed", revenue: 13500 },
    { date: "Thu", revenue: 18000 },
    { date: "Fri", revenue: 22000 },
    { date: "Sat", revenue: 25000 },
    { date: "Sun", revenue: 21000 },
  ],
  campaignPerformance: [
    { name: "Summer Sale", impressions: 45000, conversions: 480 },
    { name: "Tech Week", impressions: 28000, conversions: 310 },
    { name: "Welcome Series", impressions: 12000, conversions: 210 },
    { name: "VIP Exclusive", impressions: 5000, conversions: 85 },
    { name: "Back to School", impressions: 35000, conversions: 390 },
  ],
  recommendationPerformance: [
    { algorithm: "Collaborative Filtering", clicks: 4500, conversions: 680 },
    { algorithm: "Content-Based", clicks: 3200, conversions: 420 },
    { algorithm: "Popularity-Based", clicks: 5800, conversions: 510 },
    { algorithm: "Hybrid", clicks: 4100, conversions: 590 },
  ],
  topProductsByEngagement: [
    { name: "Wireless Headphones", engagement: 89 },
    { name: "Smart Watch", engagement: 95 },
    { name: "Gaming Monitor", engagement: 78 },
    { name: "LED Strip Lights", engagement: 72 },
    { name: "Bluetooth Speaker", engagement: 68 },
  ],
}
