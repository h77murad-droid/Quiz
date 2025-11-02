import { StyleSheet, Text, View } from "react-native";

export default function ModalScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>شاشة تجريبية</Text>
      <Text style={styles.subtitle}>
        هذه الصفحة مؤقتة فقط لتجنب الخطأ الناتج عن القالب القديم.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  title: {
    color: "#00d4aa",
    fontSize: 24,
    fontWeight: "bold",
  },
  subtitle: {
    color: "#999",
    marginTop: 10,
    textAlign: "center",
  },
});
