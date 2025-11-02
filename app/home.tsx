import { router } from "expo-router";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function Home() {
  const goHost = () => {
    // لاحقاً بنبني صفحة المضيف (host)
    router.push("/host");
  };

  const goJoin = () => {
    router.push("/join");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>لعبة المسابقات الذكية</Text>
      <Text style={styles.subtitle}>اختر وضعك</Text>

      <TouchableOpacity style={[styles.button, styles.hostButton]} onPress={goHost}>
        <Text style={styles.buttonText}>✏️ أنا المضيف</Text>
        <Text style={styles.buttonHint}>إنشاء غرفة + الأسئلة</Text>
      </TouchableOpacity>

      <TouchableOpacity style={[styles.button, styles.joinButton]} onPress={goJoin}>
        <Text style={styles.buttonText}>👋 أنا لاعب</Text>
        <Text style={styles.buttonHint}>انضم بإدخال كود الغرفة</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0d1220",
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  title: {
    color: "#fff",
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 10,
  },
  subtitle: {
    color: "#aaa",
    fontSize: 16,
    marginBottom: 40,
  },
  button: {
    width: "100%",
    borderRadius: 12,
    paddingVertical: 20,
    marginVertical: 10,
    alignItems: "center",
  },
  hostButton: {
    backgroundColor: "#1e40af",
  },
  joinButton: {
    backgroundColor: "#065f46",
  },
  buttonText: {
    color: "white",
    fontSize: 20,
    fontWeight: "600",
  },
  buttonHint: {
    color: "#bcd5e1",
    fontSize: 14,
    marginTop: 4,
  },
});
