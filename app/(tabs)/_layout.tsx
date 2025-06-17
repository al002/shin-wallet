import Ionicons from "@expo/vector-icons/Ionicons";
import { Tabs } from "expo-router";
import { useTheme } from "tamagui";

export default function TabsLayout() {
  const theme = useTheme();

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: theme.primary.val,
        tabBarInactiveTintColor: theme.colorMuted.val,
        tabBarStyle: {
          backgroundColor: theme.backgroundStrong.val,
          borderTopWidth: 0,
        },
      }}
    >
      <Tabs.Screen
        name="wallet"
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home" color={color} size={size} />
          )
        }}
      />

      <Tabs.Screen
        name="swap"
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="repeat" color={color} size={size} />
          ),
        }}
      />

      <Tabs.Screen
        name="history"
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="timer" color={color} size={size} />
          ),
        }}
      />

      <Tabs.Screen
        name="explorer"
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="search" color={color} size={size} />
          ),
        }}
      />
    </Tabs>
  );
}
