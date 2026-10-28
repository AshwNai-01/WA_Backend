// Photos are free-licence Unsplash images, each checked by eye to match its
// category, vendor or city. Items without a fitting photo get none, and the
// frontend shows a fallback instead of a random picture.
// Fixed 800x600 crop so every card photo has the same shape
const unsplash = (id) => `https://images.unsplash.com/photo-${id}?w=800&h=600&q=75&auto=format&fit=crop`;

const PHOTOS = {
  // Categories and vendors
  palaceHall: "1761472606347-bfebc5a3e546",
  mandapHall: "1587271407850-8d438ca9fdf2",
  outdoorMandapAisle: "1772127822552-ce9ef537bdcf",
  djCrowd: "1574155376612-bfa4ed8aabfd",
  djDecks: "1470225620780-dba8ba36b745",
  thali: "1565556250026-9ba22083e3e0",
  foodSpread: "1680490964889-67a5ab8d8b54",
  coupleAtPalace: "1756190564669-215843660e93",
  coupleInRed: "1665960213508-48f07086d49c",
  coupleByRiver: "1630526720753-aa4e71acf67d",
  coupleCandid: "1633104502699-b2ecf0fee294",
  mehandiHands: "1505932794465-147d1f1b2c97",
  mehandiCloseUp: "1525135850648-b42365991054",
  brideSeated: "1610047614301-13c63f00c032",
  brideSmiling: "1684868268327-7e5590bcfbd6",
  brideVeil: "1617633150878-7df1d12a9a57",
  floralMandap: "1587271636175-90d58cdad458",
  colourfulEntrance: "1744891471118-f74c0453cd21",
  baraatBand: "1558262602-be15409416b5",
  turbanDrummers: "1644075681700-42ffc083f527",
  dancersOnSteps: "1756370256926-e48ca54c5efe",
  dancersFestival: "1645264090488-a019de493023",
  folkDancers: "1463592177119-bab2a00f3ccb",

  // Cities
  hawaMahal: "1769488150973-88db06e414e1",
  amberFort: "1599661046289-e31897846e41",
  patrikaGate: "1772522255879-d3e23227cd5b",
  cityPalaceUdaipur: "1615836245337-f5b9b2303f10",
  lakePalaceHotel: "1629210132098-592c636e3d1a",
  lakePichola: "1706961121527-4017856774c7",
  mehrangarhFort: "1569096610945-1a094be04c74",
  blueCityRooftops: "1686825780583-8be7c349a4b4",
  blueCityLane: "1590090750575-17b2cd4ceb85",
  pushkarGhats: "1668236305915-09785d2e73de",
  pushkarLake: "1584245231969-b906af752fd3",
  pushkarCamels: "1705924876779-d3c6818047c9",
  junagarhFort: "1652019126778-c0937662c884",
  bikanerHaveli: "1674909634726-2a810e89d25c",
  bikanerFacade: "1622225641765-8c8ef0dcb678",
  mahakaleshwar: "1658730487395-dcc99f5d997c",
  shipraRiver: "1699582908701-b362d1d52b9e",
  ujjainGhatsNight: "1695185577116-3513f730f722",
};

const photos = (...keys) => keys.map((k) => unsplash(PHOTOS[k]));

const categories = [
  { name: "Wedding Venue", isFeatured: true, image: "palaceHall", description: "Palaces, forts and resorts for your celebration in Rajasthan." },
  { name: "DJ & Multimedia", isFeatured: true, image: "djCrowd", description: "Trusted music and DJ professionals for your celebration." },
  { name: "Caterers", isFeatured: true, image: "thali", description: "Royal Rajasthani and multi-cuisine wedding catering." },
  { name: "Photographers", isFeatured: true, image: "coupleAtPalace", description: "Candid and traditional wedding photographers." },
  { name: "Mehandi Artist", image: "mehandiHands", description: "Bridal and guest mehandi designs." },
  { name: "Makeup Artist", image: "brideSeated", description: "Bridal, party and family makeup." },
  { name: "Decorators", image: "floralMandap", description: "Theme decor, floral design and stage setup." },
  { name: "Anchor", description: "Hosts for sangeet, haldi and wedding ceremonies." },
  { name: "Dhol", image: "turbanDrummers", description: "Traditional dhol players for baraat and sangeet." },
  { name: "Baraat Band", image: "baraatBand", description: "Brass bands for a grand baraat entry." },
  { name: "Live Band", description: "Live music for receptions and sangeet nights." },
  { name: "Wedding Cakes", description: "Custom multi-tier wedding cakes." },
  { name: "Fleet Services", description: "Vintage cars, luxury cars and guest transport." },
  { name: "Choreographer", image: "dancersOnSteps", description: "Sangeet and couple dance choreography." },
  { name: "Entertainment", image: "folkDancers", description: "Folk artists, fireworks and special acts." },
].map((c) => ({ ...c, image: c.image ? unsplash(PHOTOS[c.image]) : "" }));

const cities = [
  { name: "Jaipur", isPopular: true, images: photos("hawaMahal", "amberFort", "patrikaGate"), description: "The Pink City blends royal heritage with modern luxury, with venues like Rambagh Palace, Fairmont and Samode Palace." },
  { name: "Udaipur", isPopular: true, images: photos("cityPalaceUdaipur", "lakePalaceHotel", "lakePichola"), description: "The City of Lakes is one of the most romantic wedding destinations in India, known for its lake palaces." },
  { name: "Jodhpur", isPopular: true, images: photos("mehrangarhFort", "blueCityRooftops", "blueCityLane"), description: "The Blue City is home to graceful palaces and magnificent forts for a picture-perfect royal wedding." },
  { name: "Pushkar", isPopular: true, images: photos("pushkarGhats", "pushkarLake", "pushkarCamels"), description: "A city of holy temples and ghats, loved for spiritual and grand destination weddings." },
  { name: "Bikaner", isPopular: true, images: photos("junagarhFort", "bikanerHaveli", "bikanerFacade"), description: "Medieval havelis and forts make Bikaner perfect for a theme wedding in Rajasthan." },
  { name: "Ujjain", isPopular: true, images: photos("mahakaleshwar", "shipraRiver", "ujjainGhatsNight"), description: "One of India's holiest cities, chosen for weddings with deep spiritual significance." },
  { name: "Jaisalmer", description: "The Golden City offers desert camps and sandstone forts." },
  { name: "Mount Abu", description: "Rajasthan's only hill station, cool and green all year." },
  { name: "Ajmer", description: "A historic city close to Pushkar with heritage venues." },
  { name: "Neemrana", description: "A 15th-century fort palace close to Delhi." },
  { name: "Ranthambore", description: "Jungle resorts next to the famous tiger reserve." },
  { name: "Chittorgarh", description: "Home to one of the largest forts in India." },
  { name: "Kumbhalgarh", description: "Hill-top fort with a wall second only to the Great Wall." },
  { name: "Mandawa", description: "Painted havelis in the heart of Shekhawati." },
  { name: "Alwar", description: "Lakes, palaces and the Sariska reserve." },
  { name: "Goa", description: "Beach weddings by the Arabian Sea." },
].map((c) => ({ ...c, images: c.images ?? [] }));

// category and city are slugs, turned into ids by the seed script
const vendors = [
  { name: "Story Makers Jaipur", category: "photographers", city: "jaipur", isPrime: true, videoMeeting: true, priceRanges: ["1L-5L"], startingPrice: 100000, images: photos("coupleAtPalace", "coupleInRed") },
  { name: "Vivaah India", category: "decorators", city: "jaipur", isPrime: true, videoMeeting: true, priceRanges: ["12L-15L", "15L-20L", "20L-25L"], startingPrice: 1200000, images: photos("floralMandap", "colourfulEntrance") },
  { name: "Rekha Bridal Studio", category: "makeup-artist", city: "jaipur", isPrime: true, videoMeeting: true, priceRanges: ["20K-30K", "30K-50K"], startingPrice: 20000, images: photos("brideSmiling", "brideVeil") },
  { name: "Shahi Caterers", category: "caterers", city: "jaipur", isPrime: true, videoMeeting: true, priceRanges: ["1000-1500 per plate"], startingPrice: 1000, images: photos("thali", "foodSpread") },
  { name: "Rekha Mehandi Art", category: "mehandi-artist", city: "jaipur", isPrime: true, videoMeeting: true, priceRanges: ["5K-10K", "10K-20K", "20K-30K"], startingPrice: 5000, images: photos("mehandiCloseUp", "mehandiHands") },
  { name: "Lake Palace Events", category: "wedding-venue", city: "udaipur", isPrime: true, videoMeeting: false, priceRanges: ["25L-50L"], startingPrice: 2500000, images: photos("lakePalaceHotel", "mandapHall") },
  { name: "Beat Drop DJs", category: "dj-multimedia", city: "udaipur", isPrime: false, videoMeeting: true, priceRanges: ["50K-1L"], startingPrice: 50000, images: photos("djDecks", "djCrowd") },
  { name: "Blue City Clicks", category: "photographers", city: "jodhpur", isPrime: true, videoMeeting: true, priceRanges: ["75K-2L"], startingPrice: 75000, images: photos("coupleByRiver", "coupleCandid") },
  { name: "Marwar Rasoi", category: "caterers", city: "jodhpur", isPrime: false, videoMeeting: false, priceRanges: ["800-1200 per plate"], startingPrice: 800, images: photos("foodSpread", "thali") },
  { name: "Royal Baraat Band", category: "baraat-band", city: "pushkar", isPrime: false, videoMeeting: false, priceRanges: ["30K-60K"], startingPrice: 30000, images: photos("baraatBand", "turbanDrummers") },
  { name: "Golden Sands Camp", category: "wedding-venue", city: "jaisalmer", isPrime: false, videoMeeting: true, priceRanges: ["10L-20L"], startingPrice: 1000000, images: photos("outdoorMandapAisle", "palaceHall") },
  { name: "Sangeet Steps", category: "choreographer", city: "jaipur", isPrime: false, videoMeeting: true, priceRanges: ["25K-50K"], startingPrice: 25000, images: photos("dancersOnSteps", "dancersFestival") },
].map((v) => ({
  ...v,
  description: `${v.name} is a trusted wedding vendor for destination weddings in Rajasthan.`,
}));

module.exports = { categories, cities, vendors };
