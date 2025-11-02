// app/lib/roomService.ts
import { supabase } from "../lib/supabaseClient";

// تعريف نوع اللاعب
export interface Player {
  id: string;
  room_code: string;
  player_name: string;
  score: number;
  joined_at: string;
}

// إنشاء غرفة جديدة وإضافة المضيف كلاعب أول
export async function createRoom(hostName: string) {
  // توليد كود عشوائي للغرفة مثل ABC123 (6 حروف/أرقام)
  const roomCode = Math.random().toString(36).substring(2, 8).toUpperCase();

  const { data, error } = await supabase
    .from("room_players")
    .insert([
      {
        room_code: roomCode,
        player_name: hostName || "المضيف",
        score: 0,
      },
    ])
    .select("*")
    .single();

  if (error) {
    console.error("createRoom error:", error);
    throw error;
  }

  return {
    roomCode,
    hostPlayer: data,
  };
}

// انضمام لاعب جديد لغرفة موجودة
export async function joinRoom(roomCode: string, playerName: string) {
  const { data, error } = await supabase
    .from("room_players")
    .insert([
      {
        room_code: roomCode,
        player_name: playerName || "لاعب مجهول",
        score: 0,
      },
    ])
    .select("*")
    .single();

  if (error) {
    console.error("joinRoom error:", error);
    throw error;
  }

  return data;
}

// قراءة اللاعبين الحاليين في الغرفة (مرة واحدة)
export async function getPlayersInRoom(roomCode: string) {
  const { data, error } = await supabase
    .from("room_players")
    .select("*")
    .eq("room_code", roomCode)
    .order("joined_at", { ascending: true });

  if (error) {
    console.error("getPlayersInRoom error:", error);
    throw error;
  }

  return data as Player[];
}

/**
 * الاشتراك اللحظي (Realtime) على لاعبي الغرفة.
 * - onUpdate() تنادَى كل ما يصير تغيير (لاعب دخل/طلع/تغيّر اسمه)
 * - ترجع unsubscribe() لازم تنادَى في cleanup لما نطلع من الشاشة
 */
export function subscribeToRoomPlayers(
  roomCode: string,
  onUpdate: (players: Player[]) => void
) {
  const channel = supabase
    .channel(`room_players-${roomCode}`)
    .on(
      "postgres_changes",
      {
        event: "*", // أي تغيير (INSERT, UPDATE, DELETE)
        schema: "public",
        table: "room_players",
        filter: `room_code=eq.${roomCode}`,
      },
      async () => {
        // كل مرة يتغير شيء، رجع أحدث لستة من الداتا
        const latestPlayers = await getPlayersInRoom(roomCode);
        onUpdate(latestPlayers);
      }
    )
    .subscribe(async (status) => {
      // أول ما الاشتراك يشتغل، جيب اللاعبين الحاليين
      if (status === "SUBSCRIBED") {
        const initialPlayers = await getPlayersInRoom(roomCode);
        onUpdate(initialPlayers);
      }
    });

  // دالة إلغاء الاشتراك
  return () => {
    supabase.removeChannel(channel);
  };
}
