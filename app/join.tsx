import { router } from "expo-router";
import { useState } from "react";
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";

export default function Join() {
  const [name, setName] = useState("");
  const [code, setCode] = useState("");

  const handleJoin = () => {
    if (!name || !code) {
      alert("الرجاء إدخال الاسم وكود الغرفة");
      return;
    }
    // روح لصفحة الانتظار ومعاك الاسم والكود كـ query params
    router.push(`/waiting-room?name=${encodeURIComponent(name)}&code=${encodeURIComponent(code)}`);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>🎮 انضم إلى الغرفة</Text>

      <TextInput
        placeholder="اسمك"
        style={styles.input}
        value={name}
        onChangeText={setName}
      />

      <TextInput
        placeholder="كود الغرفة"
        style={styles.input}
        value={code}
        onChangeText={setCode}
      />

      <TouchableOpacity style={styles.button} onPress={handleJoin}>
        <Text style={styles.buttonText}>انضم الآن</Text>
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
    color: "white",
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 30,
  },
  input: {
    backgroundColor: "white",
    width: "100%",
    padding: 14,
    borderRadius: 8,
    marginVertical: 8,
  },
  button: {
    backgroundColor: "#2563eb",
    padding: 14,
    borderRadius: 8,
    marginTop: 20,
    width: "100%",
  },
  buttonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "600",
    textAlign: "center",
  },
});
