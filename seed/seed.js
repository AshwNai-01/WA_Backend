// Clears and refills the database: npm run seed
require("dotenv").config();

const mongoose = require("mongoose");
const connectDB = require("../config/db");
const Category = require("../models/Category");
const City = require("../models/City");
const Vendor = require("../models/Vendor");
const User = require("../models/User");
const data = require("./data");

const seed = async () => {
  if (process.env.NODE_ENV === "production") {
    throw new Error("Refusing to seed in production");
  }

  await connectDB();

  await Promise.all([Category.deleteMany(), City.deleteMany(), Vendor.deleteMany(), User.deleteMany()]);
  console.log("Old data removed");

  // create() runs the slug hooks; insertMany would skip some of them
  const categories = await Category.create(data.categories);
  const cities = await City.create(data.cities);

  const categoryIds = Object.fromEntries(categories.map((c) => [c.slug, c._id]));
  const cityIds = Object.fromEntries(cities.map((c) => [c.slug, c._id]));

  const vendors = data.vendors.map((v) => {
    if (!categoryIds[v.category]) throw new Error(`Unknown category slug: ${v.category}`);
    if (!cityIds[v.city]) throw new Error(`Unknown city slug: ${v.city}`);
    return { ...v, category: categoryIds[v.category], city: cityIds[v.city] };
  });
  await Vendor.create(vendors);

  const { ADMIN_NAME, ADMIN_EMAIL, ADMIN_PASSWORD } = process.env;
  if (ADMIN_EMAIL && ADMIN_PASSWORD) {
    await User.create({ name: ADMIN_NAME || "Admin", email: ADMIN_EMAIL, password: ADMIN_PASSWORD, role: "admin" });
    console.log(`Admin user created: ${ADMIN_EMAIL}`);
  } else {
    console.log("ADMIN_EMAIL / ADMIN_PASSWORD not set, skipped admin user");
  }

  console.log(`Seeded ${categories.length} categories, ${cities.length} cities, ${vendors.length} vendors`);
};

seed()
  .catch((err) => {
    console.error("Seed failed:", err.message);
    process.exitCode = 1;
  })
  .finally(() => mongoose.disconnect());
