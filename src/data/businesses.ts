export interface Business {
  id: string;
  name: string;
  category: string;
  area: string;
  description: string;
  image: string;
  rating: number;
  reviewCount: number;
  phone: string;
  whatsapp: string;
  address: string;
  mapUrl: string;
  services: string[];
  isFeatured: boolean;
  views: number;
  offers?: string;
  openHours: string;
}

export interface Review {
  id: string;
  businessId: string;
  author: string;
  rating: number;
  comment: string;
  date: string;
}

export const categories = [
  { id: "restaurants", name: "Restaurants", icon: "🍽️", count: 48 },
  { id: "salons", name: "Salons & Spa", icon: "💇", count: 32 },
  { id: "medical", name: "Medical", icon: "🏥", count: 27 },
  { id: "electronics", name: "Electronics", icon: "📱", count: 19 },
  { id: "grocery", name: "Grocery", icon: "🛒", count: 41 },
  { id: "fitness", name: "Fitness", icon: "💪", count: 15 },
  { id: "education", name: "Education", icon: "📚", count: 23 },
  { id: "home-services", name: "Home Services", icon: "🔧", count: 36 },
];

export const businesses: Business[] = [
  {
    id: "1",
    name: "The Urban Kitchen",
    category: "restaurants",
    area: "Indiranagar",
    description: "Modern multi-cuisine restaurant with a rooftop setting, live music on weekends, and chef-curated seasonal menus. Perfect for date nights and celebrations.",
    image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=600&h=400&fit=crop",
    rating: 4.6,
    reviewCount: 312,
    phone: "+919876543210",
    whatsapp: "919876543210",
    address: "42, 12th Main, Indiranagar, Bangalore 560038",
    mapUrl: "https://maps.google.com",
    services: ["Dine-in", "Takeaway", "Delivery", "Catering", "Private Events"],
    isFeatured: true,
    views: 2840,
    offers: "20% off on weekday lunches",
    openHours: "11:00 AM – 11:00 PM",
  },
  {
    id: "2",
    name: "Glow Studio Salon",
    category: "salons",
    area: "Koramangala",
    description: "Premium unisex salon offering haircuts, coloring, skincare, bridal packages, and relaxing spa treatments with top-brand products.",
    image: "https://images.unsplash.com/photo-1560066984-138dadb4c035?w=600&h=400&fit=crop",
    rating: 4.8,
    reviewCount: 198,
    phone: "+919876543211",
    whatsapp: "919876543211",
    address: "15, 5th Cross, Koramangala, Bangalore 560034",
    mapUrl: "https://maps.google.com",
    services: ["Haircuts", "Coloring", "Facials", "Bridal Makeup", "Spa"],
    isFeatured: true,
    views: 3120,
    offers: "Free facial with any bridal package",
    openHours: "10:00 AM – 8:00 PM",
  },
  {
    id: "3",
    name: "HealthFirst Clinic",
    category: "medical",
    area: "HSR Layout",
    description: "Multi-specialty clinic with experienced doctors, in-house diagnostics, and a patient-first approach. Walk-ins and appointments available.",
    image: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=600&h=400&fit=crop",
    rating: 4.5,
    reviewCount: 156,
    phone: "+919876543212",
    whatsapp: "919876543212",
    address: "78, Sector 2, HSR Layout, Bangalore 560102",
    mapUrl: "https://maps.google.com",
    services: ["General Medicine", "Pediatrics", "Dermatology", "Lab Tests", "Vaccination"],
    isFeatured: false,
    views: 1890,
    openHours: "8:00 AM – 9:00 PM",
  },
  {
    id: "4",
    name: "TechZone Electronics",
    category: "electronics",
    area: "MG Road",
    description: "Your one-stop shop for smartphones, laptops, accessories, and repairs. Authorized dealer for major brands with warranty support.",
    image: "https://images.unsplash.com/photo-1531297484001-80022131f5a1?w=600&h=400&fit=crop",
    rating: 4.3,
    reviewCount: 89,
    phone: "+919876543213",
    whatsapp: "919876543213",
    address: "23, MG Road, Bangalore 560001",
    mapUrl: "https://maps.google.com",
    services: ["Smartphones", "Laptops", "Accessories", "Repairs", "Trade-in"],
    isFeatured: false,
    views: 2210,
    offers: "10% off on accessories with any phone purchase",
    openHours: "10:00 AM – 9:00 PM",
  },
  {
    id: "5",
    name: "FreshMart Superstore",
    category: "grocery",
    area: "Whitefield",
    description: "Premium grocery store with farm-fresh produce, organic selections, imported goods, and same-day home delivery across Whitefield.",
    image: "https://images.unsplash.com/photo-1542838132-92c53300491e?w=600&h=400&fit=crop",
    rating: 4.4,
    reviewCount: 267,
    phone: "+919876543214",
    whatsapp: "919876543214",
    address: "Block A, Phoenix Mall, Whitefield, Bangalore 560066",
    mapUrl: "https://maps.google.com",
    services: ["Fresh Produce", "Organic", "Imported", "Home Delivery", "Bulk Orders"],
    isFeatured: true,
    views: 4100,
    offers: "Free delivery on orders above ₹500",
    openHours: "7:00 AM – 10:00 PM",
  },
  {
    id: "6",
    name: "IronFit Gym & Studio",
    category: "fitness",
    area: "JP Nagar",
    description: "State-of-the-art gym with personal trainers, group classes, yoga studio, and a nutrition bar. Achieve your fitness goals with expert guidance.",
    image: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=600&h=400&fit=crop",
    rating: 4.7,
    reviewCount: 145,
    phone: "+919876543215",
    whatsapp: "919876543215",
    address: "56, 15th Cross, JP Nagar Phase 6, Bangalore 560078",
    mapUrl: "https://maps.google.com",
    services: ["Gym", "Personal Training", "Yoga", "Zumba", "CrossFit"],
    isFeatured: true,
    views: 2650,
    offers: "First month free with annual membership",
    openHours: "5:00 AM – 10:00 PM",
  },
  {
    id: "7",
    name: "BrightMinds Academy",
    category: "education",
    area: "BTM Layout",
    description: "Coaching center for competitive exams, coding bootcamps, and language classes. Expert faculty with proven track record.",
    image: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=600&h=400&fit=crop",
    rating: 4.6,
    reviewCount: 93,
    phone: "+919876543216",
    whatsapp: "919876543216",
    address: "12, 2nd Stage, BTM Layout, Bangalore 560076",
    mapUrl: "https://maps.google.com",
    services: ["JEE/NEET", "Coding", "IELTS", "Spoken English", "Math Tuition"],
    isFeatured: false,
    views: 1540,
    openHours: "9:00 AM – 8:00 PM",
  },
  {
    id: "8",
    name: "FixIt Home Services",
    category: "home-services",
    area: "Electronic City",
    description: "Reliable plumbing, electrical, painting, and deep cleaning services. Trained professionals with same-day service guarantee.",
    image: "https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=600&h=400&fit=crop",
    rating: 4.2,
    reviewCount: 178,
    phone: "+919876543217",
    whatsapp: "919876543217",
    address: "Electronic City Phase 1, Bangalore 560100",
    mapUrl: "https://maps.google.com",
    services: ["Plumbing", "Electrical", "Painting", "Cleaning", "AC Service"],
    isFeatured: false,
    views: 3450,
    offers: "₹200 off on first booking",
    openHours: "8:00 AM – 7:00 PM",
  },
];

export const reviews: Review[] = [
  { id: "r1", businessId: "1", author: "Priya M.", rating: 5, comment: "Amazing rooftop ambiance and the pasta was divine! Will definitely come back.", date: "2024-03-15" },
  { id: "r2", businessId: "1", author: "Rahul S.", rating: 4, comment: "Great food, slightly slow service on weekends but worth the wait.", date: "2024-03-10" },
  { id: "r3", businessId: "2", author: "Anita K.", rating: 5, comment: "Best bridal makeup I've ever had. The team was so professional!", date: "2024-03-12" },
  { id: "r4", businessId: "2", author: "Meera D.", rating: 5, comment: "Love the spa treatments. So relaxing and great products used.", date: "2024-03-08" },
  { id: "r5", businessId: "5", author: "Suresh P.", rating: 4, comment: "Great variety and the delivery is always on time. Fresh produce quality is excellent.", date: "2024-03-14" },
  { id: "r6", businessId: "6", author: "Karthik R.", rating: 5, comment: "Best gym in JP Nagar! Trainers are very knowledgeable and supportive.", date: "2024-03-11" },
];
