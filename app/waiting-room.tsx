// app/waiting-room.tsx أو المسار اللي عندك فعلياً
import { useEffect, useState } from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";

// لو كنت تستخدم expo-router:
import { useLocalSearchParams } from "expo-router";

// استيراد الخدمات
import {
  Player,
  subscribeToRoomPlayers,
} from "../lib/roomService"; // عدّل المسار حسب مكان الملف فعلاً

export default function WaitingRoomScreen() {
  // هنا نفترض انك مررّت roomCode و playerName في التنقل
  // مثلاً: router.push({ pathname: "/waiting-room", params: { roomCode, playerName } })
  const { roomCode, playerName } = useLocalSearchParams<{
    roomCode: string;
    playerName: string;
  }>();

  const [players, setPlayers] = useState<Player[]>([]);

  useEffect(() => {
    if (!roomCode) return;

    // نفعل الاشتراك
    const unsubscribe = subscribeToRoomPlayers(roomCode, (updatedPlayers) => {
      setPlayers(updatedPlayers);
    });

    // تنظيف عند مغادرة الصفحة
    return () => {
      unsubscribe();
    };
  }, [roomCode]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        غرفة الانتظار <Text style={styles.emoji}>⏰</Text>
      </Text>

      <Text style={styles.sectionLabel}>وضع اللاعب</Text>

      <View style={styles.badgeRow}>
        <Text style={styles.badgeIcon}>✅</Text>
        <Text style={styles.badgeText}>
          مرحباً {playerName ? playerName : "مجهول"}!
        </Text>
      </View>

      <Text style={styles.roomCode}>كود الغرفة: {roomCode}</Text>

      <Text style={styles.sectionLabel}>اللاعبون المتصلون حالياً:</Text>

      <FlatList
        data={players}
        keyExtractor={(item) => item.id}
        renderItem={({ item, index }) => (
          <View style={styles.playerRow}>
            <Text style={styles.playerIndex}>{index + 1}.</Text>
            <Text style={styles.playerName}>{item.player_name}</Text>
          </View>
        )}
        ListEmptyComponent={
          <Text style={styles.emptyNote}>لا يوجد لاعبون آخرون بعد...</Text>
        }
        style={{ width: "100%" }}
      />

      <Text style={styles.waitNote}>
        انتظر المضيف يبدأ الجولة...
      </Text>
    </View>
  );
}

// ستايلات بسيطة - عدل الألوان حسب ثيمك الحالي
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0f172a", // خلفية داكنة
    alignItems: "center",
    justifyContent: "flex-start",
    paddingTop: 120,
    paddingHorizontal: 24,
  },
  title: {
    fontSize: 32,
    fontWeight: "700",
    color: "#fff",
    marginBottom: 24,
    textAlign: "center",
  },
  emoji: {
    fontSize: 28,
  },
  sectionLabel: {
    fontSize: 20,
    fontWeight: "700",
    color: "#fde047", // أصفر
    textAlign: "center",
    marginTop: 12,
    marginBottom: 8,
  },
  badgeRow: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#1e293b", // رمادي أغمق
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 12,
    marginBottom: 12,
  },
  badgeIcon: {
    fontSize: 20,
    marginRight: 8,
    color: "#22c55e",
  },
  badgeText: {
    color: "#fff",
    fontSize: 18,
  },
  roomCode: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 20,
    textAlign: "center",
  },
  playerRow: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#1e293b",
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 12,
    marginBottom: 8,
    width: "100%",
  },
  playerIndex: {
    color: "#38bdf8",
    fontWeight: "700",
    fontSize: 16,
    width: 28,
  },
  playerName: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  emptyNote: {
    color: "#94a3b8",
    fontSize: 14,
    textAlign: "center",
    marginTop: 8,
    fontStyle: "italic",
  },
  waitNote: {
    color: "#fff",
    fontSize: 16,
    textAlign: "center",
    marginTop: 24,
    opacity: 0.8,
  },
});
