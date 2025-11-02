import { StyleSheet, Text, View } from "react-native";

export default function IndexScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>جاهزين للّعبة 🎯</Text>
      <Text style={styles.subtitle}>
        هذه الصفحة placeholder مؤقت فقط. الواجهة الرئيسية الفعلية هي شاشة "home".
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000", // نفس الثيم الداكن
    alignItems: "center",
    justifyContent: "center",
    padding: 24,
  },
  title: {
    color: "#00d4aa",
    fontSize: 24,
    fontWeight: "700",
    textAlign: "center",
    marginBottom: 12,
  },
  subtitle: {
    color: "#999",
    fontSize: 14,
    textAlign: "center",
    lineHeight: 20,
  },
});
