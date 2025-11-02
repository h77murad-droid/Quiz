import { useState } from "react";
import { Alert, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { createRoomAndHost, joinRoom } from "../lib/roomService";

export default function HomeScreen() {
  // حق المضيف
  const [hostName, setHostName] = useState("");

  // حق اللاعب العادي
  const [joinName, setJoinName] = useState("");
  const [joinCode, setJoinCode] = useState("");

  // دالة: إنشاء غرفة جديدة وإضافة المضيف
  const handleCreateRoom = async () => {
    if (!hostName.trim()) {
      Alert.alert("تنبيه", "اكتب اسمك أولاً كمضيف.");
      return;
    }

    try {
      const { roomCode, player } = await createRoomAndHost(hostName.trim());

      Alert.alert(
        "🎉 تم إنشاء الغرفة",
        `كود الغرفة: ${roomCode}\nاسمك (المضيف): ${player.player_name}`
      );

      console.log("غرفة جديدة:", roomCode);
      console.log("المضيف:", player);
      // لاحقًا: بننقلك لشاشة الغرفة نفسها
    } catch (err: any) {
      console.error("خطأ في إنشاء الغرفة:", err);
      Alert.alert("خطأ", "ما قدرنا ننشئ الغرفة. جرّب مرة ثانية.");
    }
  };

  // دالة: الانضمام لغرفة موجودة
  const handleJoinRoom = async () => {
    if (!joinName.trim() || !joinCode.trim()) {
      Alert.alert("تنبيه", "اكتب اسمك وكود الغرفة.");
      return;
    }

    try {
      const { room, player, allPlayers } = await joinRoom(
        joinCode.trim(),
        joinName.trim()
      );

      Alert.alert(
        "✅ انضممت بنجاح",
        `دخلت غرفة: ${room.room_code}\nعدد اللاعبين الآن: ${allPlayers.length}`
      );

      console.log("الغرفة:", room);
      console.log("اللاعب الجديد:", player);
      console.log("جميع اللاعبين:", allPlayers);
      // لاحقًا: بننقلك لشاشة الغرفة نفسها
    } catch (err: any) {
      console.error("خطأ في الانضمام:", err);
      Alert.alert("خطأ", "تعذر الانضمام. تأكد من الكود أو جرّب مرة ثانية.");
    }
  };

  return (
    <View style={styles.container}>
      {/* عنوان عام */}
      <Text style={styles.title}>🎮 لعبة المسابقات الذكية</Text>
      <Text style={styles.subtitle}>اختر واحد من الخيارين</Text>

      {/* قسم المضيف */}
      <View style={styles.cardHost}>
        <Text style={styles.cardTitle}>أنا المضيف 👑</Text>
        <Text style={styles.cardHint}>أنشئ غرفة جديدة وابدأ اللعبة</Text>

        <TextInput
          style={styles.input}
          placeholder="اكتب اسمك (مثلاً: حسن)"
          placeholderTextColor="#999"
          value={hostName}
          onChangeText={setHostName}
        />

        <TouchableOpacity style={[styles.button, styles.buttonCreate]} onPress={handleCreateRoom}>
          <Text style={styles.buttonText}>إنشاء غرفة جديدة</Text>
        </TouchableOpacity>
      </View>

      {/* قسم اللاعب */}
      <View style={styles.cardJoin}>
        <Text style={styles.cardTitle}>أنا لاعب 🙋‍♂️</Text>
        <Text style={styles.cardHint}>ادخل كود الغرفة واسمك</Text>

        <TextInput
          style={styles.input}
          placeholder="كود الغرفة (مثلاً EOAT6V)"
          placeholderTextColor="#999"
          autoCapitalize="characters"
          value={joinCode}
          onChangeText={setJoinCode}
        />

        <TextInput
          style={styles.input}
          placeholder="اسمك (مثلاً: علي)"
          placeholderTextColor="#999"
          value={joinName}
          onChangeText={setJoinName}
        />

        <TouchableOpacity style={[styles.button, styles.buttonJoin]} onPress={handleJoinRoom}>
          <Text style={styles.buttonText}>انضم للغرفة</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

// ستايلات بسيطة مبدئية
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0d1321",
    paddingHorizontal: 20,
    paddingTop: 60,
  },
  title: {
    color: "white",
    fontSize: 24,
    fontWeight: "700",
    textAlign: "center",
    marginBottom: 6,
  },
  subtitle: {
    color: "#bbb",
    fontSize: 14,
    textAlign: "center",
    marginBottom: 24,
  },
  cardHost: {
    backgroundColor: "#1a1f35",
    borderRadius: 12,
    padding: 16,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: "#3a3f63",
  },
  cardJoin: {
    backgroundColor: "#10291a",
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: "#254f2f",
  },
  cardTitle: {
    color: "white",
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 4,
    textAlign: "center",
  },
  cardHint: {
    color: "#888",
    fontSize: 13,
    textAlign: "center",
    marginBottom: 16,
  },
  input: {
    backgroundColor: "#2a314d",
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 16,
    color: "white",
    marginBottom: 12,
  },
  button: {
    borderRadius: 8,
    paddingVertical: 12,
  },
  buttonCreate: {
    backgroundColor: "#1e40af", // أزرق
  },
  buttonJoin: {
    backgroundColor: "#065f46", // أخضر غامق
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
    textAlign: "center",
  },
});
