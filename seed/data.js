// Placeholder images: same seed always returns the same picture
const img = (seed) => `https://picsum.photos/seed/${seed}/800/600`;

const categories = [
  { name: "Wedding Venue", isFeatured: true, description: "Palaces, forts and resorts for your celebration in Rajasthan." },
  { name: "DJ & Multimedia", isFeatured: true, description: "Trusted music and DJ professionals for your celebration." },
  { name: "Caterers", isFeatured: true, description: "Royal Rajasthani and multi-cuisine wedding catering." },
  { name: "Photographers", isFeatured: true, description: "Candid and traditional wedding photographers." },
  { name: "Mehandi Artist", description: "Bridal and guest mehandi designs." },
  { name: "Makeup Artist", description: "Bridal, party and family makeup." },
  { name: "Decorators", description: "Theme decor, floral design and stage setup." },
  { name: "Anchor", description: "Hosts for sangeet, haldi and wedding ceremonies." },
  { name: "Dhol", description: "Traditional dhol players for baraat and sangeet." },
  { name: "Baraat Band", description: "Brass bands for a grand baraat entry." },
  { name: "Live Band", description: "Live music for receptions and sangeet nights." },
  { name: "Wedding Cakes", description: "Custom multi-tier wedding cakes." },
  { name: "Fleet Services", description: "Vintage cars, luxury cars and guest transport." },
  { name: "Choreographer", description: "Sangeet and couple dance choreography." },
  { name: "Entertainment", description: "Folk artists, fireworks and special acts." },
].map((c, i) => ({ ...c, image: img(`category-${i}`) }));

const cities = [
  { name: "Jaipur", isPopular: true, description: "The Pink City blends royal heritage with modern luxury, with venues like Rambagh Palace, Fairmont and Samode Palace." },
  { name: "Udaipur", isPopular: true, description: "The City of Lakes is one of the most romantic wedding destinations in India, known for its lake palaces." },
  { name: "Jodhpur", isPopular: true, description: "The Blue City is home to graceful palaces and magnificent forts for a picture-perfect royal wedding." },
  { name: "Pushkar", isPopular: true, description: "A city of holy temples and ghats, loved for spiritual and grand destination weddings." },
  { name: "Bikaner", isPopular: true, description: "Medieval havelis and forts make Bikaner perfect for a theme wedding in Rajasthan." },
  { name: "Ujjain", isPopular: true, description: "One of India's holiest cities, chosen for weddings with deep spiritual significance." },
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
].map((c, i) => ({ ...c, images: [img(`city-${i}-a`), img(`city-${i}-b`), img(`city-${i}-c`)] }));

// category and city are slugs, turned into ids by the seed script
const vendors = [
  { name: "Story Makers Jaipur", category: "photographers", city: "jaipur", isPrime: true, videoMeeting: true, priceRanges: ["1L-5L"], startingPrice: 100000 },
  { name: "Vivaah India", category: "decorators", city: "jaipur", isPrime: true, videoMeeting: true, priceRanges: ["12L-15L", "15L-20L", "20L-25L"], startingPrice: 1200000 },
  { name: "Rekha Bridal Studio", category: "makeup-artist", city: "jaipur", isPrime: true, videoMeeting: true, priceRanges: ["20K-30K", "30K-50K"], startingPrice: 20000 },
  { name: "Shahi Caterers", category: "caterers", city: "jaipur", isPrime: true, videoMeeting: true, priceRanges: ["1000-1500 per plate"], startingPrice: 1000 },
  { name: "Rekha Mehandi Art", category: "mehandi-artist", city: "jaipur", isPrime: true, videoMeeting: true, priceRanges: ["5K-10K", "10K-20K", "20K-30K"], startingPrice: 5000 },
  { name: "Lake Palace Events", category: "wedding-venue", city: "udaipur", isPrime: true, videoMeeting: false, priceRanges: ["25L-50L"], startingPrice: 2500000 },
  { name: "Beat Drop DJs", category: "dj-multimedia", city: "udaipur", isPrime: false, videoMeeting: true, priceRanges: ["50K-1L"], startingPrice: 50000 },
  { name: "Blue City Clicks", category: "photographers", city: "jodhpur", isPrime: true, videoMeeting: true, priceRanges: ["75K-2L"], startingPrice: 75000 },
  { name: "Marwar Rasoi", category: "caterers", city: "jodhpur", isPrime: false, videoMeeting: false, priceRanges: ["800-1200 per plate"], startingPrice: 800 },
  { name: "Royal Baraat Band", category: "baraat-band", city: "pushkar", isPrime: false, videoMeeting: false, priceRanges: ["30K-60K"], startingPrice: 30000 },
  { name: "Golden Sands Camp", category: "wedding-venue", city: "jaisalmer", isPrime: false, videoMeeting: true, priceRanges: ["10L-20L"], startingPrice: 1000000 },
  { name: "Sangeet Steps", category: "choreographer", city: "jaipur", isPrime: false, videoMeeting: true, priceRanges: ["25K-50K"], startingPrice: 25000 },
].map((v, i) => ({
  ...v,
  images: [img(`vendor-${i}-a`), img(`vendor-${i}-b`)],
  description: `${v.name} is a trusted wedding vendor for destination weddings in Rajasthan.`,
}));

module.exports = { categories, cities, vendors };
