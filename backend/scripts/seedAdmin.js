// scripts/seedAdmin.js
// Run: node scripts/seedAdmin.js
// Pehli baar admin create karne ke liye

import mongoose from "mongoose";
import dotenv from "dotenv";
import { fileURLToPath } from "url";
import { dirname, join } from "path";
import Admin from "../models/Admin.model.js";

// __dirname ESM mein nahi hota, isliye manually banate hain
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// .env file backend root mein hai, scripts/ ke ek level upar
dotenv.config({ path: join(__dirname, "../.env") });

const seedAdmin = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ MongoDB connected");

    const existing = await Admin.findOne({ email: "admin@intallia24.com" });
    if (existing) {
      console.log("⚠️  Admin already exists!");
      process.exit(0);
    }

    await Admin.create({
      name: "Intallia Admin",
      email: "admin@intallia24.com",
      password: "Admin@123",
      role: "superadmin",
    });

    console.log("✅ Admin created successfully!");
    console.log("   Email: admin@intallia24.com");
    console.log("   Password: Admin@123");
    console.log("   ⚠️  Please change password after first login!");
  } catch (error) {
    console.error("❌ Seed error:", error.message);
  } finally {
    await mongoose.disconnect();
    process.exit(0);
  }
};

seedAdmin();
