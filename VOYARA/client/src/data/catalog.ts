export type PhotoCredit = { label: string; href: string };

export type Destination = {
  id: string;
  name: string;
  country: string;
  region: string;
  category: string;
  rating: number;
  places: number;
  fromPrice: number;
  bestTime: string;
  description: string;
  image: string;
  gallery?: string[];
  overview?: string;
  thingsToDo?: string[];
  foods?: string[];
  travelTips?: string[];
  photoCredit?: PhotoCredit;
};

export type GeoPlace = {
  id: string;
  destinationId?: string;
  name: string;
  country: string;
  state: string;
  district: string;
  type: "Temple" | "Beach" | "Nature" | "Adventure" | "Heritage" | "Culture" | "Wildlife";
  rating: number;
  description: string;
  image: string;
};

export type Stay = {
  id: string;
  destination: string;
  destinationId?: string;
  name: string;
  country: string;
  state: string;
  district: string;
  type: "Hotel" | "Resort" | "Villa" | "Hostel" | "Homestay" | "Heritage hotel";
  rating: number;
  reviews: number;
  price: number;
  image: string;
  amenities: string[];
  childExtraBedFee?: number;
};

export type Restaurant = {
  id: string;
  destinationId?: string;
  name: string;
  country: string;
  state: string;
  district: string;
  cuisine: string;
  rating: number;
  priceForTwo: number;
  description: string;
  image: string;
};

export type Shop = {
  id: string;
  destinationId: string;
  name: string;
  category: string;
  description: string;
  priceRange: string;
};

export type ItineraryStop = {
  time: string;
  title: string;
  description: string;
};

export type DestinationGuide = {
  idealDuration: string;
  arrivalTip: string;
  gettingAround: string;
  safetyNote: string;
  itinerary: ItineraryStop[];
};

export type DestinationReview = {
  destinationId: string;
  author: string;
  tripType: string;
  rating: number;
  comment: string;
};

export type LocationFilter = { country?: string; state?: string; district?: string };

const photo = (id: string, width = 1200) =>
  "https://images.unsplash.com/" + id + "?auto=format&fit=crop&w=" + width + "&q=85";
const jagannathTemple = "https://upload.wikimedia.org/wikipedia/commons/9/90/Bird_view_of_Jagannath_Temple%2C_Puri.jpg";
const konarkTemple = "https://upload.wikimedia.org/wikipedia/commons/6/6e/Sun_Temple_at_Konark.jpg";
const konarkNorth = "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9b/Konark_Sun_Temple_-_North_Side_View.jpg/1920px-Konark_Sun_Temple_-_North_Side_View.jpg";
const lingarajTemple = "https://upload.wikimedia.org/wikipedia/commons/4/4d/Lingaraj_temple_Bhubaneswar.jpg";
const nandankanan = "https://upload.wikimedia.org/wikipedia/commons/0/02/Nandankanan%2C_Bhubaneswar%2C_Odisha.jpg";
// Stable Commons files replace the three retired Unsplash image IDs below.
// Each corresponding destination includes a visible credit in its guide.
const hampiTemple = "https://commons.wikimedia.org/wiki/Special:FilePath/Vittala%20Temple%20Complex%2C%20Hampi.jpg?width=1600";
const munnarTeaEstates = "https://upload.wikimedia.org/wikipedia/commons/5/5d/The_Kanan_Devan_Hills_%28Tea_estates%29_of_Munnar%2C_Kerala.jpg";
const udaipurPalace = "https://upload.wikimedia.org/wikipedia/commons/9/95/India_-_Udaipur_-_001_-_Udaipur_Palace_panorama_from_the_lake_%281038245526%29.jpg";
const chilikaLake = "https://upload.wikimedia.org/wikipedia/commons/7/74/Chilika_Lake_Odisha_India.jpg";

export const categories = ["Adventure", "Beaches", "Mountains", "Nature", "Culture", "Food", "Heritage", "Spiritual"];

// Curated static data for this prototype. Listings and prices are examples, not
// a claim of live hotel inventory or real-time availability.
const indiaDestinationCards: Destination[] = [
  { id: "manali", name: "Manali", country: "India", region: "Himachal Pradesh", category: "Mountains", rating: 4.9, places: 34, fromPrice: 12999, bestTime: "March – June, October – February", description: "Himalayan valleys, pine forests and high-altitude adventures.", image: photo("photo-1626621341517-bbf3d9990a23"), thingsToDo: ["Solang Valley", "Hadimba Temple", "Old Manali"], foods: ["Siddu", "Dham", "Momos"], travelTips: ["Check mountain-road conditions before travel."] },
  { id: "jaipur", name: "Jaipur", country: "India", region: "Rajasthan", category: "Heritage", rating: 4.7, places: 28, fromPrice: 8999, bestTime: "October – March", description: "Royal forts, rose-hued streets and centuries of living culture.", image: photo("photo-1599661046289-e31897846e41"), thingsToDo: ["Amer Fort", "Hawa Mahal", "City Palace"], foods: ["Dal baati churma", "Pyaaz kachori", "Ghewar"], travelTips: ["Plan outdoor sights for early morning."] },
  { id: "agra", name: "Agra", country: "India", region: "Uttar Pradesh", category: "Heritage", rating: 4.7, places: 12, fromPrice: 6800, bestTime: "October – March", description: "Mughal-era monuments, the Taj Mahal and lively old-city food lanes.", image: photo("photo-1564507592333-c60657eea523"), thingsToDo: ["Taj Mahal", "Agra Fort", "Mehtab Bagh"], foods: ["Petha", "Bedai", "Mughlai kebabs"], travelTips: ["Buy monument tickets from official channels."] },
  { id: "varanasi", name: "Varanasi", country: "India", region: "Uttar Pradesh", category: "Spiritual", rating: 4.8, places: 20, fromPrice: 7200, bestTime: "October – March", description: "Ghat-side rituals, silk lanes and North India's most memorable street food.", image: photo("photo-1561361513-2d000a50f0dc"), thingsToDo: ["Ganga Aarti", "Dawn boat ride", "Sarnath"], foods: ["Kachori sabzi", "Malaiyo", "Banarasi chai"], travelTips: ["Use licensed boat operators and keep valuables secure."] },
  { id: "goa", name: "Goa", country: "India", region: "Goa", category: "Beaches", rating: 4.6, places: 30, fromPrice: 9800, bestTime: "November – February", description: "Beach days, Portuguese-era heritage and a distinctive coastal food culture.", image: photo("photo-1512343879784-a960bf40e7f2"), thingsToDo: ["Old Goa churches", "Beach sunset", "Dudhsagar Falls"], foods: ["Fish curry rice", "Prawn balchão", "Bebinca"], travelTips: ["Swim only where lifeguards permit."] },
  { id: "kochi", name: "Kochi", country: "India", region: "Kerala", category: "Culture", rating: 4.6, places: 16, fromPrice: 7800, bestTime: "October – March", description: "Harbour history, art spaces, Chinese fishing nets and Kerala's coastal kitchen.", image: photo("photo-1582972236019-ea4af5ffe587"), thingsToDo: ["Fort Kochi", "Mattancherry", "Harbour walk"], foods: ["Appam and stew", "Karimeen", "Puttu"], travelTips: ["Allow for humid weather and afternoon rain."] },
  { id: "munnar", name: "Munnar", country: "India", region: "Kerala", category: "Nature", rating: 4.8, places: 19, fromPrice: 8900, bestTime: "September – March", description: "Rolling tea estates, shola forests and misty Western Ghats viewpoints.", image: munnarTeaEstates, thingsToDo: ["Tea gardens", "Eravikulam National Park", "Top Station"], foods: ["Kerala sadya", "Cardamom tea", "Appam"], travelTips: ["Carry a light rain layer year-round."], photoCredit: { label: "Munnar tea-estate photo: Ravi Varghese via Wikimedia Commons", href: "https://commons.wikimedia.org/wiki/File:The_Kanan_Devan_Hills_(Tea_estates)_of_Munnar,_Kerala.jpg" } },
  { id: "rishikesh", name: "Rishikesh", country: "India", region: "Uttarakhand", category: "Adventure", rating: 4.7, places: 15, fromPrice: 7500, bestTime: "September – April", description: "Yoga, river rafting and Himalayan foothill views beside the Ganga.", image: photo("photo-1548013146-72479768bada"), thingsToDo: ["Ganga Aarti", "Rafting", "Beatles Ashram"], foods: ["Aloo ke gutke", "Garhwali thali", "Café food"], travelTips: ["Choose registered rafting operators."] },
  { id: "leh-ladakh", name: "Leh–Ladakh", country: "India", region: "Ladakh", category: "Adventure", rating: 4.9, places: 26, fromPrice: 16999, bestTime: "June – September", description: "High-altitude monasteries, lakes and mountain passes unlike anywhere else in India.", image: photo("photo-1544735716-392fe2489ffa"), thingsToDo: ["Pangong Lake", "Nubra Valley", "Leh Palace"], foods: ["Thukpa", "Skyu", "Butter tea"], travelTips: ["Acclimatise before high-altitude sightseeing."] },
  { id: "srinagar", name: "Srinagar", country: "India", region: "Jammu & Kashmir", category: "Nature", rating: 4.8, places: 17, fromPrice: 11500, bestTime: "April – October", description: "Dal Lake houseboats, Mughal gardens and a mountain-ringed valley.", image: photo("photo-1595815771614-ade9d652a65d"), thingsToDo: ["Dal Lake", "Mughal gardens", "Old Srinagar"], foods: ["Wazwan", "Kahwa", "Nadru yakhni"], travelTips: ["Check local travel advisories before departure."] },
  { id: "darjeeling", name: "Darjeeling", country: "India", region: "West Bengal", category: "Mountains", rating: 4.7, places: 14, fromPrice: 8900, bestTime: "March – May, October – December", description: "Tea hills, toy-train heritage and Kanchenjunga views.", image: photo("photo-1544735716-392fe2489ffa"), thingsToDo: ["Tiger Hill", "Toy Train", "Tea estate visit"], foods: ["Momos", "Thukpa", "Darjeeling tea"], travelTips: ["Mountain weather changes quickly."] },
  { id: "gangtok", name: "Gangtok", country: "India", region: "Sikkim", category: "Nature", rating: 4.7, places: 16, fromPrice: 9400, bestTime: "March – June, October – December", description: "A Himalayan capital with monasteries, lakes and mountain road trips.", image: photo("photo-1464822759023-fed622ff2c3b"), thingsToDo: ["Tsomgo Lake", "Rumtek Monastery", "MG Marg"], foods: ["Momos", "Thukpa", "Gundruk"], travelTips: ["Some border areas require permits."] },
  { id: "hampi", name: "Hampi", country: "India", region: "Karnataka", category: "Heritage", rating: 4.8, places: 24, fromPrice: 7200, bestTime: "October – February", description: "Vijayanagara ruins, giant boulders and a remarkable river landscape.", image: hampiTemple, thingsToDo: ["Virupaksha Temple", "Vittala Temple", "Matanga Hill"], foods: ["North Karnataka thali", "Jolada rotti", "Bisi bele bath"], travelTips: ["Carry water; many sites are exposed."], photoCredit: { label: "Vittala Temple photo via Wikimedia Commons", href: "https://commons.wikimedia.org/wiki/File:Vittala_Temple_Complex,_Hampi.jpg" } },
  { id: "mysuru", name: "Mysuru", country: "India", region: "Karnataka", category: "Heritage", rating: 4.6, places: 13, fromPrice: 7000, bestTime: "October – February", description: "A gracious royal city of palaces, silk, markets and nearby hills.", image: photo("photo-1524492412937-b28074a5d7da"), thingsToDo: ["Mysore Palace", "Chamundi Hill", "Devaraja Market"], foods: ["Mysore masala dosa", "Mysore pak", "Filter coffee"], travelTips: ["Check palace illumination dates if that is a priority."] },
  { id: "kaziranga", name: "Kaziranga", country: "India", region: "Assam", category: "Wildlife", rating: 4.8, places: 8, fromPrice: 11800, bestTime: "November – April", description: "Floodplain grasslands and one-horned rhino habitats.", image: photo("photo-1549366021-9f761d450615"), thingsToDo: ["Jeep safari", "Birding", "Tea garden visit"], foods: ["Assamese thali", "Khar", "Black tea"], travelTips: ["Safari zones and timings vary by season."] },
  { id: "mumbai", name: "Mumbai", country: "India", region: "Maharashtra", category: "Culture", rating: 4.6, places: 21, fromPrice: 9200, bestTime: "November – February", description: "Art Deco avenues, island history, neighbourhood food and the Arabian Sea.", image: photo("photo-1570168007204-dfb528c6958f"), thingsToDo: ["Gateway of India", "Kala Ghoda", "Marine Drive"], foods: ["Vada pav", "Bombay sandwich", "Seafood"], travelTips: ["Allow extra time for traffic."] },
  { id: "udaipur", name: "Udaipur", country: "India", region: "Rajasthan", category: "Heritage", rating: 4.8, places: 15, fromPrice: 9600, bestTime: "October – March", description: "Lake palaces, Aravalli views and a romantic old-city maze.", image: udaipurPalace, thingsToDo: ["City Palace", "Lake Pichola", "Sajjangarh"], foods: ["Dal baati", "Laal maas", "Kachori"], travelTips: ["Sunset boat rides sell out in peak season."], photoCredit: { label: "Udaipur City Palace photo: McKay Savage via Wikimedia Commons", href: "https://commons.wikimedia.org/wiki/File:India_-_Udaipur_-_001_-_Udaipur_Palace_panorama_from_the_lake_(1038245526).jpg" } },
  { id: "andaman", name: "Andaman Islands", country: "India", region: "Andaman & Nicobar Islands", category: "Beaches", rating: 4.8, places: 19, fromPrice: 18500, bestTime: "October – May", description: "Clear water, island ferries, marine life and quiet tropical beaches.", image: photo("photo-1507525428034-b723cf961d3e"), thingsToDo: ["Radhanagar Beach", "Cellular Jail", "Snorkelling"], foods: ["Seafood curry", "Coconut water", "Island fruit"], travelTips: ["Book inter-island ferries ahead."] },
  { id: "kutch", name: "Kutch", country: "India", region: "Gujarat", category: "Culture", rating: 4.7, places: 12, fromPrice: 9900, bestTime: "November – February", description: "White-salt desert vistas, craft villages and the colour of the Rann Utsav.", image: photo("photo-1548013146-72479768bada"), thingsToDo: ["Great Rann of Kutch", "Bhuj craft villages", "Kala Dungar"], foods: ["Kutchi dabeli", "Bajra rotla", "Chaas"], travelTips: ["Desert nights can be cold."] },
  { id: "kolkata", name: "Kolkata", country: "India", region: "West Bengal", category: "Food", rating: 4.6, places: 18, fromPrice: 7800, bestTime: "October – February", description: "Colonial architecture, bookshops, art, festivals and iconic Bengali food.", image: photo("photo-1558431382-27e303142255"), thingsToDo: ["Victoria Memorial", "College Street", "Kumartuli"], foods: ["Kathi roll", "Macher jhol", "Mishti doi"], travelTips: ["Metro is often the quickest way across the city."] },
];

export const destinations: Destination[] = [
  {
    id: "puri", name: "Puri", country: "India", region: "Odisha", category: "Spiritual", rating: 4.8, places: 18, fromPrice: 7500,
    bestTime: "October – March", description: "A Bay of Bengal pilgrimage city where Jagannath culture, beach mornings and Odia food meet.", image: jagannathTemple,
    gallery: [jagannathTemple, photo("photo-1507525428034-b723cf961d3e", 900), photo("photo-1500534623283-312aade485b7", 900)],
    overview: "Puri is best experienced slowly: begin around the Jagannath Temple precinct, walk the beach at sunrise and leave time for a heritage craft stop in nearby Raghurajpur.",
    thingsToDo: ["See the Jagannath Temple from the public outer precinct", "Walk Puri Beach at sunrise", "Visit Raghurajpur heritage craft village", "Plan a day trip to Konark and Chandrabhaga"],
    foods: ["Mahaprasad", "Dalma", "Chhena poda", "Pakhala bhata", "Fresh coastal seafood"],
    travelTips: ["Temple entry rules apply; check them before visiting.", "Use sun protection on the beach and keep the shore clean.", "Book around Rath Yatra well in advance."],
    photoCredit: { label: "Jagannath Temple photo: Government of Odisha via Wikimedia Commons", href: "https://commons.wikimedia.org/wiki/File:Bird_view_of_Jagannath_Temple,_Puri.jpg" },
  },
  {
    id: "konark", name: "Konark", country: "India", region: "Odisha", category: "Heritage", rating: 4.8, places: 7, fromPrice: 6800,
    bestTime: "October – February", description: "A coastal heritage stop centred on the 13th-century Sun Temple and Chandrabhaga Beach.", image: konarkTemple,
    gallery: [konarkTemple, konarkNorth, photo("photo-1507525428034-b723cf961d3e", 900)],
    overview: "Konark's Sun Temple is a UNESCO World Heritage Site designed as Surya's stone chariot. Combine it with the Interpretation Centre and Chandrabhaga Beach in one unhurried day.",
    thingsToDo: ["Explore the Sun Temple's carved wheels and reliefs", "Visit the ASI museum / interpretation centre", "Catch sunrise at Chandrabhaga Beach", "Attend the Konark Dance Festival when it is on"],
    foods: ["Dalma", "Poda pitha", "Macha ghanta", "Chhena gaja", "Odia thali"],
    travelTips: ["Do not climb on the temple sculpture.", "The site is exposed—carry water and a hat.", "Pair Konark with Puri or Bhubaneswar for an Odisha circuit."],
    photoCredit: { label: "Sun Temple photo: Mayank Choudhary via Wikimedia Commons", href: "https://commons.wikimedia.org/wiki/File:Sun_Temple_at_Konark.jpg" },
  },
  {
    id: "bhubaneswar", name: "Bhubaneswar", country: "India", region: "Odisha", category: "Culture", rating: 4.7, places: 22, fromPrice: 6200,
    bestTime: "October – March", description: "The Temple City combines Kalinga architecture, ancient caves, museums and a green wildlife park.", image: lingarajTemple,
    gallery: [lingarajTemple, nandankanan, photo("photo-1548013146-72479768bada", 900)],
    overview: "Bhubaneswar is a practical base for Odisha's Golden Triangle. Its historic temples, Udayagiri–Khandagiri caves and Nandankanan make it more than a transit city.",
    thingsToDo: ["Admire Lingaraj Temple from permitted public viewpoints", "Explore Udayagiri and Khandagiri Caves", "Visit Nandankanan Zoological Park", "See Odisha art at the state museum"],
    foods: ["Dalma", "Dahi bara aloo dum", "Chhena poda", "Pakhala", "Bara–ghuguni"],
    travelTips: ["Some temple interiors have entry restrictions—respect local rules.", "Start cave visits early to avoid the afternoon heat.", "Use Bhubaneswar as a base for Puri and Konark."],
    photoCredit: { label: "Lingaraj Temple photo via Wikimedia Commons", href: "https://commons.wikimedia.org/wiki/File:Lingaraj_temple_Bhubaneswar.jpg" },
  },
  {
    id: "chilika", name: "Chilika Lake", country: "India", region: "Odisha", category: "Nature", rating: 4.8, places: 11, fromPrice: 6800,
    bestTime: "November – February", description: "A vast brackish-water lagoon of island views, birdlife, boat rides and the Bay of Bengal coast.", image: chilikaLake,
    overview: "Chilika is best explored from Satapada at an unhurried pace. Plan a responsible boat outing, watch for dolphins from a respectful distance and leave time for the lagoon's changing light.",
    thingsToDo: ["Take a registered Satapada boat ride", "Look for Irrawaddy dolphins responsibly", "Visit the sea-mouth viewpoint", "Watch migratory birds from approved viewing areas"],
    foods: ["Fresh coastal fish curry", "Dalma", "Pakhala bhata", "Chhena poda"],
    travelTips: ["Use registered boat operators and confirm safety equipment before boarding.", "Keep a respectful distance from dolphins and nesting birds.", "Carry sun protection and avoid single-use plastics on the water."],
    photoCredit: { label: "Chilika Lake photo: Nishanth Jois via Wikimedia Commons", href: "https://commons.wikimedia.org/wiki/File:Chilika_Lake_Odisha_India.jpg" },
  },
  ...indiaDestinationCards,
];

export const places: GeoPlace[] = [
  { id: "jagannath-temple", destinationId: "puri", name: "Shree Jagannath Temple", country: "India", state: "Odisha", district: "Puri", type: "Temple", rating: 4.9, description: "The spiritual heart of Puri; follow the temple's visitor rules and use public viewpoints if entry is restricted.", image: jagannathTemple },
  { id: "puri-beach", destinationId: "puri", name: "Puri Beach", country: "India", state: "Odisha", district: "Puri", type: "Beach", rating: 4.5, description: "A broad Bay of Bengal beach, best enjoyed around sunrise or sunset.", image: photo("photo-1507525428034-b723cf961d3e", 900) },
  { id: "raghurajpur", destinationId: "puri", name: "Raghurajpur Heritage Village", country: "India", state: "Odisha", district: "Puri", type: "Culture", rating: 4.6, description: "A craft village known for Pattachitra painting, palm-leaf art and traditional performance forms.", image: photo("photo-1500534623283-312aade485b7", 900) },
  { id: "konark-sun-temple", destinationId: "konark", name: "Konark Sun Temple", country: "India", state: "Odisha", district: "Puri", type: "Heritage", rating: 4.8, description: "UNESCO-listed 13th-century temple architecture, conceived as Surya's monumental stone chariot.", image: konarkTemple },
  { id: "chandrabhaga-beach", destinationId: "konark", name: "Chandrabhaga Beach", country: "India", state: "Odisha", district: "Puri", type: "Beach", rating: 4.5, description: "A quieter beach near Konark, known for early-morning coastal views.", image: photo("photo-1507525428034-b723cf961d3e", 900) },
  { id: "lingaraj-temple", destinationId: "bhubaneswar", name: "Lingaraj Temple", country: "India", state: "Odisha", district: "Khordha", type: "Temple", rating: 4.8, description: "An 11th-century Kalinga-style temple complex; access rules apply to the inner precinct.", image: lingarajTemple },
  { id: "nandankanan", destinationId: "bhubaneswar", name: "Nandankanan Zoological Park", country: "India", state: "Odisha", district: "Khordha", type: "Wildlife", rating: 4.5, description: "A zoo and botanical park beside Kanjia Lake, popular for family wildlife visits.", image: nandankanan },
  { id: "udayagiri-khandagiri", destinationId: "bhubaneswar", name: "Udayagiri & Khandagiri Caves", country: "India", state: "Odisha", district: "Khordha", type: "Heritage", rating: 4.5, description: "Ancient rock-cut caves and viewpoints on the edge of Bhubaneswar.", image: photo("photo-1548013146-72479768bada", 900) },
  { id: "solang-valley", destinationId: "manali", name: "Solang Valley", country: "India", state: "Himachal Pradesh", district: "Kullu", type: "Adventure", rating: 4.8, description: "Open Himalayan valley for seasonal snow activities and mountain views.", image: photo("photo-1506905925346-21bda4d32df4", 900) },
  { id: "hadimba-temple", destinationId: "manali", name: "Hadimba Devi Temple", country: "India", state: "Himachal Pradesh", district: "Kullu", type: "Temple", rating: 4.7, description: "A peaceful cedar-forest temple in Manali.", image: photo("photo-1605640840605-14ac1855827b", 900) },
  { id: "amer-fort", destinationId: "jaipur", name: "Amer Fort", country: "India", state: "Rajasthan", district: "Jaipur", type: "Heritage", rating: 4.8, description: "Hilltop fort with courtyards, mirror work and wide Jaipur views.", image: photo("photo-1599661046289-e31897846e41", 900) },
  { id: "hawa-mahal", destinationId: "jaipur", name: "Hawa Mahal", country: "India", state: "Rajasthan", district: "Jaipur", type: "Heritage", rating: 4.7, description: "Jaipur's iconic Palace of Winds in the old city.", image: photo("photo-1477587458883-47145ed94245", 900) },
  { id: "taj-mahal", destinationId: "agra", name: "Taj Mahal", country: "India", state: "Uttar Pradesh", district: "Agra", type: "Heritage", rating: 4.9, description: "A 17th-century marble mausoleum and UNESCO World Heritage Site.", image: photo("photo-1564507592333-c60657eea523", 900) },
  { id: "varanasi-ghats", destinationId: "varanasi", name: "Varanasi Ghats", country: "India", state: "Uttar Pradesh", district: "Varanasi", type: "Culture", rating: 4.8, description: "A connected riverfront of bathing, worship, boats and daily city life.", image: photo("photo-1561361513-2d000a50f0dc", 900) },
  { id: "fort-kochi", destinationId: "kochi", name: "Fort Kochi", country: "India", state: "Kerala", district: "Ernakulam", type: "Culture", rating: 4.6, description: "Historic waterfront lanes, Chinese fishing nets and art spaces.", image: photo("photo-1582972236019-ea4af5ffe587", 900) },
  { id: "calangute-beach", destinationId: "goa", name: "Calangute Beach", country: "India", state: "Goa", district: "North Goa", type: "Beach", rating: 4.5, description: "A lively beach with watersports and sunset cafés.", image: photo("photo-1512343879784-a960bf40e7f2", 900) },
  { id: "rishikesh-riverfront", destinationId: "rishikesh", name: "Rishikesh Riverfront", country: "India", state: "Uttarakhand", district: "Dehradun", type: "Adventure", rating: 4.8, description: "River rafting, yoga and Himalayan foothill views.", image: photo("photo-1548013146-72479768bada", 900) },
  { id: "tsomgo-lake", destinationId: "gangtok", name: "Tsomgo Lake", country: "India", state: "Sikkim", district: "Gangtok", type: "Nature", rating: 4.7, description: "A high-altitude glacial lake surrounded by rugged peaks.", image: photo("photo-1464822759023-fed622ff2c3b", 900) },
  { id: "vittala-temple", destinationId: "hampi", name: "Vittala Temple", country: "India", state: "Karnataka", district: "Vijayanagara", type: "Heritage", rating: 4.9, description: "Hampi's celebrated temple complex, known for the stone chariot and musical-pillared hall.", image: hampiTemple },
  { id: "virupaksha-temple", destinationId: "hampi", name: "Virupaksha Temple", country: "India", state: "Karnataka", district: "Vijayanagara", type: "Temple", rating: 4.8, description: "A living temple complex beside the Hampi Bazaar, framed by boulders and the Tungabhadra landscape.", image: hampiTemple },
  { id: "matanga-hill", destinationId: "hampi", name: "Matanga Hill", country: "India", state: "Karnataka", district: "Vijayanagara", type: "Adventure", rating: 4.7, description: "A hilltop viewpoint for the ruins, river and boulder-strewn horizon; start early in warm weather.", image: hampiTemple },
  { id: "munnar-tea-gardens", destinationId: "munnar", name: "Munnar Tea Gardens", country: "India", state: "Kerala", district: "Idukki", type: "Nature", rating: 4.8, description: "Walk scenic tea-country roads and learn how the region's signature leaves are grown and processed.", image: munnarTeaEstates },
  { id: "eravikulam", destinationId: "munnar", name: "Eravikulam National Park", country: "India", state: "Kerala", district: "Idukki", type: "Wildlife", rating: 4.7, description: "High grasslands and shola forest, with entry and trekking access managed seasonally.", image: munnarTeaEstates },
  { id: "top-station", destinationId: "munnar", name: "Top Station", country: "India", state: "Kerala", district: "Idukki", type: "Nature", rating: 4.6, description: "A high viewpoint for rolling Western Ghats valleys, especially rewarding on a clear morning.", image: munnarTeaEstates },
  { id: "udaipur-city-palace", destinationId: "udaipur", name: "City Palace", country: "India", state: "Rajasthan", district: "Udaipur", type: "Heritage", rating: 4.8, description: "A lakeside palace complex of courtyards, galleries and views over Lake Pichola.", image: udaipurPalace },
  { id: "lake-pichola", destinationId: "udaipur", name: "Lake Pichola", country: "India", state: "Rajasthan", district: "Udaipur", type: "Nature", rating: 4.8, description: "Udaipur's central lake, best experienced by a responsible sunset boat outing or a waterfront walk.", image: udaipurPalace },
  { id: "sajjangarh", destinationId: "udaipur", name: "Sajjangarh Palace", country: "India", state: "Rajasthan", district: "Udaipur", type: "Heritage", rating: 4.6, description: "The hilltop Monsoon Palace offers expansive city, lake and Aravalli views near sunset.", image: udaipurPalace },
  { id: "chilika-lake", destinationId: "chilika", name: "Chilika Lake", country: "India", state: "Odisha", district: "Puri", type: "Nature", rating: 4.8, description: "India's largest brackish-water lagoon, with island scenery, bird habitats and guided boat experiences.", image: chilikaLake },
  { id: "satapada", destinationId: "chilika", name: "Satapada", country: "India", state: "Odisha", district: "Puri", type: "Nature", rating: 4.6, description: "A popular Chilika gateway for registered lagoon boat rides and sea-mouth views.", image: chilikaLake },
  { id: "nalabana", destinationId: "chilika", name: "Nalabana Bird Sanctuary", country: "India", state: "Odisha", district: "Puri", type: "Wildlife", rating: 4.7, description: "A seasonal bird habitat within the lagoon; use authorised viewing options and follow local guidance.", image: chilikaLake },
  { id: "fushimi-inari", name: "Fushimi Inari Shrine", country: "Japan", state: "Kyoto", district: "Kyoto", type: "Culture", rating: 4.8, description: "Vermilion torii gates winding into forested hills.", image: photo("photo-1493976040374-85c8e12f0c0e", 900) },
];

export const stays: Stay[] = [
  { id: "puri-sea-resort", destinationId: "puri", name: "Puri Sea Breeze Resort", destination: "Puri", country: "India", state: "Odisha", district: "Puri", type: "Resort", rating: 4.6, reviews: 218, price: 3900, image: photo("photo-1540541338287-41700207dee6"), amenities: ["Beach access", "Breakfast", "Pool"], childExtraBedFee: 650 },
  { id: "puri-heritage-stay", destinationId: "puri", name: "Puri Heritage Stay", destination: "Puri", country: "India", state: "Odisha", district: "Puri", type: "Hotel", rating: 4.4, reviews: 146, price: 2900, image: photo("photo-1564501049412-61c2a3083791"), amenities: ["Temple transfer", "Restaurant", "Wi-Fi"], childExtraBedFee: 550 },
  { id: "konark-dune-resort", destinationId: "konark", name: "Konark Dune Resort", destination: "Konark", country: "India", state: "Odisha", district: "Puri", type: "Resort", rating: 4.5, reviews: 132, price: 3600, image: photo("photo-1540541338287-41700207dee6"), amenities: ["Garden", "Breakfast", "Parking"], childExtraBedFee: 600 },
  { id: "konark-courtyard", destinationId: "konark", name: "Konark Courtyard Hotel", destination: "Konark", country: "India", state: "Odisha", district: "Puri", type: "Hotel", rating: 4.3, reviews: 98, price: 2800, image: photo("photo-1566073771259-6a8506099945"), amenities: ["Restaurant", "Wi-Fi", "Local guide desk"], childExtraBedFee: 500 },
  { id: "bhubaneswar-court", destinationId: "bhubaneswar", name: "Bhubaneswar Court Hotel", destination: "Bhubaneswar", country: "India", state: "Odisha", district: "Khordha", type: "Hotel", rating: 4.5, reviews: 164, price: 3200, image: photo("photo-1564501049412-61c2a3083791"), amenities: ["Wi-Fi", "Restaurant", "Parking"], childExtraBedFee: 600 },
  { id: "temple-city-residency", destinationId: "bhubaneswar", name: "Temple City Residency", destination: "Bhubaneswar", country: "India", state: "Odisha", district: "Khordha", type: "Hotel", rating: 4.4, reviews: 118, price: 2950, image: photo("photo-1551882547-ff40c63fe5fa"), amenities: ["Breakfast", "Airport transfer", "Wi-Fi"], childExtraBedFee: 550 },
  { id: "mountain-view-resort", destinationId: "manali", name: "Mountain View Resort", destination: "Manali", country: "India", state: "Himachal Pradesh", district: "Kullu", type: "Resort", rating: 4.8, reviews: 428, price: 4500, image: photo("photo-1566073771259-6a8506099945"), amenities: ["Breakfast", "Mountain view", "Free cancellation"], childExtraBedFee: 750 },
  { id: "haveli-amber", destinationId: "jaipur", name: "Haveli Amber", destination: "Jaipur", country: "India", state: "Rajasthan", district: "Jaipur", type: "Heritage hotel", rating: 4.7, reviews: 196, price: 5200, image: photo("photo-1599661046289-e31897846e41"), amenities: ["Rooftop dining", "Pool", "Free cancellation"], childExtraBedFee: 750 },
  { id: "fort-kochi-house", destinationId: "kochi", name: "Fort Kochi House", destination: "Kochi", country: "India", state: "Kerala", district: "Ernakulam", type: "Homestay", rating: 4.6, reviews: 137, price: 3600, image: photo("photo-1505693416388-ac5ce068fe85"), amenities: ["Sea view", "Breakfast", "Wi-Fi"], childExtraBedFee: 650 },
  { id: "goa-coast-resort", destinationId: "goa", name: "Goa Coast Resort", destination: "Goa", country: "India", state: "Goa", district: "North Goa", type: "Resort", rating: 4.6, reviews: 275, price: 5400, image: photo("photo-1540541338287-41700207dee6"), amenities: ["Pool", "Beach shuttle", "Breakfast"], childExtraBedFee: 800 },
  { id: "hampi-boulder-stay", destinationId: "hampi", name: "Hampi Boulder Stay", destination: "Hampi", country: "India", state: "Karnataka", district: "Vijayanagara", type: "Homestay", rating: 4.6, reviews: 184, price: 3200, image: photo("photo-1505693416388-ac5ce068fe85"), amenities: ["Breakfast", "Cycle hire", "Rooftop view"], childExtraBedFee: 500 },
  { id: "hampi-river-resort", destinationId: "hampi", name: "Tungabhadra River Retreat", destination: "Hampi", country: "India", state: "Karnataka", district: "Vijayanagara", type: "Resort", rating: 4.5, reviews: 126, price: 4600, image: photo("photo-1566073771259-6a8506099945"), amenities: ["Garden", "Local guide desk", "Parking"], childExtraBedFee: 650 },
  { id: "munnar-tea-stay", destinationId: "munnar", name: "Munnar Tea Valley Stay", destination: "Munnar", country: "India", state: "Kerala", district: "Idukki", type: "Resort", rating: 4.7, reviews: 249, price: 5200, image: photo("photo-1540541338287-41700207dee6"), amenities: ["Valley view", "Breakfast", "Nature walk"], childExtraBedFee: 700 },
  { id: "munnar-garden-homestay", destinationId: "munnar", name: "Cardamom Grove Homestay", destination: "Munnar", country: "India", state: "Kerala", district: "Idukki", type: "Homestay", rating: 4.5, reviews: 153, price: 3500, image: photo("photo-1505693416388-ac5ce068fe85"), amenities: ["Home-cooked meals", "Tea estate walk", "Wi-Fi"], childExtraBedFee: 550 },
  { id: "udaipur-lake-stay", destinationId: "udaipur", name: "Lakeview Haveli Stay", destination: "Udaipur", country: "India", state: "Rajasthan", district: "Udaipur", type: "Heritage hotel", rating: 4.7, reviews: 292, price: 6100, image: photo("photo-1564501049412-61c2a3083791"), amenities: ["Lake view", "Rooftop dining", "Airport transfer"], childExtraBedFee: 800 },
  { id: "udaipur-courtyard", destinationId: "udaipur", name: "Aravalli Courtyard Hotel", destination: "Udaipur", country: "India", state: "Rajasthan", district: "Udaipur", type: "Hotel", rating: 4.5, reviews: 175, price: 4300, image: photo("photo-1551882547-ff40c63fe5fa"), amenities: ["Pool", "Breakfast", "City transfer"], childExtraBedFee: 650 },
  { id: "chilika-lagoon-stay", destinationId: "chilika", name: "Chilika Lagoon Retreat", destination: "Chilika Lake", country: "India", state: "Odisha", district: "Puri", type: "Resort", rating: 4.5, reviews: 142, price: 4100, image: photo("photo-1540541338287-41700207dee6"), amenities: ["Lagoon view", "Breakfast", "Boat desk"], childExtraBedFee: 600 },
  { id: "satapada-coast-stay", destinationId: "chilika", name: "Satapada Coastal Stay", destination: "Chilika Lake", country: "India", state: "Odisha", district: "Puri", type: "Homestay", rating: 4.4, reviews: 96, price: 2800, image: photo("photo-1505693416388-ac5ce068fe85"), amenities: ["Home-cooked meals", "Parking", "Local host"], childExtraBedFee: 500 },
  { id: "ubud-calm-villas", name: "Ubud Calm Villas", destination: "Ubud", country: "Indonesia", state: "Bali", district: "Gianyar", type: "Villa", rating: 4.9, reviews: 312, price: 7800, image: photo("photo-1601918774946-25832a4be0d6"), amenities: ["Private pool", "Breakfast", "Airport pickup"] },
  { id: "kyoto-garden-stay", name: "Kyoto Garden Stay", destination: "Kyoto", country: "Japan", state: "Kyoto", district: "Kyoto", type: "Hotel", rating: 4.8, reviews: 389, price: 9800, image: photo("photo-1545569341-9eb8b30979d9"), amenities: ["Garden", "Wi-Fi", "Restaurant"] },
];

export const restaurants: Restaurant[] = [
  { id: "wildgrass-puri", destinationId: "puri", name: "Wildgrass Restaurant", country: "India", state: "Odisha", district: "Puri", cuisine: "Odia & Indian", rating: 4.4, priceForTwo: 900, description: "Odia flavours and casual coastal dining in Puri.", image: photo("photo-1517248135467-4c7edcad34c4", 900) },
  { id: "puri-mahaprasad", destinationId: "puri", name: "Puri Mahaprasad Guide", country: "India", state: "Odisha", district: "Puri", cuisine: "Traditional Odia", rating: 4.7, priceForTwo: 450, description: "A guide to trying temple-associated food respectfully and following local rules.", image: photo("photo-1547592180-85f173990554", 900) },
  { id: "konark-odisha-kitchen", destinationId: "konark", name: "Konark Odisha Kitchen", country: "India", state: "Odisha", district: "Puri", cuisine: "Odia", rating: 4.3, priceForTwo: 700, description: "A local-food stop for dalma, rice dishes and sweets after the temple visit.", image: photo("photo-1547592180-85f173990554", 900) },
  { id: "bhubaneswar-dalma", destinationId: "bhubaneswar", name: "Bhubaneswar Dalma Table", country: "India", state: "Odisha", district: "Khordha", cuisine: "Odia", rating: 4.5, priceForTwo: 750, description: "A curated local-food listing for dalma, pakhala and Odia thalis.", image: photo("photo-1547592180-85f173990554", 900) },
  { id: "temple-city-sweets", destinationId: "bhubaneswar", name: "Temple City Sweets", country: "India", state: "Odisha", district: "Khordha", cuisine: "Odia sweets", rating: 4.4, priceForTwo: 500, description: "Chhena poda and seasonal Odia sweets for a quick local-food stop.", image: photo("photo-1551024506-0bccd828d307", 900) },
  { id: "manali-cafe", destinationId: "manali", name: "The Lazy Dog Café", country: "India", state: "Himachal Pradesh", district: "Kullu", cuisine: "Café & Continental", rating: 4.5, priceForTwo: 1100, description: "Riverside café food and relaxed mountain evenings.", image: photo("photo-1559925393-8be0ec4767c8", 900) },
  { id: "jaipur-thali", destinationId: "jaipur", name: "Laxmi Misthan Bhandar", country: "India", state: "Rajasthan", district: "Jaipur", cuisine: "Rajasthani", rating: 4.5, priceForTwo: 700, description: "Classic Rajasthani dishes and Jaipur sweets.", image: photo("photo-1601050690597-df0568f70950", 900) },
  { id: "fort-kochi-kitchen", destinationId: "kochi", name: "Fort Kochi Kitchen", country: "India", state: "Kerala", district: "Ernakulam", cuisine: "Kerala Seafood", rating: 4.6, priceForTwo: 1200, description: "Coastal Kerala plates in historic Fort Kochi.", image: photo("photo-1559339352-11d035aa65de", 900) },
  { id: "hampi-mango-cafe", destinationId: "hampi", name: "Hampi Mango Café", country: "India", state: "Karnataka", district: "Vijayanagara", cuisine: "South Indian & café", rating: 4.4, priceForTwo: 700, description: "A relaxed stop for local breakfasts, simple thalis and a break between the ruins.", image: photo("photo-1559925393-8be0ec4767c8", 900) },
  { id: "hampi-karnataka-table", destinationId: "hampi", name: "Vijayanagara Table", country: "India", state: "Karnataka", district: "Vijayanagara", cuisine: "North Karnataka", rating: 4.5, priceForTwo: 800, description: "A curated local-food listing for jolada rotti, seasonal vegetables and bisi bele bath.", image: photo("photo-1547592180-85f173990554", 900) },
  { id: "munnar-tea-room", destinationId: "munnar", name: "Munnar Tea Room", country: "India", state: "Kerala", district: "Idukki", cuisine: "Kerala & tea", rating: 4.5, priceForTwo: 850, description: "Cardamom tea, Kerala snacks and a slow lunch after a tea-estate walk.", image: photo("photo-1517248135467-4c7edcad34c4", 900) },
  { id: "munnar-spice-kitchen", destinationId: "munnar", name: "Highrange Spice Kitchen", country: "India", state: "Kerala", district: "Idukki", cuisine: "Kerala", rating: 4.4, priceForTwo: 950, description: "Kerala comfort dishes with local pepper, cardamom and seasonal produce.", image: photo("photo-1547592180-85f173990554", 900) },
  { id: "udaipur-rooftop-table", destinationId: "udaipur", name: "Pichola Rooftop Table", country: "India", state: "Rajasthan", district: "Udaipur", cuisine: "Rajasthani", rating: 4.6, priceForTwo: 1300, description: "Rajasthani favourites and lake views for a lingering evening meal.", image: photo("photo-1601050690597-df0568f70950", 900) },
  { id: "udaipur-thali-house", destinationId: "udaipur", name: "Udaipur Thali House", country: "India", state: "Rajasthan", district: "Udaipur", cuisine: "Rajasthani", rating: 4.5, priceForTwo: 900, description: "A casual local-food option for dal baati churma, kachori and seasonal sweets.", image: photo("photo-1547592180-85f173990554", 900) },
  { id: "chilika-coastal-kitchen", destinationId: "chilika", name: "Chilika Coastal Kitchen", country: "India", state: "Odisha", district: "Puri", cuisine: "Odia & seafood", rating: 4.4, priceForTwo: 1000, description: "A sample lagoon-side dining listing with Odia staples and responsibly sourced coastal dishes.", image: photo("photo-1559339352-11d035aa65de", 900) },
  { id: "satapada-dalma-table", destinationId: "chilika", name: "Satapada Dalma Table", country: "India", state: "Odisha", district: "Puri", cuisine: "Odia", rating: 4.3, priceForTwo: 650, description: "Simple Odia thalis and regional sweets for a quick meal before or after the water.", image: photo("photo-1547592180-85f173990554", 900) },
  { id: "ubud-table", name: "Ubud Garden Table", country: "Indonesia", state: "Bali", district: "Gianyar", cuisine: "Balinese", rating: 4.7, priceForTwo: 1500, description: "Balinese comfort food beside tropical gardens.", image: photo("photo-1515003197210-e0cd71810b5f", 900) },
  { id: "kyoto-market-table", name: "Nishiki Market Table", country: "Japan", state: "Kyoto", district: "Kyoto", cuisine: "Japanese", rating: 4.6, priceForTwo: 2100, description: "A concise guide to market bites and seasonal Kyoto food.", image: photo("photo-1552566626-52f8b828add9", 900) },
];

export const shops: Shop[] = [
  { id: "hampi-bazaar", destinationId: "hampi", name: "Hampi Bazaar craft walk", category: "Crafts & souvenirs", description: "Browse small artisan stalls for stonework-inspired keepsakes, textiles and locally made gifts.", priceRange: "₹200 – ₹2,000" },
  { id: "anegundi-crafts", destinationId: "hampi", name: "Anegundi artisan studios", category: "Handmade textiles", description: "Look for small-batch banana-fibre and hand-crafted pieces; ask makers before photographing their work.", priceRange: "₹300 – ₹3,500" },
  { id: "munnar-tea-shop", destinationId: "munnar", name: "Estate tea & spice shop", category: "Tea & spices", description: "Compare labelled tea, cardamom, pepper and gift packs from established local sellers.", priceRange: "₹150 – ₹2,500" },
  { id: "munnar-handicrafts", destinationId: "munnar", name: "Munnar hill crafts", category: "Handmade gifts", description: "A practical stop for handloom shawls, natural soaps and small Kerala-made souvenirs.", priceRange: "₹250 – ₹2,000" },
  { id: "udaipur-hathi-pol", destinationId: "udaipur", name: "Hathi Pol artisan lane", category: "Art & miniatures", description: "Explore local art, miniature paintings and leather craft; agree on a price before a custom order.", priceRange: "₹300 – ₹5,000" },
  { id: "udaipur-bapu-bazaar", destinationId: "udaipur", name: "Bapu Bazaar textiles", category: "Textiles & jewellery", description: "A lively market for bandhani, mojari and silver jewellery. Check workmanship and keep receipts.", priceRange: "₹250 – ₹4,000" },
  { id: "chilika-craft-market", destinationId: "chilika", name: "Satapada local craft stalls", category: "Local gifts", description: "Pick small locally made keepsakes and support sellers who avoid protected shells and wildlife products.", priceRange: "₹100 – ₹1,500" },
  { id: "chilika-food-market", destinationId: "chilika", name: "Coastal food market", category: "Regional food", description: "Find packaged Odia snacks and regional ingredients; choose sealed goods for the journey home.", priceRange: "₹100 – ₹1,200" },
];

const destinationGuides: Record<string, DestinationGuide> = {
  hampi: {
    idealDuration: "2–3 relaxed days",
    arrivalTip: "Use Hospet as the practical rail-and-road gateway, then pre-book the short final transfer to your stay.",
    gettingAround: "Hire a bicycle, scooter or registered auto for spread-out sites. Walk the core ruins early or late in the day.",
    safetyNote: "Carry water, sun protection and cash for small vendors; uneven stone paths need sturdy footwear.",
    itinerary: [
      { time: "Day 1 · Morning", title: "Temple core", description: "Start at Virupaksha Temple and the bazaar before the heat builds." },
      { time: "Day 1 · Sunset", title: "Boulder panorama", description: "Finish at Matanga Hill or another approved viewpoint." },
      { time: "Day 2", title: "Vittala & river side", description: "See the stone chariot, then leave time for a slow river-side exploration." },
    ],
  },
  munnar: {
    idealDuration: "2–3 days",
    arrivalTip: "Cochin is the usual flight gateway; leave generous road time for the hill drive and avoid late-night arrivals in rain.",
    gettingAround: "Use a local cab for viewpoints and tea estates. Roads are winding, so keep each day lightly paced.",
    safetyNote: "Pack a light layer and rain cover. Follow park guidance and do not enter tea estates or trails without permission.",
    itinerary: [
      { time: "Day 1 · Afternoon", title: "Tea-country introduction", description: "Check in, take an estate walk and visit a tea-focused stop." },
      { time: "Day 2 · Morning", title: "Highrange nature", description: "Reserve Eravikulam or a permitted nature activity, subject to access conditions." },
      { time: "Day 3 · Sunrise", title: "Top Station views", description: "Go early for the clearest valley views, then keep the return drive unhurried." },
    ],
  },
  udaipur: {
    idealDuration: "2–3 days",
    arrivalTip: "Arrive by air, rail or road, then choose an old-city stay if you want the lakefront and markets within walking distance.",
    gettingAround: "Walk the old city when possible and use a registered auto or cab for hilltop and outer-city sights.",
    safetyNote: "Boat rides and popular rooftops are busiest near sunset; confirm timings and keep valuables close in crowded lanes.",
    itinerary: [
      { time: "Day 1 · Morning", title: "City Palace", description: "Explore the palace complex at a calm pace and pause for Lake Pichola views." },
      { time: "Day 1 · Evening", title: "Lakefront sunset", description: "Choose a responsible boat outing or a waterfront café reservation." },
      { time: "Day 2", title: "Markets & Monsoon Palace", description: "Shop artisan lanes, then head uphill for late-afternoon Aravalli views." },
    ],
  },
  chilika: {
    idealDuration: "1–2 days",
    arrivalTip: "Use Puri or Bhubaneswar as your wider transport base and arrange the final road transfer to Satapada in advance.",
    gettingAround: "Use registered boats only; ask the operator to explain the route, duration, life jackets and weather plan before departure.",
    safetyNote: "Protect the lagoon: never pursue wildlife, avoid plastic litter and postpone boat trips in unsafe weather.",
    itinerary: [
      { time: "Day 1 · Morning", title: "Satapada lagoon ride", description: "Begin early for softer light and a quieter water experience." },
      { time: "Day 1 · Midday", title: "Coastal lunch", description: "Pause for an Odia meal and allow time for the sea-mouth viewpoint." },
      { time: "Day 2 · Early morning", title: "Birding window", description: "Use an authorised guide or viewing area and follow seasonal access guidance." },
    ],
  },
};

export const destinationReviews: DestinationReview[] = [
  { destinationId: "hampi", author: "Aarav M.", tripType: "Friends · 2 nights", rating: 5, comment: "The route planner kept the temple sites and sunset viewpoint in a realistic order. Staying nearby made the early start easy." },
  { destinationId: "hampi", author: "Meera S.", tripType: "Solo trip · 3 nights", rating: 4, comment: "Great heritage stop. The water and footwear reminder was genuinely useful on the stone paths." },
  { destinationId: "munnar", author: "Nisha K.", tripType: "Couple · 3 nights", rating: 5, comment: "The tea-estate and park plan left enough space for the slow mountain drive instead of cramming every viewpoint in." },
  { destinationId: "munnar", author: "Rohan P.", tripType: "Family · 2 nights", rating: 4, comment: "The stay filters and weather note helped us pick a more comfortable family plan." },
  { destinationId: "udaipur", author: "Kavya R.", tripType: "Couple · Weekend", rating: 5, comment: "We saved the lake boat ride for sunset and used the shopping suggestions for a lovely market walk." },
  { destinationId: "udaipur", author: "Dev A.", tripType: "Friends · 2 nights", rating: 4, comment: "Clear city transport notes and a good split between palace time, food and markets." },
  { destinationId: "chilika", author: "Sonal D.", tripType: "Family · Day trip", rating: 5, comment: "The responsible boat checklist was useful. We were able to plan the lagoon outing without rushing." },
  { destinationId: "chilika", author: "Ishan P.", tripType: "Nature trip · 1 night", rating: 4, comment: "A calm, well-paced lake plan with the practical wildlife etiquette we were looking for." },
];

export const getDestinationGuide = (destination: Destination): DestinationGuide =>
  destinationGuides[destination.id] ?? {
    idealDuration: "2–3 days",
    arrivalTip: `Use the closest transport hub for ${destination.name} and arrange the final local transfer before you arrive.`,
    gettingAround: "Keep a local cab or registered transport option for longer distances, and leave room for unplanned stops.",
    safetyNote: "Check weather, opening hours and local guidance on the day. Keep emergency contacts and essential documents accessible.",
    itinerary: [
      { time: "Day 1 · Morning", title: "Find your bearings", description: `Begin with a signature ${destination.name} experience near your stay.` },
      { time: "Day 1 · Evening", title: "Eat local", description: "Choose a well-reviewed local meal and make space for a sunset walk." },
      { time: "Day 2", title: "Go deeper", description: "Use a local guide or curated route for a less-rushed second day." },
    ],
  };

export const getShopsForDestination = (destination: Destination): Shop[] => {
  const localShops = shops.filter((shop) => shop.destinationId === destination.id);
  return localShops.length ? localShops : [
    { id: `${destination.id}-local-market`, destinationId: destination.id, name: `${destination.name} local market walk`, category: "Regional finds", description: "Ask your host for an established local market and choose locally made products with clear pricing.", priceRange: "Varies" },
    { id: `${destination.id}-artisan-gifts`, destinationId: destination.id, name: "Local artisan gifts", category: "Handmade keepsakes", description: "Look for small workshops or cooperatives and check the maker, materials and return policy before buying.", priceRange: "Varies" },
  ];
};

export const getReviewsForDestination = (destination: Destination): DestinationReview[] => {
  const reviews = destinationReviews.filter((review) => review.destinationId === destination.id);
  return reviews.length ? reviews : [
    { destinationId: destination.id, author: "VOYARA traveller", tripType: "Sample trip", rating: 5, comment: `A balanced way to experience ${destination.name}, with room for local food and an unhurried highlight.` },
    { destinationId: destination.id, author: "Weekend explorer", tripType: "Sample trip", rating: 4, comment: "The practical travel notes made it easier to decide what to prioritise." },
  ];
};

export const getStaysForDestination = (destination: Destination): Stay[] => {
  const localStays = stays.filter((stay) => stay.destinationId === destination.id);
  if (localStays.length) return localStays;
  const basePrice = Math.max(2500, Math.round(destination.fromPrice / 3 / 100) * 100);
  return [
    { id: `suggested-${destination.id}-stay`, destinationId: destination.id, name: `${destination.name} Local Stay`, destination: destination.name, country: destination.country, state: destination.region, district: destination.name, type: "Hotel", rating: 4.5, reviews: 124, price: basePrice, image: destination.image, amenities: ["Breakfast", "Local support", "Wi-Fi"] },
    { id: `suggested-${destination.id}-retreat`, destinationId: destination.id, name: `${destination.name} Explorer Retreat`, destination: destination.name, country: destination.country, state: destination.region, district: destination.name, type: "Homestay", rating: 4.4, reviews: 88, price: Math.max(2200, basePrice - 700), image: destination.image, amenities: ["Local host", "Flexible check-in", "Travel desk"] },
  ];
};

export const locationOptions = {
  countries: [...new Set(places.map((item) => item.country))].sort(),
  states: (country?: string) => [...new Set(places.filter((item) => !country || item.country === country).map((item) => item.state))].sort(),
  districts: (country?: string, state?: string) => [...new Set(places.filter((item) => (!country || item.country === country) && (!state || item.state === state)).map((item) => item.district))].sort(),
};

export const formatINR = (amount: number) =>
  new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 }).format(amount);
