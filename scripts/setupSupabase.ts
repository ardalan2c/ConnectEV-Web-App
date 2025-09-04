import { supabaseAdmin } from "../src/lib/supabase/server";

async function setupSupabaseStorage() {
  try {
    const admin = supabaseAdmin();
    
    // Create bucket if it doesn't exist
    const { data: buckets, error: listError } = await admin.storage.listBuckets();
    
    if (listError) {
      console.error("Error listing buckets:", listError);
      return;
    }
    
    const bucketExists = buckets.some(bucket => bucket.name === "lead-photos");
    
    if (!bucketExists) {
      console.log("Creating lead-photos bucket...");
      const { data, error } = await admin.storage.createBucket("lead-photos", {
        public: false,
        allowedMimeTypes: ["image/jpeg", "image/png", "image/webp", "image/heic"],
        fileSizeLimit: 10485760 // 10MB
      });
      
      if (error) {
        console.error("Error creating bucket:", error);
      } else {
        console.log("✅ Created lead-photos bucket successfully");
      }
    } else {
      console.log("✅ lead-photos bucket already exists");
    }
    
    console.log("✅ Supabase storage setup complete");
    console.log("📝 Next steps:");
    console.log("1. Run the SQL policies in your Supabase SQL editor (see supabase/policies.sql)");
    console.log("2. Add your SUPABASE_SERVICE_ROLE_KEY to .env.local");
    
  } catch (error) {
    console.error("Setup failed:", error);
    console.log("💡 Make sure SUPABASE_SERVICE_ROLE_KEY is set in .env.local");
  }
}

if (require.main === module) {
  setupSupabaseStorage();
}