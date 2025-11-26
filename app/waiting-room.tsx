import { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Alert } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Player, subscribeToRoomPlayers } from '../lib/roomService';

export default function WaitingRoomScreen() {
  const { roomCode, playerName } = useLocalSearchParams<{ roomCode: string; playerName: string }>();
  const router = useRouter();
  const [players, setPlayers] = useState<Player[]>([]);
  const isHost = players.length > 0 && players[0].player_name === playerName;

  useEffect(() => {
    if (!roomCode) return;

    const unsubscribe = subscribeToRoomPlayers(roomCode, (updatedPlayers) => {
      setPlayers(updatedPlayers);
    });

    return () => unsubscribe();
  }, [roomCode]);

  const handleStartGame = () => {
    if (players.length < 2) {
      Alert.alert("انتظر!", "يجب أن يكون هناك لاعبان على الأقل لبدء اللعبة.");
      return;
    }
    router.push(`/QuizScreen?roomCode=${roomCode}`);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>غرفة الانتظار <Text style={styles.emoji}>⏰</Text></Text>
      <View style={styles.badgeRow}>
        <Text style={styles.badgeIcon}>✅</Text>
        <Text style={styles.badgeText}>مرحباً {playerName || "مجهول"}!</Text>
      </View>
      <Text style={styles.roomCode}>كود الغرفة: {roomCode}</Text>
      <Text style={styles.sectionLabel}>اللاعبون المتصلون حالياً:</Text>
      <FlatList
        data={players}
        keyExtractor={(item) => item.id}
        renderItem={({ item, index }) => (
          <View style={styles.playerRow}>
            <Text style={styles.playerIndex}>{index + 1}.</Text>
            <Text style={styles.playerName}>{item.player_name} {index === 0 ? "(المضيف)" : ""}</Text>
          </View>
        )}
        ListEmptyComponent={<Text style={styles.emptyNote}>لا يوجد لاعبون آخرون بعد...</Text>}
        style={{ width: "100%" }}
      />
      {isHost ? (
        <TouchableOpacity style={styles.startButton} onPress={handleStartGame}>
          <Text style={styles.startButtonText}>🚀 ابدأ اللعبة</Text>
        </TouchableOpacity>
      ) : (
        <Text style={styles.waitNote}>انتظر المضيف لبدء الجولة...</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0f172a",
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
    color: "#fde047",
    textAlign: "center",
    marginTop: 12,
    marginBottom: 8,
  },
  badgeRow: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#1e293b",
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
  startButton: {
    backgroundColor: '#10b981',
    borderRadius: 12,
    paddingVertical: 16,
    paddingHorizontal: 32,
    marginTop: 30,
    shadowColor: '#10b981',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
  },
  startButtonText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
});
