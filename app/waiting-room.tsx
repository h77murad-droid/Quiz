import { useLocalSearchParams } from "expo-router";
import { StyleSheet, Text, View } from "react-native";

export default function WaitingRoom() {
  // host = "1" يعني هذا المضيف
  const { name, code, host } = useLocalSearchParams<{
    name?: string;
    code?: string;
    host?: string;
  }>();

  const isHost = host === "1";

  return (
    <View style={styles.container}>
      <Text style={styles.title}>🕓 غرفة الانتظار</Text>

      {isHost ? (
        <>
          <Text style={styles.roleText}>وضع المضيف</Text>
          <Text style={styles.info}>كود الغرفة: {code ?? "?"}</Text>
          <Text style={styles.subtext}>
            أنت الآن تنتظر اللاعبين يدخلون هذا الكود.
          </Text>
          <Text style={styles.subtext}>
            (لاحقاً: سنعرض قائمة اللاعبين المتصلين مباشرة)
          </Text>
        </>
      ) : (
        <>
          <Text style={styles.roleText}>وضع اللاعب</Text>
          <Text style={styles.info}>مرحبًا {name ?? "مجهول"}! ✅</Text>
          <Text style={styles.info}>كود الغرفة: {code ?? "?"}</Text>
          <Text style={styles.subtext}>
            انتظر المضيف يبدأ الجولة...
          </Text>
        </>
      )}
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
    color: "white",
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 20,
  },
  roleText: {
    color: "#fde047",
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 10,
  },
  info: {
    color: "#a5f3fc",
    fontSize: 18,
    marginVertical: 6,
    textAlign: "center",
  },
  subtext: {
    color: "#ccc",
    fontSize: 16,
    marginTop: 20,
    textAlign: "center",
    lineHeight: 22,
  },
});
