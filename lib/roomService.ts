import { supabase } from "./supabaseClient";

function makeRoomCode(length = 6) {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  let out = "";
  for (let i = 0; i < length; i++) {
    out += chars[Math.floor(Math.random() * chars.length)];
  }
  return out;
}

// إنشاء غرفة جديدة + إضافة المضيف كلاعب أول
export async function createRoomAndHost(hostName: string) {
  const roomCode = makeRoomCode(6);

  // 1. أنشئ الغرفة
  const { error: roomError } = await supabase.from("rooms").insert([
    {
      room_code: roomCode,
      players: [],
    },
  ]);
  if (roomError) {
    console.error("roomError:", roomError);
    throw roomError;
  }

  // 2. أضف المضيف في player_rooms
  const { data: playerInsert, error: playerError } = await supabase
    .from("player_rooms")
    .insert([
      {
        room_code: roomCode,
        player_name: hostName,
        score: 0,
      },
    ])
    .select("*")
    .single();

  if (playerError) {
    console.error("playerError:", playerError);
    throw playerError;
  }

  return {
    roomCode,
    player: playerInsert,
  };
}

// انضمام لاعب عادي لغرفة موجودة
export async function joinRoom(roomCode: string, playerName: string) {
  // تأكد أن الغرفة موجودة
  const { data: roomData, error: roomFetchError } = await supabase
    .from("rooms")
    .select("*")
    .eq("room_code", roomCode)
    .single();

  if (roomFetchError || !roomData) {
    console.error("roomFetchError:", roomFetchError);
    throw new Error("الغرفة غير موجودة");
  }

  // أضف اللاعب الجديد
  const { data: newPlayer, error: insertError } = await supabase
    .from("player_rooms")
    .insert([
      {
        room_code: roomCode,
        player_name: playerName,
        score: 0,
      },
    ])
    .select("*")
    .single();

  if (insertError) {
    console.error("insertError:", insertError);
    throw insertError;
  }

  // رجّع كل اللاعبين الحاليين في الغرفة
  const { data: playersList, error: listError } = await supabase
    .from("player_rooms")
    .select("*")
    .eq("room_code", roomCode);

  if (listError) {
    console.error("listError:", listError);
    throw listError;
  }

  return {
    room: roomData,
    player: newPlayer,
    allPlayers: playersList ?? [],
  };
}
