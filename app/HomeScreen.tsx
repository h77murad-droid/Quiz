import { useRouter } from "expo-router";
import { useState } from "react";
import { Alert, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";

import {
    createRoom,
    joinRoom,
} from "../lib/roomService"; // تأكد من المسار (لو lib في نفس المستوى اكتب ./lib/roomService ، لو lib فوق اكتب ../lib/roomService)

export default function HomeScreen() {
  const router = useRouter();

  // اسم اللاعب/المضيف
  const [name, setName] = useState("");
  // كود الغرفة (يستخدمه اللاعب فقط)
  const [joinCode, setJoinCode] = useState("");

  async function handleHostPress() {
    try {
      // تأكد من الاسم
      const finalName = name && name.trim().length > 0 ? name.trim() : "المضيف";

      // 1. أنشئ الغرفة وسجل نفسك اول لاعب
      const { roomCode } = await createRoom(finalName);

      // 2. انتقل إلى غرفة الانتظار ومرر كود الغرفة
      router.push(`/waiting-room?roomCode=${roomCode}`);
    } catch (err: any) {
      console.error("خطأ عند إنشاء الغرفة:", err);
      Alert.alert("خطأ", "تعذر إنشاء الغرفة.");
    }
  }

  async function handleJoinPress() {
    try {
      if (!joinCode.trim()) {
        Alert.alert("تنبيه", "الرجاء إدخال كود الغرفة للانضمام.");
        return;
      }

      const finalName = name && name.trim().length > 0 ? name.trim() : "لاعب مجهول";

      // ينضم كلاعب موجود
      await joinRoom(joinCode.trim(), finalName);

      // يروح نفس غرفة الانتظار
      router.push(`/waiting-room?roomCode=${joinCode.trim()}`);
    } catch (err: any) {
      console.error("خطأ عند الانضمام:", err);
      Alert.alert("خطأ", "فشل الانضمام. تأكد من كود الغرفة.");
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>لعبة المسابقات الذكية</Text>
      <Text style={styles.sub}>اختر وضعك</Text>

      {/* إدخال الاسم */}
      <View style={styles.card}>
        <Text style={styles.label}>اسمك (اختياري):</Text>
        <TextInput
          style={styles.input}
          placeholder="اكتب اسمك..."
          placeholderTextColor="#999"
          value={name}
          onChangeText={setName}
        />
      </View>

      {/* أزرار الوضع */}
      <TouchableOpacity style={[styles.bigButton, { backgroundColor: "#1d4ed8" }]} onPress={handleHostPress}>
        <Text style={styles.bigButtonText}>✍️ أنا المضيف</Text>
        <Text style={styles.smallNote}>إنشاء غرفة + الأسئلة</Text>
      </TouchableOpacity>

      <View style={{ height: 16 }} />

      {/* إدخال كود غرفة للانضمام كلاعب */}
      <View style={styles.card}>
        <Text style={styles.label}>كود الغرفة</Text>
        <TextInput
          style={styles.input}
          placeholder="ادخل كود الغرفة (مثلاً: 87HM9U)"
          placeholderTextColor="#999"
          autoCapitalize="characters"
          value={joinCode}
          onChangeText={setJoinCode}
        />
      </View>

      <TouchableOpacity style={[styles.bigButton, { backgroundColor: "#065f46" }]} onPress={handleJoinPress}>
        <Text style={styles.bigButtonText}>👋 أنا لاعب</Text>
        <Text style={styles.smallNote}>انضم بإدخال كود الغرفة</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0f172a",
    paddingHorizontal: 24,
    paddingTop: 80,
  },
  title: {
    color: "#fff",
    fontSize: 28,
    fontWeight: "700",
    textAlign: "center",
    marginBottom: 8,
  },
  sub: {
    color: "#94a3b8",
    fontSize: 16,
    textAlign: "center",
    marginBottom: 32,
  },
  card: {
    backgroundColor: "#1e293b",
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
  },
  label: {
    color: "#fff",
    fontSize: 16,
    marginBottom: 8,
    fontWeight: "600",
  },
  input: {
    backgroundColor: "#0f172a",
    color: "#fff",
    borderWidth: 1,
    borderColor: "#475569",
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 16,
  },
  bigButton: {
    borderRadius: 12,
    paddingVertical: 16,
    paddingHorizontal: 20,
  },
  bigButtonText: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "700",
    textAlign: "center",
  },
  smallNote: {
    color: "#cbd5e1",
    fontSize: 14,
    textAlign: "center",
    marginTop: 4,
  },
});
