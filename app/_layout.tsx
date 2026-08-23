import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { COLORS } from '@/constants';

export default function RootLayout() {
  return (
    <>
      <StatusBar style="dark" />
      <Stack
        screenOptions={{
          headerStyle: { backgroundColor: COLORS.background },
          headerTintColor: COLORS.primary,
          headerTitleStyle: { fontWeight: '700', fontSize: 20 },
          contentStyle: { backgroundColor: COLORS.background },
        }}
      >
        <Stack.Screen name="index" options={{ title: 'Línguas Kids' }} />
        <Stack.Screen name="lessons/[ageGroup]" options={{ title: 'Lições' }} />
        <Stack.Screen name="play/[lessonId]" options={{ title: 'Praticar' }} />
      </Stack>
    </>
  );
}
