import { router } from "expo-router";
import { useState } from "react";
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";

export default function Host() {
  const [roomCode, setRoomCode] = useState(createRandomCode());

  // توليد كود غرفة عشوائي بسيط، 4 أرقام
  function createRandomCode() {
    return Math.floor(1000 + Math.random() * 9000).toString();
  }

  const regenerateCode = () => {
    setRoomCode(createRandomCode());
  };

  const goToLobby = () => {
    // لاحقاً نعرض قائمة اللاعبين في "غرفة الانتظار للمضيف"
    // الآن سنعيد استخدام نفس /waiting-room مع باراميتر خاص بالمضيف
    router.push(`/waiting-room?host=1&code=${encodeURIComponent(roomCode)}`);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>🎛 إعداد جلسة جديدة</Text>
      <Text style={styles.label}>كود الغرفة الذي سيشارك به اللاعبون:</Text>

      <View style={styles.codeRow}>
        <TextInput
          style={styles.codeInput}
          value={roomCode}
          onChangeText={setRoomCode}
        />
        <TouchableOpacity style={styles.smallButton} onPress={regenerateCode}>
          <Text style={styles.smallButtonText}>تجديد</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.hint}>
        أعطِ هذا الكود للناس. كل لاعب يكتب الكود في شاشة "أنا لاعب" ويدخل.
      </Text>

      <TouchableOpacity style={styles.startButton} onPress={goToLobby}>
        <Text style={styles.startButtonText}>ابدأ استقبال اللاعبين</Text>
      </TouchableOpacity>

      <Text style={styles.subHint}>
        (الخطوة التالية لاحقاً: تشوف قائمة الأسماء اللي دخلت الغرفة في الوقت الحقيقي)
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0d1220",
    padding: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    color: "white",
    fontSize: 26,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  label: {
    color: "#a5f3fc",
    fontSize: 16,
    marginBottom: 10,
    textAlign: "center",
  },
  codeRow: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
    gap: 10,
  },
  codeInput: {
    flex: 1,
    backgroundColor: "white",
    fontSize: 24,
    textAlign: "center",
    borderRadius: 8,
    paddingVertical: 12,
    fontWeight: "bold",
    letterSpacing: 4,
  },
  smallButton: {
    backgroundColor: "#475569",
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
  },
  smallButtonText: {
    color: "white",
    fontSize: 14,
    fontWeight: "600",
  },
  hint: {
    color: "#ccc",
    fontSize: 14,
    textAlign: "center",
    marginBottom: 30,
    marginTop: 8,
    lineHeight: 20,
  },
  startButton: {
    backgroundColor: "#16a34a",
    width: "100%",
    borderRadius: 10,
    paddingVertical: 16,
    alignItems: "center",
    marginBottom: 16,
  },
  startButtonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "700",
  },
  subHint: {
    color: "#666",
    fontSize: 12,
    textAlign: "center",
    lineHeight: 18,
  },
});
