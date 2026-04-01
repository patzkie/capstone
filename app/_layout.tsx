import { Stack } from "expo-router";
import 'expo-router/entry';
import './globals.css';

export default function RootLayout() {
  return (
    <Stack>

      {/* Add onboarding screen */}
      <Stack.Screen name="onboarding/index" options={{ headerShown: false }} />

      <Stack.Screen
        name="(tabs)"
        options={{ headerShown: false }}
      />
    </Stack>
  );
}
