import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { getPlayersInRoom, Player } from '../lib/roomService';

const LeaderboardScreen = () => {
  const router = useRouter();
  const { roomCode, finalScore, playerName } = useLocalSearchParams();
  const [players, setPlayers] = useState<Player[]>([]);

  useEffect(() => {
    const fetchPlayers = async () => {
      if (roomCode) {
        const roomPlayers = await getPlayersInRoom(roomCode as string);

        const playerIndex = roomPlayers.findIndex(p => p.player_name === playerName);
        if (playerIndex !== -1) {
          roomPlayers[playerIndex].score = parseInt(finalScore as string, 10);
        }

        setPlayers(roomPlayers.sort((a, b) => b.score - a.score));
      }
    };
    fetchPlayers();
  }, [roomCode, finalScore, playerName]);

  const renderPlayer = ({ item, index }: { item: Player, index: number }) => (
    <View style={styles.playerRow}>
      <Text style={styles.rank}>{index + 1}</Text>
      <Text style={styles.playerName}>{item.player_name}</Text>
      <Text style={styles.score}>{item.score}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>🏆 لوحة الأوائل 🏆</Text>
      <Text style={styles.subtitle}>النتائج النهائية للغرفة: {roomCode}</Text>

      <FlatList
        data={players}
        renderItem={renderPlayer}
        keyExtractor={item => item.id}
        style={styles.list}
      />

      <TouchableOpacity
        style={styles.homeButton}
        onPress={() => router.push('/')}
      >
        <Text style={styles.homeButtonText}>العودة للرئيسية</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0f172a',
    padding: 24,
    alignItems: 'center',
  },
  title: {
    color: '#f59e0b',
    fontSize: 32,
    fontWeight: 'bold',
    marginTop: 50,
    marginBottom: 10,
  },
  subtitle: {
    color: '#94a3b8',
    fontSize: 18,
    marginBottom: 30,
  },
  list: {
    width: '100%',
  },
  playerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1e293b',
    borderRadius: 12,
    padding: 16,
    marginBottom: 10,
  },
  rank: {
    color: '#f59e0b',
    fontSize: 20,
    fontWeight: 'bold',
    marginRight: 15,
  },
  playerName: {
    color: '#fff',
    fontSize: 18,
    flex: 1,
  },
  score: {
    color: '#10b981',
    fontSize: 20,
    fontWeight: 'bold',
  },
  homeButton: {
    backgroundColor: '#1d4ed8',
    borderRadius: 12,
    paddingVertical: 16,
    paddingHorizontal: 32,
    marginTop: 30,
  },
  homeButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default LeaderboardScreen;
