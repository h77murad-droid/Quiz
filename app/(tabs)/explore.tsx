import { Text, View } from "react-native";

export default function ExploreScreen() {
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "#000", // خلفية غامقة عشان يبان مع الثيم الداكن
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Text style={{ color: "white", fontSize: 18 }}>
        شاشة مؤقتة (Explore)
      </Text>
    </View>
  );
}
