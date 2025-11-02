import { supabase } from "./lib/supabaseClient";

async function testConnection() {
  // جرّب تسحب الصفوف من جدول rooms
  const { data, error } = await supabase
    .from("rooms")
    .select("*")
    .limit(5);

  if (error) {
    console.error("❌ Error talking to Supabase:", error.message);
  } else {
    console.log("✅ Connected! Data from Supabase:", data);
  }
}

testConnection();
