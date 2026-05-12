import {
  Building2,
  CalendarHeart,
  UtensilsCrossed,
  Music4,
  Camera,
  Speaker,
  ConciergeBell,
  Sparkles,
  Sofa,
  Flame,
  type LucideIcon,
} from "lucide-react";

export interface ServiceCategory {
  title: string;
  icon: LucideIcon;
  items: string[];
}

export const SERVICE_CATEGORIES: ServiceCategory[] = [
  {
    title: "Venue & Decoration",
    icon: Building2,
    items: [
      "Marriage Hall Booking",
      "Banquet Hall",
      "Outdoor Venue Setup",
      "Stage Decoration",
      "Floral Decoration",
      "Mandap Decoration",
      "Reception Decoration",
      "Theme Decoration",
      "LED Wall Setup",
      "Entrance Arch Design",
      "Balloon Decoration",
      "Lighting Decoration",
    ],
  },
  {
    title: "Event Planning",
    icon: CalendarHeart,
    items: [
      "Full Event Management",
      "Wedding Planning",
      "Birthday Event Planning",
      "Corporate Event Planning",
      "Anniversary Events",
      "Engagement Ceremony Planning",
      "Baby Shower Planning",
    ],
  },
  {
    title: "Catering & Food",
    icon: UtensilsCrossed,
    items: [
      "Wedding Catering",
      "Traditional Assamese Catering",
      "Multi-Cuisine Catering",
      "Live Food Counters",
      "Sweet & Dessert Counter",
      "Mocktail Bar",
      "Buffet Arrangement",
      "VIP Dining Setup",
    ],
  },
  {
    title: "Entertainment",
    icon: Music4,
    items: [
      "DJ",
      "Live Band Performance",
      "Traditional Cultural Dance",
      "Bihu Dance Performance",
      "Celebrity Guest Management",
      "Anchor / Emcee Services",
      "Folk Music Shows",
    ],
  },
  {
    title: "Photography & Media",
    icon: Camera,
    items: [
      "Wedding Photography",
      "Cinematic Videography",
      "Drone Photography",
      "Pre-Wedding Shoot",
      "Live Event Streaming",
      "LED Display Coverage",
      "Instant Photo Booth",
      "Social Media Reel Creation",
    ],
  },
  {
    title: "Sound & Technical",
    icon: Speaker,
    items: [
      "Sound System Rental",
      "Stage Sound Setup",
      "Professional Lighting",
      "LED Screens",
      "Projector Setup",
      "Live Streaming Setup",
      "Smoke & Special Effects",
      "Generator Backup",
    ],
  },
  {
    title: "Hospitality",
    icon: ConciergeBell,
    items: [
      "Guest Management",
      "RSVP Management",
      "Hotel Booking Assistance",
      "VIP Hospitality",
      "Welcome Team",
      "Security Services",
      "Parking Management",
    ],
  },
  {
    title: "Bridal & Groom",
    icon: Sparkles,
    items: [
      "Bridal Makeup",
      "Groom Styling",
      "Mehendi Artist",
      "Bridal Entry Setup",
      "Luxury Car Rental",
      "Wedding Costume Assistance",
    ],
  },
  {
    title: "Rental Services",
    icon: Sofa,
    items: [
      "Chair & Table Rental",
      "Tent House Services",
      "Sofa & Lounge Setup",
      "AC Rental",
      "Portable Washroom Rental",
      "Crockery Rental",
    ],
  },
  {
    title: "Religious & Traditional",
    icon: Flame,
    items: [
      "Priest Booking",
      "Traditional Ritual Setup",
      "Puja Arrangement",
      "Assamese Traditional Wedding Setup",
    ],
  },
];
