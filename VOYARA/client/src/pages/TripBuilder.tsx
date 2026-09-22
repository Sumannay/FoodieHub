import {
  AlertTriangle,
  ArrowLeft,
  ArrowRight,
  CalendarDays,
  Check,
  Hotel,
  MapPin,
  Minus,
  Plus,
  Sparkles,
  Users,
} from "lucide-react";
import { useMemo, useState, type ReactNode } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { useVoyara } from "../context/VoyaraContext";
import { getNights, getOccupancy } from "../lib/roomOccupancy";

type Step = 1 | 2 | 3 | 4 | 5 | 6;

type Place = {
  id: string;
  name: string;
  description: string;
  image: string;
};

type Stay = {
  id: string;
  name: string;
  type: string;
  location: string;
  price: number;
  rating: number;
  image: string;
};

type DestinationData = {
  name: string;
  country: string;
  places: Place[];
  stays: Stay[];
};

const destinationData: Record<string, DestinationData> = {
  manali: {
    name: "Manali",
    country: "India",
    places: [
      {
        id: "solang-valley",
        name: "Solang Valley",
        description:
          "Snow mountains, adventure activities and beautiful Himalayan valleys.",
        image:
          "https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=900&q=80",
      },
      {
        id: "rohtang-pass",
        name: "Rohtang Pass",
        description:
          "High-altitude mountain landscapes and spectacular snow-covered views.",
        image:
          "https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=900&q=80",
      },
      {
        id: "hidimba-temple",
        name: "Hidimba Temple",
        description:
          "A historic wooden temple surrounded by peaceful cedar forests.",
        image:
          "https://images.unsplash.com/photo-1605640840605-14ac1855827b?auto=format&fit=crop&w=900&q=80",
      },
      {
        id: "old-manali",
        name: "Old Manali",
        description:
          "Cafes, local markets, riverside walks and mountain culture.",
        image:
          "https://images.unsplash.com/photo-1597074866923-dc0589150358?auto=format&fit=crop&w=900&q=80",
      },
    ],
    stays: [
      {
        id: "mountain-view-resort",
        name: "Mountain View Resort",
        type: "Resort",
        location: "Manali, Himachal Pradesh",
        price: 4500,
        rating: 4.8,
        image:
          "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1000&q=80",
      },
      {
        id: "pine-forest-villa",
        name: "Pine Forest Villa",
        type: "Villa",
        location: "Old Manali",
        price: 6200,
        rating: 4.9,
        image:
          "https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=1000&q=80",
      },
      {
        id: "riverfront-stay",
        name: "Riverfront Stay",
        type: "Hotel",
        location: "Manali Riverside",
        price: 3800,
        rating: 4.7,
        image:
          "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?auto=format&fit=crop&w=1000&q=80",
      },
    ],
  },

  puri: {
    name: "Puri",
    country: "India",
    places: [
      { id: "jagannath-temple", name: "Shree Jagannath Temple", description: "Puri's central pilgrimage landmark; please follow entry rules.", image: "https://upload.wikimedia.org/wikipedia/commons/9/90/Bird_view_of_Jagannath_Temple%2C_Puri.jpg" },
      { id: "puri-beach", name: "Puri Beach", description: "Bay of Bengal beach walks, sunrise and evening markets.", image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=900&q=80" },
      { id: "raghurajpur", name: "Raghurajpur Heritage Village", description: "Pattachitra craft, palm-leaf art and traditional culture.", image: "https://images.unsplash.com/photo-1500534623283-312aade485b7?auto=format&fit=crop&w=900&q=80" },
      { id: "konark-day-trip", name: "Konark Sun Temple", description: "A UNESCO World Heritage monument about a day trip from Puri.", image: "https://upload.wikimedia.org/wikipedia/commons/6/6e/Sun_Temple_at_Konark.jpg" },
    ],
    stays: [
      { id: "puri-sea-resort", name: "Puri Sea Breeze Resort", type: "Resort", location: "Puri, Odisha", price: 3900, rating: 4.6, image: "https://images.unsplash.com/photo-1540541338287-41700207dee6?auto=format&fit=crop&w=1000&q=80" },
      { id: "puri-heritage-stay", name: "Puri Heritage Stay", type: "Hotel", location: "Puri, Odisha", price: 2900, rating: 4.4, image: "https://images.unsplash.com/photo-1564501049412-61c2a3083791?auto=format&fit=crop&w=1000&q=80" },
    ],
  },

  konark: {
    name: "Konark",
    country: "India",
    places: [
      { id: "konark-sun-temple", name: "Konark Sun Temple", description: "The 13th-century stone chariot of Surya and a UNESCO World Heritage Site.", image: "https://upload.wikimedia.org/wikipedia/commons/6/6e/Sun_Temple_at_Konark.jpg" },
      { id: "konark-north-view", name: "Sun Temple Carvings", description: "Take time to see the carved wheels and detailed Kalinga architecture.", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9b/Konark_Sun_Temple_-_North_Side_View.jpg/1920px-Konark_Sun_Temple_-_North_Side_View.jpg" },
      { id: "chandrabhaga-beach", name: "Chandrabhaga Beach", description: "A calm coastal stop near the temple complex.", image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=900&q=80" },
    ],
    stays: [
      { id: "konark-dune-resort", name: "Konark Dune Resort", type: "Resort", location: "Konark, Odisha", price: 3600, rating: 4.5, image: "https://images.unsplash.com/photo-1540541338287-41700207dee6?auto=format&fit=crop&w=1000&q=80" },
      { id: "konark-courtyard", name: "Konark Courtyard Hotel", type: "Hotel", location: "Konark, Odisha", price: 2800, rating: 4.3, image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1000&q=80" },
    ],
  },

  bhubaneswar: {
    name: "Bhubaneswar",
    country: "India",
    places: [
      { id: "lingaraj-temple", name: "Lingaraj Temple", description: "An 11th-century Kalinga-style temple; access rules apply.", image: "https://upload.wikimedia.org/wikipedia/commons/4/4d/Lingaraj_temple_Bhubaneswar.jpg" },
      { id: "nandankanan", name: "Nandankanan Zoological Park", description: "A zoo and botanical park beside Kanjia Lake.", image: "https://upload.wikimedia.org/wikipedia/commons/0/02/Nandankanan%2C_Bhubaneswar%2C_Odisha.jpg" },
      { id: "udayagiri-khandagiri", name: "Udayagiri & Khandagiri Caves", description: "Ancient rock-cut caves with city-edge viewpoints.", image: "https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=900&q=80" },
    ],
    stays: [
      { id: "bhubaneswar-court", name: "Bhubaneswar Court Hotel", type: "Hotel", location: "Bhubaneswar, Odisha", price: 3200, rating: 4.5, image: "https://images.unsplash.com/photo-1564501049412-61c2a3083791?auto=format&fit=crop&w=1000&q=80" },
      { id: "temple-city-residency", name: "Temple City Residency", type: "Hotel", location: "Bhubaneswar, Odisha", price: 2950, rating: 4.4, image: "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?auto=format&fit=crop&w=1000&q=80" },
    ],
  },

  bali: {
    name: "Bali",
    country: "Indonesia",
    places: [
      {
        id: "ubud",
        name: "Ubud",
        description:
          "Discover rice terraces, art villages, temples and peaceful tropical landscapes.",
        image:
          "https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=900&q=80",
      },
      {
        id: "seminyak",
        name: "Seminyak Beach",
        description:
          "Relax on beautiful beaches, enjoy sunsets and explore Bali's vibrant coast.",
        image:
          "https://images.unsplash.com/photo-1539367628448-4bc5c9d171c8?auto=format&fit=crop&w=900&q=80",
      },
      {
        id: "tanah-lot",
        name: "Tanah Lot",
        description:
          "Visit one of Bali's most famous sea temples surrounded by ocean views.",
        image:
          "https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=900&q=80",
      },
      {
        id: "nusa-penida",
        name: "Nusa Penida",
        description:
          "Explore dramatic cliffs, turquoise water and tropical island scenery.",
        image:
          "https://images.unsplash.com/photo-1516690561799-46d8f74f9abf?auto=format&fit=crop&w=900&q=80",
      },
    ],
    stays: [
      {
        id: "bali-paradise-resort",
        name: "Bali Paradise Resort",
        type: "Resort",
        location: "Ubud, Bali",
        price: 7800,
        rating: 4.8,
        image:
          "https://images.unsplash.com/photo-1539367628448-4bc5c9d171c8?auto=format&fit=crop&w=1000&q=80",
      },
      {
        id: "bali-tropical-villa",
        name: "Tropical Garden Villa",
        type: "Villa",
        location: "Seminyak, Bali",
        price: 9200,
        rating: 4.9,
        image:
          "https://images.unsplash.com/photo-1582610116397-edb318620f90?auto=format&fit=crop&w=1000&q=80",
      },
      {
        id: "bali-ocean-hotel",
        name: "Ocean Breeze Hotel",
        type: "Hotel",
        location: "Kuta, Bali",
        price: 5600,
        rating: 4.7,
        image:
          "https://images.unsplash.com/photo-1540541338287-41700207dee6?auto=format&fit=crop&w=1000&q=80",
      },
    ],
  },

  "swiss-alps": {
    name: "Swiss Alps",
    country: "Switzerland",
    places: [
      {
        id: "zermatt",
        name: "Zermatt",
        description:
          "A beautiful alpine village with spectacular views of the Matterhorn.",
        image:
          "https://images.unsplash.com/photo-1531366936337-7c912a4589a7?auto=format&fit=crop&w=900&q=80",
      },
      {
        id: "jungfrau",
        name: "Jungfrau",
        description:
          "Experience dramatic peaks, glaciers and breathtaking alpine scenery.",
        image:
          "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=900&q=80",
      },
      {
        id: "interlaken",
        name: "Interlaken",
        description:
          "A scenic adventure destination surrounded by lakes and mountains.",
        image:
          "https://images.unsplash.com/photo-1527668752968-14dc70a27c95?auto=format&fit=crop&w=900&q=80",
      },
      {
        id: "lucerne",
        name: "Lucerne",
        description:
          "Explore a charming lakeside city with historic streets and mountain views.",
        image:
          "https://images.unsplash.com/photo-1533104816931-20fa691ff6ca?auto=format&fit=crop&w=900&q=80",
      },
    ],
    stays: [
      {
        id: "alpine-grand-resort",
        name: "Alpine Grand Resort",
        type: "Resort",
        location: "Zermatt, Switzerland",
        price: 22000,
        rating: 4.9,
        image:
          "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=1000&q=80",
      },
      {
        id: "mountain-chalet",
        name: "Mountain View Chalet",
        type: "Villa",
        location: "Interlaken, Switzerland",
        price: 28000,
        rating: 4.8,
        image:
          "https://images.unsplash.com/photo-1510798831971-661eb04b3739?auto=format&fit=crop&w=1000&q=80",
      },
      {
        id: "lucerne-lake-hotel",
        name: "Lake Lucerne Hotel",
        type: "Hotel",
        location: "Lucerne, Switzerland",
        price: 18000,
        rating: 4.7,
        image:
          "https://images.unsplash.com/photo-1564501049412-61c2a3083791?auto=format&fit=crop&w=1000&q=80",
      },
    ],
  },

  jaipur: {
    name: "Jaipur",
    country: "India",
    places: [
      {
        id: "amber-fort",
        name: "Amber Fort",
        description:
          "Explore one of Rajasthan's most impressive historic forts and palaces.",
        image:
          "https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=900&q=80",
      },
      {
        id: "hawa-mahal",
        name: "Hawa Mahal",
        description:
          "Visit Jaipur's iconic Palace of Winds in the heart of the Pink City.",
        image:
          "https://images.unsplash.com/photo-1603262110263-fb0112e7cc33?auto=format&fit=crop&w=900&q=80",
      },
      {
        id: "city-palace",
        name: "City Palace",
        description:
          "Discover royal architecture, courtyards, museums and Rajasthani history.",
        image:
          "https://images.unsplash.com/photo-1599661046827-dacff0c2f1a1?auto=format&fit=crop&w=900&q=80",
      },
      {
        id: "nahargarh-fort",
        name: "Nahargarh Fort",
        description:
          "Enjoy panoramic views of Jaipur from this historic hilltop fort.",
        image:
          "https://images.unsplash.com/photo-1477587458883-47145ed94245?auto=format&fit=crop&w=900&q=80",
      },
    ],
    stays: [
      {
        id: "jaipur-royal-palace",
        name: "Jaipur Royal Palace",
        type: "Heritage",
        location: "Jaipur, Rajasthan",
        price: 5200,
        rating: 4.7,
        image:
          "https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=1000&q=80",
      },
      {
        id: "pink-city-villa",
        name: "Pink City Villa",
        type: "Villa",
        location: "Jaipur, Rajasthan",
        price: 6800,
        rating: 4.8,
        image:
          "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1000&q=80",
      },
      {
        id: "royal-jaipur-hotel",
        name: "Royal Jaipur Hotel",
        type: "Hotel",
        location: "Central Jaipur",
        price: 4200,
        rating: 4.6,
        image:
          "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1000&q=80",
      },
    ],
  },

  santorini: {
    name: "Santorini",
    country: "Greece",
    places: [
      {
        id: "oia",
        name: "Oia",
        description:
          "Experience Santorini's famous white buildings and spectacular sunsets.",
        image:
          "https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?auto=format&fit=crop&w=900&q=80",
      },
      {
        id: "fira",
        name: "Fira",
        description:
          "Explore Santorini's lively capital with restaurants, shops and caldera views.",
        image:
          "https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?auto=format&fit=crop&w=900&q=80",
      },
      {
        id: "red-beach",
        name: "Red Beach",
        description:
          "Relax beside dramatic volcanic cliffs and crystal-clear Mediterranean water.",
        image:
          "https://images.unsplash.com/photo-1533104816931-20fa691ff6ca?auto=format&fit=crop&w=900&q=80",
      },
      {
        id: "akrotiri",
        name: "Akrotiri",
        description:
          "Discover ancient ruins and fascinating archaeological history.",
        image:
          "https://images.unsplash.com/photo-1603565816030-6b389eeb23cb?auto=format&fit=crop&w=900&q=80",
      },
    ],
    stays: [
      {
        id: "santorini-blue-haven",
        name: "Santorini Blue Haven",
        type: "Hotel",
        location: "Oia, Santorini",
        price: 14500,
        rating: 4.9,
        image:
          "https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?auto=format&fit=crop&w=1000&q=80",
      },
      {
        id: "caldera-view-villa",
        name: "Caldera View Villa",
        type: "Villa",
        location: "Fira, Santorini",
        price: 18000,
        rating: 4.9,
        image:
          "https://images.unsplash.com/photo-1601918774946-25832a4be0d6?auto=format&fit=crop&w=1000&q=80",
      },
      {
        id: "aegean-sunset-resort",
        name: "Aegean Sunset Resort",
        type: "Resort",
        location: "Santorini, Greece",
        price: 12500,
        rating: 4.8,
        image:
          "https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=1000&q=80",
      },
    ],
  },

  kyoto: {
    name: "Kyoto",
    country: "Japan",
    places: [
      {
        id: "fushimi-inari",
        name: "Fushimi Inari Shrine",
        description:
          "Walk through the famous thousands of red torii gates of Kyoto.",
        image:
          "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=900&q=80",
      },
      {
        id: "arashiyama",
        name: "Arashiyama Bamboo Grove",
        description:
          "Explore Kyoto's iconic bamboo forest and beautiful surrounding temples.",
        image:
          "https://images.unsplash.com/photo-1528360983277-13d401cdc186?auto=format&fit=crop&w=900&q=80",
      },
      {
        id: "kinkakuji",
        name: "Kinkaku-ji",
        description:
          "Visit Kyoto's famous Golden Pavilion surrounded by peaceful gardens.",
        image:
          "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=900&q=80",
      },
      {
        id: "gion",
        name: "Gion District",
        description:
          "Walk through traditional streets and experience Kyoto's historic culture.",
        image:
          "https://images.unsplash.com/photo-1528360983277-13d401cdc186?auto=format&fit=crop&w=900&q=80",
      },
    ],
    stays: [
      {
        id: "kyoto-garden-stay",
        name: "Kyoto Garden Stay",
        type: "Hotel",
        location: "Kyoto, Japan",
        price: 9800,
        rating: 4.8,
        image:
          "https://images.unsplash.com/photo-1545569341-9eb8b30979d9?auto=format&fit=crop&w=1000&q=80",
      },
      {
        id: "kyoto-traditional-villa",
        name: "Traditional Kyoto Villa",
        type: "Villa",
        location: "Gion, Kyoto",
        price: 13500,
        rating: 4.9,
        image:
          "https://images.unsplash.com/photo-1528360983277-13d401cdc186?auto=format&fit=crop&w=1000&q=80",
      },
      {
        id: "kyoto-zen-resort",
        name: "Kyoto Zen Resort",
        type: "Resort",
        location: "Kyoto, Japan",
        price: 11500,
        rating: 4.8,
        image:
          "https://images.unsplash.com/photo-1564501049412-61c2a3083791?auto=format&fit=crop&w=1000&q=80",
      },
    ],
  },

  dubai: {
    name: "Dubai",
    country: "UAE",
    places: [
      {
        id: "burj-khalifa",
        name: "Burj Khalifa",
        description:
          "Visit the world's famous skyscraper and enjoy spectacular city views.",
        image:
          "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=900&q=80",
      },
      {
        id: "palm-jumeirah",
        name: "Palm Jumeirah",
        description:
          "Explore Dubai's iconic artificial island, beaches and luxury resorts.",
        image:
          "https://images.unsplash.com/photo-1518684079-3c830dcef090?auto=format&fit=crop&w=900&q=80",
      },
      {
        id: "dubai-marina",
        name: "Dubai Marina",
        description:
          "Enjoy waterfront restaurants, modern architecture and evening cruises.",
        image:
          "https://images.unsplash.com/photo-1518684079-3c830dcef090?auto=format&fit=crop&w=900&q=80",
      },
      {
        id: "desert-safari",
        name: "Desert Safari",
        description:
          "Experience dune adventures, desert sunsets and traditional Arabian culture.",
        image:
          "https://images.unsplash.com/photo-1473580044384-7ba9967e16a0?auto=format&fit=crop&w=900&q=80",
      },
    ],
    stays: [
      {
        id: "dubai-marina-hotel",
        name: "Dubai Marina Hotel",
        type: "Hotel",
        location: "Dubai Marina, UAE",
        price: 10500,
        rating: 4.8,
        image:
          "https://images.unsplash.com/photo-1518684079-3c830dcef090?auto=format&fit=crop&w=1000&q=80",
      },
      {
        id: "palm-luxury-villa",
        name: "Palm Luxury Villa",
        type: "Villa",
        location: "Palm Jumeirah, Dubai",
        price: 24000,
        rating: 4.9,
        image:
          "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1000&q=80",
      },
      {
        id: "desert-resort-dubai",
        name: "Desert Oasis Resort",
        type: "Resort",
        location: "Dubai Desert, UAE",
        price: 15500,
        rating: 4.8,
        image:
          "https://images.unsplash.com/photo-1518684079-3c830dcef090?auto=format&fit=crop&w=1000&q=80",
      },
    ],
  },

  "leh-ladakh": {
    name: "Leh-Ladakh",
    country: "India",
    places: [
      {
        id: "pangong-lake",
        name: "Pangong Lake",
        description:
          "Experience the breathtaking blue waters of one of Ladakh's most famous lakes.",
        image:
          "https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=900&q=80",
      },
      {
        id: "nubra-valley",
        name: "Nubra Valley",
        description:
          "Discover dramatic mountain scenery, desert landscapes and remote villages.",
        image:
          "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=900&q=80",
      },
      {
        id: "leh-palace",
        name: "Leh Palace",
        description:
          "Explore Ladakh's historic royal palace overlooking the city of Leh.",
        image:
          "https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=900&q=80",
      },
      {
        id: "khardung-la",
        name: "Khardung La",
        description:
          "Ride through one of the most spectacular high-altitude mountain passes.",
        image:
          "https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=900&q=80",
      },
    ],
    stays: [
      {
        id: "leh-mountain-resort",
        name: "Leh Mountain Resort",
        type: "Resort",
        location: "Leh, Ladakh",
        price: 5200,
        rating: 4.8,
        image:
          "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1000&q=80",
      },
      {
        id: "nubra-valley-camp",
        name: "Nubra Valley Camp",
        type: "Camp",
        location: "Nubra Valley, Ladakh",
        price: 4500,
        rating: 4.7,
        image:
          "https://images.unsplash.com/photo-1500534623283-312aade485b7?auto=format&fit=crop&w=1000&q=80",
      },
      {
        id: "pangong-lake-stay",
        name: "Pangong Lake Stay",
        type: "Hotel",
        location: "Pangong, Ladakh",
        price: 4800,
        rating: 4.6,
        image:
          "https://images.unsplash.com/photo-1500534623283-312aade485b7?auto=format&fit=crop&w=1000&q=80",
      },
    ],
  },
};

const destinationOptions = Object.entries(destinationData).map(
  ([id, data]) => ({
    id,
    label: `${data.name}, ${data.country}`,
  }),
);

const steps = [
  { number: 1, title: "Destination" },
  { number: 2, title: "Places" },
  { number: 3, title: "Stay" },
  { number: 4, title: "Dates" },
  { number: 5, title: "Guests" },
  { number: 6, title: "Review" },
];

const formatCurrency = (amount: number) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(amount);

export default function TripBuilder() {
  const [searchParams] = useSearchParams();
  const { saveTripDraft } = useVoyara();

  const destinationFromUrl = searchParams.get("destination") || "manali";

  const initialDestinationId =
    destinationData[destinationFromUrl] !== undefined
      ? destinationFromUrl
      : "manali";

  const [currentStep, setCurrentStep] = useState<Step>(1);

  const [destinationId, setDestinationId] = useState(initialDestinationId);

  const destinationInfo = destinationData[destinationId];

  const [destination, setDestination] = useState(
    `${destinationInfo.name}, ${destinationInfo.country}`,
  );

  const [selectedPlaces, setSelectedPlaces] = useState<string[]>([]);
  const [selectedStay, setSelectedStay] = useState("");

  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");

  const [rooms, setRooms] = useState(1);
  const [adults, setAdults] = useState(2);
  const [children, setChildren] = useState(0);

  const places = destinationInfo.places;
  const stays = destinationInfo.stays;

  const selectedStayData = useMemo(
    () => stays.find((stay) => stay.id === selectedStay),
    [stays, selectedStay],
  );

  const changeDestination = (id: string) => {
    const newDestination = destinationData[id];

    if (!newDestination) {
      return;
    }

    setDestinationId(id);
    setDestination(`${newDestination.name}, ${newDestination.country}`);

    setSelectedPlaces([]);
    setSelectedStay("");
    setCheckIn("");
    setCheckOut("");
  };

  const togglePlace = (placeId: string) => {
    setSelectedPlaces((current) =>
      current.includes(placeId)
        ? current.filter((id) => id !== placeId)
        : [...current, placeId],
    );
  };

  const canContinue = () => {
    if (currentStep === 1) {
      return destination.trim().length > 0;
    }

    if (currentStep === 2) {
      return selectedPlaces.length > 0;
    }

    if (currentStep === 3) {
      return selectedStay.length > 0;
    }

    if (currentStep === 4) {
      if (!checkIn || !checkOut) {
        return false;
      }

      return new Date(checkOut) > new Date(checkIn);
    }

    if (currentStep === 5) {
      return adults > 0 && rooms > 0 && occupancy.isValid;
    }

    return true;
  };

  const handleContinue = () => {
    if (!canContinue()) {
      return;
    }

    if (currentStep < 6) {
      setCurrentStep((current) => (current + 1) as Step);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep((current) => (current - 1) as Step);
    }
  };

  const occupancy = getOccupancy(adults, children, rooms);
  const nights = getNights(checkIn, checkOut);
  const roomCost = selectedStayData ? selectedStayData.price * rooms * nights : 0;
  const childAccommodationCost = occupancy.childAccommodationCost * nights;
  const estimatedTripCost = roomCost + childAccommodationCost + selectedPlaces.length * 500;

  return (
    <main className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5 lg:px-8">
          <Link
            to="/"
            className="flex items-center gap-2 text-xl font-bold tracking-tight text-slate-900"
          >
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-slate-900 text-white">
              V
            </span>
            VOYARA
          </Link>

          <div className="hidden items-center gap-2 text-sm text-slate-500 sm:flex">
            <Sparkles size={16} />
            Build your perfect journey
          </div>

          <Link
            to="/trips"
            className="rounded-full border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:border-slate-400"
          >
            Exit
          </Link>
        </div>
      </header>

      {/* Progress */}
      <section className="border-b border-slate-200 bg-white">
        <div className="mx-auto max-w-7xl px-6 py-7 lg:px-8">
          <div className="flex items-center justify-between overflow-x-auto">
            {steps.map((step, index) => {
              const completed = currentStep > step.number;
              const active = currentStep === step.number;

              return (
                <div
                  key={step.number}
                  className="flex min-w-[110px] flex-1 items-center"
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-sm font-bold ${
                        completed || active
                          ? "bg-slate-900 text-white"
                          : "bg-slate-100 text-slate-400"
                      } ${active ? "ring-4 ring-slate-100" : ""}`}
                    >
                      {completed ? <Check size={17} /> : step.number}
                    </div>

                    <span
                      className={`hidden text-sm font-semibold md:block ${
                        active || completed
                          ? "text-slate-900"
                          : "text-slate-400"
                      }`}
                    >
                      {step.title}
                    </span>
                  </div>

                  {index < steps.length - 1 && (
                    <div
                      className={`mx-3 h-px flex-1 ${
                        completed ? "bg-slate-900" : "bg-slate-200"
                      }`}
                    />
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Main */}
      <section className="mx-auto max-w-7xl px-6 py-10 lg:px-8 lg:py-14">
        <div className="grid gap-8 lg:grid-cols-[1fr_340px]">
          <div>
            {/* STEP 1 */}
            {currentStep === 1 && (
              <div className="rounded-3xl border border-slate-200 bg-white p-7 shadow-sm sm:p-10">
                <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-400">
                  Step 01
                </p>

                <h1 className="mt-3 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
                  Where do you want to go?
                </h1>

                <p className="mt-3 max-w-2xl text-slate-500">
                  Choose your destination and start building a journey designed
                  around you.
                </p>

                <div className="mt-10 rounded-2xl bg-slate-50 p-5">
                  <label className="mb-3 block text-sm font-semibold text-slate-700">
                    Destination
                  </label>

                  <div className="flex items-center gap-3 rounded-xl border border-slate-200 bg-white px-4 py-4">
                    <MapPin className="shrink-0 text-slate-500" size={20} />

                    <input
                      type="text"
                      value={destination}
                      onChange={(event) => setDestination(event.target.value)}
                      placeholder="Enter destination"
                      className="w-full bg-transparent text-base font-semibold text-slate-900 outline-none"
                    />
                  </div>
                </div>

                <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {destinationOptions.map((item) => {
                    const selected = destinationId === item.id;

                    return (
                      <button
                        key={item.id}
                        type="button"
                        onClick={() => changeDestination(item.id)}
                        className={`rounded-2xl border p-5 text-left transition ${
                          selected
                            ? "border-slate-900 bg-slate-900 text-white"
                            : "border-slate-200 bg-white hover:border-slate-400"
                        }`}
                      >
                        <MapPin size={19} />

                        <p className="mt-4 font-semibold">{item.label}</p>

                        <p
                          className={`mt-1 text-sm ${
                            selected ? "text-slate-300" : "text-slate-400"
                          }`}
                        >
                          Popular destination
                        </p>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* STEP 2 */}
            {currentStep === 2 && (
              <div className="rounded-3xl border border-slate-200 bg-white p-7 shadow-sm sm:p-10">
                <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-400">
                  Step 02
                </p>

                <h1 className="mt-3 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
                  Explore {destinationInfo.name}
                </h1>

                <p className="mt-3 text-slate-500">
                  Select multiple places you want to visit.
                </p>

                <div className="mt-10 grid gap-5 sm:grid-cols-2">
                  {places.map((place) => {
                    const selected = selectedPlaces.includes(place.id);

                    return (
                      <button
                        key={place.id}
                        type="button"
                        onClick={() => togglePlace(place.id)}
                        className={`group overflow-hidden rounded-2xl border text-left transition ${
                          selected
                            ? "border-slate-900 ring-2 ring-slate-900"
                            : "border-slate-200 hover:border-slate-400"
                        }`}
                      >
                        <div className="relative h-48 overflow-hidden">
                          <img
                            src={place.image}
                            alt={place.name}
                            className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                          />

                          <div
                            className={`absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full ${
                              selected
                                ? "bg-slate-900 text-white"
                                : "bg-white/90 text-slate-500"
                            }`}
                          >
                            {selected ? (
                              <Check size={17} />
                            ) : (
                              <Plus size={17} />
                            )}
                          </div>
                        </div>

                        <div className="p-5">
                          <h3 className="font-bold text-slate-900">
                            {place.name}
                          </h3>

                          <p className="mt-2 text-sm leading-6 text-slate-500">
                            {place.description}
                          </p>
                        </div>
                      </button>
                    );
                  })}
                </div>

                <div className="mt-6 rounded-2xl bg-slate-50 px-5 py-4 text-sm text-slate-600">
                  <strong>{selectedPlaces.length}</strong> place
                  {selectedPlaces.length !== 1 ? "s" : ""} selected
                </div>
              </div>
            )}

            {/* STEP 3 */}
            {currentStep === 3 && (
              <div className="rounded-3xl border border-slate-200 bg-white p-7 shadow-sm sm:p-10">
                <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-400">
                  Step 03
                </p>

                <h1 className="mt-3 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
                  Choose your stay
                </h1>

                <p className="mt-3 text-slate-500">
                  Select where you want to stay in {destinationInfo.name}.
                </p>

                <div className="mt-10 space-y-5">
                  {stays.map((stay) => {
                    const selected = selectedStay === stay.id;

                    return (
                      <button
                        key={stay.id}
                        type="button"
                        onClick={() => setSelectedStay(stay.id)}
                        className={`flex w-full flex-col overflow-hidden rounded-2xl border text-left transition sm:flex-row ${
                          selected
                            ? "border-slate-900 ring-2 ring-slate-900"
                            : "border-slate-200 hover:border-slate-400"
                        }`}
                      >
                        <div className="relative h-52 sm:h-auto sm:w-52">
                          <img
                            src={stay.image}
                            alt={stay.name}
                            className="h-full w-full object-cover"
                          />

                          {selected && (
                            <div className="absolute left-4 top-4 flex h-9 w-9 items-center justify-center rounded-full bg-slate-900 text-white">
                              <Check size={17} />
                            </div>
                          )}
                        </div>

                        <div className="flex flex-1 flex-col justify-between p-5 sm:p-6">
                          <div>
                            <div className="flex items-start justify-between gap-4">
                              <div>
                                <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                                  {stay.type}
                                </p>

                                <h3 className="mt-1 text-xl font-bold text-slate-900">
                                  {stay.name}
                                </h3>
                              </div>

                              <div className="rounded-full bg-slate-100 px-3 py-1 text-sm font-semibold">
                                ★ {stay.rating}
                              </div>
                            </div>

                            <div className="mt-3 flex items-center gap-2 text-sm text-slate-500">
                              <MapPin size={15} />
                              {stay.location}
                            </div>
                          </div>

                          <div className="mt-6 flex items-end justify-between">
                            <div>
                              <p className="text-xs text-slate-400">
                                Starting from
                              </p>

                              <p className="text-xl font-bold text-slate-900">
                                {formatCurrency(stay.price)}
                              </p>

                              <p className="text-xs text-slate-400">
                                per room / night
                              </p>
                            </div>

                            <span className="rounded-full border border-slate-200 px-4 py-2 text-sm font-semibold">
                              {selected ? "Selected" : "Select"}
                            </span>
                          </div>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* STEP 4 */}
            {currentStep === 4 && (
              <div className="rounded-3xl border border-slate-200 bg-white p-7 shadow-sm sm:p-10">
                <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-400">
                  Step 04
                </p>

                <h1 className="mt-3 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
                  When are you travelling?
                </h1>

                <p className="mt-3 text-slate-500">
                  Select your check-in and check-out dates.
                </p>

                <div className="mt-10 grid gap-6 sm:grid-cols-2">
                  <DateField
                    label="Check-in"
                    value={checkIn}
                    onChange={(value) => {
                      setCheckIn(value);

                      if (checkOut && new Date(checkOut) <= new Date(value)) {
                        setCheckOut("");
                      }
                    }}
                  />

                  <DateField
                    label="Check-out"
                    value={checkOut}
                    min={checkIn || undefined}
                    onChange={setCheckOut}
                  />
                </div>

                {checkIn &&
                  checkOut &&
                  new Date(checkOut) <= new Date(checkIn) && (
                    <div className="mt-5 rounded-2xl bg-red-50 px-5 py-4 text-sm font-medium text-red-600">
                      Check-out must be after check-in.
                    </div>
                  )}

                <div className="mt-8 rounded-2xl bg-slate-900 p-6 text-white">
                  <CalendarDays size={24} />

                  <h3 className="mt-4 text-lg font-bold">
                    Flexible travel planning
                  </h3>

                  <p className="mt-2 text-sm leading-6 text-slate-300">
                    Your selected dates will be included in your final journey
                    summary.
                  </p>
                </div>
              </div>
            )}

            {/* STEP 5 */}
            {currentStep === 5 && (
              <div className="rounded-3xl border border-slate-200 bg-white p-7 shadow-sm sm:p-10">
                <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-400">
                  Step 05
                </p>

                <h1 className="mt-3 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
                  Who is travelling?
                </h1>

                <p className="mt-3 text-slate-500">
                  Each room fits up to 2 adults, 2 children and 4 guests total.
                </p>

                <div className="mt-10 space-y-4">
                  <CounterRow
                    icon={<Hotel size={21} />}
                    title="Rooms"
                    description="Number of rooms"
                    value={rooms}
                    min={1}
                    onDecrease={() =>
                      setRooms((value) => Math.max(1, value - 1))
                    }
                    onIncrease={() => setRooms((value) => value + 1)}
                  />

                  <CounterRow
                    icon={<Users size={21} />}
                    title="Adults"
                    description="Age 13 and above"
                    value={adults}
                    min={1}
                    onDecrease={() =>
                      setAdults((value) => Math.max(1, value - 1))
                    }
                    onIncrease={() => setAdults((value) => value + 1)}
                  />

                  <CounterRow
                    icon={<Users size={21} />}
                    title="Children"
                    description="Age 2–12"
                    value={children}
                    min={0}
                    onDecrease={() =>
                      setChildren((value) => Math.max(0, value - 1))
                    }
                    onIncrease={() => setChildren((value) => value + 1)}
                  />
                </div>

                <div className="mt-8 rounded-2xl bg-slate-50 p-5">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-slate-500">Total travellers</span>

                    <strong className="text-slate-900">
                      {adults + children}
                    </strong>
                  </div>
                  <p className="mt-3 text-xs leading-5 text-slate-500">
                    Children use an extra bed at {formatCurrency(occupancy.childExtraBedFee)} per child, per night.
                  </p>
                </div>

                <div className={"mt-4 rounded-2xl border p-4 " + (occupancy.isValid ? "border-emerald-200 bg-emerald-50 text-emerald-900" : "border-amber-200 bg-amber-50 text-amber-900")}>
                  <div className="flex gap-3">
                    {occupancy.isValid ? <Check size={19} className="mt-0.5 shrink-0" /> : <AlertTriangle size={19} className="mt-0.5 shrink-0" />}
                    <div><p className="text-sm font-bold">{occupancy.message}</p>{!occupancy.isValid && <button type="button" onClick={() => setRooms(occupancy.requiredRooms)} className="mt-3 rounded-full bg-amber-900 px-4 py-2 text-xs font-bold text-white hover:bg-amber-800">Use {occupancy.requiredRooms} required room{occupancy.requiredRooms === 1 ? "" : "s"}</button>}</div>
                  </div>
                </div>
              </div>
            )}

            {/* STEP 6 */}
            {currentStep === 6 && (
              <div className="rounded-3xl border border-slate-200 bg-white p-7 shadow-sm sm:p-10">
                <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-400">
                  Step 06
                </p>

                <h1 className="mt-3 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
                  Review your journey
                </h1>

                <p className="mt-3 text-slate-500">
                  Everything looks good? Your VOYARA trip is ready.
                </p>

                <div className="mt-10 space-y-4">
                  <ReviewRow
                    icon={<MapPin size={19} />}
                    label="Destination"
                    value={destination}
                  />

                  <ReviewRow
                    icon={<Sparkles size={19} />}
                    label="Places"
                    value={
                      selectedPlaces.length
                        ? places
                            .filter((place) =>
                              selectedPlaces.includes(place.id),
                            )
                            .map((place) => place.name)
                            .join(", ")
                        : "No places selected"
                    }
                  />

                  <ReviewRow
                    icon={<Hotel size={19} />}
                    label="Stay"
                    value={selectedStayData?.name || "No stay selected"}
                  />

                  <ReviewRow
                    icon={<CalendarDays size={19} />}
                    label="Dates"
                    value={`${checkIn || "Not selected"} → ${
                      checkOut || "Not selected"
                    }`}
                  />

                  <ReviewRow
                    icon={<Users size={19} />}
                    label="Guests"
                    value={`${adults} adults, ${children} children, ${rooms} room${
                      rooms !== 1 ? "s" : ""
                    }`}
                  />
                </div>

                <div className="mt-8 rounded-3xl bg-slate-900 p-7 text-white">
                  <p className="text-sm text-slate-400">Estimated trip cost</p>

                  <div className="mt-2 flex items-end justify-between gap-5">
                    <div>
                      <p className="text-4xl font-bold">
                        {formatCurrency(estimatedTripCost)}
                      </p>

                      <p className="mt-2 text-sm text-slate-400">
                        {nights} night{nights === 1 ? "" : "s"} · rooms, child extra beds + selected experiences
                      </p>
                    </div>

                    <Sparkles className="hidden sm:block" size={30} />
                  </div>
                  <div className="mt-5 space-y-2 border-t border-white/10 pt-4 text-sm text-slate-300">
                    <p className="flex justify-between gap-4"><span>Rooms ({rooms} × {nights} night{nights === 1 ? "" : "s"})</span><b className="text-white">{formatCurrency(roomCost)}</b></p>
                    {children > 0 && <p className="flex justify-between gap-4"><span>Child extra beds ({children} × {nights})</span><b className="text-white">{formatCurrency(childAccommodationCost)}</b></p>}
                  </div>
                </div>
              </div>
            )}

            {/* Navigation */}
            <div className="mt-6 flex items-center justify-between gap-4">
              <button
                type="button"
                onClick={handleBack}
                disabled={currentStep === 1}
                className={`flex items-center gap-2 rounded-full border px-6 py-3 font-semibold transition ${
                  currentStep === 1
                    ? "cursor-not-allowed border-slate-200 text-slate-300"
                    : "border-slate-300 bg-white text-slate-700 hover:border-slate-500"
                }`}
              >
                <ArrowLeft size={18} />
                Back
              </button>

              {currentStep < 6 ? (
                <button
                  type="button"
                  onClick={handleContinue}
                  disabled={!canContinue()}
                  className={`flex items-center gap-2 rounded-full px-7 py-3 font-semibold transition ${
                    canContinue()
                      ? "bg-slate-900 text-white hover:bg-slate-700"
                      : "cursor-not-allowed bg-slate-200 text-slate-400"
                  }`}
                >
                  Continue
                  <ArrowRight size={18} />
                </button>
              ) : (
                <Link
                  to="/booking"
                  state={{
                    destination,
                    places: selectedPlaces.map((placeId) => places.find((place) => place.id === placeId)?.name ?? placeId),
                    stay: selectedStayData?.name ?? "Selected stay",
                    checkIn,
                    checkOut,
                    rooms,
                    adults,
                    children,
                    estimatedCost: estimatedTripCost,
                  }}
                  onClick={() => saveTripDraft({
                    destination,
                    startDate: checkIn,
                    endDate: checkOut,
                    travellers: adults + children,
                    budget: estimatedTripCost,
                    interests: selectedPlaces.map((placeId) => places.find((place) => place.id === placeId)?.name ?? placeId),
                  })}
                  className="flex items-center gap-2 rounded-full bg-slate-900 px-7 py-3 font-semibold text-white transition hover:bg-slate-700"
                >
                  Continue to booking
                  <Check size={18} />
                </Link>
              )}
            </div>
          </div>

          {/* Summary */}
          <aside className="h-fit rounded-3xl border border-slate-200 bg-white p-6 shadow-sm lg:sticky lg:top-6">
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-slate-900 text-white">
                <Sparkles size={19} />
              </div>

              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                  Your trip
                </p>

                <h2 className="font-bold text-slate-900">
                  {destination || "Your destination"}
                </h2>
              </div>
            </div>

            <div className="my-6 h-px bg-slate-100" />

            <div className="space-y-5">
              <SummaryItem
                label="Places"
                value={`${selectedPlaces.length} selected`}
              />

              <SummaryItem
                label="Stay"
                value={selectedStayData?.name || "Choose a stay"}
              />

              <SummaryItem
                label="Dates"
                value={
                  checkIn && checkOut
                    ? `${checkIn} → ${checkOut}`
                    : "Select dates"
                }
              />

              <SummaryItem
                label="Travellers"
                value={`${adults + children} guest${
                  adults + children !== 1 ? "s" : ""
                }`}
              />
            </div>

            <div className="my-6 h-px bg-slate-100" />

            <div className="flex items-center justify-between">
              <span className="text-sm text-slate-500">Estimated cost</span>

              <strong className="text-lg text-slate-900">
                {formatCurrency(estimatedTripCost)}
              </strong>
            </div>

            <div className="mt-6 rounded-2xl bg-slate-50 p-4">
              <div className="flex gap-3">
                <Sparkles
                  size={17}
                  className="mt-0.5 shrink-0 text-slate-700"
                />

                <p className="text-xs leading-5 text-slate-500">
                  Your final price may change based on hotel availability, dates
                  and selected activities.
                </p>
              </div>
            </div>
          </aside>
        </div>
      </section>
    </main>
  );
}

function DateField({
  label,
  value,
  min,
  onChange,
}: {
  label: string;
  value: string;
  min?: string;
  onChange: (value: string) => void;
}) {
  return (
    <div>
      <label className="mb-3 block text-sm font-semibold text-slate-700">
        {label}
      </label>

      <div className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50 px-5 py-5">
        <CalendarDays size={21} className="shrink-0 text-slate-500" />

        <input
          type="date"
          value={value}
          min={min}
          onChange={(event) => onChange(event.target.value)}
          className="w-full bg-transparent text-sm font-semibold outline-none"
        />
      </div>
    </div>
  );
}

function CounterRow({
  icon,
  title,
  description,
  value,
  min,
  onDecrease,
  onIncrease,
}: {
  icon: ReactNode;
  title: string;
  description: string;
  value: number;
  min: number;
  onDecrease: () => void;
  onIncrease: () => void;
}) {
  return (
    <div className="flex items-center justify-between gap-5 rounded-2xl border border-slate-200 p-5">
      <div className="flex items-center gap-4">
        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-slate-100 text-slate-700">
          {icon}
        </div>

        <div>
          <h3 className="font-bold text-slate-900">{title}</h3>

          <p className="mt-1 text-sm text-slate-400">{description}</p>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={onDecrease}
          disabled={value <= min}
          className="flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 transition hover:border-slate-400 disabled:cursor-not-allowed disabled:opacity-40"
        >
          <Minus size={15} />
        </button>

        <span className="w-6 text-center font-bold text-slate-900">
          {value}
        </span>

        <button
          type="button"
          onClick={onIncrease}
          className="flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 transition hover:border-slate-400"
        >
          <Plus size={15} />
        </button>
      </div>
    </div>
  );
}

function ReviewRow({
  icon,
  label,
  value,
}: {
  icon: ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="flex gap-4 rounded-2xl border border-slate-200 p-5">
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-slate-100 text-slate-700">
        {icon}
      </div>

      <div className="min-w-0">
        <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
          {label}
        </p>

        <p className="mt-1 break-words font-semibold text-slate-900">{value}</p>
      </div>
    </div>
  );
}

function SummaryItem({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
        {label}
      </p>

      <p className="mt-1 text-sm font-semibold text-slate-800">{value}</p>
    </div>
  );
}
