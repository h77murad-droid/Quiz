import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = "https://qxzwkoohoqwldhybbwgl.supabase.co"; 
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InF4endrb29ob3F3bGRoeWJid2dsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjIwNjY0MjksImV4cCI6MjA3NzY0MjQyOX0.94UkVqUYaDniW3diSXmXUnLKGyvv3Qm9826iKTtGqdA";// هنا ضع ال anon public key حقك كامل

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
  realtime: {
    params: {
      eventsPerSecond: 10,
    },
  },
});
