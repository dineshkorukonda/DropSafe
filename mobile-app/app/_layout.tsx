import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";

import { AppStateProvider } from "@/context/app-state";

export default function RootLayout() {
  return (
    <AppStateProvider>
      <StatusBar style="dark" />
      <Stack
        screenOptions={{
          headerShown: false,
          contentStyle: {
            backgroundColor: "#ECEAE4",
          },
          animation: "slide_from_right",
        }}
      >
        <Stack.Screen name="index" />
        <Stack.Screen name="login" />
        <Stack.Screen name="profile-setup" />
        <Stack.Screen name="claim-details" />
        <Stack.Screen name="alert" options={{ presentation: "modal" }} />
        <Stack.Screen name="(tabs)" />
      </Stack>
    </AppStateProvider>
  );
}
