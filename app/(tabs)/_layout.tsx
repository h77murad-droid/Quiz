import { Ionicons } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import { Platform } from "react-native";

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: "#00d4aa",
        tabBarStyle: {
          backgroundColor: "#000",
          borderTopColor: "#222",
          paddingTop: Platform.OS === "ios" ? 8 : 4,
          paddingBottom: Platform.OS === "ios" ? 12 : 6,
          height: Platform.OS === "ios" ? 70 : 60,
        },
        tabBarLabelStyle: {
          fontSize: 12,
        },
      }}
    >
      {/* التاب الأساسي - الهوم */}
      <Tabs.Screen
        name="home"
        options={{
          title: "الرئيسية",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home" color={color} size={size} />
          ),
        }}
      />

      {/* التاب الثاني (إكسبلور) - حالياً شاشة بسيطة */}
      <Tabs.Screen
        name="explore"
        options={{
          title: "المزيد",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="search" color={color} size={size} />
          ),
        }}
      />
    </Tabs>
  );
}
