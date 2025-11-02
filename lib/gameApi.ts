import { supabase } from "./supabaseClient";

// دالة توليد كود غرفة عشوائي مثل ABC123
function generateRoomCode(length = 6) {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let out = "";
  for (let i = 0; i < length; i++) {
    out += chars[Math.floor(Math.random() * chars.length)];
  }
  return out;
}

// 1) إنشاء غرفة جديدة + إضافة المضيف كلاعب فيها
export async function createRoomAndHost(hostName: string) {
  // 1. ننشئ كود غرفة
  const room_code = generateRoomCode();

  // 2. نحاول إنشاء صف في جدول rooms
  const { error: roomError } = await supabase
    .from("rooms")
    .insert([{ room_code }]);

  if (roomError) {
    console.error("خطأ في إنشاء الغرفة:", roomError);
    throw new Error("فشل إنشاء الغرفة");
  }

  // 3. نضيف المضيف نفسه إلى جدول players كلاعب أول
  const { data: playerData, error: playerError } = await supabase
    .from("players")
    .insert([
      {
        room_code,
        player_name: hostName,
        score: 0,
      },
    ])
    .select("*")
    .single();

  if (playerError) {
    console.error("تم إنشاء الغرفة لكن فشل إضافة اللاعب:", playerError);
    throw new Error("الغرفة انخلقت لكن اللاعب ما انضاف");
  }

  // نرجع معلومات الغرفة ولاعب المضيف
  return {
    room_code,
    host_player: playerData,
  };
}

// 2) انضمام لاعب عادي لغرفة موجودة
export async function joinRoom(room_code: string, playerName: string) {
  // أول شي نتأكد أن الغرفة موجودة فعلاً
  const { data: roomCheck, error: roomCheckError } = await supabase
    .from("rooms")
    .select("*")
    .eq("room_code", room_code)
    .single();

  if (roomCheckError || !roomCheck) {
    console.error("ما لقينا الغرفة:", roomCheckError);
    throw new Error("كود الغرفة غير صحيح أو الغرفة غير موجودة");
  }

  // إذا الغرفة موجودة، نضيف اللاعب في players
  const { data: playerData, error: playerError } = await supabase
    .from("players")
    .insert([
      {
        room_code,
        player_name: playerName,
        score: 0,
      },
    ])
    .select("*")
    .single();

  if (playerError) {
    console.error("فشل الانضمام للغرفة:", playerError);
    throw new Error("ما قدرنا ندخلك الغرفة");
  }

  return {
    joined: true,
    player: playerData,
  };
}

// 3) جلب قائمة اللاعبين الحاليين في الغرفة
export async function getPlayersInRoom(room_code: string) {
  const { data, error } = await supabase
    .from("players")
    .select("id, player_name, score, joined_at")
    .eq("room_code", room_code)
    .order("joined_at", { ascending: true });

  if (error) {
    console.error("خطأ في جلب اللاعبين:", error);
    throw new Error("فشل تحميل اللاعبين");
  }

  return data || [];
}
